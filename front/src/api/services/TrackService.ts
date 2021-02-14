/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LaTrack } from '../models/LaTrack';
import { request as __request } from '../core/request';

export class TrackService {

    /**
     * @param id 
     * @returns LaTrack Success
     * @throws ApiError
     */
    public static async getTrackService(
id?: string | null,
): Promise<Array<LaTrack>> {
        const result = await __request({
            method: 'GET',
            path: `/Track`,
            query: {
                'id': id,
            },
        });
        return result.body;
    }

}