/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GarminDrive } from '../models/GarminDrive';
import type { PrepareDeviceCommand } from '../models/PrepareDeviceCommand';
import { request as __request } from '../core/request';

export class DeviceService {

    /**
     * @returns GarminDrive Success
     * @throws ApiError
     */
    public static async getDeviceService(): Promise<Array<GarminDrive>> {
        const result = await __request({
            method: 'GET',
            path: `/Device`,
        });
        return result.body;
    }

    /**
     * @param workDir 
     * @param requestBody 
     * @returns any Success
     * @throws ApiError
     */
    public static async postDeviceService(
workDir?: string | null,
requestBody?: PrepareDeviceCommand,
): Promise<any> {
        const result = await __request({
            method: 'POST',
            path: `/Device`,
            query: {
                'workDir': workDir,
            },
            body: requestBody,
        });
        return result.body;
    }

}