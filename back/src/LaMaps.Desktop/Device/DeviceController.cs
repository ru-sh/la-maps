using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Xml.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace LaMaps.Desktop.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DeviceController : ControllerBase
    {
        private readonly ILogger<ImportFromLaServerController> _logger;
        private readonly IOptions<AppConfig> _appConfig;
        private static readonly string Backups = "Backups";

        public DeviceController(ILogger<ImportFromLaServerController> logger, IOptions<AppConfig> appConfig)
        {
            _logger = logger;
            _appConfig = appConfig;
        }

        [HttpGet()]
        public async Task<List<GarminDrive>> GetDevices()
        {
            var drives = Environment.GetLogicalDrives()
                .Where(s => Directory.Exists(Path.Combine(s, "Garmin/GPX/Current")))
                .Select(s => new GarminDrive(s, GetDeviceId(s)))
                .ToList();

            return drives;
        }

        [HttpPost]
        public async Task<OkResult> Post([FromQuery] string workDir, PrepareDeviceCommand cmd)
        {
            var workspaceFolder = Environment.ExpandEnvironmentVariables(_appConfig.Value.WorkspaceFolder);
            var workDirPath = Path.Combine(workspaceFolder, workDir);
            var deviceId = GetDeviceId(cmd.Drive);
            var backupFolder = Path.Combine(workDirPath, Backups, deviceId,
                DateTime.Now.ToString("s").Replace(":", ""));

            var garmin = "Garmin";
            var workDirGarminFolder = Path.Combine(workDirPath, garmin);
            var deviceGarminFolder = Path.Combine(cmd.Drive, garmin);

            var fileExtensions = new Dictionary<GarminFolder, string>()
            {
                {GarminFolder.GPX, "*.gpx"},
                {GarminFolder.CustomMaps, "*.kmz"},
                {GarminFolder.BirdsEye, "*.jnx"},
            };

            IReadOnlyList<FileInfo> GetGoldenFiles(GarminFolder garminFolder)
            {
                var srcDir = Path.Combine(workDirGarminFolder, garminFolder.ToString());
                var files = Directory.GetFiles( srcDir);
                return files.Select(fileName => new FileInfo(fileName)).ToList();
            }

            var goldenFiles = new Dictionary<GarminFolder, IReadOnlyList<FileInfo>>(
                new[] {GarminFolder.GPX, GarminFolder.CustomMaps, GarminFolder.BirdsEye}
                    .Select(gf => KeyValuePair.Create(gf, GetGoldenFiles(gf))));

            void Archive(GarminFolder garminFolder)
            {
                var srcDir = Path.Combine(deviceGarminFolder, garminFolder.ToString());
                var dstDir = Path.Combine(backupFolder, garminFolder.ToString());
                MoveFiles(srcDir, dstDir, fileExtensions[garminFolder], goldenFiles[garminFolder]);
            }

            if (cmd.ClearGpx) Archive(GarminFolder.GPX);
            if (cmd.ClearCustomMaps) Archive(GarminFolder.CustomMaps);
            if (cmd.ClearBirdsEye) Archive(GarminFolder.BirdsEye);

            void Upload(GarminFolder garminFolder)
            {
                var srcDir = Path.Combine(workDirGarminFolder, garminFolder.ToString());
                var files = Directory.GetFiles(srcDir);
                var dstDir = Path.Combine(deviceGarminFolder, garminFolder.ToString());
                foreach (var src in files)
                {
                    var fileName = Path.GetFileName(src);
                    var dst = Path.Combine(dstDir, fileName);
                    if(System.IO.File.Exists(dst)) continue;
                    System.IO.File.Copy(src, dst);
                }
            }

            if (cmd.UploadGpx) Upload(GarminFolder.GPX);
            if (cmd.UploadCustomMaps) Upload(GarminFolder.CustomMaps);
            if (cmd.UploadBirdsEye) Upload(GarminFolder.BirdsEye);

            // it looks like it needs admin rights
            // if(cmd.EjectDrive) UsbDriveUtility.EjectDrive(cmd.Drive[0]);

            return Ok();
        }

        public class PrepareDeviceCommand
        {
            public string Drive { get; set; }
            public bool ClearGpx { get; set; }
            public bool ClearCustomMaps { get; set; }
            public bool ClearBirdsEye { get; set; }
            public bool UploadGpx { get; set; }
            public bool UploadCustomMaps { get; set; }
            public bool UploadBirdsEye { get; set; }
            public bool EjectDrive { get; set; }
        }

        private string GetDeviceId(string drive)
        {
            try
            {
                var path = Path.Combine(drive, "Garmin/GarminDevice.xml");
                if (!System.IO.File.Exists(path)) return null;

                using var fileStream = System.IO.File.Open(path, FileMode.Open);
                using var reader = new StreamReader(fileStream);

                var xDoc = XDocument.Load(fileStream);
                return xDoc.Root.Element("{http://www.garmin.com/xmlschemas/GarminDevice/v2}Id").Value;
            }
            catch (Exception e)
            {
                _logger.LogError("GetDeviceId", e);
                return null;
            }
        }

        private void MoveFiles(string srcDir, string dstDir, string filePattern, IReadOnlyList<FileInfo> skipList)
        {
            var files = Directory.GetFiles(srcDir, filePattern, SearchOption.AllDirectories);

            if (files.Any())
            {
                Directory.CreateDirectory(dstDir);
            }

            foreach (var src in files)
            {
                var fileName = Path.GetFileName(src);
                var skipFile = skipList.FirstOrDefault(info => info.Name == fileName);
                if (skipFile != null)
                {
                    var deviceFileInfo = new FileInfo(src);
                    if(deviceFileInfo.Length == skipFile.Length) continue;
                }
                
                var dst = Path.Combine(dstDir, fileName);
                if (string.Equals("Current.gpx", fileName, StringComparison.OrdinalIgnoreCase))
                    System.IO.File.Copy(src, dst);
                else
                    System.IO.File.Move(src, dst);
            }
        }
    }
}