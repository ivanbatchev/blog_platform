import BlogService from '../../services/BlogService'
import store from '../store'
import {
  dataLoaded,
  onError,
  requestData,
  handlePageChange,
  articleSelected,
  tryingToRegister,
  requestedUserData,
  tryingToLogin,
  handleLoginError,
  handleRequestEdition,
  handleSuccesfulEdition,
  handleErrorEdition,
} from '../actions'

const blogService = new BlogService()

const onPageChange = (pageNumber) => {
  return (dispatch) => {
    dispatch(handlePageChange(pageNumber))
    dispatch(onPageLoad(pageNumber))
  }
}
const onPageLoad = (pageNumber) => {
  return (dispatch) => {
    dispatch(requestData())
    blogService
      .getArticles(pageNumber)
      .then((result) => {
        dispatch(dataLoaded(result.data.articles, result.data.articlesCount))
      })
      .catch((err) => {
        dispatch(onError(err))
      })
  }
}

const onLoginFormSubmition = (email, password, history) => {
  return (dispatch) => {
    blogService
      .tryToLogIn(email, password)
      .then((resp) => {
        blogService.getCurrentLoggedInUser(resp.data.user.token).then((resp) => {
          dispatch(tryingToLogin(resp.data.user, true))
          localStorage.setItem('username', resp.data.user.username)
          localStorage.setItem('userInfo', JSON.stringify(resp.data.user))
        })
        localStorage.setItem('loggedIn', true)
        history.push('/articles')
      })
      .catch((errors) => {
        dispatch(handleLoginError(errors.response?.data?.errors))
        dispatch(tryingToLogin(null, false))
      })
  }
}

const onNewUserRegistration = (username, email, password, history) => {
  return (dispatch) => {
    dispatch(requestedUserData('loading'))
    blogService
      .registerNewUser(username, email, password)
      .then((resp) => {
        dispatch(tryingToRegister(resp.data))
        dispatch(requestedUserData('loaded'))
        history.push('/sign-in')
      })
      .catch((error) => {
        dispatch(tryingToRegister(error.response.data.errors))
        dispatch(requestedUserData('error'))
      })
  }
}

function onArticleSelection(slug) {
  return (dispatch) => {
    dispatch(requestData())
    blogService.getFullArticle(slug).then((result) => {
      dispatch(articleSelected(result.data.article))
    })
  }
}

const image = store.getState().authReducer.userInfoWhenLoggedIn
  ? store.getState().authReducer.userInfoWhenLoggedIn.image
  : ''
// edit thunk actions
function onProfileEdition(email, password, username, imageUrl = image, history) {
  const token = store.getState().authReducer.userInfoWhenLoggedIn.token
  return (dispatch) => {
    dispatch(handleRequestEdition())
    blogService
      .updateUserInfo(token, email, password, username, imageUrl)
      .then((resp) => {
        dispatch(handleSuccesfulEdition(resp.data))
        localStorage.setItem('username', resp.data.user.username)
        localStorage.setItem('userInfo', JSON.stringify(resp.data.user))
        history.push('/articles')
      })
      .catch((error) => {
        dispatch(handleErrorEdition(error.response.data.errors))
      })
  }
}

export { onPageChange, onPageLoad, onLoginFormSubmition, onArticleSelection, onNewUserRegistration, onProfileEdition }
