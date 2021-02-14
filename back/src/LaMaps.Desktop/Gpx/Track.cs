using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using NetTopologySuite.IO;

namespace LaMaps.Desktop.Controllers
{
    public class Track
    {
        public Track(GpxTrack gpxTrack)
        {
            Classification = gpxTrack.Classification;
            Comment = gpxTrack.Comment;
            Description = gpxTrack.Description;
            Name = gpxTrack.Name;
            Number = gpxTrack.Number;
            Source = gpxTrack.Source;
            Segments = gpxTrack.Segments
                .Select(s => new Segment()
                {
                    Waypoints = s.Waypoints.Select(w => new LaWaypoint(w)).ToList()
                }).ToImmutableList();
            Links = gpxTrack.Links;
            Extensions = (gpxTrack.Extensions as ImmutableXElementContainer).Items.Select(x =>
                    KeyValuePair.Create(x.Name.LocalName, x.Value))
                .ToImmutableList();
        }

        public ImmutableList<KeyValuePair<string, string>> Extensions { get; set; }

        public ImmutableArray<GpxWebLink> Links { get; set; }

        public uint? Number { get; set; }

        public ImmutableList<Segment> Segments { get; set; }

        public string Source { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public string Comment { get; set; }

        public string Classification { get; set; }
    }
}