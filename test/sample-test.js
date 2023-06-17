const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MyNFT", function () {
  it("Should mint and transfer an NFT to someone", async function () {
    const SpartanPolGuys = await ethers.getContractFactory("SpartanPolGuys");
    const spartanPolGuys = await SpartanPolGuys.deploy();
    await spartanPolGuys.deployed();

    const recipient = '0x2546bcd3c84621e976d8185a91a922ae77ecec30';
    const metadataURI = 'cid/test.png';

    let balance = await spartanPolGuys.balanceOf(recipient);
    expect(balance).to.equal(0);

    const newlyMintedToken = await spartanPolGuys.payToMint(recipient, metadataURI, { value: ethers.utils.parseEther('0.05') });

    // wait until the transaction is mined
    await newlyMintedToken.wait();

    balance = await spartanPolGuys.balanceOf(recipient)
    expect(balance).to.equal(1);

    expect(await spartanPolGuys.isContentOwned(metadataURI)).to.equal(true);
    const newlyMintedToken2 = await spartanPolGuys.payToMint(recipient, 'foo', { value: ethers.utils.parseEther('0.05') });
  });
});
