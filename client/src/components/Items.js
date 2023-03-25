import { useEffect, useState } from "react";
import styled from "styled-components";
import { FiLoader } from "react-icons/fi";
import SingleItem from "./SingleItem";
import myImage from "./images/items.png"


const Items = () => {
  const [items, setItems] = useState();

  //Fetching to get all the items.
  useEffect(() => {
    fetch("/getItems")
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data);
        setItems(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //fitltering them by categories
  const byCategories = (category) => {
    return items.filter((item) => item.category === category);
  };

  return (
    <>
      <Banner>
        <h1>Shop all items</h1>
      </Banner>
      {!items ? (
        <LoadingIcon>
          <FiLoader />
        </LoadingIcon>
      ) : (
        <>
          <Wrapper>
            <ProductFeed>
              <h1>Fitness</h1>
              {byCategories("Fitness").map((item) => {
                return (
                  <>
                    <SingleItem key={item._id} item={item} />
                  </>
                );
              })}
            </ProductFeed>
          </Wrapper>
          <Wrapper>
            <ProductFeed>
              <h1>Lifestyle</h1>
              {byCategories("Lifestyle").map((item) => {
                return (
                  <>
                    <SingleItem key={item._id} item={item} />
                  </>
                );
              })}
            </ProductFeed>
          </Wrapper>
          <Wrapper>
            <ProductFeed>
              <h1>Medical</h1>
              {byCategories("Medical").map((item) => {
                return (
                  <>
                    <SingleItem key={item._id} item={item} />
                  </>
                );
              })}
            </ProductFeed>
          </Wrapper>
          <Wrapper>
            <ProductFeed>
              <h1>Entertainement</h1>
              {byCategories("Entertainment").map((item) => {
                return (
                  <>
                    <SingleItem key={item._id} item={item} />
                  </>
                );
              })}
            </ProductFeed>
          </Wrapper>
          <Wrapper>
            <ProductFeed>
              <h1>Pets and animals</h1>
              {byCategories("Pets and Animals").map((item) => {
                return (
                  <>
                    <SingleItem key={item._id} item={item} />
                  </>
                );
              })}
            </ProductFeed>
          </Wrapper>
        </>
      )}
    </>
  );
};

const Banner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
  background-color: #f5f5f5;
  border-bottom: 1px black solid;
  background-image: url(${myImage});
  background-size: cover;
  background-position: center;
  h1 {
    color: var(--color-accent);
    text-shadow: 1px 1px 1px #000;
  }
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

const Wrapper = styled.div``;

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
export default Items;
