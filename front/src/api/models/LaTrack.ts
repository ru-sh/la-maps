/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { LaSegment } from './LaSegment';

export type LaTrack = {
    readonly datum?: string | null;
    readonly trackWidth?: string | null;
    readonly color?: string | null;
    readonly description?: string | null;
    readonly segments?: Array<LaSegment> | null;
}