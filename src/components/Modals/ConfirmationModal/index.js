import React, { Component }   from 'react'
import PropTypes              from 'prop-types'
import { connect }            from 'react-redux'
import { bindActionCreators } from 'redux'
import * as uiActionCreators  from 'core/actions/actions-ui'
import { Dialog }             from '@material-ui/core'
import DialogContent          from '@material-ui/core/DialogContent'
import DialogTitle            from '@material-ui/core/DialogTitle'
import DialogActions          from '@material-ui/core/DialogActions'
import Button                 from 'components/Button'
import { styles }             from './styles.scss'

class ConfirmationModal extends Component {
  constructor(props) {
    super(props)

    this.state = {
      open: false
    }
  }

  static getDerivedStateFromProps(nextProps) {
    const { modalKey, confirmModalState } = nextProps

    if (confirmModalState && (modalKey === confirmModalState.modalKey)) {
      return { open: confirmModalState.openModal }
    }

    return { open: false }
  }

  handleCancel = () => {
    const { actions, modalKey } = this.props
    actions.ui.closeConfirmModal({ modalKey })
  }

  handleOk = () => {
    const { actions, modalKey, okCallback } = this.props
    if (okCallback) { okCallback() }
    actions.ui.closeConfirmModal({ modalKey })
  }

  render() {
    const {
      children,
      okCallback,
      modalKey,
      confirmModalState,
      title,
      ...other
    } = this.props
    const { open } = this.state

    return (
      <Dialog
        onClose={this.handleCancel}
        open={open}
        maxWidth={false}
        aria-labelledby="confirmation-dialog-title"
        title={title}
        {...other}
      >
        <div className={styles}>
          <DialogTitle id="confirmation-dialog-title">
            {title}
          </DialogTitle>
          <DialogContent>
            {children}
          </DialogContent>
          <DialogActions>
            <Button
              color="secondary"
              onClick={this.handleCancel}
              variant="text"
            >
              Cancel
            </Button>
            <Button
              color="primary"
              onClick={this.handleOk}
              variant="text"
            >
              OK
            </Button>
          </DialogActions>
        </div>
      </Dialog>
    )
  }
}

function mapStateToProps(state) {
  return {
    ui: state.ui
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      ui: bindActionCreators(uiActionCreators, dispatch)
    }
  }
}

ConfirmationModal.propTypes = {
  actions: PropTypes.shape({}).isRequired,
  children: PropTypes.node,
  okCallback: PropTypes.func,
  modalKey: PropTypes.string.isRequired,
  confirmModalState: PropTypes.shape({}).isRequired,
  title: PropTypes.string
}

ConfirmationModal.defaultProps = {
  children: null,
  okCallback: null,
  title: ''
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmationModal)
