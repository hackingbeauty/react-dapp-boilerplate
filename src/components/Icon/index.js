import React, { Component, PropTypes }  from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faUpload } from '@fortawesome/fontawesome-free-solid'

/* component styles */
import { styles } from './styles.scss';

export default class Icon extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
  	const { icon, className } = this.props

  	return (
  		<div className={`${styles} ${className}`}>
        <FontAwesomeIcon icon={faUpload} />
  		</div>
  	)
  }
}
