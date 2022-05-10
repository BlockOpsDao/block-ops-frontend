import React, { useEffect, useState } from 'react'
import { useEthers, shortenAddress, useLookupAddress } from '@usedapp/core'
import WalletConnectProvider from '@walletconnect/web3-provider';
import CoinbaseWalletSDK from '@coinbase/wallet-sdk';
import Web3Modal from "web3modal";
import { AnalyticEventTracker } from "./AnalyticEventTracker";

const Web3Wallet = () => {
    const gaEventTracker = AnalyticEventTracker('Web3Wallet');
    const { account, activate, deactivate } = useEthers()
    const isConnected = account !== undefined
    const ens = useLookupAddress()
    const [showModal, setShowModal] = useState(false)
    const [activateError, setActivateError] = useState('')
    const { error } = useEthers()

    useEffect(() => {
      if (error) {
        setActivateError(error.message)
      }
    }, [error])
  
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
 
    const activateProvider = async () => {
        const web3Modal = new Web3Modal({
            network: "mainnet",
            cacheProvider: true, 
            theme: "dark",
            providerOptions 
        });
        try {
            const provider = await web3Modal.connect()
            await activate(provider)
            setActivateError('')
        } catch (error) {
            setActivateError(error.message)
        }
    }
    //activateProvider
    return (<>
        {isConnected ? (
            <button className="btn btn-primary" onClick={() => {deactivate(); gaEventTracker('button_deactivateBrowserWallet')}}>
                Disconnect {ens ?? shortenAddress(account)}
            </button>
        ) : (
            <button className="btn btn-danger" onClick={() => {activateProvider(); gaEventTracker('button_activateBrowserWallet')}}>
                Connect Wallet
            </button>
        )}
    </>)

};
export default Web3Wallet;