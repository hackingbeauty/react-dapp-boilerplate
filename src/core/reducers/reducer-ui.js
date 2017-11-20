import constants from 'core/types';

const initialState = {
  leftNavOpen  : false,
  rightNavOpen : false,
  showModal    : false,
  modalActions : [],
  modalTitle   : ''
};

export function uiReducer(state = initialState, action) {
  switch (action.type) {

  case constants.OPEN_LEFT_NAV:
    return Object.assign({}, state, {
      leftNavOpen: true
    });

  case constants.CLOSE_LEFT_NAV:
    return Object.assign({}, state, {
      leftNavOpen: false
    });

  case constants.OPEN_RIGHT_NAV:
    return Object.assign({}, state, {
      rightNavOpen: true
    });

  case constants.CLOSE_RIGHT_NAV:
    return Object.assign({}, state, {
      rightNavOpen: false
    });

  case constants.CLEAR_UI:
    return Object.assign({}, state, {
      leftNavOpen : false,
      rightNavOpen: false,
      showModal   : false,
      modalActions : [],
      modalTitle : ''
    });

  case constants.SHOW_MODAL:
    return Object.assign({}, state, {
      showModal   : true,
      modalActions: action.modalActions,
      modalTitle  : action.title
    });

  case constants.CLOSE_MODAL:
    return Object.assign({}, state, {
      showModal    : false,
      modalActions : [],
      modalTitle   : ''
    });

  default:
    return state;
  }
}