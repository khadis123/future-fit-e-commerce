import { useEffect, useState } from "react";
import styled from "styled-components";
import { FiLoader } from "react-icons/fi";

const CartItem = ({ cartItem, theCartFetch, itemFetching }) => {
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
      itemFetching();
    });
  };

  return (
    <>
      {!companies || !item ? (
        <LoadingIcon>
          <FiLoader />
        </LoadingIcon>
      ) : (
        <Wrapper>
          <Col>
            <Img src={cartItem.imageSrc} />
          </Col>
          <Col>
            <>{cartItem.name}</>
            <>{companyName.name}</>
            <Row>
              <QtySelection>
                <QuantityButton
                  disabled={quantity <= 1}
                  onClick={(ev) => handleClick(ev)}
                  value={"-"}
                >
                  -
                </QuantityButton>
                <Quantity>{quantity}</Quantity>
                <QuantityButton
                  disabled={item.numInStock <= 0}
                  onClick={(ev) => handleClick(ev)}
                  value={"+"}
                >
                  +
                </QuantityButton>
              </QtySelection>
            </Row>
            <Row>
              <Totaldiv>
                <Price>Total: {total}</Price>
                <DeleteLink onClick={(ev) => handleDelete(ev)}>
                  Remove from cart
                </DeleteLink>
              </Totaldiv>
            </Row>
          </Col>
        </Wrapper>
      )}
    </>
  );
};

export default CartItem;

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
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  width: 500px;
  height: auto;
  border: 1px solid gray;
  border-radius: 2px;
  margin: 20px;
  padding: 10px 5px 10px 5px;
`;
const Col = styled.div`
  display: flex;
  flex-direction: column;
`;
const Img = styled.img`
  height: 120px;
  object-fit: contain;
  margin: 0 25px 0 10px;
`;
const Price = styled.div`
  font-size: 16px;
  font-weight: 600;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

const Totaldiv = styled.div`
padding-top: 5px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const QtySelection = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;

`;

const QuantityButton = styled.button`
background-color: white;
  border: gray 1px solid;
  display: flex;
  justify-content: center;
  margin-right: 5px;
  opacity: ${(props) => props.disabled && "0.5"};
`;

const Quantity = styled.p`
  padding: 0 15px;
`;

const DeleteLink = styled.a`
  text-decoration: underline;
  font-size: 12px;
  cursor: pointer;
  margin-left: 150px;
`;
