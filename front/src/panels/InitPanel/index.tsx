import { observer } from 'mobx-react';
import React, { useState, useEffect } from 'react';
import { Link, Route, RouteComponentProps, Switch, useRouteMatch } from 'react-router-dom';
import { WorkDirInfo, WorkDirService } from '../../api';
import { WorkDirStore } from '../../stores/WorkDirStore';
import { Modals, UiStore } from '../../stores/UiStore';
import ImportMapsLaRu from './ImportMapsLaRu';
import { HomeOutline } from 'react-ionicons'

const InitPanel = (props: {
    uiStore: UiStore,
    route: RouteComponentProps<{ workDir: string }>
}) => {
    const { uiStore } = props;
    let { path, url } = useRouteMatch();

    useEffect(() => {
        uiStore.fetchWorkDirs()
    }, []);

    return (
        uiStore.dirs === undefined ?
            (<aside className="menu mt-4"> Загрузка... </aside>)
            :
            <aside className="menu mt-4">
                <p className="menu-label"><HomeOutline /> Рабочая папка</p>
                <ul className="menu-list">
                    <li><a onClick={() => { uiStore.setModal(Modals.ImportMapsLaRu) }}>+ Загрузить с сервера</a></li>
                    {uiStore.dirs.map(d =>
                        <li key={d.name}><Link to={`workDir/${d.name}`}>{d.name}</Link></li>
                    )}
                </ul>

                <ImportMapsLaRu ui={uiStore} />

                <Switch>
                    <Route exact path={`/importMapsLaRu`}>
                    </Route>
                </Switch>
            </aside>
    );
}


export default observer(InitPanel);