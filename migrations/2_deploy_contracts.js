const EventStoreLib = artifacts.require(
    'transmute-framework/contracts/EventStoreLib.sol'
  );
  const EventStore = artifacts.require(
    'transmute-framework/contracts/EventStore.sol'
  );
  const EventStoreFactory = artifacts.require(
    'transmute-framework/contracts/EventStoreFactory.sol'
  );
  
  const AppStore = artifacts.require('./AppStore.sol');
  
  module.exports = deployer => {
    deployer.deploy(EventStoreLib);
    deployer.link(EventStoreLib, EventStore);
    deployer.deploy(EventStore);
  
    deployer.link(EventStoreLib, EventStoreFactory);
    deployer.link(EventStore, EventStoreFactory);
    deployer.deploy(EventStoreFactory);
  
    deployer.link(EventStoreLib, AppStore);
    deployer.link(EventStore, AppStore);
    deployer.deploy(AppStore);
  };