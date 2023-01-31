import { combineReducers } from 'redux'

import authReducer from './auth'
import dataReducer from './data'
import editReducer from './edit'

const rootReducer = combineReducers({ authReducer, dataReducer, editReducer })

export default rootReducer
