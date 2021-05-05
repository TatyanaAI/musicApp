import { GET_TRACKS_REQUEST, GET_TRACKS_SUCCESS, GET_TRACKS_FAILURE } from "../actionTypes";

const initialState = {
    loading: false,
    error: null,
    tracks: [],
};

const tracksReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_TRACKS_REQUEST:
            return { ...state, loading: true };
        case GET_TRACKS_SUCCESS:
            return { ...state, loading: false, error: null, tracks: action.tracks };
        case GET_TRACKS_FAILURE:
            return { ...state, loading: false, error: action.error };
        default:
            return state;
    }
};

export default tracksReducer;