import { SET_ALBUM, INIT_ALBUM, GET_ALBUMS_REQUEST, GET_ALBUMS_SUCCESS, GET_ALBUMS_FAILURE, GET_ALBUM_REQUEST, GET_ALBUM_SUCCESS, GET_ALBUM_FAILURE } from "../actionTypes";

const initialState = {
  loading: false,
  error: null,
  albums: [],
  album: {}
};

const albumsReducer = (state = initialState, action) => {
  switch (action.type) {
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
      return { ...initialState }
    default:
      return state;
  }
};

export default albumsReducer;