import { LOGINFORM_SUBMITED, USER_LOGGED_OUT } from '../actions/actionTypes'

const initialState = {
  token: null,
  isLoggedIn: false,
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGINFORM_SUBMITED: {
      return {
        ...state,
        isLoggedIn: action.payload,
      }
    }
    case USER_LOGGED_OUT: {
      return {
        ...state,
        isLoggedIn: action.payload,
      }
    }
    default: {
      return state
    }
  }
}

export default authReducer
