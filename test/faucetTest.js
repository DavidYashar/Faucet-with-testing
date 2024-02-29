
const {loadFixture} = require("@nomicfoundation/hardhat-network-helpers");
const {expect} = require('chai');
// const { ethers } = require('ethers');


describe("Faucet", function() {
  //we define a fixture to reuse the same setup 
  //in every test;
  // we use loadFixture to run this set up once, 
  //snapshot that state;
  //and reset the hardhat network to that snapshot in 
  //every test

  async function deployContractAndSetVariables(){
    const Faucet = await ethers.getContractFactory('Faucet');
    
    const faucet = await Faucet.deploy();

    let withdrawAmount = 1000000000000000000n;
    const [owner] = await ethers.getSigners();

    console.log("signer 1 address: ", owner.address);
    return {faucet, owner, withdrawAmount}
  }

  it("should deploy and set the owner correctly", async function() {
    const {faucet, owner} = await loadFixture(deployContractAndSetVariables);

    expect(await faucet.owner()).to.equal(owner.address);
  });

  it("should not allow withdrawal above 0.1 ether at a time", async function(){
    //new testto make sure user do not drain the faucet
    const {faucet, withdrawAmount} = await loadFixture(deployContractAndSetVariables);
    await expect(faucet.withdraw(withdrawAmount)).to.be.reverted;

  });

  
})
