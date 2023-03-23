import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FiLoader } from "react-icons/fi";
import styled from "styled-components";
import SingleItem from "./components/SingleItem";
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
          <ProductFeed>
            {singleCategory.map((item) => {
                return (
                    <>
                <SingleItem 
                key={item._id}
                   item={item}
                    />
                    </>
              );
            })}
          </ProductFeed>
        </Wrapper>
      )}
    </>
  );
};

const ProductFeed = styled.div`
display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px; 
  padding:40px;
`;
const LoadingIcon = styled(FiLoader)`
  position: relative;
  left: 50%;
  top: 500px;
`;

const Wrapper = styled.div`

`;
export default Category;
