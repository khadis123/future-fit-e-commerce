import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import CartItem from "./CartItem";
import GlobalStyles from "./GlobalStyles";
import { FiLoader } from "react-icons/fi";

const Cart = ({ countItem, setCountItem, itemFetching }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const theCartFetch = () => {
    fetch("/cart")
      .then((res) => res.json())
      .then((parsedData) => {
        console.log(parsedData.data);
        setCartItems(parsedData.data);
        setLoading(true);
      });
  };

  useEffect(() => {
    theCartFetch();
  }, []);

  const handleClick = () => {
    navigate("/checkout");
  };

  const handleBackClick = () => {
    window.history.back();
  };

  return (
    <Wrapper>
      <GlobalStyles />
      {!loading ? (
        <LoadingIcon>
          <FiLoader />
        </LoadingIcon>
      ) : (
        <>
          <Left>
            {cartItems.length === 0 ? (
              <p>Your shopping cart is empty</p>
            ) : (
              <p>Your shopping cart</p>
            )}

            {cartItems.map((cartItem) => (
              <CartItem
                theCartFetch={theCartFetch}
                cartItem={cartItem}
                itemFetching={itemFetching}
              />
            ))}
          </Left>
        </>
      )}
      <Right>
        <p></p>
        <ButtonsWrapper>
          <Button onClick={handleBackClick}>Back to shopping</Button>
          <AddToCart disabled={cartItems.length === 0} onClick={handleClick}>
            Checkout
          </AddToCart>
        </ButtonsWrapper>
      </Right>
    </Wrapper>
  );
};

export default Cart;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 25px;
  height: 100%;
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

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
`;
const Button = styled.button`
margin: 0 20px 0 0;
background-color: lightgray;
`;

const AddToCart = styled.button`
  opacity: ${(props) => props.disabled && "0.5"};
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
