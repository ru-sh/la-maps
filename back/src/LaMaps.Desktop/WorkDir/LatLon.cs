namespace LaMaps.Desktop.Controllers
{
    public class LatLon
    {
        public LatLon(float lat, float lon)
        {
            Lat = lat;
            Lon = lon;
        }

        public float Lat { get; set; }
        public float Lon { get; set; }
    }
}