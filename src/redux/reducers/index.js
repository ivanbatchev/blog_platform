import { combineReducers } from 'redux'

import authReducer from './auth'
import dataReducer from './data'

const rootReducer = combineReducers({ authReducer, dataReducer })

export default rootReducer
