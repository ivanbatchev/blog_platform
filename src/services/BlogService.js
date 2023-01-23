import axios from 'axios'

export default class BlogService {
  axiosInstance = null

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: 'https://blog.kata.academy/api',
    })
    this.axiosInstance.defaults.headers.post['Content-Type'] = 'application/json'
  }

  registerUser(username, email, password) {
    return this.axiosInstance.post('/users', {
      user: {
        username: username,
        email: email,
        password: password,
      },
    })
  }

  logInUser(email, password) {
    return this.axiosInstance.post('/users/login', {
      user: {
        email: email,
        password: password,
      },
    })
  }

  getArticles(offset = 1) {
    return this.axiosInstance(`/articles?offset=${offset - 1}`)
  }

  getFullArticle(slug) {
    return this.axiosInstance(`/articles/${slug}`)
  }

  // DUMMY FUNCTIONS
  // getArticles(offset) {
  //   return new Promise((res) => {
  //     setTimeout(() => {
  //       res(data)
  //     }, 500)
  //   })
  // }
  // getFullArticle(slug) {
  //   return new Promise((res) => {
  //     setTimeout(() => {
  //       res(article)
  //     }, 700)
  //   })
  // }
  // //login in immitation
  tryToLogIn() {
    return new Promise((res) => {
      setTimeout(() => {
        res(true)
      }, 1000)
    })
  }
}
