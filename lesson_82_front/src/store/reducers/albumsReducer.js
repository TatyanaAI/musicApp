import {
  SET_ALBUM, INIT_ALBUM, GET_ALBUMS_REQUEST, GET_ALBUMS_SUCCESS, GET_ALBUMS_FAILURE,
  GET_ALBUM_REQUEST, GET_ALBUM_SUCCESS, GET_ALBUM_FAILURE, ADD_ALBUM_SUCCESS, ADD_ALBUM_FAILURE,
  DELETE_ALBUM_REQUEST, DELETE_ALBUM_SUCCESS, DELETE_ALBUM_FAILURE,
  PUBLISH_ALBUM_REQUEST, PUBLISH_ALBUM_SUCCESS, PUBLISH_ALBUM_FAILURE
} from "../actionTypes";

const initialState = {
  loading: false,
  error: null,
  albums: [],
  album: {}
};

const albumsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ALBUM_SUCCESS:
      return { ...state, error: null };
    case ADD_ALBUM_FAILURE:
      return { ...state, error: action.error };
    case DELETE_ALBUM_REQUEST:
      return { ...state, loading: true };
    case DELETE_ALBUM_SUCCESS: {
      let newAlbums = [...state.albums].filter(album => album.id !== action.id);
      return { ...state, loading: false, error: null, album: {}, albums: newAlbums };
    }
    case DELETE_ALBUM_FAILURE:
      return { ...state, loading: false, error: action.error };
    case GET_ALBUMS_REQUEST:
      return { ...state, loading: true };
    case GET_ALBUM_REQUEST:
      return { ...state, loading: true };
    case GET_ALBUMS_SUCCESS:
      return { ...state, loading: false, error: null, albums: action.albums };
    case GET_ALBUM_SUCCESS:
      return { ...state, loading: false, error: null, album: action.album };
    case GET_ALBUMS_FAILURE:
      return { ...state, loading: false, error: action.error };
    case GET_ALBUM_FAILURE:
      return { ...state, loading: false, error: action.error };
    case SET_ALBUM:
      return { ...state, album: action.album };
    case INIT_ALBUM:
      return { ...initialState };
    case PUBLISH_ALBUM_REQUEST:
      return { ...state, loading: true };
    case PUBLISH_ALBUM_SUCCESS: {
      let newAlbums = [...state.albums];
      newAlbums.find(album => album.id === action.album.id).published = true
      return { ...state, loading: false, error: null, albums: newAlbums };
    }
    case PUBLISH_ALBUM_FAILURE:
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};

export default albumsReducer;