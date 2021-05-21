import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useSelector } from "react-redux";
import ArtistsList from '../containers/ArtistsList/artistsList';
import ArtistInfo from "../containers/ArtistInfo/artistInfo";
import TracksList from "../containers/TracksList/tracksList";
import Registration from "../containers/Registration/registration";
import Login from "../containers/Login/login";
import Layout from '../components/UI/Layout/layout';
import TrackHistoryList from '../containers/TrackHistoryList/trackHistoryList';
import AddArtistForm from '../containers/AdditonForms/AddArtistForm/addArtistForm';
import AddAlbumForm from '../containers/AdditonForms/AddAlbumForm/addAlbumForm';
import AddTrackForm from '../containers/AdditonForms/AddTrackForm/addTrackForm';
import Admin from '../containers/Admin/admin';
import './App.css';


const ProtectedRoute = ({ isAllowed, redirectTo, ...props }) => {
  return isAllowed ?
    <Route {...props} /> :
    <Redirect to={redirectTo} />
};

function App(props) {

  const user = useSelector(state => state.users.user);

  return (
    <div className="App">
      <Layout>
        <Switch>
          <Route path="/" exact component={props => <ArtistsList {...props} />} />
          <Route path="/artists" exact component={props => <ArtistsList {...props} />} />
          <Route path="/artists/:id" exact component={props => <ArtistInfo {...props} />} />
          <Route path="/albums/:id" exact component={props => <TracksList {...props} />} />
          <ProtectedRoute
           isAllowed={user && user.role === "admin"}
           redirectTo={"/login"}
           path="/admin" 
           exact component={Admin} />
          <ProtectedRoute
           isAllowed={user !== null}
           redirectTo={"/login"}
           path="/add_artist" 
           exact component={AddArtistForm} />
          <ProtectedRoute
           isAllowed={user !== null}
           redirectTo={"/login"}
           path="/add_album" 
           exact component={AddAlbumForm} />
          <ProtectedRoute
           isAllowed={user !== null}
           redirectTo={"/login"}
           path="/add_track" 
           exact component={AddTrackForm} />
          <ProtectedRoute
            isAllowed={!user}
            redirectTo={"/"}
            path="/register"
            exact component={Registration} />
          <ProtectedRoute
            isAllowed={!user}
            redirectTo={"/"}
            path="/login"
            exact component={Login} />
          <ProtectedRoute
            isAllowed={user !== null}
            redirectTo={"/login"}
            path="/track_history"
            exact component={TrackHistoryList} />
          <Route render={() => {
            return <h1>Page not found</h1>;
          }} />
        </Switch>

      </Layout >
    </div >
  );
}

export default App;



