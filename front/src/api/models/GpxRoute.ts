/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { GpxWaypoint } from './GpxWaypoint';
import type { GpxWebLink } from './GpxWebLink';

export type GpxRoute = {
    readonly name?: string | null;
    readonly comment?: string | null;
    readonly description?: string | null;
    readonly source?: string | null;
    readonly links?: Array<GpxWebLink>;
    readonly number?: number | null;
    readonly classification?: string | null;
    readonly extensions?: any;
    readonly waypoints?: Array<GpxWaypoint> | null;
}