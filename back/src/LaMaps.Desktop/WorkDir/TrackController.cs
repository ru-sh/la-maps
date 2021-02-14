using System;
using System.Collections.Generic;
using System.Drawing;
using System.Globalization;
using System.IO;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Logging;

namespace LaMaps.Desktop.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TrackController : ControllerBase
    {
        private readonly ILogger<WorkDirController> _logger;
        private readonly IFileProvider _fileProvider;

        public TrackController(ILogger<WorkDirController> logger, IFileProvider fileProvider)
        {
            _logger = logger;
            _fileProvider = fileProvider;
        }

        [HttpGet()]
        public List<LaTrack> Get(string id)
        {
            var workDir = id;
            var dir = _fileProvider.GetDirectoryContents(workDir);
            if (!dir.Exists) throw new Exception($"Directory `{workDir}` doesn't exist.");

            var tracksFolder = _fileProvider.GetDirectoryContents(
                Path.Combine(workDir, "10-Tracks"));

            var pltFiles = tracksFolder.Where(f => f.Name.EndsWith(".plt"));

            var tracks = pltFiles.Select(ParsePlt).ToList();
            return tracks;
        }

        private LaTrack ParsePlt(IFileInfo fileInfo)
        {
            using var fileStream = fileInfo.CreateReadStream();
            using var reader = new StreamReader(fileStream);
            var version = reader.ReadLine();
            if (version != "OziExplorer Track Point File Version 2.1")
                throw new NotSupportedException(version);

            var datum = reader.ReadLine();
            var altitudeUnitsLine = reader.ReadLine();
            reader.ReadLine(); // reserved
            var trackParams = reader.ReadLine().Split(',');
            var trackWidth = trackParams[1];
            var color = GetColor(int.Parse(trackParams[2])).ToString();
            var description = trackParams[3].Trim();
            var linesNumber = int.Parse(reader.ReadLine());
            var points = new List<LaWaypoint>();
            var wptLine = reader.ReadLine();
            var segments = new List<LaSegment>();
            var currentSegment = new LaSegment(points);
            while (!reader.EndOfStream)
            {
                var wptParams = wptLine.Split(',').Select(str => str.Trim()).ToList();
                var lat = double.Parse(wptParams[0]);
                var lon = double.Parse(wptParams[1]);
                var newSegment = wptParams[2];
                if (newSegment == "1" && points.Any())
                {
                    segments.Add(currentSegment);
                    points = new List<LaWaypoint>();
                    currentSegment = new LaSegment(points);
                }

                var ele = double.Parse(wptParams[3]);
                var date = wptParams[5];
                var time = wptParams[6];
                var dateTime =
                    DateTime.ParseExact(date + " " + time, "dd-MMM-yy h:mm:ss tt", CultureInfo.InvariantCulture);
                DateTime.SpecifyKind(dateTime, DateTimeKind.Utc);
                var wpt = new LaWaypoint()
                {
                    Lat = lat, Lon = lon, Ele = ele, Time = dateTime
                };
                points.Add(wpt);
                wptLine = reader.ReadLine();
            }

            segments.Add(currentSegment);
            return new LaTrack(datum, trackWidth, color, description, segments);
        }

        private string GetColor(int delphiColor)
        {
            var r = delphiColor % 256;
            var g = (delphiColor >> 8) % 256;
            var b = (delphiColor >> 16) % 256;
            return $"#{r:X2}{g:X2}{b:X2}";
        }
    }
}