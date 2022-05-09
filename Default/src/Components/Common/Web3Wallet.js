import { useEthers } from "@usedapp/core";
import WalletConnectProvider from '@walletconnect/web3-provider';
import CoinbaseWalletSDK from '@coinbase/wallet-sdk';
import Web3Modal from "web3modal";
import { AnalyticEventTracker } from "./AnalyticEventTracker";

const Web3Wallet = () => {
    const gaEventTracker = AnalyticEventTracker('Web3Wallet');
    const { account, activate, deactivate } = useEthers()
    const isConnected = account !== undefined
    const providerOptions = {
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
      
    const web3Modal = new Web3Modal({
        network: "mainnet",
        cacheProvider: true, 
        theme: "dark",
        providerOptions 
    });
      
    async function onConnect() {
        try {
            const provider = await web3Modal.connect();
            activate(provider)
        } catch (error) {
            console.error(error)
        }
    }

    return (<>
        {isConnected ? (
            <button className="btn btn-primary" onClick={() => {deactivate(); gaEventTracker('button_deactivateBrowserWallet')}}>
                Disconnect { account.slice(0, 5) }...{ account.slice(-4) }
            </button>
        ) : (
            <button className="btn btn-danger" onClick={() => {onConnect(); gaEventTracker('button_activateBrowserWallet')}}>
                Connect Wallet
            </button>
        )}
    </>)

};
export default Web3Wallet;