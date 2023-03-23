import styled from "styled-components"
import {BsCart3} from "react-icons/bs"
import { NavLink, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";

const Header = () => {
const {category} = useParams();
const [items, setItems] = useState([])

useEffect(() => {
    fetch(`/getItems/${category}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 400 || data.status === 500) {
          throw new Error("Error");
        }
        console.log(data); 
        setItems(data.category)
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

return(
    <Wrapper>
{/* <BackgroundImage alt="green and white background" src="../client/assets/banner_images/header_background.png"/> */}
<Link to={`/items/${category}`}>Fitness</Link>
<Link to={`/items/${category}`}>Lifestyle</Link>
<Link to={`/items/${category}`}>Medical</Link>
<Link to={`/items/${category}`}>Entertainment</Link>
<Link to={`/items/${category}`}>Pets</Link>

<BsCart3/>
    </Wrapper>
    )

}

const Link = styled(NavLink)`
 text-decoration: none;
  color: black;
`
// const BackgroundImage = styled.img`
// width:100%;
//   background-size: cover;
//   background-repeat: no-repeat;
// `

const Wrapper=styled.div`
display:flex;
flex-direction:row;
align-items:center;
justify-content:space-around;
`

export default Header