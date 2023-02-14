import {
  onNewUserRegistration,
  onPageChange,
  onPageLoad,
  onLoginFormSubmition,
  onArticleSelection,
  onProfileEdition,
  onArticleCreation,
  onArticleEdition,
  onArticleDelete,
} from './thunkActions'
import {
  DATA_LOADED,
  ARTICLE_SELECTED,
  ERROR_CAUGHT,
  LOGINFORM_SUBMITED,
  PAGE_CHANGED,
  REQUESTED_DATA,
  USER_REGISTRATED,
  USER_LOGGED_OUT,
  REQUESTED_USERDATA,
  NEW_DATA_INPUT,
  LOGIN_ERROR,
  EDIT_COMPLETE_SUCCESFULLY,
  EDIT_COMPLETE_WITH_ERROR,
  REQUEST_EDIT,
  NEW_ARTICLE_CREATED,
  REQUESTED_ARTICLE_ACTION,
  ARTICLE_EDITED,
  ARTICLE_DELETED,
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
const tryingToLogin = (userLoginInfo, isUserLoggedIn) => {
  return {
    type: LOGINFORM_SUBMITED,
    payload: userLoginInfo,
    meta: isUserLoggedIn,
  }
}

const userLoggedOut = () => {
  return {
    type: USER_LOGGED_OUT,
    payload: false,
  }
}

const tryingToRegister = (data) => {
  return {
    type: USER_REGISTRATED,
    payload: data,
  }
}

const requestedUserData = (status) => {
  return {
    type: REQUESTED_USERDATA,
    payload: status,
  }
}
const handleNewDataInput = () => {
  return {
    type: NEW_DATA_INPUT,
    payload: null,
  }
}

const handleLoginError = (error) => {
  return {
    type: LOGIN_ERROR,
    payload: error,
  }
}

// EDIT PROFILE
const handleSuccesfulEdition = (dataOnEditComplete) => {
  return {
    type: EDIT_COMPLETE_SUCCESFULLY,
    payload: dataOnEditComplete,
  }
}

const handleErrorEdition = (error) => {
  return {
    type: EDIT_COMPLETE_WITH_ERROR,
    payload: error,
  }
}

const handleRequestEdition = () => {
  return {
    type: REQUEST_EDIT,
  }
}

//Article creation
const requestArticleAction = () => {
  return {
    type: REQUESTED_ARTICLE_ACTION,
  }
}

const handleArticleCreation = (article) => {
  return {
    type: NEW_ARTICLE_CREATED,
    payload: article,
  }
}

const handleArticleEdition = (article) => {
  return {
    type: ARTICLE_EDITED,
    payload: article,
  }
}

const handleArticleDelete = (resp) => {
  return {
    type: ARTICLE_DELETED,
    payload: resp,
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
  onNewUserRegistration,
  tryingToRegister,
  requestedUserData,
  handleNewDataInput,
  handleLoginError,
  // EDIT ACTIONS
  handleSuccesfulEdition,
  handleErrorEdition,
  handleRequestEdition,
  // Thunk actions
  onProfileEdition,
  //=================
  // Article creation
  handleArticleCreation,
  requestArticleAction,
  // article edition
  handleArticleEdition,
  // article delete
  handleArticleDelete,
  // async actions
  onArticleCreation,
  onArticleEdition,
  onArticleDelete,
}
