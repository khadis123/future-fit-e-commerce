import styled from "styled-components";
import { BsCart3 } from "react-icons/bs";
import { NavLink, useParams } from "react-router-dom";
import headerBackground from "../images/header_background.png";
import logo from "../images/FutureFit.png";

const Header = () => {
  const { category } = useParams();


  return (
    <Wrapper>
      <Link to="/">
        <Logo src={logo} alt="logo FutureFit" />
      </Link>

      <StyledLink to={`/categories/fitness`}>Fitness</StyledLink>

      <StyledLink to={`/categories/lifestyle`}>Lifestyle</StyledLink>

      <StyledLink to={`/categories/medical`}>Medical</StyledLink>

      <StyledLink to={`/categories/entertainment`}>Entertainment</StyledLink>

      <StyledLink to={`/categories/pets`}>Pets</StyledLink>

      <BsCart3 />
    </Wrapper>
  );
};

const StyledLink = styled(NavLink)`
  text-decoration: none;
  color: black;
`;

const Link = styled(NavLink)`
  text-decoration: none;
  color: black;
`;

const Logo = styled.img`
  width: 400px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-image: url(${headerBackground});
  background-size:cover;
  height:20vh;
`;

export default Header;
