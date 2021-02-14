import { useEffect } from 'react';
import { UiStore } from '../../stores/UiStore';

import NavBar from './components/NavBar';
import { WorkDirStore } from '../../stores/WorkDirStore';
import { Link, Route, RouteComponentProps, Switch, useRouteMatch } from 'react-router-dom';
import TrackList from './components/Tracks/TrackList';
import { observer } from 'mobx-react';
import DeviceUpload from './components/DeviceUpload';
import { LatLng, LatLngBounds } from 'leaflet';

const WorkPanel = (props: {
    uiStore: UiStore,
    workDirStore: WorkDirStore,
    route: RouteComponentProps<{ workDir: string }>
}) => {

    const { uiStore, route, workDirStore } = props;
    const { match } = route;
    let { path, url } = useRouteMatch();

    useEffect(() => {
        let load = async () => {
            let dirs = await uiStore.fetchWorkDirs();
            const dirName = match.params.workDir;
            let dir = dirs?.find(d => d.name === dirName)
            workDirStore.setWorkDir(dirName)
            const bounds = dir?.rectangle;
            if (uiStore.map && bounds && bounds.northEast && bounds.southWest)
                uiStore.map.fitBounds(new LatLngBounds(
                    new LatLng(bounds.southWest.lat ?? 0, bounds.southWest.lon ?? 0),
                    new LatLng(bounds.northEast.lat ?? 0, bounds.northEast.lon ?? 0),
                ))
            workDirStore.fetchTracks();
        }

        load();
    }, [uiStore.map, uiStore, workDirStore]);


    return (
        <aside className="menu">

            <NavBar ui={uiStore} tracks={workDirStore} />

            <Switch>
                <Route exact path={path}>
                    <ul className="menu-list">
                        <li>  <Link to={`${url}/deviceUpload`}>Работа с навигатором</Link></li>
                        <li>  <Link to={`${url}/tracks`}>10-Tracks</Link></li>
                    </ul>
                </Route>

                <Route path={`${path}/deviceUpload`}>
                    <DeviceUpload tracks={workDirStore} />
                </Route>

                <Route path={`${path}/tracks`}>
                    <TrackList workDirStore={workDirStore} uiStore={uiStore} />
                </Route>
            </Switch>

        </aside>
    );
}


export default observer(WorkPanel);