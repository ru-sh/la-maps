import { reaction, makeAutoObservable, runInAction } from "mobx";
import { v4 as uuidv4 } from "uuid";
import { LaSegment, TrackService } from "../api";

export interface Track {
  id?: string;
  name: string;
  visible: boolean;
  color: string;
  segments: LaSegment[];
}


export class WorkDirStore {
  constructor() {
    makeAutoObservable(this);
    reaction(
      () => this.tracks,
      _ => console.log(this.tracks.length)
    );
  }

  workDir: string = '';
  tracks: Track[] = [];
  loading: boolean = true;

  async fetchTracks(tolerance?: number) {
    let service = TrackService.getTrackService(this.workDir);
    this.loading = true;

    try {
      let dto = await service;
      runInAction(() => {
        this.tracks = dto.map(t => ({
          id: uuidv4(),
          name: t.description ?? 'Track',
          visible: true,
          color: t.color ?? 'red',
          segments: t.segments || []
        })) || [];
      });
    }
    catch {
      window.alert('error getting gpx');
    }

    runInAction(() => {
      this.loading = false;
    });

  }

  setWorkDir(workDir: string) {
    this.workDir = workDir;
  }

  addTrack = (todo: Track) => {
    this.tracks.push({ ...todo, id: uuidv4() });
  };

  toggleTrack = (id: string) => {
    this.tracks = this.tracks.map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          visible: !todo.visible
        };
      }
      return todo;
    });
  };

  toggleAll = (val: boolean) => {
    this.tracks = this.tracks.map(todo => {
      return {
        ...todo,
        visible: val
      };
    });
  };

  removeTrack(id: string) {
    this.tracks = this.tracks.filter(todo => todo.id !== id);
  };

  get info() {
    return {
      total: this.tracks.length,
      visible: this.tracks.filter(todo => todo.visible).length,
      notVisible: this.tracks.filter(todo => !todo.visible).length
    };
  }
}
