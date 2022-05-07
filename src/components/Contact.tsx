import opensea_logo from './images/opensea-logo.svg'
import { AnalyticEventTracker } from "./AnalyticEventTracker";

export const Contact = () => {

    const hrStyle = {
        color: '#e5e5e5',
    };


    const iconStyle = {
        width: '1em',
        fontSize: '12rem',
    };
    const gaEventTracker = AnalyticEventTracker('Contact');

    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-12">
                    <h1 className='display-2 text-slate'>Do you want to get involved?</h1>
                    <hr className="py-1" style={ hrStyle }></hr>
                </div>
            </div>
            <div className="row">
                <div className="col-sm">
                    <h1 className='display-5 text-slate mt-5'>Connect with us on Twitter or support this project by purchasing one of our earliest NFTs!</h1>
                </div>
            </div>
            <div className="row">

                <div className="col-sm">
                    <a href="https://twitter.com/deepdatadude_" onClick={()=>gaEventTracker('a_twitter')}>
                        <i className="bi bi-twitter text-orange" style={ iconStyle }></i>
                    </a>
                </div>
                <div className="col-sm">
                    <a href="https://opensea.io/DeepDataDude" onClick={()=>gaEventTracker('a_opensea')}>
                        <img className="mt-5 img-fluid" src={ opensea_logo } style={ iconStyle } alt="opensea logo" />
                    </a>
                </div>
                
            </div>
            
        </div>
    )
}