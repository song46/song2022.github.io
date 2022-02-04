const NFTMinter = artifacts.require('NFTMinter.sol');
const { toWei } = web3.utils;

module.exports = async function (deployer, network, accounts) {
  await deployer.deploy(
    NFTMinter, 
    "https://gateway.pinata.cloud/ipfs/",
    "QmPo1CzfCPrcvpPpqTT9SQgsrgDzdYrvHHN54yKa3qJuia",
    5,
    toWei('0.1', 'ether'),
    { from: accounts[0] }
  );
}