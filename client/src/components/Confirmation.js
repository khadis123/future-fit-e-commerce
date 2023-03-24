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
          <h1>Thank you for your order {order.firstName}!</h1>
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
  height: 80vh;
  width: 80vw;
  margin: 40px;
`;

const Order = styled.div`
  background-color: lightgray;
  height: 50vh;
  width: 50vw;
`;
