import {
    GET_TRACKS_REQUEST, GET_TRACKS_SUCCESS, GET_TRACKS_FAILURE, ADD_TRACK_SUCCESS, ADD_TRACK_FAILURE,
    DELETE_TRACK_REQUEST, DELETE_TRACK_SUCCESS, DELETE_TRACK_FAILURE,
    PUBLISH_TRACK_REQUEST, PUBLISH_TRACK_SUCCESS, PUBLISH_TRACK_FAILURE
} from "../actionTypes";

const initialState = {
    loading: false,
    error: null,
    tracks: [],
};

const tracksReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TRACK_SUCCESS:
            return { ...state, error: null };
        case ADD_TRACK_FAILURE:
            return { ...state, error: action.error };
        case DELETE_TRACK_REQUEST:
            return { ...state, loading: true };
        case DELETE_TRACK_SUCCESS:{
            let newTracks = [...state.tracks].filter(track => track.id !== action.id);
            return { ...state, loading: false, error: null, tracks: newTracks };
        }
        case DELETE_TRACK_FAILURE:
            return { ...state, loading: false, error: action.error };
        case GET_TRACKS_REQUEST:
            return { ...state, loading: true };
        case GET_TRACKS_SUCCESS:
            return { ...state, loading: false, error: null, tracks: action.tracks };
        case GET_TRACKS_FAILURE:
            return { ...state, loading: false, error: action.error };
        case PUBLISH_TRACK_REQUEST:
            return { ...state, loading: true };
        case PUBLISH_TRACK_SUCCESS: {
            let newTracks = [...state.tracks];
            newTracks.find(track => track.id === action.track.id).published = true
            return { ...state, loading: false, error: null, tracks: newTracks };
        }
        case PUBLISH_TRACK_FAILURE:
            return { ...state, loading: false, error: action.error };
        default:
            return state;
    }
};

export default tracksReducer;