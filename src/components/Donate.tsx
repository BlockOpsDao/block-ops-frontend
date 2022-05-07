import { useEthers } from "@usedapp/core"
import { DonationUsage } from './DonationUsage';
import { DonationWidget } from './DonationWidget';


export const Donate = () => {
  const { account } = useEthers()
  const isConnected = account !== undefined


  return (
    <div className="container">
        <div className='row'>
            <div className="col-sm-12 col-md">
                {isConnected ? (
                    <DonationWidget />
                ) : (
                    <p className="display-3 text-center text-slate">Make sure to connect your wallet first.</p>                
                )}
            </div>
            <div className="col-sm-12 col-md">
                <DonationUsage />
            </div>
        </div>
    </div>
  );
}