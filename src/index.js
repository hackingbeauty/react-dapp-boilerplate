import React               from 'react'
import ReactDOM            from 'react-dom'
import { Provider }        from 'react-redux'
import configureStore      from 'core/store/configureStore'
import App                 from 'containers/App'
import drizzleOptions      from 'configs/config-drizzle'
import { DrizzleProvider } from 'drizzle-react'

const store = configureStore()

ReactDOM.render(
  <DrizzleProvider options={drizzleOptions}>
    <Provider store={store}>
      <App />
    </Provider>
  </DrizzleProvider>,
  document.getElementById('root')
)
