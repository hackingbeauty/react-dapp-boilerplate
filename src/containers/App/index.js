import React, { Component }   from 'react'
import { MuiThemeProvider }   from '@material-ui/core/styles'
import {
  HashRouter,
  Route,
  Redirect,
  Switch
} from 'react-router-dom'
import theme                    from 'configs/theme/config-theme'
import HomeView                 from 'containers/HomeView'
import Header                   from './components/Header'
import Footer                   from './components/Footer'

import './styles.scss' // global styles

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <HashRouter>
          <div>
            <Header />
            <Footer />
            <div className="app-shell">
              <Switch>
                <Route path="/home" component={HomeView} />
                <Redirect from="/" to="/home" />
              </Switch>
            </div>
          </div>
        </HashRouter>
      </MuiThemeProvider>
    )
  }
}

export default App
