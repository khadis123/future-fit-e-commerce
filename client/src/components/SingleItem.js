
import { NavLink, useParams } from "react-router-dom";
import styled from "styled-components";

const SingleItem = ({ item }) => {
  return (
<Wrapper>
      <Product to={`/items/${item._id}`}>
        <Img src={item.imageSrc} />
        <Naming>
          
            <Name>
             {item.name}
            </Name>
          
          <Price>{item.price}</Price>
        </Naming>
      </Product>
    </Wrapper>
  );
};

const Img = styled.img`

`

const Price =styled.div`
padding: 0px 0px 0px 30px;
`
const Name = styled.div`
display:flex;
flex-direction:column;

`
const Naming =styled.div`
display:flex;
flex-direction:row;
justify-content:space-around;
align-items:center;
`
const Product = styled(NavLink)`

`;
const Wrapper = styled.div`

`;

export default SingleItem;
