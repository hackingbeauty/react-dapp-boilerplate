import constants from 'core/types'
import Web3      from 'web3'

function dispatchProvider(dispatch) {
  const { ethereum } = window
  const web3Provider = new Web3(ethereum)

  dispatch((() => {
    return {
      type: constants.SET_PROVIDER,
      web3Provider
    }
  })())
}

export function setProvider() {
  return (dispatch) => {
    if (window.ethereum) {
      dispatchProvider(dispatch)
    } else {
      setInterval(() => {
        if (window.ethereum) {
          clearInterval()
          dispatchProvider()
        }
        if (window.document.hidden) { window.location.reload() }
      }, 500)
    }
  }
}
