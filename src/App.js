import React, { Component } from 'react';
import moment from 'moment';
import logo from './logo.svg';
import './App.css';

import T from 'transmute-framework';

const eventStoreFactoryArtifact = require('./contracts/EventStoreFactory.json');
const eventStoreArtifact = require('./contracts/EventStore.json');
const transmuteConfig = require('./transmute-config');

const eventStoreFactory = new T.EventStoreFactory({
  eventStoreFactoryArtifact,
  ...transmuteConfig
});

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
          <br />
          Open Developer Console and click button!
        </p>

        <button
          onClick={async () => {
            console.log('Transmute Framework! 🦄');
            await eventStoreFactory.init();
            const accounts = await eventStoreFactory.getWeb3Accounts();
            console.log('Web3 Accounts: ', JSON.stringify(accounts, null, 2));
            let tx_receipt = await eventStoreFactory.createEventStore(
              accounts[0]
            );
            console.log('tx_receipt: ', tx_receipt);
            const eventStoreAddresses = await eventStoreFactory.getEventStores();
            console.log('EventStore Addresses: ', eventStoreAddresses);
            const eventStore = new T.EventStore({
              eventStoreArtifact,
              ...transmuteConfig
            });

            eventStore.eventStoreContractInstance = await eventStore.eventStoreContract.at(
              eventStoreAddresses[0]
            );

            let eventCount = (await eventStore.eventStoreContractInstance.count.call()).toNumber();
            console.log('Event Count: ', eventCount);

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
            console.log(
              'event write result: ',
              JSON.stringify(result, null, 2)
            );

            eventCount = (await eventStore.eventStoreContractInstance.count.call()).toNumber();
            console.log('Event Count: ', eventCount);

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
          }}
        >
          Click Me After Opening Developer Console
        </button>
      </div>
    );
  }
}

export default App;
