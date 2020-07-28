import React, { Component }   from 'react'
import PropTypes              from 'prop-types'
import { connect }            from 'react-redux'
import { bindActionCreators } from 'redux'
import * as uiActionCreators  from 'core/actions/actions-ui'
import { Dialog }             from '@material-ui/core'
import DialogContent          from '@material-ui/core/DialogContent'
import DialogTitle            from '@material-ui/core/DialogTitle'
import withMobileDialog       from '@material-ui/core/withMobileDialog'
import { styles }             from './styles.scss'

class StandardModal extends Component {
  constructor(props) {
    super(props)

    this.state = {
      open: false
    }
  }

  static getDerivedStateFromProps(nextProps) {
    const { modalKey, modalState } = nextProps

    if (modalState && (modalKey === modalState.modalKey)) {
      return { open: modalState.openModal }
    }

    return { open: false }
  }

  handleClose=() => {
    const { actions, modalKey, onClose } = this.props
    actions.ui.closeModal({ modalKey })
    if (onClose) { onClose() }
  }

  render() {
    const {
      children,
      cssModule,
      modalKey,
      modalState,
      title,
      ...other
    } = this.props
    const { open } = this.state
    const mergedStyles = `${styles} ${cssModule}`

    return (
      <div>
        <Dialog
          open={open}
          onClose={this.handleClose}
          {...other}
        >
          <div className={mergedStyles}>
            <DialogTitle classes={{ root: 'dialog-title' }}>
              {title}
            </DialogTitle>
            <DialogContent classes={{ root: 'dialog-content' }}>
              {children}
            </DialogContent>
          </div>
        </Dialog>
      </div>
    )
  }
}

StandardModal.propTypes = {
  actions: PropTypes.shape({}).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  cssModule: PropTypes.string,
  modalKey: PropTypes.string.isRequired,
  modalState: PropTypes.shape({}).isRequired,
  onClose: PropTypes.func,
  title: PropTypes.string
}

StandardModal.defaultProps = {
  cssModule: '',
  onClose: null,
  title: ''
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      ui: bindActionCreators(uiActionCreators, dispatch)
    }
  }
}

export default withMobileDialog()(connect(null, mapDispatchToProps)(StandardModal))
