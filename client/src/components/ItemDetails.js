import { FiLoader } from "react-icons/fi";
import { NavLink,  useParams } from "react-router-dom";
import styled from "styled-components";
import { useEffect, useState } from "react";

const ItemDetails = ({itemFetching}) => {
  const { _id } = useParams();
  const [product, setProduct] = useState(null);
  const [companies, setCompanies] = useState(null);
  const [quantity, setQuantity] = useState(null);
  const [isClicked, setIsClicked] = useState(false);

  const productFetch = () => {
    fetch(`/getItem/${_id}`)
    .then((res) => res.json())
    .then((data) => {
      setProduct([data.data]);
    });
  };
  
  //Fetchinig a specific item
  useEffect(() => {
    fetch(`/getItem/${_id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 400 || data.status === 500) {
          throw new Error("Error");
        }
        setProduct([data.data]);
        setQuantity(data.data.numInStock);
        const _id = data.data.companyId;

        fetch(`/companies/${_id}`)
          .then((res) => res.json())
          .then((data) => {
            if (data.status === 400 || data.status === 500) {
              throw new Error("Error");
            }
            setCompanies([data.data]);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //adds the product to the cart when the user clicks the "Add to Cart" button.
  //if successful, the request updates the state variables product, quantity, and isClicked, and calls the itemFetching
  const handleClick = (event) => {
    event.preventDefault();
    setIsClicked(true);
    fetch("/add-item", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: product[0].name,
        price: product[0].price,
        body_location: product[0].body_location,
        category: product[0].category,
        _id: Number(product[0]._id),
        imageSrc: product[0].imageSrc,
        quantity: 1,
        companyId: product[0].companyId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        productFetch();
        setQuantity((current) => {
          return current - 1;
        });
        if (data.status === 400 || data.status === 500) {
          throw new Error("Error");
        } 
        itemFetching(); // In app.js - calling it in so that the cart icon changes the number according to the items in the cart
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleBackClick = () => {
    window.history.back();
  };
  return (
    <VH>
      {!product || !companies ? (
        <LoadingIcon>
          <FiLoader />
        </LoadingIcon>
      ) : (
        <Wrapper>
          <StyledBackLink onClick={handleBackClick}>BACK</StyledBackLink>
          {product.map((item) => {
            return (
              <Container key={item._id}>
                <Img src={item.imageSrc} />
                <Info>
                  {companies.map((company) => {
                    return (
                      <Link key={company._id} to={company.url}>
                        {company.name}
                      </Link>
                    );
                  })}
                  <Name>{item.name}</Name>
                  <p>{item.price}</p>
                  <Divider>
                    <Quantity>Quantity available: {quantity}</Quantity>
                    <Button
                      disabled={quantity === 0}
                      onClick={handleClick}
                      isClicked={isClicked}
                    >
                      {isClicked ? "Added to cart!" :item.numInStock === 0 ? "Out of stock" : "Add to cart"}
                    </Button>
                  </Divider>
                </Info>
              </Container>
            );
          })}
        </Wrapper>
      )}
    </VH>
  );
};

const Link = styled(NavLink)`
  color: #333;
  font-size: 18px;
  font-weight: bold;
  text-decoration: none;
  font-family: var(--font-heading);

  &:hover {
    color: #444444;
  }
`;

const Name = styled.p`
  font-weight: bold;
  font-size: 24px;
  font-family: var(--font-body);
`;

const VH = styled.div``;

const Button = styled.button`
  width: 250px;
  &:disabled {
    cursor: not-allowed;
    opacity: 30%;
  }
  &:hover {
    background-color: #d4ff8a;
  }
  `;

const Divider = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 140px;
`;

const Quantity = styled.div`
  padding-bottom: 10px;
  color: gray;
  font-size: 14px;
  font-family: var(--font-body);
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  padding-right: 100px;
`;

const Img = styled.img`
  height: 100%;
  width: 250px;
  margin: 50px 150px 50px 200px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-content: center;
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
const Wrapper = styled.div`
  width: 100%;
  margin: 60px;
`;

const StyledBackLink = styled(Link)`
margin-top: 20px;
 text-decoration: underline;
  font-size: 12px;
  cursor: pointer;
`;

export default ItemDetails;
