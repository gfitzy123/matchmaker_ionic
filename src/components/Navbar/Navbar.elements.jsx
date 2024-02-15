import styled from 'styled-components';
import { Container } from '../../styles/globalStyles'
import { Link } from 'react-router-dom'
import HowToRegIcon from "@mui/icons-material/HowToReg";

export const Nav = styled.nav`
    background: #222224;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.2rem;
    position: sticky;
    top: 0;
    z-index: 999;
`

export const NavbarContainer = styled(Container)`
    display: flex;
    justify-content: space-between;
    height: 80px;

    ${Container}
`

export const NavLogo = styled(Link)`
    color: #fff;
    cursor: pointer;
    text-decoration: none;
    font-size: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 30%;
`

export const LogoImage = styled.img`
    // width: 50%;
`;

export const NavIcon = styled(HowToRegIcon)`
    margin-right: 0.5rem;
`

export const HamburgerIcon = styled.div`
    display: none;

    @media screen and (max-width: 960px) {
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        transform: translate(-100%, 60%);
        font-size: 1.8rem;
        cursor: pointer;   
    }
`

export const NavMenu = styled.ul`
    display: flex;
    align-items: center;
    list-style: none;
    text-align: center;
    padding: 0;
  
    @media screen and (max-width: 960px) {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 90vh;
        position: absolute;
        top: 80px;
        opacity: 1;
        transition: all 0.5s ease;
        background-color: #222224;
        left: ${({ click }) => (click ? 0 : '-100%')};
    }
`
export const NavItem = styled.li`
    height: 80px;
    border-bottom: 2px solid transparent;
    border-radius: 2px;

    &:hover {
        border-bottom: 4px solid #fff;
    }

    @media screen and (max-width: 960px) {
        width: 100%;

        &:hover {
            border-bottom: none;
        }
    }

`

export const NavLinks = styled(Link)`
    color: #fff;
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 0.5rem 1rem;
    height: 100%;
    

    @media screen and (max-width: 960px) {
        text-align: center;
        padding: 2rem;
        width: 100%;
        display: table;

        &:hover {
            color: #4b59f7;
            transition: all 0.3s ease;
        }
    }
`

export const NavItemBtn = styled.li`
  @media screen and (max-width: 960px) {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 120px;
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
  padding: ${({ big }) => (big ? '12px 64px' : '10px 20px')};
  color: #fff;
  font-size: ${({ fontBig }) => (fontBig ? '20px' : '16px')};
  outline: none;
  border: 1px solid #C6A15A;
  cursor: pointer;
  &:hover {
    transition: all 0.3s ease-out;
    border: 1px solid #C6A16B;
  }
  @media screen and (max-width: 960px) {
    width: 100%;
  }
`;

export const NavRightContainer = styled.div`
  display: flex;
`