import { REQUEST_EDIT, EDIT_COMPLETE_SUCCESFULLY, EDIT_COMPLETE_WITH_ERROR } from '../actions/actionTypes'

const initialState = {
  requestEditStatus: null,
  dataOnEditComplete: null,
  editError: null,
}

const editReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_EDIT: {
      return {
        ...state,
        requestEditStatus: 'loading',
        editError: null,
      }
    }
    case EDIT_COMPLETE_SUCCESFULLY: {
      return {
        requestEditStatus: 'completed',
        editError: null,
        dataOnEditComplete: action.payload,
      }
    }
    case EDIT_COMPLETE_WITH_ERROR: {
      return {
        requestEditStatus: 'error',
        editError: action.payload,
      }
    }
    default: {
      return state
    }
  }
}

export default editReducer
