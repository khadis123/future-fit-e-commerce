import { useEffect, useState } from "react"
import styled from "styled-components"


const CartItem = ({cartItem}) => {

  const [companies, setCompanies] = useState(null)
  let companyName = ""
  let click = 1;

  if (companies) {
    companyName = companies.find(company => cartItem.companyId === company._id)
    console.log(companyName)
  }

  useEffect(() => {
    fetch(`/companies`)
    .then(res => res.json())
    .then(data => {
      setCompanies(data.data)
    })
  },[])
  //At the end of the PATCH, using the res.body to update the quantity between two buttons

  const handleClick = {
    
  }

  return (
    <> { !companies ? <></> :
    <Wrapper>
    <Col>
      <img src={cartItem.imageSrc}/>
    </Col>
    <Col>
      <>{cartItem.name}</>
      <>{companyName.name}</>
      <>{cartItem.price}</>
    </Col>
    <Col>
      <Row>
      <button>-</button>
      <p>{cartItem.quantity}</p>
      <button>+</button>
      </Row>
      <p>total: {}</p>
    </Col>

    </Wrapper>
    }
    </>
  )
}

export default CartItem

const Wrapper = styled.div`
display: flex;
justify-content:space-around;
width: 500px;
height: 150px;
border: 1px solid gray;
`
const Col = styled.div`
display: flex;
flex-direction: column;
`

const Row = styled.div`
display: flex;
flex-direction: row
`