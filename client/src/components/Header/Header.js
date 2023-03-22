import styled from "styled-components"
import {BsCart3} from "react-icons/bs"
import { useEffect, useState } from "react";

const Header = () => {
const [categories, setCategories] = useState()

    useEffect(() => {
        fetch("/getItems")
          .then((res) => res.json())
          .then((data) => {
            console.log(data)
            setCategories(data.data) 
          })
          .catch((error) => {
            console.log(error);
          });
      }, []);
      


return(
    <Wrapper>
<h1>LOGO FutureFit</h1>
<BsCart3/>
    </Wrapper>
    )

}
const Wrapper=styled.div`
display:flex;
flex-direction:row;
align-items:center;
`

export default Header