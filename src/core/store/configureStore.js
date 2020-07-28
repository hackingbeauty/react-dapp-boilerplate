import { applyMiddleware, createStore } from 'redux'
import thunk                            from 'redux-thunk'
import { createLogger }                 from 'redux-logger'
import rootReducer                      from '../reducers'

export default function configureStore(initialState) {
  const logger = createLogger({
    collapsed: true,
    predicate: () =>
      process.env.NODE_ENV === 'development'
  })

  const middleware = applyMiddleware(thunk, logger)
  const store = middleware(createStore)(rootReducer, initialState)

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default // eslint-disable-line global-require
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
