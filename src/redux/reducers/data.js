import { DATA_LOADED, ARTICLE_SELECTED, ERROR_CAUGHT, PAGE_CHANGED, REQUESTED_DATA } from '../actions/actionTypes'

const initialState = {
  data: [],
  loading: true,
  page: 1,
  error: null,
  articlesCount: 0,
  pageCount: 0,
  selectedArticle: null,
}

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case DATA_LOADED: {
      return {
        ...state,
        data: action.payload,
        loading: false,
        articlesCount: action.meta,
        pageCount: Math.floor(action.meta / 20),
      }
    }
    case REQUESTED_DATA: {
      return {
        ...state,
        loading: true,
      }
    }
    case ERROR_CAUGHT: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    }
    case PAGE_CHANGED: {
      return {
        ...state,
        loading: true,
        page: action.payload,
      }
    }
    case ARTICLE_SELECTED:
      return {
        ...state,
        loading: false,
        selectedArticle: action.payload,
      }
    default:
      return state
  }
}

export default dataReducer
