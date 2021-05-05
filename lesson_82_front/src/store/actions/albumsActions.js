import { SET_ALBUM, INIT_ALBUM, GET_ALBUMS_REQUEST, GET_ALBUMS_SUCCESS, GET_ALBUMS_FAILURE, GET_ALBUM_REQUEST, GET_ALBUM_SUCCESS, GET_ALBUM_FAILURE } from "../actionTypes";
import {setArtist} from "./artistsActions"
import axios from 'axios'

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

export const albumsRequest = (id) => {
    return async dispatch => {
        try {
            dispatch(getAlbumsRequest())
            const response = await axios.get("/albums?artist=" + id);
            const albums = Object.entries(response.data).map(album => {
                return {
                    key: album[1]._id,
                    title: album[1].title,
                    year: album[1].year,
                    cover: "http://localhost:8000/uploads/" + album[1].cover,
                    id: album[1]._id,
                }
            });
            dispatch(getAlbumsSuccess(albums));
        } catch (e) {
            dispatch(getAlbumsFailure(e));
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
            };
            const artist = {
                name: response.data.artist.name,
                info: response.data.artist.info,
                photo: "http://localhost:8000/uploads/" + response.data.artist.photo,
                id: response.data.artist._id,
              };
            dispatch(setArtist(artist));
            dispatch(getAlbumSuccess(album));
        } catch (e) {
            dispatch(getAlbumFailure(e));
        }
    };
};
