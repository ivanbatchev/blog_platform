import {
  USER_REGISTRATED,
  LOGINFORM_SUBMITED,
  USER_LOGGED_OUT,
  REQUESTED_USERDATA,
  NEW_DATA_INPUT,
  LOGIN_ERROR,
} from '../actions/actionTypes'

const initialState = {
  isUserLoggedIn: localStorage.getItem('loggedIn'),
  userStatus: null,
  requestStatus: null,
  userInfoWhenLoggedIn: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null,
  loginError: null,
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGINFORM_SUBMITED: {
      return {
        ...state,
        userInfoWhenLoggedIn: action.payload,
        isUserLoggedIn: action.meta,
        loginError: state.isUserLoggedIn ? null : state.loginError,
        requestStatus: 'loaded',
      }
    }
    case USER_LOGGED_OUT: {
      return {
        ...state,
        isUserLoggedIn: action.payload,
        userInfoWhenLoggedIn: null,
      }
    }
    case USER_REGISTRATED: {
      return {
        ...state,
        userStatus: action.payload,
      }
    }
    case REQUESTED_USERDATA: {
      return {
        ...state,
        requestStatus: action.payload,
      }
    }
    case NEW_DATA_INPUT: {
      return {
        ...state,
        userStatus: action.payload,
      }
    }
    case LOGIN_ERROR: {
      return {
        ...state,
        loginError: action.payload,
      }
    }
    default: {
      return state
    }
  }
}

export default authReducer
