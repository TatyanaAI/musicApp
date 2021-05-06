import { SET_TRACK_IN_HISTORY_REQUEST, SET_TRACK_IN_HISTORY_SUCCESS, SET_TRACK_IN_HISTORY_FAILURE, GET_TRACKS_HISTORY_REQUEST, GET_TRACKS_HISTORY_SUCCESS, GET_TRACKS_HISTORY_FAILURE } from "../actionTypes";

const initialState = {
    loading: false,
    error: null,
    history: []
};

const trackHistoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TRACK_IN_HISTORY_REQUEST:
            return { ...state, loading: true };
        case SET_TRACK_IN_HISTORY_SUCCESS:
            return { ...state, loading: false, error: null };
        case SET_TRACK_IN_HISTORY_FAILURE:
            return { ...state, loading: false, error: action.error };
        case GET_TRACKS_HISTORY_REQUEST:
            return { ...state, loading: true };
        case GET_TRACKS_HISTORY_SUCCESS:
            return { ...state, loading: false, error: null, history: action.history };
        case GET_TRACKS_HISTORY_FAILURE:
            return { ...state, loading: false, error: action.error };
        default:
            return state;
    }
};

export default trackHistoryReducer;