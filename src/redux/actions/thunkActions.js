import BlogService from '../../services/BlogService'
import { dataLoaded, onError, requestData, handlePageChange, tryingToLogin, articleSelected } from '../actions'

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

const onLoginFormSubmition = () => {
  return (dispatch) => {
    blogService
      .tryToLogIn()
      .then((res) => {
        dispatch(tryingToLogin(res))
      })
      .catch((err) => {
        dispatch(onError(err))
      })
  }
}

const onArticleSelection = (slug) => {
  return (dispatch) => {
    dispatch(requestData())
    blogService.getFullArticle(slug).then((result) => {
      dispatch(articleSelected(result.data.article))
    })
  }
}

export { onPageChange, onPageLoad, onLoginFormSubmition, onArticleSelection }
