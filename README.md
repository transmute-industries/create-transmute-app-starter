# Create Transmute App

Ingredients: 

- create-react-app
- truffle
- transmute-framework

### Update your .env for your Infura

```
cp example.env .env
# Edit .env to your secrets, .env is ignored by git.
```

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

### About The Transmute Framework

This app shows some of the basic transmute framework functionality.

EventStoreFactory Contracts are used to create EventStore Contracts.

EventStore Contracts are used to store events, which are key value pairs, where the key and the value are IPFS hashes.

eventStore.write automatically saved the key and value objects to ipfs, and then saves the hashes to the smart contract.

StreamModel Class is used to process an EventStore Contract's stream, and should be familar to redux developers.

The demo uses a factory to create an event store, saves an event to the event store, and used a stream model to build up state from the event stream.

If your smart contracts inherit from the EventStore Contract, or support a similar interface, you can use the Transmute framework to store off chain state changes on chain, with content addressing and integrity checking provided by IPFS.