import React, { Component } from 'react';
import GitHubForkRibbon from 'react-github-fork-ribbon';
import moment from 'moment';
import Particles from 'react-particles-js';

import './App.css';

import T from 'transmute-framework';

const eventStoreFactoryArtifact = require('./contracts/EventStoreFactory.json');
const eventStoreArtifact = require('./contracts/EventStore.json');
const transmuteConfig = require('./transmute-config');

const particles = require('./particles.json');

const eventStoreFactory = new T.EventStoreFactory({
  eventStoreFactoryArtifact,
  ...transmuteConfig
});

class App extends Component {
  async demo() {
    console.log('Transmute Framework! 🦄');
    console.log(
      'Be patient while waiting for transactions on a public testnet.'
    );
    await eventStoreFactory.init();
    const accounts = await eventStoreFactory.getWeb3Accounts();
    console.log('Web3 Accounts: ', JSON.stringify(accounts, null, 2));

    let tx_receipt = await eventStoreFactory.createEventStore(accounts[0]);
    console.log('tx_receipt: ', tx_receipt);
    const eventStoreAddresses = await eventStoreFactory.getEventStores();
    console.log('EventStore Addresses: ', eventStoreAddresses);
    const eventStore = new T.EventStore({
      eventStoreArtifact,
      ...transmuteConfig
    });

    eventStore.eventStoreContractInstance = await eventStore.eventStoreContract.at(
      eventStoreAddresses[eventStoreAddresses.length - 1]
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
    let result = await eventStore.write(accounts[0], event.key, event.value);
    console.log('event write result: ', JSON.stringify(result, null, 2));

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

    const streamModel = new T.StreamModel(eventStore, filter, reducer, null);
    await streamModel.sync();
    console.log(
      'streamModel after sync: ',
      JSON.stringify(streamModel.state, null, 2)
    );
  }
  render() {
    return (
      <div className="App">
        <GitHubForkRibbon
          href="//github.com/transmute-industries/create-transmute-app-starter"
          target="_blank"
          position="left"
        >
          Fork me on GitHub
        </GitHubForkRibbon>
        <div className="AppIntro">
          <h1>Open Developer Console and Click Demo! </h1>
          <br />
          <br />
          <button onClick={this.demo}>Demo</button>
          <br />
          <br />
          <p>
            <span role="img" aria-label="fire">
              🔥
            </span>Be patient while waiting for transactions on a public
            testnet...
          </p>
        </div>
        <Particles
          className="particles"
          params={{
            particles: particles.particles,
            interactivity: particles.interactivity
          }}
        />
      </div>
    );
  }
}

export default App;
