import React, { Component }   from 'react';
import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import AppBar                 from 'components/AppBar';
import Navigation             from 'components/Navigation';
import { withRouter }         from 'react-router-dom';
import { appConfig }          from 'core/configs/config-app';

/* actions */
import * as uiActionCreators    from 'core/actions/actions-ui';

/* component styles */
import { styles } from './styles.scss';

class Header extends Component {
  constructor(props) {
    super(props);
  }

  handleToggle=() => {
    this.props.actions.ui.openLeftNav();
  }

  render() {
    return (
      <div className={styles}>
        <header>
          <AppBar
            title={appConfig.name}
            onLeftIconButtonTouchTap={this.handleToggle} />
          <Navigation />
        </header>
      </div>
    );

  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      ui: bindActionCreators(uiActionCreators, dispatch)
    }
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
