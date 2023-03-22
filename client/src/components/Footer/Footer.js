import FollowUs from "./FollowUs";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <Wrapper>
        <Link to="/">LOGO</Link>
        <Link to="/contact">Contact us</Link>
        <Link to="/about">About us</Link>
      </Wrapper>

      <Icons>
        <FollowUs />
      </Icons>
    </>
  );
};
const Icons = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 30px;
`;

const Link = styled(NavLink)`
  text-decoration: none;
  color: black;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;
export default Footer;
