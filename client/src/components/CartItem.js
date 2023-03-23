import styled from "styled-components"


const CartItem = ({cartItem}) => {


  return (
    <>
    <Wrapper>
    <>{cartItem.name}</>

    <button>+</button>

    

    </Wrapper>
    </>
  )
}

export default CartItem

const Wrapper = styled.div`
display: flex;
justify-content:space-around;
width: 300px;
height: 150px;
`