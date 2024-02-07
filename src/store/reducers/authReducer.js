import { LOGIN, LOGOUT, SIGNUP } from "../actions/types";

const initialState = {
  isUserLoggedIn: false,
  isUserLogout: false,
  user: null,
};

function AuthReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN: {
      return {
        ...state,
        isUserLoggedIn: true,
        user: action.payload.userData,
      };
    }
    case SIGNUP: {
      return {
        ...state,
        isUserLoggedIn: true,
        user: action.payload.userData,
      };
    }
    case LOGOUT: {
      return {
        ...state,
        isUserLoggedIn: false,
        isUserLogout: true,
        user: null,
      };
    }
    default:
      return state;
  }
}

export default AuthReducer;
