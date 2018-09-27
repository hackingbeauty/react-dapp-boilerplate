import React, { Component } from 'react'
import PropTypes            from 'prop-types'
import { withRouter }       from 'react-router-dom'
import BottomNavigation     from 'components/BottomNavigation'
import { styles }           from './styles.scss'

class Footer extends Component {
  onClick = () => {
    const { history } = this.props
    history.push('/record')
  }

  render() {
    return (
      <div className={styles}>
        <BottomNavigation>
          <div className="container" />
        </BottomNavigation>
      </div>
    )
  }
}

Footer.propTypes = {
  history: PropTypes.shape({}).isRequired
}

export default withRouter(Footer)
