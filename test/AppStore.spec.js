const AppStore = artifacts.require('./AppStore.sol');

contract('AppStore', accounts => {
  it('constructor works', async () => {
    const storage = await AppStore.deployed();
    assert(accounts[0] === (await storage.owner()));
  });
});