import App from './App';
import ReactDOM from 'react-dom/client';
import './index.scss';
import 'bootstrap-icons/font/bootstrap-icons.css';
import ReactGA from 'react-ga4';

const TRACKING_ID = "G-DVWFQ1738R";
ReactGA.initialize(TRACKING_ID);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(<App />)