/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GpxDto } from '../models/GpxDto';
import { request as __request } from '../core/request';

export class GpxService {

    /**
     * @param simplifyTolerance 
     * @returns GpxDto Success
     * @throws ApiError
     */
    public static async getGpxService(
simplifyTolerance?: number | null,
): Promise<GpxDto> {
        const result = await __request({
            method: 'GET',
            path: `/Gpx`,
            query: {
                'SimplifyTolerance': simplifyTolerance,
            },
        });
        return result.body;
    }

}