import React 					 from 'react';
import PropTypes       from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faUpload } 	 from '@fortawesome/fontawesome-free-solid'

/* component styles */
import { styles } from './styles.scss';

const propTypes = {
  className: PropTypes.string,
  icon: PropTypes.string.isRequired
}

/* Create a key map of Font Awesome icons here.
 * Update this key map when you want to add 
 * a new icon to the app.
 */
const fontAwesomeIcons = {
  upload: faUpload
}

const Icon = props => {
  const { icon, className } = props

  return (
		<div className={`${styles} ${className}`}>
      <FontAwesomeIcon icon={fontAwesomeIcons[icon]} />
		</div>
	)
}

Icon.propTypes = propTypes

export default Icon
