import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FiLoader } from "react-icons/fi";

const Confirmation = () => {
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();
  const { orderId } = useParams();

  //Fetching the confirmation Id to send back the info to the user.
  useEffect(() => {
    fetch(`/confirmation/${orderId}`)
      .then((res) => res.json())
      .then((data) => {
        setOrder(data.data);
      });
    fetch(`/delete-cart`, {
      method: "DELETE",
      body: JSON.stringify(),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).catch((error) => {
      console.log(error);
    });
  }, []);

  const handleClick = () => {
    navigate("/");
  };

  return (
    <>
      {!order ? (
        <LoadingIcon>
          <FiLoader />
        </LoadingIcon>
      ) : (
        <div>
          <Wrapper>
            <Title>Thank you for your order {order.firstName}!</Title>
            <Order>
              <p>Your order # {order._id}</p>
              <p>
                The following items will be shipped to {order.address},{" "}
                {order.city}, {order.province}
              </p>
              {order.cart.map((item) => {
                console.log(item);
                return <Li>{item.name}</Li>;
              })}
            </Order>
          </Wrapper>
          <ButtonDiv>
            <ShoppingBtn onClick={handleClick}>Back to shopping</ShoppingBtn>
          </ButtonDiv>
        </div>
      )}
    </>
  );
};

export default Confirmation;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 50px;
  line-height: 30px;
  height:80vh;
`;

const Title = styled.h1`
  font-size: 30px;
  margin: 48px;
`;

const Order = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  border: 1px solid black;
  border-radius: 2px;
  padding: 24px;
  max-width: 600px;
  justify-content: center;
  background-color: ---color-main-background;
`;
const LoadingIcon = styled(FiLoader)`
  position: relative;
  left: 50%;
  top: 10px;
  animation: spin 1s infinite linear;
  height: 80vh;

  @keyframes spin {
    100% {
      transform: rotate(360deg);
    }
  }
`;

const ButtonDiv = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
`;

const ShoppingBtn = styled.button``;

const Li = styled.li`
  font-weight: bold;
`;
