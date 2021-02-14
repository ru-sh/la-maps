/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { GpxWebLink } from './GpxWebLink';
import type { Segment } from './Segment';
import type { StringStringKeyValuePair } from './StringStringKeyValuePair';

export type Track = {
    extensions?: Array<StringStringKeyValuePair> | null;
    links?: Array<GpxWebLink>;
    number?: number | null;
    segments?: Array<Segment> | null;
    source?: string | null;
    name?: string | null;
    description?: string | null;
    comment?: string | null;
    classification?: string | null;
}