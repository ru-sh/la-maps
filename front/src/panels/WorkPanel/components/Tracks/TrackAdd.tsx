import { useState } from "react";
import { WorkDirStore } from "../../../../stores/WorkDirStore";
import { observer } from "mobx-react";

const AddTrack = (props: { store: WorkDirStore }) => {
  const [title, setTitle] = useState("");
  const { addTrack: addTrack, info } = props.store;

  return (
    <>
      <div className="alert alert-primary">
        <div className="d-inline col-4">
          Всего треков: &nbsp;
          <span className="badge badge-info">{info.total}</span>
        </div>
        <div className="d-inline col-4">
          Видимых треков: &nbsp;
          <span className="badge badge-info">{info.visible}</span>
        </div>
        <div className="d-inline col-4">
          Скрытых треков: &nbsp;
          <span className="badge badge-info">{info.notVisible}</span>
        </div>
      </div>
      <div className="form-group">
        <input
          className="form-control"
          type="text"
          value={title}
          placeholder="Имя трека..."
          onChange={e => setTitle(e.target.value)}
        />
      </div>
      <div className="form-group">
        <button
          className="btn btn-primary"
          onClick={_ => {
            addTrack({
              name: title,
              visible: true,
              color: 'red',
              segments: []
            });
            
            setTitle("");
          }}
        >
          Добавить трек
        </button>
      </div>
    </>
  );
};

export default observer(AddTrack);
