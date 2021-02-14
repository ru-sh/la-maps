import React from 'react';
import Map from './components/Map';
import InitPanel from './panels/InitPanel';
import { WorkDirStore, UiStore } from './stores'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import "./App.sass"
import WorkPanel from './panels/WorkPanel';
import { observer } from 'mobx-react-lite';

let uiStore = new UiStore();
const workDirStore = new WorkDirStore();

function App() {

  const [dimensions, setDimensions] = React.useState({
    height: window.innerHeight,
    width: window.innerWidth
  })

  React.useEffect(() => {
    function handleResize() {
      console.log('resized to: ', window.innerWidth, 'x', window.innerHeight)
      setDimensions({ width: window.innerWidth, height: window.innerHeight })
    }

    window.addEventListener('resize', handleResize)
  })

  return (
    <div>
      <div className="columns">
        <Map height={dimensions.height} workDirStore={workDirStore} uiStore={uiStore} />

        {uiStore.map ?
          <div className="column is-three-quarters-mobile is-two-thirds-tablet is-half-desktop is-one-third-widescreen is-one-quarter-fullhd">
            <Router>
              <Switch>

                <Route path="/" exact={true} render={(route) => (
                  <InitPanel route={route} uiStore={uiStore} />)} />

                <Route path="/workDir/:workDir" render={(route) =>
                  <WorkPanel route={route} uiStore={uiStore} workDirStore={workDirStore} />} />

              </Switch>
            </Router>
          </div>
          : <div>Загрузка</div>}
      </div>
    </div>
  );
}

export default observer(App);
