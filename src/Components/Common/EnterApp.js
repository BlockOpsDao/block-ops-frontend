import { useEthers } from "@usedapp/core";
import { AnalyticEventTracker } from "./AnalyticEventTracker";
import { Link } from 'react-router-dom';
import { Kovan, Mainnet, Rinkeby, Polygon, ZkSyncTestnet } from "@usedapp/core"

const SUPPORTED_CHAINS = [
    Kovan.chainId
]

const EnterApp = () => {

    const gaEventTracker = AnalyticEventTracker('EnterApp');
    const { account, chainId, error, switchNetwork } = useEthers()
    const isConnected = account !== undefined

    const makeUserSwitchNetwork = async () => {
        if(chainId !== Kovan.chainId) {
            await switchNetwork(Kovan.chainId)
        }
    }

    if (isConnected) {

        if (chainId !== undefined) {
            return (
                <Link to="/dashboard">
                    <button className="btn btn-danger" onClick={() => {gaEventTracker('button_enterApp')}}>
                        Enter App
                    </button>
                </Link>
            )
        } else {
            makeUserSwitchNetwork()
            return (
                <button className="btn btn-danger" onClick={() => {gaEventTracker('button_enterApp')}}>
                    Connect to Kovan Testnet First
                </button>
            )
        }

    } else {
        return (
            <button className="btn btn-primary" onClick={() => {gaEventTracker('button_enterAppBeforeConnectingWallet');}}>
                Please Connect Your Wallet First
            </button>
        )
    }
};
export default EnterApp;