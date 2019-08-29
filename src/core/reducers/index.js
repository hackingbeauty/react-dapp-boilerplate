import { combineReducers } from 'redux'
import { providerReducer } from 'core/reducers/reducer-provider'
import uiReducer           from 'core/reducers/reducer-ui'
import { drizzleReducers } from 'drizzle'

const rootReducer = combineReducers({
  provider: providerReducer,
  ui: uiReducer,
  ...drizzleReducers
})

export default rootReducer
