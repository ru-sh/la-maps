/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { WorkDirInfo } from '../models/WorkDirInfo';
import { request as __request } from '../core/request';

export class WorkDirService {

    /**
     * @returns WorkDirInfo Success
     * @throws ApiError
     */
    public static async getWorkDirService(): Promise<Array<WorkDirInfo>> {
        const result = await __request({
            method: 'GET',
            path: `/WorkDir`,
        });
        return result.body;
    }

}