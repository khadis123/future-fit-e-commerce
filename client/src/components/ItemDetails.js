import { Profiler, useEffect, useState } from "react";
import { FiLoader } from "react-icons/fi";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

const ItemDetails = () => {
  const { _id } = useParams();
  const [product, setProduct] = useState(null);
  const [companies, setCompanies] = useState(null);
  const [quantity, setQuantity] = useState(null);
  // not sure what newItem state does ?
  const [newItem, setNewItem] = useState([]);


  const navigateCart = useNavigate();
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

  const handleClick = (event) => {
    event.preventDefault();
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
        setQuantity((current) => {
          return current - 1;
        });
        if (data.status === 400 || data.status === 500) {
          throw new Error("Error");
        } else {
          setNewItem(data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <VH>
      {!product || !companies ? (
        <LoadingIcon>
          <FiLoader />
        </LoadingIcon>
      ) : (
        <Wrapper>
          <ProductFeed>
            {product.map((item) => {
              return (
                <Container key={item._id}>
                  <Picture>
                    <img src={item.imageSrc} />
                  </Picture>
                  <Divider>
                    <Info>
                      {companies.map((company) => {
                        return (
                          <Link key={company._id} to={company.url}>
                            {company.name}
                          </Link>
                        );
                      })}
                      <Name>{item.name}</Name>
                      <p> {item.price}</p>
                    </Info>
                    <AddCart>
                      <Quantity>Quantity available: {quantity}</Quantity>
                      <Button
                        disabled={item.numInStock === 0}
                        onClick={handleClick}
                      >
                        {item.numInStock === 0 ? "Out of stock" : "Add to cart"}
                      </Button>
                    </AddCart>
                  </Divider>
                </Container>
              );
            })}
          </ProductFeed>
        </Wrapper>
      )}
    </VH>
  );
};
const Link = styled(NavLink)``;
const Name = styled.p`
  font-weight: bold;
`;
const VH = styled.div`
  height: 100vh;
`;
const AddCart = styled.div`
  display: flex;
  flex-direction: column;
`;
const Button = styled.button``;
const Divider = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const Quantity = styled.div``;
const Info = styled.div`
  display: flex;
  flex-direction: column;
`;
const Picture = styled.div``;
const Container = styled.div`
  display: flex;
  flex-direction: row;
`;
const ProductFeed = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
  padding: 40px;
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
const Wrapper = styled.div``;

export default ItemDetails;
