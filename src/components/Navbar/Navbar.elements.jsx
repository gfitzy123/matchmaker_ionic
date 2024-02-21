import styled from "styled-components";
import { Container } from "../../styles/globalStyles";
import { Link } from "react-router-dom";
import HowToRegIcon from "@mui/icons-material/HowToReg";

export const Nav = styled.nav`
  background-color: ${({ toggleState }) =>
    toggleState ? "#222224" : "#F5F6FA"};
  color: ${({ toggleState }) => (toggleState ? "#222224" : "white")};
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  position: sticky;
  top: 0;
  z-index: 999;
`;

export const NavbarContainer = styled(Container)`
  display: flex;
  justify-content: space-between;
  height: 80px;

  ${Container}
`;

export const NavLogo = styled(Link)`
  color: #fff;
  cursor: pointer;
  text-decoration: none;
  font-size: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 30%;
  @media screen and (max-width: 768px) {
    max-width: 70%;
  }
`;

export const LogoImage = styled.img`
  // width: 50%;
`;

export const NavIcon = styled(HowToRegIcon)`
  margin-right: 0.5rem;
`;

export const HamburgerContainer = styled.div`
  display: none;

  @media screen and (max-width: 960px) {
    display: block;
    position: absolute;
    top: 30px;
    right: 0px;
    z-index: 5;
    cursor: pointer;
    color: white;
  }
`;

export const HamburgerLines = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 20px;
  width: 26px;
`;

export const Line = styled.span`
  display: block;
  height: 2px;
  width: 100%;
  border-radius: 10px;
  background: ${({ toggleState }) => (toggleState ? "white" : "black")};

  &:first-child {
    transform-origin: 0% 0%;
    transition: transform 0.4s ease-in-out;
  }

  &:nth-child(2) {
    transition: transform 0.2s ease-in-out;
  }

  &:last-child {
    transform-origin: 0% 100%;
    transition: transform 0.4s ease-in-out;
  }
`;

export const HamburgerIcon = styled.div`
  display: none;

  @media screen and (max-width: 960px) {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    font-size: 1.8rem;
    cursor: pointer;
  }
`;

export const NavMenu = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  text-align: center;
  padding: 0;
  color: ${({ toggleState }) => (toggleState ? "#222224" : "white")};
  @media screen and (max-width: 960px) {
    // display: flex;
    flex-direction: column;
    width: 90%;
    height: 100vh;
    position: absolute;
    top: 50px;
    opacity: 1;
    transition: all 0.5s ease;
    background-color: ${({ toggleState }) =>
      toggleState ? "rgba(34, 34, 36, 1)" : "white"};
    right: ${({ click }) => (click ? "-20px" : "-100%")};
  }
`;

export const NavItem = styled.li`
  height: 80px;
  border-bottom: 2px solid transparent;
  border-radius: 2px;
  color: ${({ toggleState }) => (!toggleState ? "#222224" : "white")};
  &:hover {
    border-bottom: 4px solid #fff;
  }

  @media screen and (max-width: 960px) {
    width: 100%;
    height: 40px;
    margin-top: 1rem;
    &:hover {
      border-bottom: none;
    }
  }
`;

export const NavLinks = styled(Link)`
  color: ${({ toggleState }) => (!toggleState ? "#222224" : "white")};
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0.5rem 1rem;
  height: 100%;

  @media screen and (max-width: 960px) {
    text-align: center;
    padding: 1rem;
    width: 100%;
    display: table;
    &:hover {
      color: #4b59f7;
      transition: all 0.3s ease;
    }
  }
`;

export const SLine = styled.div`
  @media screen and (max-width: 960px) {
    width: 80%;
    height: 2px;
    border-radius: 10px;
    border: solid 1px #ddd;
    margin-top: 2rem;
  }
`;

export const SocialLink = styled.a`
  display: none;
  @media screen and (max-width: 960px) {
    display: block;
    color: ${({ toggleState }) => (!toggleState ? "#222224" : "white")};
    padding: 1rem;
    text-decoration: none;
  }
`;

export const NavItemBtn = styled.li`
  @media screen and (max-width: 960px) {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 50px;
  }
`;

export const NavBtnLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  padding: 8px 16px;
  border: none;
  outline: none;
`;

export const NavBtn = styled.button`
  border-radius: 4px;
  background: transparent;
  white-space: nowrap;
  padding: ${({ big }) => (big ? "12px 64px" : "10px 20px")};
  font-size: ${({ fontBig }) => (fontBig ? "20px" : "16px")};
  color: ${({ toggleState }) => (toggleState ? "white" : "black")};
  outline: none;
  border: 1px solid #c6a15a;
  cursor: pointer;
  &:hover {
    transition: all 0.3s ease-out;
    border: 1px solid #c6a16b;
  }
  @media screen and (max-width: 960px) {
    width: 100%;
  }
`;

export const NavRightContainer = styled.div`
  display: flex;
//   @media screen and (max-width: 768px) {
//     display: none;
//   }
`;
