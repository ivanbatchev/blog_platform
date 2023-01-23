import { legacy_createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from '@redux-devtools/extension'
import thunk from 'redux-thunk'

import rootReducer from './reducers'

const loggerMiddleWare = (store) => (next) => (action) => {
  const result = next(action)
  return result
}

const store = legacy_createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk, loggerMiddleWare)))

export default store
