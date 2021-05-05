import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ArtistsList from '../containers/ArtistsList/artistsList';
import ArtistInfo from "../containers/ArtistInfo/artistInfo";
import TracksList from "../containers/TracksList/tracksList";
import Layout from '../components/UI/Layout/layout';
import './App.css';

function App(props) {

  return (
    <div className="App">
      <Layout>
        <Switch>
          <Route path="/" exact component={props => <ArtistsList {...props} />} />
          <Route path="/artists" exact component={props => <ArtistsList {...props} />} />
          <Route path="/artists/:id" exact component={props => <ArtistInfo {...props} />} />
          <Route path="/albums/:id" exact component={props => <TracksList {...props} />} />
          <Route render={() => {
            return <h1>Page not found</h1>;
          }} />
        </Switch>

      </Layout >
    </div >
  );
}

export default App;



