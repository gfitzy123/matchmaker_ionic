import styled from "styled-components";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import { Link } from "react-router-dom";

export const FooterContainer = styled.div`
  background-color: ${({ toggleState }) => toggleState && "#222224"};
  padding: 0 0 2rem 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const LogoImage = styled.img`
  // width: 50%;
  width: ${({ width }) => width ?? width};
  height: ${({ height }) => height ?? height};
`;

export const FooterLogo = styled(Link)`
  color: #fff;
  cursor: pointer;
  text-decoration: none;
  font-size: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 30%;
  @media screen and (max-width: 960px) {
    max-width: 100%;
  }
`;

export const FooterSubscription = styled.section`
  display: flex;
  justify-content: space-between;
  border-top: ${({ toggleState }) =>
    !toggleState
      ? "solid 1px rgba(34, 34, 36, 1)"
      : "solid 1px rgba(255, 255, 255, 0.2)"};
  padding: 24px;
  color: #fff;
  width: 100%;
  @media screen and (max-width: 960px) {
    flex-direction: column;
  }
`;

export const FooterSubHeading = styled.p`
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
  margin-bottom: 24px;
  font-size: 24px;
`;

export const FooterSubText = styled.p`
  margin-bottom: 24px;
  font-size: 20px;
`;

export const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 820px) {
    flex-direction: column;
    width: 80%;
  }
`;

export const FormInput = styled.input`
  padding: 10px 20px;
  border-radius: 2px;
  margin-right: 10px;
  outline: none;
  border: none;
  font-size: 16px;
  border: 1px solid #fff;

  &::placeholder {
    color: #242424;
  }

  @media screen and (max-width: 820px) {
    width: 100%;
    margin: 0 0 16px 0;
  }
`;

export const FooterLinksContainer = styled.div`
  width: 100%;
  max-width: 1000px;
  display: flex;
  justify-content: center;

  @media screen and (max-width: 820px) {
    padding-top: 32px;
  }
`;

export const FooterLinksWrapper = styled.div`
  display: flex;

  @media screen and (max-width: 820px) {
    flex-direction: column;
  }
`;

export const FooterLinkItems = styled.div`
  display: flex;
  align-items: flex-start;
  margin: 16px;
  text-align: left;
  box-sizing: border-box;
  color: #fff;

  @media screen and (max-width: 420px) {
    margin: 0;
    padding: 10px;
    width: 100%;
    display: block;
  }
`;

export const FooterLinkTitle = styled.h2`
  margin-bottom: 16px;
`;

export const FooterLink = styled(Link)`
  color: ${({ toggleState }) => (!toggleState ? "black" : "white")};
  text-decoration: none;
  margin-bottom: 0.5rem;
  padding: 10px;
  &:hover {
    color: #0467fb;
    transition: 0.3s ease-out;
  }
  @media screen and (max-width: 960px) {
    display: block; /* Set to block on smaller screens */
    text-align: center;
    width: 100%;
  }
`;

export const SocialMedia = styled.section`
  width: 100%;
  padding: 24px;
`;

export const SocialMediaWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  max-width: 1000px;
  margin: 40px auto 0 auto;

  @media screen and (max-width: 820px) {
    flex-direction: column;
  }
`;

export const SocialLogo = styled(Link)`
  color: #fff;
  justify-self: start;
  cursor: pointer;
  text-decoration: none;
  font-size: 2rem;
  display: flex;
  align-items: center;
  margin-bottom: 16px;

  &:hover {
    color: #0467fb;
    transition: 0.3s ease-out;
  }
`;

export const SocialIcon = styled(HowToRegIcon)`
  margin-right: 10px;
`;

export const WebsiteRights = styled.small`
  color: #fff;
  margin-bottom: 16px;
`;

export const SocialIcons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 240px;
  @media screen and (max-width: 820px) {
    width: 100%;
  }
`;

export const SocialIconLink = styled.a`
  color: ${({ toggleState }) =>
    !toggleState ? "rgba(198, 161, 90, 1)" : "white"};
  font-size: 24px;

  &:hover {
    color: #0467fb;
    transition: 0.3s ease-out;
  }
`;
