import React, { Component } from 'react'
import PropTypes            from 'prop-types'

/* component styles */
import { labelStyles } from './styles.scss'

class Label extends Component {
  render() {
    const { text } = this.props

    return (
      <div className={labelStyles}>
        <label>{text}</label>
      </div>
    )
  }
}

Label.propTypes = {
  text: PropTypes.string.isRequired
}

export default Label
