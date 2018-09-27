import { combineReducers } from 'redux'
import uiReducer           from 'core/reducers/reducer-ui'

const rootReducer = combineReducers({
  ui: uiReducer
})

export default rootReducer
