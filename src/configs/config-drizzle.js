const drizzleOptions = {
  web3: {
    block: false,
    fallback: {
      type: 'ws',
      url: 'ws://127.0.0.1:8545'
    }
  },
  contracts: [
    /* Specifiy your Smart Contract's json file here] */
  ],
  events: {
  },
  polls: {
    accounts: 1500 /* 1.5 seconds polling for account changes in MetaMask */
  }
}

export default drizzleOptions
