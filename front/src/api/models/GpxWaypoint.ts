/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { GpxDegrees } from './GpxDegrees';
import type { GpxDgpsStationId } from './GpxDgpsStationId';
import type { GpxFixKind } from './GpxFixKind';
import type { GpxLatitude } from './GpxLatitude';
import type { GpxLongitude } from './GpxLongitude';
import type { GpxWebLink } from './GpxWebLink';

export type GpxWaypoint = {
    longitude?: GpxLongitude;
    latitude?: GpxLatitude;
    readonly elevationInMeters?: number | null;
    readonly timestampUtc?: string | null;
    magneticVariation?: GpxDegrees;
    readonly geoidHeight?: number | null;
    readonly name?: string | null;
    readonly comment?: string | null;
    readonly description?: string | null;
    readonly source?: string | null;
    readonly links?: Array<GpxWebLink>;
    readonly symbolText?: string | null;
    readonly classification?: string | null;
    fixKind?: GpxFixKind;
    readonly numberOfSatellites?: number | null;
    readonly horizontalDilutionOfPrecision?: number | null;
    readonly verticalDilutionOfPrecision?: number | null;
    readonly positionDilutionOfPrecision?: number | null;
    readonly secondsSinceLastDgpsUpdate?: number | null;
    dgpsStationId?: GpxDgpsStationId;
    readonly extensions?: any;
}