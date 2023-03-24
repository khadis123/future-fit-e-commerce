import { useEffect, useState } from "react";
import styled from "styled-components";

const CartItem = ({ cartItem, theCartFetch }) => {
  const [companies, setCompanies] = useState(null);
  const [quantity, setQuantity] = useState(cartItem.quantity);
  const [item, setItem] = useState(null);

  let companyName = "";
  let click = 1;
  let total = Number(cartItem.price.slice(1)) * quantity;

  if (companies) {
    companyName = companies.find(
      (company) => cartItem.companyId === company._id
    );
  }

  const itemFetch = () => {
    fetch(`/getItem/${cartItem._id}`)
      .then((res) => res.json())
      .then((data) => {
        setItem(data.data);
      });
  };

  useEffect(() => {
    fetch(`/companies`)
      .then((res) => res.json())
      .then((data) => {
        setCompanies(data.data);
      });
    itemFetch();
  }, [click]);
  //At the end of the PATCH, using the res.body to update the quantity between two buttons

  const handleClick = (ev) => {
    ev.preventDefault();

    if (ev.target.value === "-") {
      click = -1;
    }

    fetch("/update-cart", {
      method: "PATCH",
      body: JSON.stringify({
        ...cartItem,
        quantity: click,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((parsedData) => {
        setQuantity(quantity + click);
        itemFetch();
      });
  };

  const handleDelete = (ev) => {
    ev.preventDefault();

    fetch(`/delete-item/${cartItem._id}`, {
      method: "DELETE",
      body: JSON.stringify({ quantity: quantity }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then(() => {
      theCartFetch();
    });
  };

  return (
    <>
      {!companies || !item ? (
        <>Loading...</>
      ) : (
        <Wrapper>
          <Col>
            <Img src={cartItem.imageSrc} />
          </Col>
          <Col>
            <>{cartItem.name}</>
            <>{companyName.name}</>
          </Col>
          <Col>
            <Row>
              <Btn
                disabled={quantity <= 1}
                onClick={(ev) => handleClick(ev)}
                value={"-"}
              >
                -
              </Btn>
              <p>{quantity}</p>
              <Btn
                disabled={item.numInStock <= 0}
                onClick={(ev) => handleClick(ev)}
                value={"+"}
              >
                +
              </Btn>
            </Row>
            <DeleteDiv>
              <DeleteBtn onClick={(ev) => handleDelete(ev)}>Delete</DeleteBtn>
            </DeleteDiv>
            <Price>total: {total}</Price>
          </Col>
        </Wrapper>
      )}
    </>
  );
};

export default CartItem;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  width: 500px;
  height: 150px;
  border: 1px solid gray;
  margin: 20px;
`;
const Col = styled.div`
  display: flex;
  flex-direction: column;
`;
const Img = styled.img`
  height: 120px;
  margin: 20px;
  object-fit: contain;
`;
const Price = styled.div`
  font-size: 16px;
  font-weight: 600;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;
const Btn = styled.button`
  height: 20px;
  width: 20px;
  opacity: ${(props) => props.disabled && "0.5"};
`;
const DeleteDiv = styled.div`
  height: 200px;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
`;
const DeleteBtn = styled.button`
  padding: 10px;
  font-size: 10px;
  width: 80px;
  height: 40px;
`;
