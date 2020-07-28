import constants from 'core/types'

const initialState = {
  web3Provider: null
}

export function providerReducer(state = initialState, action) {
  switch (action.type) {
    case constants.SET_PROVIDER:
      return Object.assign({}, state, {
        web3Provider: action.web3Provider
      })

    default:
      return state
  }
}
