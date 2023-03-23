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
    <Banner>
        <h1>{category}</h1>
      </Banner>
      {singleCategory.length === 0 ? (
        <LoadingIcon>
          <FiLoader />
        </LoadingIcon>
      ) : (
        <Wrapper>
          <ProductFeed>
            {singleCategory.map((item) => {
              return (
                <>
                  <SingleItem key={item._id} item={item} />
                </>
              );
            })}
          </ProductFeed>
        </Wrapper>
      )}
    </>
  );
};

const Banner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px;
  background-color: #f5f5f5;
`;

const ProductFeed = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 40px;
  padding: 100px 150px 100px 150px;
  width: 100%;
  max-width: 100vw;
  margin: 0 auto;
`;
const LoadingIcon = styled(FiLoader)`
  position: relative;
  left: 50%;
  top: 10px;
  animation: spin 1s infinite linear;
  height:80vh;
  
  @keyframes spin {
    100% {
      transform: rotate(360deg);
    }
  }
`;

const Wrapper = styled.div``;

export default Category;
