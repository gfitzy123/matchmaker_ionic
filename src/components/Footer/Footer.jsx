import React from "react";
import { Button } from "../../styles/globalStyles";
import FaFacebook from "@mui/icons-material/Facebook";
import FaInstagram from "@mui/icons-material/Instagram";
import FaYoutube from "@mui/icons-material/YouTube";
import FaLinkedin from "@mui/icons-material/Linkedin";
import FaTwitter from "@mui/icons-material/Twitter";

import DarkFacebook from "../../assets/images/darkFacebook.svg";
import LightFacebook from "../../assets/images/lightFacebook.svg";
import DarkInstagram from "../../assets/images/darkInstagram.svg";
import LightInstagram from "../../assets/images/lightInstagram.svg";
import DarkTwitter from "../../assets/images/darkTwitter.svg";
import LightTwitter from "../../assets/images/lightTwitter.svg";
import DarkLinkedin from "../../assets/images/darkLinkedin.svg";
import LightLinkedin from "../../assets/images/lightLinkedin.svg";

import {
  LogoImage,
  FooterContainer,
  FooterSubscription,
  FooterSubText,
  FooterSubHeading,
  Form,
  FormInput,
  FooterLinksContainer,
  FooterLinksWrapper,
  FooterLinkItems,
  FooterLinkTitle,
  FooterLogo,
  FooterLink,
  SocialMedia,
  SocialMediaWrap,
  SocialLogo,
  SocialIcon,
  WebsiteRights,
  SocialIcons,
  SocialIconLink,
} from "./Footer.elements";
import MatchMakerLogo from "../../assets/images/logoAI.png";
import LightMatchMakerLogo from "../../assets/images/lightLogoAi.png";

function Footer({ toggleState }) {
  const date = new Date();

  return (
    <FooterContainer toggleState={toggleState}>
      <FooterSubscription toggleState={toggleState}>
        <FooterLogo to="/">
          <LogoImage
            src={toggleState ? MatchMakerLogo : LightMatchMakerLogo}
            alt="MatchMaker Logo"
          />
        </FooterLogo>
        <FooterLinksWrapper>
          <FooterLinkItems>
            <FooterLink toggleState={toggleState} to="/about">
              About
            </FooterLink>
            <FooterLink toggleState={toggleState} to="/sign-up">
              How it works
            </FooterLink>
            <FooterLink toggleState={toggleState} to="/faq">
              FAQ
            </FooterLink>
          </FooterLinkItems>
        </FooterLinksWrapper>
        <FooterLinksWrapper>
          <FooterLinkItems>
            <FooterLink toggleState={toggleState} to="/privacy">
              Privacy Policy
            </FooterLink>
            <FooterLink toggleState={toggleState} to="/terms">
              Terms of Service
            </FooterLink>
          </FooterLinkItems>
        </FooterLinksWrapper>
      </FooterSubscription>
      <SocialMedia>
        <SocialIcons>
          <SocialIconLink
            toggleState={toggleState}
            href="/"
            target="_blank"
            aria-label="Facebook"
          >
            <LogoImage
              width="20px"
              height="20px"
              src={toggleState ? DarkFacebook : LightFacebook}
              alt="facebook"
            />
          </SocialIconLink>
          <SocialIconLink
            toggleState={toggleState}
            href="/"
            target="_blank"
            aria-label="Instagram"
          >
            <LogoImage
              width="20px"
              height="20px"
              src={toggleState ? DarkInstagram : LightInstagram}
              alt="instagram"
            />
          </SocialIconLink>
          <SocialIconLink
            toggleState={toggleState}
            href="/"
            target="_blank"
            aria-label="Twitter"
          >
            <LogoImage
              width="20px"
              height="20px"
              src={toggleState ? DarkTwitter : LightTwitter}
              alt="twitter"
            />
          </SocialIconLink>
          <SocialIconLink
            toggleState={toggleState}
            href="/"
            target="_blank"
            aria-label="LinkedIn"
          >
            <LogoImage
              width="20px"
              height="20px"
              src={toggleState ? DarkLinkedin : LightLinkedin}
              alt="linkedin"
            />
          </SocialIconLink>
        </SocialIcons>
      </SocialMedia>
    </FooterContainer>
  );
}

export default Footer;
