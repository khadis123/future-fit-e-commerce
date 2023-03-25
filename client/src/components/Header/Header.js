import styled from "styled-components";
import { BsCart3 } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import headerBackground from "../images/header_background.png";
import logo from "../images/FutureFit.png";
import GlobalStyles from "../GlobalStyles";
import SearchBar from "../SearchBar";


const Header = ({countItem}) => {
// hardcoded the links.
// cart icon can tell us the number of the different items.

  return (
    <>
      <GlobalStyles />
      
      <HeaderWrapper>
        <HeaderLink to="/">
          <HeaderLogo src={logo} alt="logo FutureFit" />
        </HeaderLink>

        <HeaderNav>
          <HeaderNavLink to={`/categories/fitness`}>Fitness</HeaderNavLink>
          <HeaderNavLink to={`/categories/lifestyle`}>Lifestyle</HeaderNavLink>
          <HeaderNavLink to={`/categories/medical`}>Medical</HeaderNavLink>
          <HeaderNavLink to={`/categories/entertainment`}>Entertainment</HeaderNavLink>
          <HeaderNavLink to={`/categories/pets%20and%20animals`}>Pets</HeaderNavLink>
          <HeaderNavLink to={`/categories/gaming`}>Gaming</HeaderNavLink>
          <HeaderNavLink to={`/categories/industrial`}>Industrial</HeaderNavLink>
        </HeaderNav>

        <SearchBar/>
        <HeaderCartButton as={NavLink} to="/cart">
          <BsCart3 />
         {countItem && countItem.length > 0 && <Number>{countItem.length}</Number>}
        </HeaderCartButton>
      </HeaderWrapper>
    </>
  );
};

const HeaderNavLink = styled(NavLink)`
  text-decoration: none;
  color: black;
  font-weight: bold;
  font-family: var(--font-heading);
  font-size: 20px;
  padding: 0 25px;
  cursor: pointer;

  @media (max-width: 768px) {
    font-size: 16px;
    padding: 0 10px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
    padding: 0 5px;
  }
`;

const HeaderLink = styled(NavLink)`
  text-decoration: none;
  color: black;
 
`;

const HeaderLogo = styled.img`
 height: 100px;
  margin-right: 20px;

  @media screen and (max-width: 768px) {
    height: 40px;
  }
`;

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-image: url(${headerBackground});
  background-size: cover;
  height: 12vh;
  padding: 0 40px 0 14px;
  border-bottom: 1px black solid;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
`;

const HeaderNav = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-grow: 1;
`;

const Number = styled.span`
  position: relative;
  font-weight: bold;
  padding: 5px;
  border-radius: 10px;
  top: -20px;
  right: 5px;
  font-size: 20px;
`;
const HeaderCartButton = styled.a`
  background-color: transparent;
  border: none;
  font-size: 24px;
  color: black;
  cursor: pointer;
  margin-left: 30px;
  flex-grow: 0;
`;


export default Header;
