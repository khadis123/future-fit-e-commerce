import FollowUs from "./FollowUs";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import logo from "../images/FutureFit.png";

const Footer = () => {
  return (
    <>
      <Wrapper>
        <Link to="/">
          <Logo src={logo} alt="logo FutureFit" />
        </Link>
        <Link to="/contact">Contact us</Link>
        <Link to="/about">About us</Link>
      </Wrapper>

      <Icons>
        <FollowUs />
      </Icons>
    </>
  );
};
const Logo = styled.img`
  width: 150px;
`;
const Icons = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 30px;
  background-color: #f5f5f5;
`;

const Link = styled(NavLink)`
  text-decoration: none;
  color: black;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding: 40px;
  align-items: center;
  background-color: #f5f5f5;
`;
export default Footer;
