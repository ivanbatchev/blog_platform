import axios from 'axios'

import {
  ARTICLES_URL,
  BUNCH_OF_ARTICLES_URL,
  FAVORITE_URL,
  LOGIN_URL,
  USERS_URL,
  USER_URL,
} from './endpointsBlogService'

export default class BlogService {
  axiosInstance = null

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: 'https://blog.kata.academy/api',
    })
    this.axiosInstance.defaults.headers.post['Content-Type'] = 'application/json'
  }

  registerNewUser(username, email, password) {
    return this.axiosInstance.post(USERS_URL, {
      user: {
        username: username,
        email: email,
        password: password,
      },
    })
  }

  tryToLogIn(email, password) {
    return this.axiosInstance.post(LOGIN_URL, {
      user: {
        email: email,
        password: password,
      },
    })
  }

  getCurrentLoggedInUser(token) {
    return this.axiosInstance(USER_URL, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
  }

  getArticles(offset = 1, token) {
    if (token) {
      this.axiosInstance.defaults.headers.get['Authorization'] = `Token ${token}`
    }
    return this.axiosInstance(`${BUNCH_OF_ARTICLES_URL}${offset - 1}`)
  }

  getFullArticle(slug) {
    return this.axiosInstance(`${ARTICLES_URL}${slug}`)
  }

  // EDITION Requests
  updateUserInfo(token, email, password, username, imageUrl) {
    this.axiosInstance.defaults.headers.put['Authorization'] = `Token ${token}`
    return this.axiosInstance.put(USER_URL, {
      user: {
        email: `${email}`,
        password: `${password}`,
        username: `${username}`,
        image: `${imageUrl}`,
      },
    })
  }

  // new article creation
  createNewArticle(token, article) {
    this.axiosInstance.defaults.headers.post['Authorization'] = `Token ${token}`
    return this.axiosInstance.post(ARTICLES_URL, {
      article: {
        title: article.title,
        description: article.description,
        body: article.body,
        tagList: article.tagList,
      },
    })
  }

  // edit article
  editArticle(token, article, slug) {
    this.axiosInstance.defaults.headers.put['Authorization'] = `Token ${token}`
    return this.axiosInstance.put(`${ARTICLES_URL}${slug}`, {
      article: {
        title: article.title,
        description: article.description,
        body: article.body,
        tagList: article.tagList,
      },
    })
  }
  //delete article
  deleteArticle(token, slug) {
    this.axiosInstance.defaults.headers.delete['Authorization'] = `Token ${token}`
    return this.axiosInstance.delete(`${ARTICLES_URL}${slug}`)
  }
  // like article
  likePost(token, slug) {
    this.axiosInstance.defaults.headers.post['Authorization'] = `Token ${token}`
    return this.axiosInstance.post(`${ARTICLES_URL}${slug}${FAVORITE_URL}`)
  }
  // dislike articles
  dislikeArticle(token, slug) {
    this.axiosInstance.defaults.headers.delete['Authorization'] = `Token ${token}`
    return this.axiosInstance.delete(`${ARTICLES_URL}${slug}${FAVORITE_URL}`)
  }
}
