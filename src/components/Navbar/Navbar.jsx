import React, { useState, useEffect } from 'react'
import {
    LogoImage,
    Nav,
    NavbarContainer,
    NavLogo,
    NavIcon,
    HamburgerIcon,
    NavMenu,
    NavItem,
    NavLinks,
    NavItemBtn,
    NavBtnLink,
    NavBtn,
    NavRightContainer,
} from './Navbar.elements'
import { Button } from '../../styles/globalStyles';
import FaTimes from "@mui/icons-material/PunchClock";
import FaBars from "@mui/icons-material/ViewWeek";
import MatchMakerLogo from "../../assets/images/logoAI.png";
import Switch from './Switch'


function Navbar() {

    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);

    const [homeClick, setHomeClick] = useState(false);
    const [servicesClick, setServicesClick] = useState(false);
    const [productsClick, setProductsClick] = useState(false);

    const handleHomeClick = () => {
        setHomeClick(true);
        setProductsClick(false);
        setServicesClick(false);
    }
    const handleServicesClick = () => {
        setHomeClick(false);
        setProductsClick(false);
        setServicesClick(true);
    }
    const handleProductsClick = () => {
        setHomeClick(false);
        setProductsClick(true);
        setServicesClick(false);
    }

    const handleClick = () => setClick(!click);

    const closeMobileMenu = () => setClick(false);

    const showButton = () => {
        // so if the screensize is <= 960px then set button state to false
        if (window.innerwidth <= 960) {
            setButton(false)
        } else {
            setButton(true)
        }
    }

    useEffect(() => {
        showButton();
    }, [])

    window.addEventListener('resize', showButton);

    return (
        <Nav>
            <NavbarContainer>
                <NavMenu onClick={handleClick} click={click} >
                    <NavItem onClick={handleHomeClick} homeclick={homeClick}>
                        <NavLinks to='/about' onClick={closeMobileMenu}>
                            About
                        </NavLinks>
                    </NavItem>
                    <NavItem onClick={handleServicesClick} servicesClick={servicesClick}>
                        <NavLinks to='/how-it-works' onClick={closeMobileMenu}>
                            How it works
                        </NavLinks>
                    </NavItem>
                    <NavItem onClick={handleProductsClick} productsClick={productsClick}>
                        <NavLinks to='/faq' onClick={closeMobileMenu}>
                            FAQ
                        </NavLinks>
                    </NavItem>
                </NavMenu>
                <NavLogo to='/'>
                    <LogoImage src={MatchMakerLogo} alt="MatchMaker Logo" />
                </NavLogo>
                <NavRightContainer>
                    <Switch color="#4B4B4B" />
                    {button ? (
                        <NavBtnLink to='/sign-up'>
                            <NavBtn>Get matched</NavBtn>
                        </NavBtnLink>
                    ) : (
                        <NavBtnLink to='/sign-up'>
                            <NavBtn onClick={closeMobileMenu} fontBig>Get matched</NavBtn>
                        </NavBtnLink>
                    )}
                </NavRightContainer>
                <HamburgerIcon onClick={handleClick}>
                    {click ? <FaTimes style={{ color: '#fff' }} /> : <FaBars style={{ color: '#fff' }} />}
                </HamburgerIcon>
            </NavbarContainer>
        </Nav>
    )
}

export default Navbar
