import React, { useState, useEffect } from "react";
import { Collapse, Container, NavbarToggler, NavLink } from "reactstrap";
import Scrollspy from "react-scrollspy";
import { Link } from "react-router-dom";
import { useEthers } from "@usedapp/core"
import { AnalyticEventTracker } from "../../Components/Common/AnalyticEventTracker";
import Web3Wallet from "../../Components/Common/Web3Wallet";
import EnterApp from "../../Components/Common/EnterApp";


// Import Images
import logodark from "../../assets/images/logo-dark.png";
import logolight from "../../assets/images/logo-light.png";
import imagelogo from "../../assets/images/svg/block-ops/block-ops-icon-2048.svg";

const Navbar = () => {
    const gaEventTracker = AnalyticEventTracker('Navigation');
    const [isOpenMenu, setisOpenMenu] = useState(false);
    const [navClass, setnavClass] = useState("");

    const toggle = () => setisOpenMenu(!isOpenMenu);

    useEffect(() => {
        window.addEventListener("scroll", scrollNavigation, true);
    });

    function scrollNavigation() {
        var scrollup = document.documentElement.scrollTop;
        if (scrollup > 50) {
            setnavClass("is-sticky");
        } else {
            setnavClass("");
        }
    }
    const { account } = useEthers()
    const isConnected = account !== undefined

    return (
        <React.Fragment>
            <nav className={"navbar navbar-expand-lg navbar-landing fixed-top " + navClass} id="navbar">
                <Container>
                    <Link className="navbar-brand" to="/" onClick={()=>gaEventTracker('button_navbarLogo')}>
                        {/* <img src={logodark} className="card-logo card-logo-dark" alt="logo dark" height="17" />
                        <img src={logolight} className="card-logo card-logo-light" alt="logo light" height="17" /> */}
                        
                        <img src={imagelogo}  alt="logo dark" height="55" /> Block-Ops
                    </Link>

                    <NavbarToggler className="navbar-toggler py-0 fs-20 text-body" onClick={()=>{toggle(); gaEventTracker('button_toggleNavigationBar')}} type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                        <i className="mdi mdi-menu"></i>
                    </NavbarToggler>

                    <Collapse
                        isOpen={isOpenMenu}
                        className="navbar-collapse"
                        id="navbarSupportedContent"
                    >
                        <Scrollspy
                            offset={-18}
                            items={[
                                "hero",
                                "services",
                                "faqs",
                                "team",
                                "contact",
                            ]}
                            currentClassName="active"
                            className="navbar-nav mx-auto mt-2 mt-lg-0"
                            id="navbar-example"
                        >
                            <li className="nav-item">
                                <NavLink href="#hero">Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink href="#services">Services</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink href="#faqs">FAQs</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink href="#team">Team</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink href="#contact">Contact</NavLink>
                            </li>
                        </Scrollspy>

                        <div className="">
                            <Link to="#" className="p-2"><Web3Wallet /></Link>
                            <Link to="#" className=""><EnterApp /></Link>
                        </div>
                    </Collapse>
                </Container>
            </nav>
        </React.Fragment>
    );
};

export default Navbar;