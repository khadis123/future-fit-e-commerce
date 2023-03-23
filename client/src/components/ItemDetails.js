import { useEffect, useState } from "react";
import { FiLoader } from "react-icons/fi";
import { NavLink, useParams } from "react-router-dom";
import styled from "styled-components";

const ItemDetails = () => {
  const { _id } = useParams();
  const [product, setProduct] = useState([]);
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    fetch(`/getItem/${_id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 400 || data.status === 500) {
          throw new Error("Error");
        }
        console.log(data.data);
        setProduct([data.data]);

        const _id = data.data.companyId;
        fetch(`/companies/${_id}`)
          .then((res) => res.json())
          .then((data) => {
            if (data.status === 400 || data.status === 500) {
              throw new Error("Error");
            }
            console.log(data.data);
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



  return (
    <VH>
    {(!product && !companies) ? (
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
                      return <Link key={company._id} to={company.url}>{company.name}</Link>;
                    })}
                    <Name>{item.name}</Name>
                    <p> {item.price}</p>
                  </Info>
                  <AddCart>
                    <Quantity>Quantity available: {item.numInStock}</Quantity>
                    <Button disabled={item.numInStock === 0}>
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
const Link = styled(NavLink)`

`
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
  top: 600px;
  `;

const Wrapper = styled.div``;

export default ItemDetails;
