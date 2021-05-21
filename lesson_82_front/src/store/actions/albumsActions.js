import {
    SET_ALBUM, INIT_ALBUM, GET_ALBUMS_REQUEST, GET_ALBUMS_SUCCESS, GET_ALBUMS_FAILURE,
    GET_ALBUM_REQUEST, GET_ALBUM_SUCCESS, GET_ALBUM_FAILURE, ADD_ALBUM_SUCCESS, ADD_ALBUM_FAILURE,
    DELETE_ALBUM_REQUEST, DELETE_ALBUM_SUCCESS, DELETE_ALBUM_FAILURE,
    PUBLISH_ALBUM_REQUEST, PUBLISH_ALBUM_SUCCESS, PUBLISH_ALBUM_FAILURE
} from "../actionTypes";
import { setArtist } from "./artistsActions";
import axios from 'axios';
import { push } from 'connected-react-router';


const getAlbumsRequest = () => {
    return { type: GET_ALBUMS_REQUEST };
};
const getAlbumsSuccess = (albums) => {
    return { type: GET_ALBUMS_SUCCESS, albums };
};

const getAlbumsFailure = error => {
    return { type: GET_ALBUMS_FAILURE, error };
};

const getAlbumRequest = () => {
    return { type: GET_ALBUM_REQUEST };
};
const getAlbumSuccess = (album) => {
    return { type: GET_ALBUM_SUCCESS, album };
};

const getAlbumFailure = error => {
    return { type: GET_ALBUM_FAILURE, error };
};

export const initAlbum = () => {
    return { type: INIT_ALBUM };
};

export const setAlbum = album => {
    return { type: SET_ALBUM, album };
};

const addAlbumSuccess = () => {
    return { type: ADD_ALBUM_SUCCESS };
};
const addAlbumFailure = error => {
    return { type: ADD_ALBUM_FAILURE, error };
};

const deleteAlbumRequest = () => {
    return { type: DELETE_ALBUM_REQUEST };
};

const deleteAlbumSuccess = (id) => {
    return { type: DELETE_ALBUM_SUCCESS, id };
};

const deleteAlbumFailure = error => {
    return { type: DELETE_ALBUM_FAILURE, error };
};

const publishAlbumRequest = () => {
    return { type: PUBLISH_ALBUM_REQUEST };
};

const publishAlbumSuccess = album => {
    return { type: PUBLISH_ALBUM_SUCCESS, album };
};

const publishAlbumFailure = error => {
    return { type: PUBLISH_ALBUM_FAILURE, error };
};


export const albumsRequest = (id) => {
    return async dispatch => {
        try {
            dispatch(getAlbumsRequest())
            const response = await axios.get("/albums" + (id ? "?artist=" + id : ""));
            const albums = Object.entries(response.data).map(album => {
                return {
                    key: album[1]._id,
                    title: album[1].title,
                    year: album[1].year,
                    cover: "http://localhost:8000/uploads/" + album[1].cover,
                    id: album[1]._id,
                    published: album[1].published,
                    artist: album[1].artist
                }
            });
            dispatch(getAlbumsSuccess(albums));
        } catch (error) {
            if (error.response && error.response.data) {
                dispatch(getAlbumsFailure(error.response.data.error));
            } else {
                dispatch(getAlbumsFailure(error.message));
            }
        }
    };
};

export const albumRequest = (id) => {
    return async dispatch => {
        try {
            dispatch(getAlbumRequest())
            const response = await axios.get("/albums/" + id);
            const album = {
                key: response.data._id,
                title: response.data.title,
                year: response.data.year,
                cover: "http://localhost:8000/uploads/" + response.data.cover,
                id: response.data._id,
                published: response.data.published,
                artist: response.data.artist
            };
            const artist = {
                name: response.data.artist.name,
                info: response.data.artist.info,
                photo: "http://localhost:8000/uploads/" + response.data.artist.photo,
                id: response.data.artist._id,
                published: response.data.published
            };
            dispatch(setArtist(artist));
            dispatch(getAlbumSuccess(album));
        } catch (error) {
            if (error.response && error.response.data) {
                dispatch(getAlbumFailure(error.response.data.error));
            } else {
                dispatch(getAlbumFailure(error.message));
            }
        }
    };
};

export const addAlbum = (album) => {
    return async dispatch => {
        try {
            await axios.post("/albums", album);
            dispatch(addAlbumSuccess());
            dispatch(push('/'));
        } catch (error) {
            if (error.response && error.response.data) {
                dispatch(addAlbumFailure(error.response.data.error));
            } else {
                dispatch(addAlbumFailure(error.message));
            }
        }
    };
};

export const publishAlbum = (id) => {
    return async dispatch => {
        try {
            dispatch(publishAlbumRequest())
            const response = await axios.post("/albums/" + id + "/publish")
            const album = {
                title: response.data.title,
                year: response.data.year,
                cover: "http://localhost:8000/uploads/" + response.data.cover,
                id: response.data._id,
                published: response.data.published
            };
            dispatch(publishAlbumSuccess(album));
        } catch (error) {
            if (error.response && error.response.data) {
                dispatch(publishAlbumFailure(error.response.data.error));
            } else {
                dispatch(publishAlbumFailure(error.message));
            }
        }
    };
};

export const deleteAlbum = (id) => {
    return async dispatch => {
        try {
            dispatch(deleteAlbumRequest())
            await axios.delete("/albums/" + id)
            dispatch(deleteAlbumSuccess(id));
        } catch (error) {
            if (error.response && error.response.data) {
                dispatch(deleteAlbumFailure(error.response.data.error));
            } else {
                dispatch(deleteAlbumFailure(error.message));
            }
        }
    };
};