import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FiLoader } from "react-icons/fi";
import styled from "styled-components";
import SingleItem from "./components/SingleItem";
import Sidebar from "./components/Sidebar";

const Category = () => {
  const { category } = useParams();
  const [singleCategory, setSingleCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sort, setSort] = useState("noSort")

  //fetching items according to a category.
  useEffect(() => {
    setIsLoading(true);
    fetch(`/getItems/${category}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 400 || data.status === 500) {
          throw new Error("Error");
        }
        setSingleCategory(data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });

  }, [category]);
  
  let sorted = [...singleCategory];
  console.log(sort)

  useEffect(() => {
    if (sort === "$ascending") {
      sorted = sorted.sort((a, b) => {
        return Number((a.price).slice(1)) - Number((b.price).slice(1));
      })
    } else if (sort === "$descending") {
      sorted = sorted.sort((a, b) => {
        return Number((b.price).slice(1)) - Number((a.price).slice(1));
      });
    } else if (sort === "alpha+") {
      sorted.sort((a, b) => {
        if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
        if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
        return 0;
      });
    }
    else if (sort === "alpha-") {
      sorted.sort((a, b) => {
        if (a.name.toLowerCase() < b.name.toLowerCase()) return 1;
        if (a.name.toLowerCase() > b.name.toLowerCase()) return -1;
        return 0;
      });
    }
   else {
      sorted = singleCategory;
    }
  setSingleCategory(sorted)
  }, [sort])


 
  return (
    <>
    <Banner category={category}>
    <h1>{category.charAt(0).toUpperCase() + category.slice(1)}</h1>
      </Banner>
      {isLoading ? (
        <LoadingIcon>
          <FiLoader />
        </LoadingIcon>
      ) : (
        <Wrapper>
          <Sidebar setSort={setSort}/>
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
  height: 300px;
  border-bottom: 1px black solid;
  background-image: url(${props => `${process.env.PUBLIC_URL}/banners/${props.category.toLowerCase().split(" ").join("")}.png`});
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
