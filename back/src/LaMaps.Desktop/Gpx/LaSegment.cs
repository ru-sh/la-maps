using System.Collections.Generic;

namespace LaMaps.Desktop.Controllers
{
    public class LaSegment
    {
        public List<LaWaypoint> Points { get; set; }

        public LaSegment(List<LaWaypoint> points)
        {
            Points = points;
        }
    }
}