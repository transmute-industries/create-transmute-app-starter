# Create Transmute App

Ingredients:

- [create-react-app](https://github.com/facebook/create-react-app)
- [truffle](https://github.com/trufflesuite/truffle)
- [transmute-framework](https://github.com/transmute-industries/transmute)
- [MetaMask](https://metamask.io/)
- [Get test ETH for MetaMask](https://faucet.metamask.io/)
- [Live Demo](https://transmute-industries.github.io/create-transmute-app-starter/)

🔥 Be patient while waiting for transactions on a public testnet... 🔥

### Getting Started

Start the microservices used by this app:

```
docker-compose up
```

```
npm i
npm run truffle:test
npm run truffle:migrate:local
npm run start
```

Open the demo locally: http://localhost:3000/

### About The Transmute Framework

This app shows some of the basic transmute framework functionality.

EventStoreFactory Contracts are used to create EventStore Contracts.

EventStore Contracts are used to store events, which are key value pairs, where the key and the value are IPFS hashes.

eventStore.write automatically saved the key and value objects to ipfs, and then saves the hashes to the smart contract.

```
let event = {
    key: {
        type: 'EVENT_WRITTEN'
    },
    value: {
        timestamp: moment().unix()
    }
};
let result = await eventStore.write(
    accounts[0],
    event.key,
    event.value
);
```

StreamModel Class is used to process an EventStore Contract's stream, and should be familar to redux developers.

```
const filter = event => {
    // process all events
    return event;
};

const reducer = (state, event) => {
    switch (event.key.type) {
    // record all events index'ed by timestamp
    case 'EVENT_WRITTEN': {
        return {
        ...state,
        events: {
            ...state.events,
            [event.value.timestamp]: event
        }
        };
    }

    default: {
        return state;
    }
    }
};

const streamModel = new T.StreamModel(
    eventStore,
    filter,
    reducer,
    null
);
await streamModel.sync();
console.log(
    'streamModel after sync: ',
    JSON.stringify(streamModel.state, null, 2)
);
```

The demo uses a factory to create an event store, saves an event to the event store, and used a stream model to build up state from the event stream.

If your smart contracts inherit from the EventStore Contract, or support a similar interface, you can use the Transmute framework to store off chain state changes on chain, with content addressing and integrity checking provided by IPFS.

### TestNet Deployment Instructions

Update the .env to include your infura token, and test wallet mneumonic.

```
cp example.env .env
# Edit .env to your secrets, .env is ignored by git.
```

Make sure your wallet has enough funds to deploy the contracts, use metamask and faucet to fund your wallet. You should also delete/backup contract ABIs before doing a deployment.

To do a rinkeby testnet deployment:

```
npm run truffle:migrate:rinkeby
```

[Example Deployments](https://rinkeby.etherscan.io/address/0xe7245d0652291fc42bff53f6055e0e17ffb50b83)

### Github Pages Deployment Instructions

Make sure to do a testnet deployment (nobody will be able to access your local ganache network or contracts deployed to it).

Edit the package.json:

```
"homepage": "https://your_github_username.github.io/create-transmute-app-starter",
```

Deploy to github pages:

```
npm run deploy
```
