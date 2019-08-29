import { applyMiddleware, createStore }  from 'redux'
import thunk                             from 'redux-thunk'
import { createLogger }                  from 'redux-logger'
import createSagaMiddleware              from 'redux-saga'
import { generateContractsInitialState } from 'drizzle'
import drizzleOptions                    from 'configs/config-drizzle'
import rootDrizzleSagas                  from 'core/sagas/saga-drizzle'
import rootReducer                       from '../reducers'

export default function configureStore(initialState) {
  const logger = createLogger({
    collapsed: true,
    predicate: () =>
      process.env.NODE_ENV === 'development'
  })

  const drizzleInitialState = { contracts: generateContractsInitialState(drizzleOptions) }
  const enhancedInitialState = Object.assign({}, initialState, drizzleInitialState)
  const sagaMiddleware = createSagaMiddleware()
  const middleware = applyMiddleware(thunk, sagaMiddleware, logger)
  const store = middleware(createStore)(rootReducer, enhancedInitialState)

  sagaMiddleware.run(rootDrizzleSagas)

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default // eslint-disable-line global-require
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
