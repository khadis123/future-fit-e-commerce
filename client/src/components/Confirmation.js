import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import styled from "styled-components"

const Confirmation = ()=> {

    const { orderId } = useParams()
    const [order, setOrder] = useState(null)

    useEffect(() =>  {
        fetch(`/confirmation/${orderId}`)
        .then(res => res.json())
        .then(parsedData => {
            setOrder(parsedData.data)
        })
        .catch(error => {
            console.log(error)
        })

    }, [])
    return(
        <>
            <Wrapper>
            <h1>Thank you for your order!</h1>
                <Order>
                    <p>Your order # {order.orderId}</p>
                    <ol>
                        <li></li>
                    </ol>
                    
                </Order>

            </Wrapper>
        </>
    )

}

export default Confirmation

const Wrapper = styled.div`
height: 80vh;
width: 80vw;
margin: 40px;
`

const Order = styled.div`
    background-color: lightgray;
    height: 30vh;
    width: 30vw;
`