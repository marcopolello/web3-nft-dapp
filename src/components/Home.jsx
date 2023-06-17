import WalletBalance from './WalletBalance';
import { useEffect, useState } from 'react';

import { ethers } from 'ethers';
import SpartanPolGuys from '../artifacts/contracts/MyNFT.sol/SpartanPolGuys.json';

//mettere adress locale qui
const contractAddress = '0x10A1534f567e2e249Ebf5aDb3596e604818F1F50';

const provider = new ethers.providers.Web3Provider(window.ethereum);

// get the end user
const signer = provider.getSigner();

// get the smart contract
const contract = new ethers.Contract(contractAddress, SpartanPolGuys.abi, signer);


function Home() {

  const [totalMinted, setTotalMinted] = useState(0);
  useEffect(() => {
    getCount();
  }, []);

  const getCount = async () => {
    const count = await contract.count();
    console.log(parseInt(count));
    setTotalMinted(parseInt(count));
  };

  return (
    <div>
      <WalletBalance />

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
      <br />

      <h1>Mint Random NFT</h1>
      <div className="container">
        <div className="row">
          {Array(totalMinted + 1)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="col-sm">
                <NFTImageRandom tokenId={i} getCount={getCount} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

function NFTImage({ tokenId, getCount }) {
  const contentId = 'QmTBxFm3SU3pmWQgGzb2ApZe9oMD6amZCAkyVa6HyvMDxB';
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
      value: ethers.utils.parseEther('0.05')
    });

    await result.wait();
    getMintedStatus();
    getCount();
  };

  return (
    <div className="card" style={{ width: '18rem' }}>
      <img className="card-img-top" src={selectedImage || (isMinted ? `img/${tokenId}.png` : 'img/placeholder.png')} alt="NFT" />
      <div className="card-body">
        <h5 className="card-title">ID #{tokenId}</h5>
        <form>
          <input type="file" name="imageUpload" onChange={handleImageUpload} />
          <button className="btn btn-primary" type="button" onClick={loadAndMintToken}>Carica immagine</button>
        </form>
      </div>
    </div>
  );
}


function NFTImageRandom({ tokenId, getCount }) {
  //mettere smart contract in locale
  const contentId = 'QmTBxFm3SU3pmWQgGzb2ApZe9oMD6amZCAkyVa6HyvMDxB';
  const metadataURI = `${contentId}/${tokenId}.json`;
  //const imageURI = `https://gateway.pinata.cloud/ipfs/${contentId}/${tokenId}.png`;
  const imageURI = `img/${tokenId}.png`;

  const [isMinted, setIsMinted] = useState(false);
  useEffect(() => {
    getMintedStatus();
  }, [isMinted]);

  const getMintedStatus = async () => {
    const result = await contract.isContentOwned(metadataURI);
    console.log(result)
    setIsMinted(result);
  };

  const mintToken = async () => {
    const connection = contract.connect(signer);
    const addr = connection.address;
    const result = await contract.payToMint(addr, metadataURI, {
      value: ethers.utils.parseEther('0.05')
    });

    await result.wait();
    getMintedStatus();
    getCount();
  };

  async function getURI() {
    const uri = await contract.tokenURI(tokenId);
    alert(uri);
  }
  return (
    <div className="card" style={{ width: '18rem' }}>
      <img className="card-img-top" src={isMinted ? imageURI : 'img/placeholder.png'}></img>
      <div className="card-body">
        <h5 className="card-title">ID #{tokenId}</h5>
        {!isMinted ? (
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
