import { useState, useEffect } from "react"
import styled from "styled-components"
import CartItem from "./CartItem"
import GlobalStyles from "./GlobalStyles"

const Cart = ()=> {

    const [cartItems, setCartItems] = useState(null)

    useEffect(() => {
        fetch('/cart')
        .then(res => res.json())
        .then(parsedData => {
            console.log(parsedData.data)
            setCartItems(parsedData.data)
        })
    }, [])

    const handleClick = () => {

    }

    return(
    <Wrapper>
        <GlobalStyles/>
        {!cartItems ? <>loading</> :
        <Left>
            <p>Your shopping cart</p>
            {
                cartItems.map(cartItem => <CartItem cartItem={cartItem}/>)
            }
        </Left>
        }
        <Right>
            <p></p>
            <AddToCart onClick={handleClick}>Checkout</AddToCart>
        </Right>
    </Wrapper>
    )
}

export default Cart

const Wrapper = styled.div`
display: flex;
justify-content:space-around;
padding: 25px;
`

const Left = styled.div`
display:flex;
flex-direction: column;

`

const Right = styled.div`
display:flex;
flex-direction: column;
justify-content: flex-end;
`

const AddToCart = styled.button`

`


