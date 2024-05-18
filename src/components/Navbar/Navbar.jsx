import React, { useState, useEffect } from "react";
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
	HamburgerContainer,
	HamburgerLines,
	Line,
	SLine,
	SocialLink,
} from "./Navbar.elements";
import { Button } from "../../styles/globalStyles";
import FaTimes from "@mui/icons-material/PunchClock";
import FaBars from "@mui/icons-material/ViewWeek";
import MatchMakerLogo from "../../assets/images/logoAI.png";
import LightMatchMakerLogo from "../../assets/images/lightLogoAi.png";
import Switch from "./Switch";
import { useSelector } from "react-redux";

function Navbar({ isMobile }) {
	const toggleState = useSelector((state) => state.HomeReducer.toggle);

	const [click, setClick] = useState(false);
	const [button, setButton] = useState(true);

	const [homeClick, setHomeClick] = useState(false);
	const [servicesClick, setServicesClick] = useState(false);
	const [productsClick, setProductsClick] = useState(false);

	const handleHomeClick = () => {
		setHomeClick(true);
		setProductsClick(false);
		setServicesClick(false);
	};
	const handleServicesClick = () => {
		setHomeClick(false);
		setProductsClick(false);
		setServicesClick(true);
	};
	const handleProductsClick = () => {
		setHomeClick(false);
		setProductsClick(true);
		setServicesClick(false);
	};

	const handleClick = () => setClick(!click);

	const closeMobileMenu = () => setClick(false);

	const showButton = () => {
		// so if the screensize is <= 960px then set button state to false
		if (window.innerwidth <= 960) {
			setButton(false);
		} else {
			setButton(true);
		}
	};

	useEffect(() => {
		showButton();
	}, []);

	window.addEventListener("resize", showButton);

	return (
		<Nav toggleState={toggleState}>
			<NavbarContainer toggleState={toggleState}>
				<NavMenu toggleState={toggleState} onClick={handleClick} click={click}>
					{click && (
						<NavItem
							toggleState={toggleState}
							onClick={handleHomeClick}
							homeclick={homeClick}
						>
							<NavBtnLink to="/sign-up">
								<NavBtn toggleState={toggleState}>Get matched</NavBtn>
							</NavBtnLink>
						</NavItem>
					)}
					<NavItem
						toggleState={toggleState}
						onClick={handleHomeClick}
						homeclick={homeClick}
					>
						<NavLinks
							toggleState={toggleState}
							to="/about"
							onClick={closeMobileMenu}
						>
							About
						</NavLinks>
					</NavItem>
					<NavItem
						toggleState={toggleState}
						onClick={handleServicesClick}
						servicesClick={servicesClick}
					>
						<NavLinks
							toggleState={toggleState}
							to="/how-it-works"
							onClick={closeMobileMenu}
						>
							How it works
						</NavLinks>
					</NavItem>
					<NavItem
						toggleState={toggleState}
						onClick={handleProductsClick}
						productsClick={productsClick}
					>
						<NavLinks
							toggleState={toggleState}
							to="/faq"
							onClick={closeMobileMenu}
						>
							FAQ
						</NavLinks>
					</NavItem>
					<SLine />
					<SocialLink
						toggleState={toggleState}
						href="https://www.facebook.com/"
					>
						Facebook
					</SocialLink>
					<SocialLink toggleState={toggleState} href="https://instagram.com//">
						Instagram
					</SocialLink>
					<SocialLink toggleState={toggleState} href="https://twitter.com//">
						X(Twitter)
					</SocialLink>
					<SocialLink
						toggleState={toggleState}
						href="https://www.linkedin.com/"
					>
						LinkedIn
					</SocialLink>
					{isMobile && <Switch checked={toggleState} color="#4B4B4B" />}
				</NavMenu>
				<NavLogo to="/">
					<LogoImage
						src={toggleState ? MatchMakerLogo : LightMatchMakerLogo}
						alt="MatchMaker Logo"
					/>
				</NavLogo>
				<NavRightContainer>
					{!isMobile && (
						<>
							<Switch color="#4B4B4B" />
							{button ? (
								<NavBtnLink to="/sign-up">
									<NavBtn toggleState={toggleState}>Get matched</NavBtn>
								</NavBtnLink>
							) : (
								<NavBtnLink to="/sign-up">
									<NavBtn
										toggleState={toggleState}
										onClick={closeMobileMenu}
										fontBig
									>
										Get matched
									</NavBtn>
								</NavBtnLink>
							)}
						</>
					)}
				</NavRightContainer>

				<HamburgerContainer onClick={handleClick}>
					<HamburgerLines>
						<Line
							toggleState={toggleState}
							style={{ transform: click ? "rotate(45deg)" : "none" }}
						/>
						<Line
							toggleState={toggleState}
							style={{ transform: click ? "scaleY(0)" : "none" }}
						/>
						<Line
							toggleState={toggleState}
							style={{ transform: click ? "rotate(-45deg)" : "none" }}
						/>
					</HamburgerLines>
				</HamburgerContainer>
			</NavbarContainer>
		</Nav>
	);
}

export default Navbar;
