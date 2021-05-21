import {
  GET_TRACKS_REQUEST, GET_TRACKS_SUCCESS, GET_TRACKS_FAILURE, ADD_TRACK_SUCCESS, ADD_TRACK_FAILURE,
  DELETE_TRACK_REQUEST, DELETE_TRACK_SUCCESS, DELETE_TRACK_FAILURE,
  PUBLISH_TRACK_REQUEST, PUBLISH_TRACK_SUCCESS, PUBLISH_TRACK_FAILURE
} from "../actionTypes";
import axios from 'axios';
import { push } from 'connected-react-router';


const getTracksRequest = () => {
  return { type: GET_TRACKS_REQUEST };
};
const getTracksSuccess = (tracks) => {
  return { type: GET_TRACKS_SUCCESS, tracks };
};

const getTracksFailure = error => {
  return { type: GET_TRACKS_FAILURE, error };
};

const addTrackSuccess = () => {
  return { type: ADD_TRACK_SUCCESS };
};
const addTrackFailure = error => {
  return { type: ADD_TRACK_FAILURE, error };
};

const deleteTrackRequest = () => {
  return { type: DELETE_TRACK_REQUEST };
};

const deleteTrackSuccess = id => {
  return { type: DELETE_TRACK_SUCCESS, id };
};

const deleteTrackFailure = error => {
  return { type: DELETE_TRACK_FAILURE, error };
};

const publishTrackRequest = () => {
  return { type: PUBLISH_TRACK_REQUEST };
};

const publishTrackSuccess = track => {
  return { type: PUBLISH_TRACK_SUCCESS, track };
};

const publishTrackFailure = error => {
  return { type: PUBLISH_TRACK_FAILURE, error };
};

export const tracksRequest = (album) => {
  return async dispatch => {
    try {
      dispatch(getTracksRequest())
      const response = await axios.get("/tracks" + (album ? "?album=" + album : ""));
      const tracks = Object.entries(response.data).map(track => {
        return {
          key: track[1]._id,
          title: track[1].title,
          duration: track[1].duration,
          number: track[1].number,
          id: track[1]._id,
          video: track[1].video,
          published: track[1].published,
          album: track[1].album
        }
      });
      dispatch(getTracksSuccess(tracks));
    } catch (error) {
      if (error.response && error.response.data) {
        dispatch(getTracksFailure(error.response.data.error));
      } else {
        dispatch(getTracksFailure(error.message));
      }
    }
  };
};

export const addTrack = (track) => {
  return async dispatch => {
    try {
      await axios.post("/tracks", track);
      dispatch(addTrackSuccess());
      dispatch(push('/'));
    } catch (error) {
      if (error.response && error.response.data) {
        dispatch(addTrackFailure(error.response.data.error));
      } else {
        dispatch(addTrackFailure(error.message));
      }
    }
  };
};

export const publishTrack = (id) => {
  return async dispatch => {
    try {
      dispatch(publishTrackRequest())
      const response = await axios.post("/tracks/" + id + "/publish")
      const track = {
        title: response.data.title,
        duration: response.data.duration,
        number: response.data.number,
        video: "http://localhost:8000/uploads/" + response.data.video,
        id: response.data._id,
        published: response.data.published
      };
      dispatch(publishTrackSuccess(track));
    } catch (error) {
      if (error.response && error.response.data) {
        dispatch(publishTrackFailure(error.response.data.error));
      } else {
        dispatch(publishTrackFailure(error.message));
      }
    }
  };
};

export const deleteTrack = (id) => {
  return async dispatch => {
    try {
      dispatch(deleteTrackRequest())
      await axios.delete("/tracks/" + id)
      dispatch(deleteTrackSuccess(id));
    } catch (error) {
      if (error.response && error.response.data) {
        dispatch(deleteTrackFailure(error.response.data.error));
      } else {
        dispatch(deleteTrackFailure(error.message));
      }
    }
  };
};
