import styled from "styled-components"
import {BsCart3} from "react-icons/bs"

const Header = () => {

return(
    <Wrapper>
<BackgroundImage alt="green and white background" src="../client/assets/banner_images/header_background.png"/>
<Span>Fitness</Span>
<Span>Lifestyle</Span>
<Span>Medical</Span>
<Span>Entertainment</Span>
<Span>Pets</Span>

<BsCart3/>
    </Wrapper>
    )

}
const BackgroundImage = styled.img`
width:100%;
background-image: url("../client/assets/banner_images/header_background.png");
  background-size: cover;
  background-repeat: no-repeat;
`
const Span = styled.span`

`
const Wrapper=styled.div`
display:flex;
flex-direction:row;
align-items:center;
`

export default Header