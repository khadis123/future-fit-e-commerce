import styled from "styled-components"
import GlobalStyles from './GlobalStyles'
import homepageBackground from "./images/banner_homepage.png"
import { Link } from "react-router-dom"


const Homepage = () => {

    return(
        <>
        <GlobalStyles/>
        <Wrapper>
            <Background src={homepageBackground} alt="women looking at her watch"/>
            <ButtonArea>
                <Button to={'/items'}>Shop</Button>
            </ButtonArea>
        </Wrapper>
        </>
    )
}

const Wrapper = styled.div`
background-size: cover;
display: flex;
justify-content: flex-end;
flex-direction: column;
`

const Background = styled.img`
width: 100%;
height: 200%;
z-index:-1;
`

const ButtonArea = styled.div`
width: 100%;
display: flex;
justify-content: space-evenly;
position: absolute;
top: 90%;

`
const Button = styled(Link)`
    background-color: var(--color-accent);
    color: #fff;
    border: none;
    border-radius: 4px;
    color: #fff;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
    padding: 12px 24px;
    transition: all 0.3s ease;
`
export default Homepage