using System;
using System.Drawing;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Logging;
using NetTopologySuite.IO;
using SimplifyCSharp;

namespace LaMaps.Desktop.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class GpxController : ControllerBase
    {
        private readonly ILogger<GpxController> _logger;
        private readonly IFileProvider _fileProvider;

        public GpxController(ILogger<GpxController> logger, IFileProvider fileProvider)
        {
            _logger = logger;
            _fileProvider = fileProvider;
        }

        [HttpGet()]
        public GpxDto Get([FromQuery] GpxGetParams p)
        {
            var path = @"C:\Users\shaki\Desktop\LA_Maps\2020-08-31_KrutayaGora\дз2\2020-08-30-0808 20200830veter3.gpx";
            var expected = System.IO.File.ReadAllText(path);
            var file = GpxFile.Parse(expected, null);
            var tracks = file.Tracks.Select(t => new Track(t)).ToList();
            if (p.SimplifyTolerance.HasValue)
            {
                foreach (var track in tracks)
                {
                    foreach (var segment in track.Segments)
                    {
                        segment.Waypoints = SimplificationHelpers.Simplify(
                            segment.Waypoints,
                            (p1, p2) => p1 == p2,
                            p => p.Lat * 2e5,
                            p => p.Lon * 2e5,
                            p.SimplifyTolerance.Value);
                    }
                }
            }

            return new GpxDto()
            {
                Metadata = new LaMetadata(file.Metadata),
                Routes = file.Routes.Select(r => r).ToList(),
                Waypoints = file.Waypoints.Select(w => w).ToList(),
                Tracks = tracks
            };
        }


        public class GpxGetParams
        {
            public int? SimplifyTolerance { get; set; }
        }
    }
}