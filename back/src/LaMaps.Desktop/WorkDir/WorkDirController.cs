using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Logging;

namespace LaMaps.Desktop.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WorkDirController : ControllerBase
    {
        private readonly ILogger<WorkDirController> _logger;
        private readonly IFileProvider _fileProvider;

        public WorkDirController(ILogger<WorkDirController> logger, IFileProvider fileProvider)
        {
            _logger = logger;
            _fileProvider = fileProvider;
        }

        [HttpGet]
        public List<WorkDirInfo> Get()
        {
            return _fileProvider.GetDirectoryContents("/")
                .Where(info => info.IsDirectory)
                .Select(info =>
                {
                    var dirName = info.PhysicalPath;
                    var hlgFile = Directory.EnumerateFiles(dirName, "*.hlg").FirstOrDefault();
                    var hlg = ReadHlgFile(hlgFile);
                    return new WorkDirInfo()
                    {
                        Name = info.Name,
                        Rectangle = hlg
                    };
                })
                .ToList();
        }

        private FolderInfo GetDirTree(string dirName)
        {
            var files = Directory.GetFiles(dirName);
            var subDirs = Directory.GetDirectories(dirName, "*.*", SearchOption.TopDirectoryOnly);
            return new FolderInfo()
            {
                Name = Path.GetFileName(dirName),
                SubFolders = subDirs.Select(GetDirTree).ToList(),
                Files = files
            };
        }

        private GnssRectangle ReadHlgFile(string hlgFile)
        {
            if (hlgFile == null) return null;

            try
            {
                var config = new ConfigurationBuilder()
                    .AddIniFile(hlgFile)
                    .Build();
                var highlightingConfig = new HlgHighlightingConfig();
                config.GetSection("HIGHLIGHTING").Bind(highlightingConfig);
                var gnssRectangle = new GnssRectangle
                {
                    SouthWest = new LatLon(highlightingConfig.PointLat_0, highlightingConfig.PointLon_0),
                    NorthEast = new LatLon(highlightingConfig.PointLat_2, highlightingConfig.PointLon_2)
                };

                return gnssRectangle;
            }
            catch (Exception e)
            {
                _logger.LogError(e, "An error while reading .hlg file");
                throw;
            }
        }
    }
}