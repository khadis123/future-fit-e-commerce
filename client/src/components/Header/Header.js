import styled from "styled-components";
import { BsCart3 } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import headerBackground from "../images/header_background.png";
import logo from "../images/FutureFit.png";
import GlobalStyles from "../GlobalStyles";

const Header = () => {

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
        </HeaderNav>

        <HeaderCartButton>
          <BsCart3 />
        </HeaderCartButton>
      </HeaderWrapper>
    </>
  );
};

const HeaderNavLink = styled(NavLink)`
  text-decoration: none;
  color: black;
  font-family: var(--font-heading);
  font-size: 20px;
  padding: 0 25px 0 25px;
  cursor: pointer;
`;

const HeaderLink = styled(NavLink)`
  text-decoration: none;
  color: black;
 
`;

const HeaderLogo = styled.img`
  width: 350px;
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
`;

const HeaderNav = styled.div`
  display: flex;
  align-items: center;
`;

const HeaderCartButton = styled.a`
  background-color: transparent;
  border: none;
  font-size: 24px;
  color: black;
  cursor: pointer;
  margin-left: 24px;
`;

export default Header;
