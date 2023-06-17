import WalletBalance from './WalletBalance';
import { useEffect, useState } from 'react';

import { ethers } from 'ethers';
import SpartanPolGuys from '../artifacts/contracts/MyNFT.sol/SpartanPolGuys.json';

//mettere adress locale qui
const contractAddress = '0x8563BcfaEE53E1d04D89410f979bCD2BB546c2b8';

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

    </div>
  );
}

function NFTImage({ tokenId, getCount }) {
  const contentId = 'QmUVLpjzqUbasp9ptTJr9GAqZ7uaGxve7mungDH9nE1pF9';
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

  console.log("is minted su caricamento IMG => " + isMinted);

  return (
    <div className="card" style={{ width: '18rem' }}>
      <img className="card-img-top" src={selectedImage || (isMinted ? `https://gray-inner-lion-689.mypinata.cloud/ipfs/${contentId}/${tokenId}.png` : 'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg')} alt="NFT" />
      <div className="card-body">
        <h5 className="card-title">ID #{tokenId}</h5>
        <form>
          {!isMinted ? (
            <input style={{ margin: '2px' }} type="file" name="imageUpload" onChange={handleImageUpload} />
          ) : (
            <p>NFT mintato</p>
          )}
          {!isMinted ? (
            <button style={{ margin: '2px' }} className="btn btn-primary" type="button" onClick={loadAndMintToken}>Mint NFT</button>
          ) : (
            null
          )}
          {!isMinted ? (
            <button style={{ margin: '2px' }} className="btn btn-primary" onClick={mintToken}>
              Mint Random NFT
            </button>
          ) : (
            <button style={{ margin: '2px' }} className="btn btn-secondary" onClick={getURI}>
              Taken! Show URI
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default Home;
