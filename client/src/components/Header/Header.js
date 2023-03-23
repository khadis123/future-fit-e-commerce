import styled from "styled-components";
import { BsCart3 } from "react-icons/bs";
import { NavLink, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import headerBackground from "../images/header_background.png";
import logo from "../images/FutureFit.png";


const Header = () => {
  const { category } = useParams();
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(`/getItems/${category}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 400 || data.status === 500) {
          throw new Error("Error");
        }
        console.log(data);
        setItems(data.category);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Wrapper>
      <Link to="/">
        <Logo src={logo} alt="logo FutureFit" />
      </Link>
      <Link to={`/items/${category}`}>Fitness</Link>
      <Link to={`/items/${category}`}>Lifestyle</Link>
      <Link to={`/items/${category}`}>Medical</Link>
      <Link to={`/items/${category}`}>Entertainment</Link>
      <Link to={`/items/${category}`}>Pets</Link>

      <BsCart3 />
    </Wrapper>
  );
};

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
  padding: 60px;
`;

export default Header;
