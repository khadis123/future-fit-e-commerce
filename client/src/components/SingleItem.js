
import { NavLink, useParams } from "react-router-dom";
import styled from "styled-components";

const SingleItem = ({ item }) => {
  return (
    <Wrapper>
      <Product to={`/items/${item._id}`}>
        <Img src={item.imageSrc} />
        <Naming>
          <Name>{item.name}</Name>
          <Price>{item.price}</Price>
        </Naming>
      </Product>
    </Wrapper>
  );
};

const Img = styled.img`
  height: 150px;
  object-fit: contain;
`;

const Price = styled.div`
  font-size: 16px;
  font-weight: 600;
`;

const Name = styled.div`
  font-size: 14px;
  cursor: pointer;
  color: inherit;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const Naming = styled.div`
  margin-top: 10px;
`;

const Product = styled(NavLink)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 300px;
  background-color: white;
  border-radius: 0px;
  padding: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  text-decoration: none;
  color: inherit;
`;

const Wrapper = styled.div`
  height: 100%;
`;

export default SingleItem;
