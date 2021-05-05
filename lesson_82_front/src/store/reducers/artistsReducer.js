import { SET_ARTIST, INIT_ARTIST, GET_ARTISTS_REQUEST, GET_ARTISTS_SUCCESS, GET_ARTISTS_FAILURE, GET_ARTIST_REQUEST, GET_ARTIST_SUCCESS, GET_ARTIST_FAILURE } from "../actionTypes";

const initialState = {
  loading: false,
  error: null,
  artists: [],
  artist: {}
};

const artistsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ARTISTS_REQUEST:
      return { ...state, loading: true };
    case GET_ARTIST_REQUEST:
      return { ...state, loading: true };
    case GET_ARTISTS_SUCCESS:
      return { ...state, loading: false, error: null, artists: action.artists };
    case GET_ARTIST_SUCCESS:
      return { ...state, loading: false, error: null, artist: action.artist };
    case GET_ARTISTS_FAILURE:
      return { ...state, loading: false, error: action.error };
    case GET_ARTIST_FAILURE:
      return { ...state, loading: false, error: action.error };
    case SET_ARTIST:
      return { ...state, artist: action.artist };
    case INIT_ARTIST:
      return { ...initialState }
    default:
      return state;
  }
};

export default artistsReducer;