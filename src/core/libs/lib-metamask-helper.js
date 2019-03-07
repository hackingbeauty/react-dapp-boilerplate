export function requestAccountAccess(callback) {
  const { ethereum } = window

  ethereum.enable().then((account) => {
    callback(account[0])
  })
}
