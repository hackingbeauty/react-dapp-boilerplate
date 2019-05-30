# Connect Ethereum Smart Contracts To A Superior UI Foundation

[www.reactdappboilerplate.com](http://www.reactdappboilerplate.com)

React Dapp Boilerplate is an expert React boilerplate for building full-stack DApps.  It's built with the latest versions of React, Redux, and Webpack and has a superior organization and directory structure.  It comes with a solid CSS architecture that helps you correctly skin your DApp.

Material-UI is baked into the boilerplate to help you quickly start prototyping your DApp.  If you need expert guidance in developing a full-stack Dapp, check out [Full Stack DApps now](http://fullstackdapps.com).

If you have any questions, [join the Full Stack DApps Slack channel](https://publicslack.com/slacks/full-stack-dapps/invites/new).

Also, watch the [intro video on Youtube](https://www.youtube.com/watch?v=0guqPdxM2GE&t=56s) to learn more.

## Installation

1. Create a directory and change into it.
    ```javascript
    mkdir your-react-dapp-name
    cd your-react-dapp-name
    ```

2. Install the Truffle box inside of the directory your just created.
    ```javascript
    truffle unbox hackingbeauty/react-dapp-boilerplate
    ```

3. Start the dapp, then point your browser to localhost:3000.  If you want to use yarn instead of npm, just nuke the node_modules directory and run the command ```yarn install```.
    ```javascript
    npm run start || yarn start
    ```

4. Start your local blockchain (I use Ganache-CLI).
    ```javascript
    ganache-cli
    ```

5. Place your Smart Contract into the /contracts directory, then compile and migrate it.
    ```javascript
    truffle compile
    truffle migrate
    ```

6. Jest is included for testing React components and Truffle's own suite is incldued for Smart Contracts. Be sure you've compiled your contracts before running jest, or you'll receive some file not found errors.
    ```javascript
    // Runs Jest for component tests.
    npm run test || yarn test

    // Runs Truffle's test suite for smart contract tests.
    truffle test
    ```

7. To build the Dapp for production, use the build command. A production build of the entire Dapp will be placed in the /build folder.
    ```javascript
    npm run build || yarn build
    ```
