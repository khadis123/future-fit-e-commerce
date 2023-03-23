import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const SingleItem = () => {
const {_id} = useParams();
const [singleItem, setSingleItem] = useState([]);

    useEffect(() => {
        fetch(`/getItem/${_id}`)
          .then((res) => res.json())
          .then((data) => {
            if (data.status === 400 || data.status === 500) {
              throw new Error("Error");
            }
            console.log(data); 
            setSingleItem(data)
          })
          .catch((error) => {
            console.log(error);
          });
      }, []);


    return(
        <Wrapper>

        <h1>SINGLE ITEM</h1>
        </Wrapper>
    )


}
const Wrapper =styled.div`
height:100vh;
`
export default SingleItem