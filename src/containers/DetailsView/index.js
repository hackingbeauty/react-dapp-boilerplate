import React, { Component }        from 'react';
import { connect }                 from 'react-redux';
import { bindActionCreators }      from 'redux';
import { withRouter }              from 'react-router-dom';
import Drawer                      from 'components/Drawer';

/* actions */
import * as uiActionCreators from 'core/actions/actions-ui';

/* component styles */
import { styles } from './styles.scss';

class DetailsView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={styles}>
        <Drawer
          docked={false}
          width={500}
          open={this.props.ui.rightNavOpen}
          containerClassName="right-drawer"
          openSecondary={true}
          onRequestChange={this.closeNav}
          swipeAreaWidth={10}
          content={<div>This is the DetailsView</div>} />
      </div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DetailsView));
