import WalletBalance from './WalletBalance';
import { useEffect, useState } from 'react';

import { ethers } from 'ethers';
//import SpartanPolGuys from '../artifacts/contracts/MyNFT.sol/SpartanPolGuys.json';
import RandNFT from '../artifacts/contracts/RandNFT.sol/RandNFT.json';
//import dotenv from 'dotenv';


//dotenv.config();

//const { PINATA_CONTENT, SMART_CONTRACT } = process.env;

//mettere adress locale qui
const randomNFTAddress = "0x5CE82DefE6C9a7d25Db339BC025E261e92545bb3"; //rand

//const provider = new ethers.providers.Web3Provider(window.ethereum);
const providerRand = new ethers.providers.Web3Provider(window.ethereum);

// get the end user
//const signer = provider.getSigner();
const signerRandom = providerRand.getSigner();

// get the smart contract
//const contract = new ethers.Contract(contractAddress, SpartanPolGuys.abi, signer);

//smart contract for random nft
const contractRandom = new ethers.Contract(randomNFTAddress, RandNFT.abi, signerRandom);

function Home() {

  //const [totalMinted, setTotalMinted] = useState(0);
  //useEffect(() => {
  //  getCount();
  //}, []);

  const [totalMintedRand, setTotalMintedRand] = useState(0);
  useEffect(() => {
    getCount();
  }, []);

  //const getCount = async () => {
  //  const count = await contract.count();
  //  console.log(parseInt(count));
  //  setTotalMinted(parseInt(count));
  //};

  const getCountRandom = async () => {
    const count = await contractRandom.count();
    console.log(parseInt(count));
    setTotalMintedRand(parseInt(count));
  };

  return (
    <div>
      <WalletBalance />

      <h1>Mint Random NFT</h1>
      <div className="container">
        <div className="row">
          {Array(totalMintedRand + 1)
            .fill(0)
            .map((_, n) => (
              <div key={n} className="col-sm">
                <NFTImageRandom tokenIdRand={n} getCountRandom={getCountRandom} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

/** 
function NFTImage({ tokenId, getCount }) {
  const contentId = 'QmcRPEjrBqxJTPoSLwPgHjF3XK5N51SNugY38pkJe5GLeh';
  const [isMinted, setIsMinted] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    getMintedStatus();
  }, [isMinted]);

  const getMintedStatus = async () => {
    const result = await contract.isContentOwned(`${contentId}/${tokenId}.json`);
    setIsMinted(result);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setSelectedImage(URL.createObjectURL(file));
  };

  const loadAndMintToken = async () => {
    if (!selectedImage) {
      alert('Carica un\'immagine valida');
      return;
    }

    const connection = contract.connect(signer);
    const addr = connection.address;
    const metadataURI = `${contentId}/${tokenId}.json`;

    const result = await contract.payToMint(addr, metadataURI, {
      value: ethers.utils.parseEther('0.01')
    });

    await result.wait();
    getMintedStatus();
    getCount();
  };

  console.log("is minted su caricamento IMG => " + isMinted);

  return (
    <div className="card" style={{ width: '18rem' }}>
      <img className="card-img-top" src={selectedImage || (isMinted ? `https://gray-inner-lion-689.mypinata.cloud/ipfs/${contentId}/${tokenId}.png` : 'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg')} alt="NFT" />
      <div className="card-body">
        <h5 className="card-title">ID #{tokenId}</h5>
        <form>
          {!isMinted ? (
            <input type="file" name="imageUpload" onChange={handleImageUpload} />
          ) : (
            <p>NFT mintato</p>
          )}
          {!isMinted ? (
            <button className="btn btn-primary" type="button" onClick={loadAndMintToken}>Carica immagine</button>
          ) : (
            null
          )}
        </form>
      </div>
    </div>
  );
} */


<<<<<<< HEAD
function NFTImageRandom({ tokenIdRand, getCountRandom }) {
=======
function NFTImageRandom({ tokenId, getCount }) {
>>>>>>> parent of 2269b3f... fix conteggio
  //mettere smart contract in locale
  const contentIdRand = "QmUVLpjzqUbasp9ptTJr9GAqZ7uaGxve7mungDH9nE1pF9";
  const metadataURI = `${contentIdRand}/${tokenIdRand}.json`;
  const imageURI = `https://gray-inner-lion-689.mypinata.cloud/ipfs/${contentIdRand}/${tokenIdRand}.png`;
  //const imageURI = `img/${tokenIdRand}.png`;

  const [isMinted, setIsMinted] = useState(false);
  useEffect(() => {
    getMintedStatus();
  }, [isMinted]);

  const getMintedStatus = async () => {
    const result = await contractRandom.isContentOwned(metadataURI);
    console.log(result)
    setIsMinted(result);
  };

  const mintToken = async () => {
    const connection = contractRandom.connect(signerRandom);
    const addr = connection.address;
    const result = await contractRandom.payToMint(addr, metadataURI, {
      value: ethers.utils.parseEther('0.01')
    });

    await result.wait();
<<<<<<< HEAD
    //await contractRandom.addToMetamaskWallet(result);
    getMintedStatusRandom();
    getCountRandom();
=======
    getMintedStatus();
    getCount();
>>>>>>> parent of 2269b3f... fix conteggio
  };

  async function getURI() {
    const uri = await contractRandom.tokenURI(tokenIdRand);
    alert(uri);
  }

  console.log("is minted => " + isMinted);

  return (
    <div className="card" style={{ width: '18rem' }}>
      <img className="card-img-top" src={isMinted ? imageURI : 'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg'}></img>
      <div className="card-body">
<<<<<<< HEAD
        <h5 className="card-title">ID #{tokenIdRand}</h5>
        {!isMintedRand ? (
=======
        <h5 className="card-title">ID #{tokenId}</h5>
        {!isMinted ? (
>>>>>>> parent of 2269b3f... fix conteggio
          <button className="btn btn-primary" onClick={mintToken}>
            Mint Random
          </button>
        ) : (
          <button className="btn btn-secondary" onClick={getURI}>
            Taken! Show URI
          </button>
        )}
      </div>
    </div>
  );
}

export default Home;

/**
      <h1>Load image and mint NFT</h1>
      <div className="container">
        <div className="row">
          {Array(totalMinted + 1)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="col-sm">
                <NFTImage tokenId={i} getCount={getCount} />
              </div>
            ))}
        </div>
      </div>

      <hr />
      <br /> */
