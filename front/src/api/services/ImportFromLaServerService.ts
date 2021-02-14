/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FileToDownload } from '../models/FileToDownload';
import { request as __request } from '../core/request';

export class ImportFromLaServerService {

    /**
     * @param url 
     * @returns FileToDownload Success
     * @throws ApiError
     */
    public static async getImportFromLaServerService(
url?: string | null,
): Promise<Array<FileToDownload>> {
        const result = await __request({
            method: 'GET',
            path: `/ImportFromLaServer`,
            query: {
                'url': url,
            },
        });
        return result.body;
    }

    /**
     * @param url 
     * @returns any Success
     * @throws ApiError
     */
    public static async putImportFromLaServerService(
url?: string | null,
): Promise<any> {
        const result = await __request({
            method: 'PUT',
            path: `/ImportFromLaServer`,
            query: {
                'url': url,
            },
        });
        return result.body;
    }

}