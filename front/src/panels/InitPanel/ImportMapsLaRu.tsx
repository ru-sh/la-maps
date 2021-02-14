import { WorkDirStore as TracksStore } from "../../stores/WorkDirStore";
import { observer } from "mobx-react";
import { useState, useEffect } from 'react';
import { OpenAPI, ImportFromLaServerService } from '../../api';
import { Modals, UiStore } from "../../stores/UiStore";


const ImportMapsLaRu = (props: { ui: UiStore }) => {
    const { modal, setModal } = props.ui;
    const [url, setUrl] = useState("https://maps.lizaalert.ru/maps/2020-05-26_SpB/");
    const [files, setFiles] = useState([] as Array<{ name: string, url: string, downloaded: boolean }>);

    let close = () => {
        setModal(Modals.None);
    };

    let getFiles = async () => {
        try {
            let links = await ImportFromLaServerService.getImportFromLaServerService(url);
            setFiles(links.map(f => ({ name: f.name ?? '-', url: f.url ?? '', downloaded: false })));
        }
        catch (e) {
            alert((e.message || e) + e.body);
        }
    };

    let downloadFiles = async () => {
        for (const item of files) {
            try {
                await ImportFromLaServerService.putImportFromLaServerService(item.url);
                item.downloaded = true;
                setFiles(files);
            }
            catch (e) {
                debugger
                alert(e);
            }
        }
    };

    return (
        <div className={`modal ${modal == Modals.ImportMapsLaRu ? 'is-active' : ''}`}>
            <div className="modal-background"></div>
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">Загрузить с сервера</p>
                    <button className="delete" aria-label="close" onClick={close}></button>
                </header>
                <section className="modal-card-body">
                    <div className="content">

                        <div className="field">
                            <label className="label">URL адрес папки с картами</label>
                            <div className="control">
                                <div className="field has-addons">
                                    <div className="control is-expanded">
                                        <input className="input" type="text" placeholder="https://maps.lizaalert.ru/maps/..."
                                            value={url} onChange={(e) => { setUrl(e.target.value) }} />
                                    </div>
                                    <div className="control">
                                        <a className="button is-info" onClick={() => { getFiles() }}>Загрузить список</a>
                                    </div>
                                </div>

                                <div className="field has-addons">
                                    <ul>
                                        {files.map(f => <li>{f.name} {f.downloaded ? "✅" : ""}</li>)}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="field is-grouped">
                            <div className="control">
                                <button className="button is-link" onClick={() => { downloadFiles() }}>Загрузить файлы</button>
                            </div>
                            <div className="control">
                                <button className="button is-link is-light" onClick={close}>Отмена</button>
                            </div>
                        </div>

                    </div>
                </section>
                <button className="modal-close is-large" aria-label="close" onClick={close}></button>
            </div>
        </div>
    );
}


export default observer(ImportMapsLaRu);