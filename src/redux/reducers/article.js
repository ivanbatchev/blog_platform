import { ARTICLE_DELETED, ARTICLE_EDITED, NEW_ARTICLE_CREATED, REQUESTED_ARTICLE_ACTION } from '../actions/actionTypes'

const initialState = {
  responseBody: null,
  newArticleCreationStatus: null,
  articleEditionStatus: null,
  articleDeleteStatus: null,
}

const articleReducer = (state = initialState, action) => {
  switch (action.type) {
    case NEW_ARTICLE_CREATED: {
      return {
        ...state,
        newArticleCreationStatus: 'success',
        responseBody: action.payload,
      }
    }
    case ARTICLE_DELETED: {
      return {
        ...state,
        responseBody: action.payload,
        articleDeleteStatus: 'success',
      }
    }
    case ARTICLE_EDITED: {
      return {
        ...state,
        responseBody: action.payload,
        articleEditionStatus: 'success',
      }
    }
    case REQUESTED_ARTICLE_ACTION: {
      return {
        ...state,
        newArticleCreationStatus: 'loading',
        articleEditionStatus: 'loading',
        articleDeleteStatus: 'loading',
      }
    }
    default: {
      return state
    }
  }
}

export default articleReducer
