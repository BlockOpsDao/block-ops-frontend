import { useState } from 'react'
import WalletConnectProvider from '@walletconnect/web3-provider';
import CoinbaseWalletSDK from '@coinbase/wallet-sdk';
import Web3Modal from "web3modal";
import { useEthers } from '@usedapp/core'

const ActivateProvider = async () => {

    const providerOptions = {
        injected: {
        display: {
            name: 'Metamask',
            description: 'Connect with the provider in your Browser',
        },
        package: null,
        },
        walletconnect: {
            package: WalletConnectProvider, // required
            options: {
                infuraId: "a6d7ef14145a4908b1018e8d8452fffb" // required
            }
        },
        coinbasewallet: {
            package: CoinbaseWalletSDK, // Required
            options: {
                appName: "Block Ops Fronted", // Required
                infuraId: "a6d7ef14145a4908b1018e8d8452fffb", // Required
                darkMode: true // Optional. Use dark theme, defaults to false
            }
        }
    };

    const { activate } = useEthers()
    const [activateError, setActivateError] = useState('')


    const web3Modal = new Web3Modal({
        //network: "mainnet",
        cacheProvider: true, 
        theme: "dark",
        providerOptions 
    });
    try {
        const provider = await web3Modal.connect()
        await activate(provider)
        setActivateError('')
        return provider;
    } catch (error) {
        setActivateError(error.message)
    }
    
};
export default ActivateProvider;