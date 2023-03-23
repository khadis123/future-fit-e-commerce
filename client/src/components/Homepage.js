import styled from "styled-components"
import homepageBackground from "./images/banner_homepage.png"


const Homepage = () => {


    return(
        <Wrapper>
          {/* <Background src={homepageBackground} alt="women looking at her watch"/> */}
           
            </Wrapper>
    )
}

// const Background =styled.img`
// width:100%;

// `
const Wrapper = styled.div`
height:100vh;
background-image: url(${homepageBackground});
background-size:cover;

`
export default Homepage