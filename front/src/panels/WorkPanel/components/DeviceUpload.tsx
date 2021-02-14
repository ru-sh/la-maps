import { WorkDirStore } from "../../../stores/WorkDirStore";
import { observer } from "mobx-react";
import { useState, useEffect } from 'react';
import { DeviceService } from "../../../api/services/DeviceService";
import { GarminDrive } from "../../../api/models/GarminDrive";
import { PrepareDeviceCommand } from "../../../api/models/PrepareDeviceCommand";
import { ConstructOutline } from 'react-ionicons'

const DeviceUpload = (props: { tracks: WorkDirStore }) => {
    const { workDir } = props.tracks;
    const [drives, setDrives] = useState([] as GarminDrive[]);
    const cmdDefaults = {
        clearGpx: true,
        clearCustomMaps: true,
        clearBirdsEye: true,
        uploadGpx: true,
        uploadCustomMaps: true,
        uploadBirdsEye: true,
        ejectDrive: true
    };

    const [cmd, setCmd] = useState({ ...cmdDefaults } as PrepareDeviceCommand);
    const [inProgress, setInProgress] = useState(false);
    const [hideClear, setHideClear] = useState(true);
    const [hideUploadDetails, setHideUploadDetails] = useState(true);

    useEffect(() => {
        refreshDrives();
    }, [])

    const refreshDrives = () => {
        DeviceService.getDeviceService().then(r => {
            setDrives(r);
            if (r.length && !cmd.drive) {
                cmd.drive = r[0].drive;
            }
        });
    }

    const toggleFunc = (prop: keyof typeof cmdDefaults) => {
        return () => {
            let newCmd = { ...cmd };
            newCmd[prop] = !cmd[prop] === true;
            setCmd(newCmd);
        };
    };


    const checkbox = (prop: keyof typeof cmdDefaults) => {
        return <input type="checkbox" checked={cmd[prop] === true} onChange={toggleFunc(prop)} />;
    };

    const execCmd = () => {
        if (inProgress) return;
        setInProgress(true);
        DeviceService.postDeviceService(workDir, cmd).then(r => {
            alert('Навигатор готов. Выполните безопасное извлечение диска перед отсоединением навигатора!')
            setInProgress(false);
        })
            .catch(e => {
                alert(e);
                setInProgress(false);
            })
    };

    return (
        <div className="content mr-3">

            <div className="message is-info">
                <div className="message-header">
                    <p>Диск навигатора</p>
                </div>
                <div className="message-body">

                    <div className="field has-addons">
                        <div className="control">
                            <div className="select">
                                <select value={cmd.drive ?? "Выберите диск навигатора"} onChange={(e) => {
                                    setCmd({ ...cmd, drive: e.target.value });
                                }}>
                                    {drives.map(d =>
                                        <option key={d.drive}>{d.drive} (Id: {d.deviceId})</option>)}
                                </select>

                            </div>
                        </div>
                        <div className="control">
                            <a className="button is-info" onClick={() => { refreshDrives() }}>Обновить</a>
                        </div>
                    </div>

                </div>
            </div>

            <div className="message is-info">
                <div className="message-header">
                    <p>Импортировать</p>
                </div>
                <div className="message-body">
                    <div className="content">
                        <div className="field">
                            <div className="control">
                                <label className="checkbox">
                                    {checkbox("clearGpx")} Track20200526 (2020-11-11T20:46:35Z)<ConstructOutline color="blue" />
                                </label>
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Сохранить в папку</label>
                            <div className="control">
                                <input className="input" placeholder="Backups / 20210215" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="message is-info">
                <div className="message-header" onClick={() => setHideClear(!hideClear)}>
                    <p><span className="icon">
                        {checkbox("clearGpx")}
                    </span>
                        <span>Архивировать старое</span>
                    </p>
                </div>
                <div className={`message-body ${hideClear ? 'is-hidden' : ''}`}>
                    <div className="content">
                        <div className="field">
                            <div className="control">
                                <label className="checkbox">
                                    {checkbox("clearGpx")} Очистить <code>GPX/*.gpx</code>
                                </label>
                            </div>
                        </div>
                        <div className="field">
                            <div className="control">
                                <label className="checkbox">
                                    {checkbox("clearCustomMaps")} Очистить <code>CustomMaps/*.kmz</code>
                                </label>
                            </div>
                        </div>
                        <div className="field">
                            <div className="control">
                                <label className="checkbox">
                                    {checkbox("clearBirdsEye")} Очистить <code>BirdsEye/*.jnx</code>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className="message is-info">
                <div className="message-header" onClick={() => setHideUploadDetails(!hideUploadDetails)}>
                    <p>Залить новое</p>
                </div>
                <div className={`message-body ${hideUploadDetails ? 'is-hidden' : ''}`}>
                    <div className="content">

                        <div className="field">
                            <div className="control">
                                <label className="checkbox">
                                    {checkbox("uploadGpx")} Залить <code>GPX/*.*</code>
                                </label>
                            </div>
                        </div>
                        <div className="field">
                            <div className="control">
                                <label className="checkbox">
                                    {checkbox("uploadCustomMaps")} Залить <code>CustomMaps/*.*</code>
                                </label>
                            </div>
                        </div>
                        <div className="field">
                            <div className="control">
                                <label className="checkbox">
                                    {checkbox("uploadBirdsEye")} Залить <code>BirdsEye/*.*</code>
                                </label>
                            </div>
                        </div>
                        <div className="field">
                            <div className="control">
                                <label className="checkbox">
                                    {checkbox("uploadBirdsEye")} Залить <code>Profiles/ПОИСКОВЫЙ.gpf</code>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="field is-grouped">
                <div className="control">
                    <button className="button is-link" onClick={execCmd}>Настроить навигатор</button>
                </div>
                <div className="control">
                    <button className="button is-link is-light">Отмена</button>
                </div>
            </div>
        </div>
    );
}


export default observer(DeviceUpload);