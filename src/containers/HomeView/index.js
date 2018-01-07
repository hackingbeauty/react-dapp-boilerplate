import React, { Component }   from 'react'
import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter }         from 'react-router-dom';
import { UploadBox }          from 'components/UploadBox'
import Button                  from 'components/Button'

/* component styles */
import { styles } from './styles.scss';

/* actions */
import * as uiActionCreators from 'core/actions/actions-ui';

class HomeView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileAdded: false
    }
  }

  onDrop=() => {
    this.setState({
      fileAdded: true
    })
  }

  registerAsset=() => {    
    const { history } = this.props
    history.push('/register')
  }

  render() {
    const { fileAdded } = this.state

    return (
      <div className={styles}>   
        <div id="home-view">   
         Home View
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      ui: bindActionCreators(uiActionCreators, dispatch)
    }
  };
}

export default withRouter(
  connect(null, mapDispatchToProps)(HomeView)
)
