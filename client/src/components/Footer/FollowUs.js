
import {AiOutlineYoutube, AiOutlineFacebook, AiOutlineInstagram, AiOutlineTwitter} from "react-icons/ai"
import { NavLink } from "react-router-dom";
import styled from "styled-components";
const FollowUs = () => {
return (
<Wrapper>

<Link to="#"><AiOutlineYoutube/></Link>
<Link to="#"><AiOutlineFacebook/></Link>
<Link to="#"><AiOutlineInstagram/></Link>
<Link to="#"><AiOutlineTwitter/></Link>

</Wrapper>

)


}
const Link=styled(NavLink)`
color:black;
`
const Wrapper=styled.div`
padding:40px;
width:400px;
display:flex;
flex-direction:row;
justify-content:space-around;

`
export default FollowUs