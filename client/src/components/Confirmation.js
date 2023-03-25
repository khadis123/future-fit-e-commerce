import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const Confirmation = () => {
  const [order, setOrder] = useState(null);
  const {orderId} = useParams();

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
        <h1>Loading...</h1>
      ) : (
        <Wrapper>
          <Title>Thank you for your order {order.firstName}!</Title>
          <Order>
            <p>Your order # {order._id}</p>
            <p>
              Items will be shipped to {order.address}, {order.city},
              {order.province}
            </p>
            <p>more info here :) </p>
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
