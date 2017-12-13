import React, { Component } from 'react'
import Button from 'components/Button'
import Icon from 'components/Icon'

/* component styles */
import { styles } from './styles.scss';

export default class HomeView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={styles}>    
        <div id="upload-photo-container">
          <div id="upload-actions">
            <Icon icon="upload "className="upload-icon" />
            <Button label="Choose photo to upload" raised={true} />
            <span>or drag and drop it here</span>
          </div>
        </div>
      </div>
    );
  }
}
