import {
  SET_ARTIST, INIT_ARTIST, GET_ARTISTS_REQUEST, GET_ARTISTS_SUCCESS, GET_ARTISTS_FAILURE,
  GET_ARTIST_REQUEST, GET_ARTIST_SUCCESS, GET_ARTIST_FAILURE, ADD_ARTIST_SUCCESS, ADD_ARTIST_FAILURE,
  DELETE_ARTIST_REQUEST, DELETE_ARTIST_SUCCESS, DELETE_ARTIST_FAILURE,
  PUBLISH_ARTIST_REQUEST, PUBLISH_ARTIST_SUCCESS, PUBLISH_ARTIST_FAILURE
} from "../actionTypes";
import axios from 'axios';
import { push } from 'connected-react-router';

const getArtistsRequest = () => {
  return { type: GET_ARTISTS_REQUEST };
};
const getArtistsSuccess = (artists) => {
  return { type: GET_ARTISTS_SUCCESS, artists };
};

const getArtistsFailure = error => {
  return { type: GET_ARTISTS_FAILURE, error };
};


const getArtistRequest = () => {
  return { type: GET_ARTIST_REQUEST };
};

const getArtistSuccess = (artist) => {
  return { type: GET_ARTIST_SUCCESS, artist };
};

const getArtistFailure = error => {
  return { type: GET_ARTIST_FAILURE, error };
};

export const setArtist = artist => {
  return { type: SET_ARTIST, artist };
};

export const initArtist = () => {
  return { type: INIT_ARTIST };
};

const addArtistSuccess = () => {
  return { type: ADD_ARTIST_SUCCESS };
};
const addArtistFailure = error => {
  return { type: ADD_ARTIST_FAILURE, error };
};

const deleteArtistRequest = () => {
  return { type: DELETE_ARTIST_REQUEST };
};

const deleteArtistSuccess = (id) => {
  return { type: DELETE_ARTIST_SUCCESS, id };
};

const deleteArtistFailure = error => {
  return { type: DELETE_ARTIST_FAILURE, error };
};

const publishArtistRequest = () => {
  return { type: PUBLISH_ARTIST_REQUEST };
};

const publishArtistSuccess = artist => {
  return { type: PUBLISH_ARTIST_SUCCESS, artist };
};

const publishArtistFailure = error => {
  return { type: PUBLISH_ARTIST_FAILURE, error };
};


export const artistsRequest = () => {
  return async dispatch => {
    try {
      dispatch(getArtistsRequest())
      const response = await axios.get("/artists");
      const artists = Object.entries(response.data).map(artist => {
        return {
          name: artist[1].name,
          info: artist[1].info,
          photo: "http://localhost:8000/uploads/" + artist[1].photo,
          id: artist[1]._id,
          published: artist[1].published
        }
      });
      dispatch(getArtistsSuccess(artists));
    } catch (error) {
      if (error.response && error.response.data) {
        dispatch(getArtistsFailure(error.response.data.error));
      } else {
        dispatch(getArtistsFailure(error.message));
      }
    }
  };
};


export const artistRequest = (id) => {
  return async dispatch => {
    try {
      dispatch(getArtistRequest())
      const response = await axios.get("/artists/" + id);
      const artist = {
        name: response.data.name,
        info: response.data.info,
        photo: "http://localhost:8000/uploads/" + response.data.photo,
        id: response.data._id,
        published: response.data.published
      };
      dispatch(getArtistSuccess(artist));
    } catch (error) {
      if (error.response && error.response.data) {
        dispatch(getArtistFailure(error.response.data.error));
      } else {
        dispatch(getArtistFailure(error.message));
      }
    }
  };
};

export const addArtist = (artist) => {
  return async dispatch => {
    try {
      await axios.post("/artists", artist);
      dispatch(addArtistSuccess());
      dispatch(push('/'));
    } catch (error) {
      if (error.response && error.response.data) {
        dispatch(addArtistFailure(error.response.data.error));
      } else {
        dispatch(addArtistFailure(error.message));
      }
    }
  };
};

export const publishArtist = (id) => {
  return async dispatch => {
    try {
      dispatch(publishArtistRequest())
      const response = await axios.post("/artists/" + id + "/publish")
      const artist = {
        name: response.data.name,
        info: response.data.info,
        photo: "http://localhost:8000/uploads/" + response.data.photo,
        id: response.data._id,
        published: response.data.published
      };
      dispatch(publishArtistSuccess(artist));
    } catch (error) {
      if (error.response && error.response.data) {
        dispatch(publishArtistFailure(error.response.data.error));
      } else {
        dispatch(publishArtistFailure(error.message));
      }
    }
  };
};

export const deleteArtist = (id) => {
  return async dispatch => {
    try {
      dispatch(deleteArtistRequest())
      await axios.delete("/artists/" + id)
      dispatch(deleteArtistSuccess(id));
    } catch (error) {
      if (error.response && error.response.data) {
        dispatch(deleteArtistFailure(error.response.data.error));
      } else {
        dispatch(deleteArtistFailure(error.message));
      }
    }
  };
};