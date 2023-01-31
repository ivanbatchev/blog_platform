import axios from 'axios'

export default class BlogService {
  axiosInstance = null

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: 'https://blog.kata.academy/api',
    })
    this.axiosInstance.defaults.headers.post['Content-Type'] = 'application/json'
  }

  registerNewUser(username, email, password) {
    return this.axiosInstance.post('/users', {
      user: {
        username: username,
        email: email,
        password: password,
      },
    })
  }

  tryToLogIn(email, password) {
    return this.axiosInstance.post('/users/login', {
      user: {
        email: email,
        password: password,
      },
    })
  }

  getCurrentLoggedInUser(token) {
    return this.axiosInstance('/user', {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
  }

  getArticles(offset = 1) {
    return this.axiosInstance(`/articles?offset=${offset - 1}`)
  }

  getFullArticle(slug) {
    return this.axiosInstance(`/articles/${slug}`)
  }

  // EDITION Requests
  updateUserInfo(token, email, password, username, imageUrl) {
    this.axiosInstance.defaults.headers.put['Authorization'] = `Token ${token}`
    return this.axiosInstance.put('/user', {
      user: {
        email: `${email}`,
        password: `${password}`,
        username: `${username}`,
        image: `${imageUrl}`,
      },
    })
  }
}
