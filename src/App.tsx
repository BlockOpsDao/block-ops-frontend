import React, { useEffect }  from 'react';
import './index.scss';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Kovan, Mainnet, DAppProvider } from "@usedapp/core"

import { Navigation } from './components/Navigation'
import { Home } from './components/Home'
import { About } from './components/About'
import { Footer } from './components/Footer'
import { Donate } from './components/Donate';
import { Contact } from './components/Contact';
import ReactGA from 'react-ga4';
const TRACKING_ID = "G-DVWFQ1738R";
ReactGA.initialize(TRACKING_ID);

const App = () => {

  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  return (
    <Router>
      <DAppProvider config={{
        networks: [Kovan, Mainnet],
        readOnlyUrls: {
          [Mainnet.chainId]: 'https://mainnet.infura.io/v3/a6d7ef14145a4908b1018e8d8452fffb',
          [Kovan.chainId]: 'https://kovan.infura.io/v3/a6d7ef14145a4908b1018e8d8452fffb',
        },
        notifications: {
          expirationPeriod: 1000,
          checkInterval: 1000
        }
      }}>
          <Navigation />
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/about" element={<About/>} />
            <Route path="/donate" element={<Donate/>} />
            <Route path="/contact" element={<Contact/>} />
          </Routes>
          <Footer />
      </DAppProvider>
  </Router>
  )
}

export default App;