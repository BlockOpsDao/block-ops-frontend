import React, { useState } from "react";
import map from "../../build/deployments/map.json"
import { useEthers } from "@usedapp/core";
import { AnalyticEventTracker } from "./AnalyticEventTracker";

const AddTokenToBrowserWallet = () => {

    const gaEventTracker = AnalyticEventTracker("AddTokenToWallet")
    const { account, chainId } = useEthers();
    const [displayImportNFTTip, setDisplayImportNFTTip] = useState(false);

    const tokenAddress = chainId !== undefined ? map[chainId]['OpsNFT'][0] : undefined
    const tokenSymbol = 'BLOCK';
    const tokenDecimals = 0;
    const tokenImage = 'https://block-ops.infura-ipfs.io/ipfs/Qmarg32TuVgcnh8zm4Da7jGeJPk21mKQSFU9Adckdvkbks';
    
    if (chainId !== undefined) {
        console.log("window.ethereum: ", window.ethereum)
    }

    async function addTokenFunction() {
    
        try {
        
            const wasAdded = await window.ethereum.request({
                method: 'wallet_watchAsset',
                params: {
                type: 'ERC721', 
                options: {
                    address: tokenAddress, 
                    symbol: tokenSymbol, 
                    decimals: tokenDecimals, 
                    image: tokenImage, 
                },
                },
            });
        
        if (wasAdded) {
            gaEventTracker("Success", account)
            console.log('Thanks for your interest!');
        } else {
            gaEventTracker("Failed", account)
            console.log('HelloWorld Coin has not been added');
        }
        } catch (error) {
            gaEventTracker("Error", account)
            console.log(error);
        }
    }

    return (<>
        <button 
        onClick={addTokenFunction()}
        onMouseEnter={setDisplayImportNFTTip(true)}
        onMouseLeave={setDisplayImportNFTTip(false)} 
        className="btn btn-primary"
        >
            Import NFT Contract to Wallet
        </button>
        <p className="text text-muted">Here is a helpful tip</p>
    </>)

}
export default AddTokenToBrowserWallet;