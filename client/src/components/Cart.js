import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import CartItem from "./CartItem";
import GlobalStyles from "./GlobalStyles";
import { FiLoader } from "react-icons/fi";

const Cart = () => {
  const [cartItems, setCartItems] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/cart")
      .then((res) => res.json())
      .then((parsedData) => {
        console.log(parsedData.data);
        setCartItems(parsedData.data);
      });
  }, []);

  const handleClick = () => {
    navigate("/checkout");
  };
  
  return (
    <Wrapper>
      <GlobalStyles />
      {!cartItems ? (
        <LoadingIcon>
          <FiLoader />
        </LoadingIcon>
      ) : (
        <Left>
          <p>Your shopping cart</p>
          {cartItems.map((cartItem) => (
            <CartItem cartItem={cartItem} />
          ))}
        </Left>
      )}
      <Right>
        <p></p>
        <AddToCart onClick={handleClick}>Checkout</AddToCart>
      </Right>
    </Wrapper>
  );
};

export default Cart;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 25px;
  height: 90vh;
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
`;

const Right = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const LoadingIcon = styled(FiLoader)`
  position: relative;
  left: 30%;
  top: 10px;
  animation: spin 1s infinite linear;
  height: 50vh;

  @keyframes spin {
    100% {
      transform: rotate(360deg);
    }
  }
`;
const AddToCart = styled.button``;
