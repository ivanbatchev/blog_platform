import { combineReducers } from 'redux'

import authReducer from './auth'
import dataReducer from './data'
import editReducer from './edit'
import articleReducer from './article'

const rootReducer = combineReducers({ authReducer, dataReducer, editReducer, articleReducer })

export default rootReducer
