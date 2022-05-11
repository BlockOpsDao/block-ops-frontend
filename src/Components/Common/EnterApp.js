import { useEthers } from "@usedapp/core";
import { AnalyticEventTracker } from "./AnalyticEventTracker";
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';


const EnterApp = () => {
    const gaEventTracker = AnalyticEventTracker('EnterApp');
    const { account } = useEthers()
    const isConnected = account !== undefined



    const history = useHistory();
    const routeChange = () =>{ 
        let path = `coming-soon`; 
        history.push(path);
    }

    return (<>
        {isConnected ? (
            <Link to="/coming-soon">
                <button className="btn btn-danger" onClick={() => {gaEventTracker('button_enterApp')}}>
                    Enter App
                </button>
            </Link>
        ) : (
            <button className="btn btn-primary" onClick={() => {gaEventTracker('button_enterAppBeforeConnectingWallet');routeChange()}}>
                Please Connect Your Wallet First
            </button>
        )}
    </>)

};
export default EnterApp;