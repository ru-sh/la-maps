using System.Collections.Generic;

namespace LaMaps.Desktop.Controllers
{
    public class WorkDirInfo
    {
        public string Name { get; set; }
        public GnssRectangle Rectangle { get; set; }
    }

    public class FolderInfo
    {
        public string Name { get; set; }
        public IList<FolderInfo> SubFolders { get; set; }
        public string[] Files { get; set; }
    }
}