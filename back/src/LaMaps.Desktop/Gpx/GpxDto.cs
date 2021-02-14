using System.Collections.Generic;
using NetTopologySuite.IO;

namespace LaMaps.Desktop.Controllers
{
    public class GpxDto
    {
        public List<GpxRoute> Routes { get; set; }
        public List<GpxWaypoint> Waypoints { get; set; }
        public List<Track> Tracks { get; set; }
        public LaMetadata Metadata { get; set; }
    }
}