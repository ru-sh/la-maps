using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.IO;
using System.IO.Compression;
using System.Linq;
using System.Net.Http;
using System.Security.Policy;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using NetTopologySuite.IO;

namespace LaMaps.Desktop.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ImportFromLaServerController : ControllerBase
    {
        private readonly ILogger<ImportFromLaServerController> _logger;
        private readonly HttpClient _httpClient;

        public ImportFromLaServerController(ILogger<ImportFromLaServerController> logger, HttpClient httpClient)
        {
            _logger = logger;
            _httpClient = httpClient;
        }

        [HttpGet]
        public async Task<List<FileToDownload>> Get([FromQuery] string url)
        {
            var content = await _httpClient.GetStringAsync(url);
            var rx = Regex.Matches(content, "<td class=\"link\"><a href=\"([^\"]+)\"");
            var list = rx.Select(match => match.Groups[1].Value)
                .Where(s => !s.StartsWith(".."))
                .OrderBy(s => s)
                .Select(s => new FileToDownload()
                {
                    Name = s,
                    Url = Path.Combine(url, s)
                })
                .ToList();
            return list;
        }

        [HttpPut]
        public async Task<OkResult> Put([FromQuery] string url)
        {
            var rel = new Uri(url).Segments.Skip(2);
            var path = Path.Combine(
                new[]
                {
                    Environment.GetFolderPath(Environment.SpecialFolder.Desktop),
                    "LA_Maps"
                }.Concat(rel).ToArray());

            var dir = Path.GetDirectoryName(path);
            Directory.CreateDirectory(dir);
            
            if (Path.EndsInDirectorySeparator(path))
                return Ok();

            var stream = await _httpClient.GetStreamAsync(url);

            if (path.EndsWith(".zip"))
            {
                var zipArchive = new ZipArchive(stream);
                zipArchive.ExtractToDirectory(dir, true);
            }
            else
            {
                await using var file = System.IO.File.Create(path);
                await stream.CopyToAsync(file);
                await file.FlushAsync();
            }

            return Ok();
        }
    }
}