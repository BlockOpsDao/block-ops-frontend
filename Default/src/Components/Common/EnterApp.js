import { useEthers } from "@usedapp/core";
import { AnalyticEventTracker } from "./AnalyticEventTracker";

const EnterApp = () => {
    const gaEventTracker = AnalyticEventTracker('EnterApp');
    const { account } = useEthers()
    const isConnected = account !== undefined


    return (<>
        {isConnected ? (
            <button className="btn btn-danger" onClick={() => {gaEventTracker('button_enterApp')}}>
                Enter App
            </button>
        ) : (
            <button className="btn btn-primary" onClick={() => {gaEventTracker('button_enterAppBeforeConnectingWallet')}}>
                Please Connect Your Wallet First
            </button>
        )}
    </>)

};
export default EnterApp;