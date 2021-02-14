import { makeAutoObservable } from "mobx";
import { WorkDirInfo, WorkDirService } from "../api";
import { LatLng, LatLngBounds, Map } from 'leaflet'
import { Track } from "./WorkDirStore";

export class UiStore {

    dirs: WorkDirInfo[] | undefined;
    modal: Modals = Modals.None;
    map: Map | undefined;

    constructor() {
        makeAutoObservable(this);
    }

    setModal = (modal: Modals) => {
        this.modal = modal;
    };

    setMap = (map: Map) => {
        this.map = map;
    };

    async fetchWorkDirs() {
        try {
            this.dirs = await WorkDirService.getWorkDirService();
            return this.dirs;
        } catch (e) {
            alert(e);
        }
    }

    fitTrack(track: Track) {
        if (!this.map) return;
        let points = track.segments.flatMap(s => s.points);
        if(!points.length) return;

        const firstPoint = points[0];
        var maxLat = firstPoint?.lat || 0;
        var maxLon = firstPoint?.lon || 0;
        var minLat = firstPoint?.lat || 0;
        var minLon = firstPoint?.lon || 0;
        for (const point of points) {
            if (point?.lat && point.lat > maxLat) maxLat = point?.lat;
            if (point?.lat && point.lat < minLat) minLat = point?.lat;
            if (point?.lon && point.lon > maxLon) maxLon = point?.lon;
            if (point?.lon && point.lon < minLon) minLon = point?.lon;
        }
        this.map.fitBounds(new LatLngBounds(new LatLng(minLat, minLon), new LatLng(maxLat, maxLon)))
    }
}

export enum Modals {
    None,
    ImportMapsLaRu
}