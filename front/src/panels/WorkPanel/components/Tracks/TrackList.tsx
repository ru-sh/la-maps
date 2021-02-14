import { LatLngBounds } from "leaflet";
import { observer } from "mobx-react";
import { UiStore, WorkDirStore } from "../../../../stores";
import { HammerOutline } from 'react-ionicons'

const TrackList = (props: { workDirStore: WorkDirStore, uiStore: UiStore }) => {
  const { tracks, toggleTrack, toggleAll, removeTrack, info } = props.workDirStore;
  const { map } = props.uiStore;
  return (
    <>
      <div className="row">
        <table className="table is-hoverable is-fullwidth">
          <thead className="thead-light">
            <tr>
              <th>  <label className="checkbox">
                <input type="checkbox"
                  checked={!tracks.find(t => !t.visible)}
                  onChange={(e) => {
                    toggleAll(e.target.checked)
                  }} /></label></th>
              <th>Название</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {tracks.map(track => (
              <tr key={track.id}>
                <td>
                  <label className="checkbox">
                    <input type="checkbox" checked={track.visible}
                      onChange={_ => toggleTrack(track.id!)} /></label>
                </td>
                <td>
                  <a onClick={() => props.uiStore.fitTrack(track)}>{track.name}</a> ({track.segments.flatMap(s => s.points).length})
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-danger"

                  >
                    <HammerOutline />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <input onChange={(e) => { props.workDirStore.fetchTracks(parseInt(e.target.value)) }} />
      </div>
    </>
  );
};

export default observer(TrackList);
