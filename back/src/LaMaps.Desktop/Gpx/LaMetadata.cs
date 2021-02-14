using System;
using NetTopologySuite.IO;

namespace LaMaps.Desktop.Controllers
{
    public class LaMetadata
    {
        public LaMetadata(GpxMetadata m)
        {
            Time = m.CreationTimeUtc;
        }

        public DateTime? Time { get; set; }
    }
}