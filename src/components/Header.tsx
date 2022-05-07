import { useEthers } from "@usedapp/core"
import { AnalyticEventTracker } from "./AnalyticEventTracker";


export const Header = () => {
    const gaEventTracker = AnalyticEventTracker('Header');

    const { account, activateBrowserWallet, deactivate } = useEthers()

    const isConnected = account !== undefined

    return (
        <div className="container">
            {isConnected ? (
                <button className="" onClick={() => {deactivate; gaEventTracker('button_deactivateBrowserWallet')}}>
                    Disconnect
                </button>
            ) : (
                <button
                    color="primary"
                    onClick={() => {activateBrowserWallet(); gaEventTracker('button_activateBrowserWallet')}}
                >
                    Connect
                </button>
            )}
        </div>
    )
}
