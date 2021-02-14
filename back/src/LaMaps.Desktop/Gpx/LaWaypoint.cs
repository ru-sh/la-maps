using System;
using NetTopologySuite.IO;

namespace LaMaps.Desktop.Controllers
{
    public class LaWaypoint
    {
        public LaWaypoint(GpxWaypoint w)
        {
            Lat = w.Latitude;
            Lon = w.Longitude;
            Ele = w.ElevationInMeters;
            Time = w.TimestampUtc;
        }

        public LaWaypoint()
        {
            
        }

        public DateTime? Time { get; set; }

        public double? Ele { get; set; }

        public double Lon { get; set; }

        public double Lat { get; set; }
    }
}