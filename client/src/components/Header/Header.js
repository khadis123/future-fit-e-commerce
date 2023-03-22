import styled from "styled-components"
import {BsCart3} from "react-icons/bs"

const Header = () => {
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