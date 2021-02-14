/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type PrepareDeviceCommand = {
    drive?: string | null;
    clearGpx?: boolean;
    clearCustomMaps?: boolean;
    clearBirdsEye?: boolean;
    uploadGpx?: boolean;
    uploadCustomMaps?: boolean;
    uploadBirdsEye?: boolean;
    ejectDrive?: boolean;
}