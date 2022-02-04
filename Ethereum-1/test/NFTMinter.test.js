const NFTMinter = artifacts.require('NFTMinter');
const { toWei, toBN, fromWei } = web3.utils;
const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

contract('NFTMinter', function ([alice, bob, david, carol, eve, paul, ben]) {
  before(async function () {
    this.NFTMinter = await NFTMinter.new(
      "https://gateway.pinata.cloud/ipfs/",
      "QmPo1CzfCPrcvpPpqTT9SQgsrgDzdYrvHHN54yKa3qJuia",
      5,
      toWei('1', 'ether'),
      { from: alice }
    );
  });

  context("Test NFTMinter", () => {
    it("should success to get baseURI", async function () {
      const baseURI = await this.NFTMinter.baseURI();
      assert.equal(baseURI.toString(), "https://gateway.pinata.cloud/ipfs/");
    })

    it("should success to get cID", async function () {
      const cID = await this.NFTMinter.cID();
      assert.equal(cID.toString(), "QmPo1CzfCPrcvpPpqTT9SQgsrgDzdYrvHHN54yKa3qJuia");
    })

    it("should success to mint", async function () {
      await this.NFTMinter.createNFT(2, {
        from: alice,
        value: toWei('2', 'ether')
      });

      await this.NFTMinter.createNFT(1, {
        from: bob,
        value: toWei('1', 'ether')
      });

      const balance = await this.NFTMinter.getBalance();
      assert.equal(fromWei(balance, 'ether'), '3');
    })

    it("should success to withdraw", async function () {
      await this.NFTMinter.withdrawFund({ from: alice });
      const balance = await this.NFTMinter.getBalance();
      assert.equal(fromWei(balance, 'ether'), '0');
    })

    it("should success to get all NFTs", async function () {
      const tokens = await this.NFTMinter.getAllTokens();
      console.log(tokens);
    })

    it("should success to get my NFTs", async function () {
      const tokens = await this.NFTMinter.getMyTokens({ from: alice });
      console.log(tokens);
    })
  });
})
