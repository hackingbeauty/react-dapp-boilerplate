import React, { Component } from 'react'
import { UploadBox } from 'components/UploadBox'

/* component styles */
import { styles } from './styles.scss';

export default class HomeView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={styles}>   
        <div id="home-view">   
          <UploadBox />
        </div>
      </div>
    );
  }
}
