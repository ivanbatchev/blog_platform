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
  handleArticleCreation,
  requestArticleAction,
  handleArticleEdition,
  handleArticleDelete,
  handleArticleLike,
  handleArticleDislike,
} from '../actions'

const blogService = new BlogService()

const onPageChange = (pageNumber) => {
  return (dispatch) => {
    dispatch(handlePageChange(pageNumber))
    dispatch(onPageLoad(pageNumber))
  }
}
const onPageLoad = (pageNumber, token) => {
  return (dispatch) => {
    dispatch(requestData())
    blogService
      .getArticles(pageNumber, token ? token : null)
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
      localStorage.setItem('selectedArticle', JSON.stringify(result.data.article))
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

// article creation
function onArticleCreation(article, history) {
  const token = store.getState().authReducer.userInfoWhenLoggedIn?.token
  article.tagList.pop()
  return (dispatch) => {
    dispatch(requestArticleAction())
    blogService
      .createNewArticle(token, article)
      .then((resp) => {
        dispatch(handleArticleCreation(resp.data))
        history.push('/articles')
      })
      .catch((error) => {
        dispatch(handleErrorEdition(error))
      })
  }
}

//article edition
function onArticleEdition(article, history, slug) {
  const token = store.getState().authReducer.userInfoWhenLoggedIn?.token
  article.tagList.pop()
  return (dispatch) => {
    dispatch(requestArticleAction())
    blogService.editArticle(token, article, slug).then((resp) => {
      dispatch(handleArticleEdition(resp.data.article))
      history.push('/articles')
    })
  }
}

//articleDelete
function onArticleDelete(slug, history) {
  const token = store.getState().authReducer.userInfoWhenLoggedIn?.token
  return (dispatch) => {
    dispatch(requestArticleAction())
    blogService.deleteArticle(token, slug).then((resp) => {
      handleArticleDelete(resp.data)
      history.push('/articles')
    })
  }
}

function onArticleLike(slug) {
  const token = store.getState().authReducer.userInfoWhenLoggedIn?.token
  return (dispatch) => {
    blogService.likePost(token, slug).then((resp) => {
      dispatch(handleArticleLike())
    })
  }
}

function onArticleDislike(slug) {
  const token = store.getState().authReducer.userInfoWhenLoggedIn?.token
  return (dispatch) => {
    blogService.dislikeArticle(token, slug).then((resp) => {
      dispatch(handleArticleDislike())
    })
  }
}
export {
  onPageChange,
  onPageLoad,
  onLoginFormSubmition,
  onArticleSelection,
  onNewUserRegistration,
  onProfileEdition,
  onArticleCreation,
  onArticleEdition,
  onArticleDelete,
  onArticleLike,
  onArticleDislike,
}
