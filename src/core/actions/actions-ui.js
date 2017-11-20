import constants from 'core/types';

/**
 * openLeftNav - Open the left side nav
 */
export function openLeftNav() {
  return {
    type: constants.OPEN_LEFT_NAV
  };
}

/**
 * closeLeftNav - Close the left side nav
 */
export function closeLeftNav() {
  return {
    type: constants.CLOSE_LEFT_NAV
  };
}

/**
 * openRightNav - Open the right side nav
 */
export function openRightNav() {
  return {
    type: constants.OPEN_RIGHT_NAV
  };
}

/**
 * closeLeftNav - Close the right side nav
 */
export function closeRightNav() {
  return {
    type: constants.CLOSE_RIGHT_NAV
  };
}

/**
 * clear - Just clear the UI
 */
export function clear() {
  return {
    type: constants.CLEAR_UI
  };
}

/**
 * showModal - Open the modal
 */
export function showModal(obj) {
  return {
    type        : constants.SHOW_MODAL,
    title       : obj.title,
    modalActions: obj.actions
  };
}

/**
 * closeConfirm - Close the confirmation modal
 */
export function closeModal() {
  return {
    type: constants.CLOSE_MODAL
  };
}