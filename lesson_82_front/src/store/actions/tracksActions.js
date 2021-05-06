import { GET_TRACKS_REQUEST, GET_TRACKS_SUCCESS, GET_TRACKS_FAILURE } from "../actionTypes";
import axios from 'axios'

const getTracksRequest = () => {
    return { type: GET_TRACKS_REQUEST };
};
const getTracksSuccess = (tracks) => {
    return { type: GET_TRACKS_SUCCESS, tracks };
};

const getTracksFailure = error => {
    return { type: GET_TRACKS_FAILURE, error };
};


export const tracksRequest = (album) => {
    return async dispatch => {
        try {
            dispatch(getTracksRequest())
            const response = await axios.get("/tracks?album=" + album);
            const tracks = Object.entries(response.data).map(album => {
                return {
                    key: album[1]._id,
                    title: album[1].title,
                    duration: album[1].duration,
                    number: album[1].number,
                    id: album[1]._id,
                    video: album[1].video
                }
            });
            dispatch(getTracksSuccess(tracks));
        } catch (e) {
            dispatch(getTracksFailure(e));
        }
    };
};