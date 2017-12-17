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
    alert('route to register view')
  }

  render() {
    const { fileAdded } = this.state

    return (
      <div className={styles}>   
        <div id="home-view">   
          <UploadBox onDrop={this.onDrop} />
            <div className={!fileAdded ? 'opaque' : ''}>
              <div id="register-actions">
                <Button 
                  onTouchTap={this.registerAsset}
                  label="Register Asset On Blockchain"
                  raised={true}
                  className="tertiary" />
                <a id="reset" href="#">Reset</a>
              </div>
            </div>
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
  connect(
    null,
    mapDispatchToProps)
  (HomeView)
)