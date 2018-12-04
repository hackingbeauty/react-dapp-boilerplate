import React, { Component } from 'react'
import PropTypes            from 'prop-types'

/* component styles */
import { formStyles } from './styles.scss'

class Form extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className={formStyles}>
        <form>
          {this.props.children}
        </form>
      </div>
    )
  }
}

Form.propTypes = {
  children: PropTypes.node.isRequired
}

export default Form
