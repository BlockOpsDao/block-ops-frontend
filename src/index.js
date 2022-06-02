import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import { configureStore } from "./store";

// Google Analytics Tracking
import ReactGA from 'react-ga4';

// Web3 imports
import { Kovan, Mainnet, DAppProvider } from "@usedapp/core"

const TRACKING_ID = "G-DVWFQ1738R";
ReactGA.initialize(TRACKING_ID);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <DAppProvider config={{
    networks: [Mainnet, Kovan],
    readOnlyUrls: {
      [Mainnet.chainId]: 'https://mainnet.infura.io/v3/a6d7ef14145a4908b1018e8d8452fffb',
      [Kovan.chainId]: 'https://kovan.infura.io/v3/a6d7ef14145a4908b1018e8d8452fffb'
    },
    notifications: {
      expirationPeriod: 1000,
      checkInterval: 1000
    }
  }}>
    <Provider store={configureStore({})}>
      <React.Fragment>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <App />
        </BrowserRouter>
      </React.Fragment>
    </Provider>
  </DAppProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();