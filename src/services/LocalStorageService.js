export const saveUserInfoIntoBrowser = (user) => {
  try {
    localStorage.setItem('username', user.username)
    localStorage.setItem('userInfo', JSON.stringify(user))
  } catch (error) {
    return error
  }
}

export const saveSelectedArticleIntoBrowser = (article) => {
  try {
    localStorage.setItem('selectedArticle', JSON.stringify(article))
  } catch (error) {
    return error
  }
}

export const saveLoginStatus = (status) => {
  localStorage.setItem('loggedIn', status)
}

export const clearSavedInfo = () => {
  localStorage.clear()
}

export const getInfoFromBrowser = (stringValue) => {
  return localStorage.getItem(stringValue)
}
