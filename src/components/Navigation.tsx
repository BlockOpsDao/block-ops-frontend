import React from "react"
import { NavLink } from "react-router-dom"
import { useEthers } from "@usedapp/core"
import { AnalyticEventTracker } from "./AnalyticEventTracker";


export const Navigation = () => {
    const gaEventTracker = AnalyticEventTracker('Navigation');
    const { account, activateBrowserWallet, deactivate } = useEthers()

    const isConnected = account !== undefined


    return (

      <nav className="navbar navbar-expand-lg bg-purple">
      <div className="container-fluid">
          <NavLink className="navbar-brand link-primary" to="/">
              Block-Ops
          </NavLink>
        <button className="navbar-toggler navbar-dark" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" onClick={()=>gaEventTracker('button_toggleNavigationBar')}>
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link link-primary mt-1" to="/" onClick={()=>gaEventTracker('navlink_Home')}>
                  Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link link-primary mt-1" to="/about" onClick={()=>gaEventTracker('navlink_About')}>
                  About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link link-primary mt-1" to="/contact" onClick={()=>gaEventTracker('navlink_Contact')}>
                  Contact Us
              </NavLink>
            </li>
              <li className="nav-item">
              <NavLink className="nav-link link-primary" to="/donate" onClick={()=>gaEventTracker('navlink_Donate')}>
                  <button className="btn btn-secondary">Donate</button>
              </NavLink>
              </li>
              <li className="nav-item">
              <NavLink className="nav-link link-primary" to="#">
                  {isConnected ? (
                      <button className="btn btn-primary" onClick={deactivate}>
                          Disconnect
                      </button>
                  ) : (
                      <button className="btn btn-primary" onClick={() => {activateBrowserWallet(); gaEventTracker('button_activateBrowserWallet')}}>
                          Connect Wallet
                      </button>
                  )}
              </NavLink>
              </li>
          </ul>
        </div>
      </div>
    </nav>
      );

}