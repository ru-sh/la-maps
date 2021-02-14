import { MapContainer, TileLayer, Polyline, useMap, Popup } from 'react-leaflet'
import { LatLng } from 'leaflet'
import "leaflet/dist/leaflet.css"
import { UiStore, WorkDirStore } from '../stores';
import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';


const Map = ({ height, workDirStore, uiStore }: { height: number, workDirStore: WorkDirStore, uiStore: UiStore }) => {
    const tracks = workDirStore?.tracks || [];
    
    return (
        <MapContainer center={[59.852, 30.392]} zoom={13} scrollWheelZoom={true}
            style={{ width: '100%', height: height }} whenCreated={uiStore.setMap}>
                
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">nakarte.me</a>'
                url="https://{s}.tiles.nakarte.me/ggc500/{z}/{x}/{y}.png" maxNativeZoom={14}
                tms={true}
            />
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">nakarte.me</a>'
                url="https://{s}.tiles.nakarte.me/ggc250/{z}/{x}/{y}.png" maxNativeZoom={15}
                tms={true}
            />

            {tracks?.filter(t => t.visible).flatMap(t =>
                t.segments?.map((s, i) =>
                    <Polyline key={t.name + ':' + i} pathOptions={{ color: t.color }}
                        positions={s.points?.map(w => new LatLng(w.lat ?? 0, w.lon ?? 0)) ?? []}> <Popup>{t.name}:{i}</Popup> </Polyline>))}
        </MapContainer>

    );
}


export default observer(Map);