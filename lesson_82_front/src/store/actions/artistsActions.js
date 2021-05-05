import {SET_ARTIST, INIT_ARTIST, GET_ARTISTS_REQUEST, GET_ARTISTS_SUCCESS, GET_ARTISTS_FAILURE, GET_ARTIST_REQUEST, GET_ARTIST_SUCCESS, GET_ARTIST_FAILURE } from "../actionTypes";
import axios from 'axios'

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
        }
      });
      dispatch(getArtistsSuccess(artists));
    } catch (e) {
      dispatch(getArtistsFailure(e));
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
      };
      dispatch(getArtistSuccess(artist));
    } catch (e) {
      dispatch(getArtistFailure(e));
    }
  };
};
