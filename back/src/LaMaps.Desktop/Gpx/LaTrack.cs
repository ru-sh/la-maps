using System.Collections.Generic;

namespace LaMaps.Desktop.Controllers
{
    public class LaTrack
    {
        public string Datum { get; }
        public string TrackWidth { get; }
        public string Color { get; }
        public string Description { get; }
        public IList<LaSegment> Segments { get; }

        public LaTrack(string datum, string trackWidth, string color, string description, IList<LaSegment> segments)
        {
            Datum = datum;
            TrackWidth = trackWidth;
            Color = color;
            Description = description;
            Segments = segments;
        }
    }
}