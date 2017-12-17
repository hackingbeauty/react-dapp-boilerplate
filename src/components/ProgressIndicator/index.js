import React, { Component }  from 'react';
import { CircularProgress }  from 'material-ui';

/* component styles */
import { styles } from './styles.scss';

export default class ProgressIndicator extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className={styles}>
        <CircularProgress className="progress-indicator" {...this.props} />
      </div>
    );
  }
}