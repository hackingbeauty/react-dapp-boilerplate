import React, { Component }            from 'react'
import PropTypes                       from 'prop-types'
import { Typography as MuiTypography } from '@material-ui/core'
import { styles }                      from './styles.scss'

class Typography extends Component {
  render() {
    const { children } = this.props

    return (
      <div className={styles}>
        <MuiTypography variant="h6" color="inherit">
          {children}
        </MuiTypography>
      </div>
    )
  }
}

Typography.propTypes = {
  children: PropTypes.node.isRequired
}

export default Typography
