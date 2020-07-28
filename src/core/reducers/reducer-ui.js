import constants from 'core/types'

const initialState = {
  modalState: {
    openModal: false,
    modalKey: ''
  },
  confirmModalState: {
    openModal: false,
    modalKey: ''
  },
  rightDrawerIsOpen: false
}

function uiReducer(state = initialState, action) {
  switch (action.type) {
    case constants.OPEN_MODAL:
      return Object.assign({}, state, {
        modalState: {
          openModal: true,
          modalKey: action.modalKey
        }
      })

    case constants.OPEN_CONFIRM_MODAL:
      return Object.assign({}, state, {
        confirmModalState: {
          openModal: true,
          modalKey: action.modalKey
        }
      })

    case constants.CLOSE_MODAL:
      return Object.assign({}, state, {
        modalState: {
          openModal: false
        }
      })

    case constants.CLOSE_CONFIRM_MODAL:
      return Object.assign({}, state, {
        confirmModalState: {
          openModal: false
        }
      })

    case constants.OPEN_RIGHT_DRAWER:
      return Object.assign({}, state, {
        rightDrawerIsOpen: true
      })

    case constants.CLOSE_RIGHT_DRAWER:
      return Object.assign({}, state, {
        rightDrawerIsOpen: false
      })

    default:
      return state
  }
}

export default uiReducer
