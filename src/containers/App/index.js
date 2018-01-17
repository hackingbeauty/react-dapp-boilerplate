import React, { Component }   from 'react';
import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import injectTapEventPlugin   from 'react-tap-event-plugin';
import MuiThemeProvider       from 'material-ui/styles/MuiThemeProvider';
import muiTheme               from './styles/theme/mui-theme'
import { HashRouter,
         Route,
         Redirect,
         Switch }             from 'react-router-dom';

/* 
 * Import global styles into entire app 
 */
import './styles/app.scss';

/* actions */
import * as uiActionCreators  from 'core/actions/actions-ui';

/* application containers & components */
import Header         from 'containers/Header';
import LeftNavBar     from 'containers/LeftNavBar';
import HomeView       from 'containers/HomeView';
import Modal          from 'components/Modal';

injectTapEventPlugin();

export class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { ui, actions } = this.props;

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <HashRouter>
            <div>
              <Header />
              <div className="container">
                <Switch>
                  <Route path="/home" component={HomeView} />
                  <Redirect from="/" to="/home" />
                </Switch>
              </div>
              <LeftNavBar />
            </div>
          </HashRouter>
          <Modal
            open={ui.showModal}
            actions={ui.modalActions}
            uiActions={actions.ui}
            title={ui.modalTitle}/>
        </div>
      </MuiThemeProvider>
    );
  }
}

function mapStateToProps(state) {
  return {
    ui: state.ui
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      ui: bindActionCreators(uiActionCreators, dispatch)
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
