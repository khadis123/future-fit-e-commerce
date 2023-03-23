import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FiLoader } from "react-icons/fi";
import styled from "styled-components";

const Category = () => {
  const { category } = useParams();
  const [singleCategory, setSingleCategory] = useState([]);

  useEffect(() => {
    fetch(`/getItems/${category}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 400 || data.status === 500) {
          throw new Error("Error");
        }
        console.log(data.data);
        setSingleCategory(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [category]);

  return (
    <>
      {!singleCategory ? (
        <LoadingIcon>
          <FiLoader />
        </LoadingIcon>
      ) : (
        <Wrapper>
          <h1>Category</h1>
          <ProductFeed>
            {singleCategory.map((category) => {
              return (
                <Item key={category._id}>
                  <span>{category.name}</span>
                  <span>{category.price}</span>
                  <span>{category.body_location}</span>
                  <span>{category.category}</span>
                  <Img src={category.imageSrc}/>
                  <span>{category.numInStock}</span>


                </Item>
              );
            })}
          </ProductFeed>
        </Wrapper>
      )}
    </>
  );
};

const Img = styled.img`


`
const Item = styled.div`
border: 1px blue solid;
`
const ProductFeed = styled.div`

`;
const LoadingIcon = styled(FiLoader)`
  position: relative;
  left: 50%;
  top: 500px;
`;

const Wrapper = styled.div`

`;
export default Category;
