import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { FiLoader } from "react-icons/fi";

const Confirmation = () => {
  const [order, setOrder] = useState(null);
  const { orderId } = useParams();

  //Fetching the confirmation Id to send back the info to the user.
  useEffect(() => {
    fetch(`/confirmation/${orderId}`)
      .then((res) => res.json())
      .then((data) => {
        setOrder(data.data);
      })

      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (order) {
    console.log(order);
  }

  return (
    <>
      {!order ? (
        <LoadingIcon>
          <FiLoader />
        </LoadingIcon>
      ) : (
        <Wrapper>
          <Title>Thank you for your order {order.firstName}!</Title>
          <Order>
            <p>Your order # {order._id}</p>
            <p>
              Items will be shipped to {order.address}, {order.city},{" "}
              {order.province}
            </p>
            <p>more info here :)</p>
          </Order>
        </Wrapper>
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
