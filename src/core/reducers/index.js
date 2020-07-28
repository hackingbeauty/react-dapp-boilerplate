import { combineReducers } from 'redux'
import { providerReducer } from 'core/reducers/reducer-provider'
import uiReducer           from 'core/reducers/reducer-ui'

const rootReducer = combineReducers({
  provider: providerReducer,
  ui: uiReducer
})

export default rootReducer
