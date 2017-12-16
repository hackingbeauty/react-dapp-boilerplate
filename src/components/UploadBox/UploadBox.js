import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Button from 'components/Button'
import Icon from 'components/Icon'
import DropTarget from './DropTarget'

import { styles } from './styles.scss'

export default class UploadBox extends Component {
	render() {
		return (
			<DropTarget {...this.props} />
		)
	}
}