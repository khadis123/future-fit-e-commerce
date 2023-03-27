import styled from "styled-components";
import GlobalStyles from "./GlobalStyles";
import homepageBackground from "./images/banner_homepage.png";
import { Link } from "react-router-dom";

//Homepage component that renders a background with a shop all items button.
const Homepage = () => {
  return (
    <>
      <GlobalStyles />
      <MarqueeBanner>
        <h6>The Future is Wearable</h6>
      </MarqueeBanner>
      <Wrapper>
        <Background src={homepageBackground} alt="women looking at her watch" />
        <ButtonArea>
          <Button to={"/items"}>Shop all items</Button>
        </ButtonArea>
      </Wrapper>
    </>
  );
};

const MarqueeBanner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  background-color: white;
  overflow: hidden;
  width: 100%;
  border-bottom: 1px black solid;

  h6 {
    animation: marquee 30s linear infinite;
    width: 100%;
  }

  @keyframes marquee {
    0% {
      transform: translateX(100%);
    }
    100% {
      transform: translateX(-100%);
    }
  }
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 700px;
`;

const Background = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

const ButtonArea = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  position: absolute;
  top: 65%;
  transform: translateY(-50%);
`;

const Button = styled(Link)`
  background-color: var(--color-accent);
  border: none;
  border-radius: 25px;
  color: black;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  padding: 12px 50px;
  transition: all 0.3s ease;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px black solid;
  &:hover {
    background-color: #d4ff8a;
  }
`;

export default Homepage;
