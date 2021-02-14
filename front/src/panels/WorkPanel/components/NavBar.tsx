import { WorkDirStore } from "../../../stores/WorkDirStore";
import { observer } from "mobx-react";
import { useState, useEffect } from 'react';
import { UiStore } from "../../../stores/UiStore";
import { Link } from "react-router-dom";
import { HomeOutline } from "react-ionicons";

interface IMenuState {
    Import: boolean;
}

const NavBar = (props: { ui: UiStore, tracks: WorkDirStore }) => {
    const { setModal } = props.ui;
    const { workDir } = props.tracks;

    const [menuState] = useState<IMenuState>({ Import: false });

    useEffect(() => {
        document.title = workDir;
    });

    return (
        <nav className="breadcrumb mt-3" aria-label="breadcrumbs">
            <ul>
                <li><Link to='/'><HomeOutline /></Link></li>
                <li className="is-active"><Link to={`/workDir/${workDir}`}>{workDir}</Link></li>
            </ul>
        </nav>
    );
}


export default observer(NavBar);