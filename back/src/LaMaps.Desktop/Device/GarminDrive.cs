namespace LaMaps.Desktop.Controllers
{
    public class GarminDrive
    {
        public string Drive { get; }
        public string DeviceId { get; }

        public GarminDrive(string drive, string deviceId)
        {
            Drive = drive;
            DeviceId = deviceId;
        }
    }
}