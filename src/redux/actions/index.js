import { onPageChange, onPageLoad, onLoginFormSubmition, onArticleSelection } from './thunkActions'
import {
  DATA_LOADED,
  ARTICLE_SELECTED,
  ERROR_CAUGHT,
  LOGINFORM_SUBMITED,
  PAGE_CHANGED,
  REQUESTED_DATA,
  USER_LOGGED_OUT,
} from './actionTypes'

const dataLoaded = (articles, articlesCount) => {
  return {
    type: DATA_LOADED,
    payload: articles,
    meta: articlesCount,
  }
}

const requestData = () => {
  return {
    type: REQUESTED_DATA,
  }
}

const onError = (error) => {
  return {
    type: ERROR_CAUGHT,
    payload: error,
  }
}

const handlePageChange = (page) => {
  return {
    type: PAGE_CHANGED,
    payload: page,
  }
}

const articleSelected = (article) => {
  return {
    type: ARTICLE_SELECTED,
    payload: article,
  }
}

// AUTH
const tryingToLogin = (loginStatus) => {
  return {
    type: LOGINFORM_SUBMITED,
    payload: loginStatus,
  }
}

const userLoggedOut = () => {
  return {
    type: USER_LOGGED_OUT,
    payload: false,
  }
}

export {
  dataLoaded,
  requestData,
  onError,
  handlePageChange,
  articleSelected,
  onPageChange,
  onPageLoad,
  tryingToLogin,
  onLoginFormSubmition,
  onArticleSelection,
  userLoggedOut,
}
