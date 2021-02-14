using System;
using System.Runtime.InteropServices;

namespace LaMaps.Desktop.Controllers
{
    public static class UsbDriveUtility
    {
        const int OPEN_EXISTING = 3;
        const uint GENERIC_READ = 0x80000000;
        const uint GENERIC_WRITE = 0x40000000;
        const uint IOCTL_STORAGE_EJECT_MEDIA = 0x2D4808;

        [DllImport("kernel32")]
        private static extern int CloseHandle(IntPtr handle);

        [DllImport("kernel32")]
        private static extern int DeviceIoControl(IntPtr deviceHandle, uint ioControlCode, IntPtr inBuffer,
            int inBufferSize, IntPtr outBuffer, int outBufferSize, ref int bytesReturned, IntPtr overlapped);

        [DllImport("kernel32")]
        private static extern IntPtr CreateFile(string filename, uint desiredAccess, uint shareMode,
            IntPtr securityAttributes, int creationDisposition, int flagsAndAttributes, IntPtr templateFile);


        public static void EjectDrive(char driveLetterCharacter)
        {
            string drivePath = "\\\\.\\" + driveLetterCharacter + ":";
            IntPtr handle = CreateFile(drivePath, GENERIC_READ | GENERIC_WRITE, 0, IntPtr.Zero, OPEN_EXISTING, 0,
                IntPtr.Zero);
            if ((long) handle == -1)
            {
                throw new Exception("Unable to open drive " + driveLetterCharacter);
            }

            int dummy = 0;
            DeviceIoControl(handle, IOCTL_STORAGE_EJECT_MEDIA, IntPtr.Zero, 0, IntPtr.Zero, 0, ref dummy, IntPtr.Zero);
            CloseHandle(handle);
        }
    }
}