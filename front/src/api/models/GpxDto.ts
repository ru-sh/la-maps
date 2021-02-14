/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { GpxRoute } from './GpxRoute';
import type { GpxWaypoint } from './GpxWaypoint';
import type { LaMetadata } from './LaMetadata';
import type { Track } from './Track';

export type GpxDto = {
    routes?: Array<GpxRoute> | null;
    waypoints?: Array<GpxWaypoint> | null;
    tracks?: Array<Track> | null;
    metadata?: LaMetadata;
}