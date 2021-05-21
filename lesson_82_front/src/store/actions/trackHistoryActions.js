import { SET_TRACK_IN_HISTORY_REQUEST, SET_TRACK_IN_HISTORY_SUCCESS, SET_TRACK_IN_HISTORY_FAILURE, GET_TRACKS_HISTORY_REQUEST, GET_TRACKS_HISTORY_SUCCESS, GET_TRACKS_HISTORY_FAILURE } from "../actionTypes";
import axios from 'axios';

const setTrackInHistoryRequest = () => {
    return { type: SET_TRACK_IN_HISTORY_REQUEST };
};

const setTrackInHistorySuccess = () => {
    return { type: SET_TRACK_IN_HISTORY_SUCCESS };
};

const setTrackInHistoryFailure = error => {
    return { type: SET_TRACK_IN_HISTORY_FAILURE, error };
};

const getTracksHistoryRequest = () => {
    return { type: GET_TRACKS_HISTORY_REQUEST };
};

const getTracksHistorySuccess = history => {
    return { type: GET_TRACKS_HISTORY_SUCCESS, history };
};

const getTracksHistoryFailure = error => {
    return { type: GET_TRACKS_HISTORY_FAILURE, error };
};

export const setTrack = (track) => {
    return async dispatch => {
        try {
            dispatch(setTrackInHistoryRequest());
            await axios.post('/track_history', track);
            dispatch(setTrackInHistorySuccess());
        }
        catch (error) {
            if (error.response && error.response.data) {
                dispatch(setTrackInHistoryFailure(error.response.data.error));
            } else {
                dispatch(setTrackInHistoryFailure(error.message));
            }
        }
    };
};

export const getTracks = () => {
    return async dispatch => {
        try {
            dispatch(getTracksHistoryRequest());
            const response = await axios.get('/track_history');
            dispatch(getTracksHistorySuccess(response.data));
        }
        catch (error) {
            if (error.response && error.response.data) {
                dispatch(getTracksHistoryFailure(error.response.data.error));
            } else {
                dispatch(getTracksHistoryFailure(error.message));
            }
        }
    };
};