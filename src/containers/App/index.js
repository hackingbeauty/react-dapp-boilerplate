import React, { Component }   from 'react'
import PropTypes              from 'prop-types'
import { connect }            from 'react-redux'
import { bindActionCreators } from 'redux'
import * as providerActionCreators from 'core/actions/actions-provider'
import { MuiThemeProvider }   from '@material-ui/core/styles'
import {
  HashRouter,
  Route,
  Redirect,
  Switch
} from 'react-router-dom'
import ProgressIndicator        from 'components/ProgressIndicator'
import theme                    from 'configs/theme/config-theme'
import HomeView                 from 'containers/HomeView'
import Header                   from './components/Header'
import Footer                   from './components/Footer'

import './styles.scss' // global styles

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      web3Provider: null
    }
  }

  static getDerivedStateFromProps(nextProps) {
    return {
      web3Provider: nextProps.provider.web3Provider
    }
  }

  componentDidMount() {
    const { actions } = this.props
    actions.provider.setProvider()
  }

  render() {
    const { web3Provider } = this.state
    const isLoading = web3Provider === null

    return (
      <MuiThemeProvider theme={theme}>
        <HashRouter>
          <div>
            <Header />
            <Footer />
            <div className="app-shell">
              { isLoading ? (
                <ProgressIndicator color="secondary" size={50} />
              ) : (
                <Switch>
                  <Route path="/home" component={HomeView} />
                  <Redirect from="/" to="/home" />
                </Switch>
              )}
            </div>
          </div>
        </HashRouter>
      </MuiThemeProvider>
    )
  }
}

function mapStateToProps(state) {
  return {
    provider: state.provider
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      provider: bindActionCreators(providerActionCreators, dispatch)
    }
  }
}

App.propTypes = {
  actions: PropTypes.shape({}).isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
