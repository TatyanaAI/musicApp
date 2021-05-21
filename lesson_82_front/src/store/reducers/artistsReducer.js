import {
  SET_ARTIST, INIT_ARTIST, GET_ARTISTS_REQUEST, GET_ARTISTS_SUCCESS, GET_ARTISTS_FAILURE,
  GET_ARTIST_REQUEST, GET_ARTIST_SUCCESS, GET_ARTIST_FAILURE, ADD_ARTIST_SUCCESS, ADD_ARTIST_FAILURE,
  DELETE_ARTIST_REQUEST, DELETE_ARTIST_SUCCESS, DELETE_ARTIST_FAILURE,
  PUBLISH_ARTIST_REQUEST, PUBLISH_ARTIST_SUCCESS, PUBLISH_ARTIST_FAILURE
} from "../actionTypes";

const initialState = {
  loading: false,
  error: null,
  artists: [],
  artist: {}
};

const artistsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ARTIST_SUCCESS:
      return { ...state, error: null };
    case ADD_ARTIST_FAILURE:
      return { ...state, error: action.error };
    case DELETE_ARTIST_REQUEST:
      return { ...state, loading: true };
    case DELETE_ARTIST_SUCCESS: {
      let newArtists = [...state.artists].filter(artist => artist.id !== action.id);
      return { ...state, loading: false, error: null, artist: {}, artists: newArtists };
    }
    case DELETE_ARTIST_FAILURE:
      return { ...state, loading: false, error: action.error };
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
    case PUBLISH_ARTIST_REQUEST:
      return { ...state, loading: true };
    case PUBLISH_ARTIST_SUCCESS: {
      let newArtists = [...state.artists];
      newArtists.find(artist => artist.id === action.artist.id).published = true
      return { ...state, loading: false, error: null, artists: newArtists };
    }
    case PUBLISH_ARTIST_FAILURE:
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};

export default artistsReducer;