import { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Checkout = ()=> {
  //useState
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({});
  const [selectedItem, setSelectedItem] = useState("");
  const navigate = useNavigate();

  //useEffect
  useEffect(() => {
    //fetch all my items
    fetch("/cart")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setItems(data.data);
      })
      .catch((error) => console.log(error));
  }, []);

  //item select handler
//   const handleSelect = (e) => {
//     const { value } = e.target;
//     if (value === "") {
//       setSelectedItem(undefined);
//       setFormData({
//         ...formData,
//         item: undefined,
//       });
//       return;
//     }

//     const foundItem = items.find((item, index) => {
//         return item.id === value;
//       });
//       setSelectedItem(foundItem);
//       setFormData({
//         ...formData,
//         item: foundItem.id,
//       });
//     };
  
    //onSubmit handler
    const handleSubmit = (e) => {
      e.preventDefault();
  
      fetch("/add-item", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        // fname, lname, phone, address, email, price, and item.
        body: JSON.stringify( formData ), //HERE I'M NOT SURE: order or cart should be there?
      })
        //sends the data to the server
        .then((res) => res.json())
        //receives the data back from the server
        .then((data) => {
          console.log(data);
          navigate(`/confirm/${data.data.id}`);
        })
        .catch((error) => {
          console.log(error);
        });
    };
  
    const handleChange = (e) => {
      const { id, value } = e.target;
      setFormData({
        ...formData,
        [id]: value,
      });
    };
  
//JSX
    return(<> 
    
        <h1>CHECKOUT</h1>

        <>
      <StyledSubDivForCard>
        <StyledDivForFormContent onSubmit={handleSubmit}>
            <h2>Shipping information</h2>

            <div>
            <label htmlFor="email">Email: </label>
            <input type="text" id="email" onChange={handleChange} />
          </div>

          <div>
            <label htmlFor="fname">First Name: </label>
            <input type="text" id="fname" onChange={handleChange} />
          </div>

          <div>
            <label htmlFor="lname">Last Name: </label>
            <input type="text" id="lname" onChange={handleChange} />
          </div>



          <div>
            <label htmlFor="address">Address: </label>
            <input type="text" id="address" onChange={handleChange} />
          </div>


          <div>
            <label htmlFor="apartment">Apartment: </label>
            <input type="text" id="apartment" onChange={handleChange} />
          </div>

          <div>
            <label htmlFor="street">Street: </label>
            <input type="text" id="street" onChange={handleChange} />
          </div>

          <div>
            <label htmlFor="city">City: </label>
            <input type="text" id="city" onChange={handleChange} />
          </div>

          <div>
            <label htmlFor="province">Province: </label>
            <input type="text" id="province" onChange={handleChange} />
          </div>

          <div>
            <label htmlFor="postalcode">Postal code: </label>
            <input type="text" id="postalcode" onChange={handleChange} />
          </div>

          <div>
            <label htmlFor="country">Country: </label>
            <input type="text" id="country" onChange={handleChange} />
          </div>

          <div>
            <label htmlFor="phone">Phone number: </label>
            <input type="phone" id="phone" onChange={handleChange} />
          </div>

         
          <div>
            <Button
              type="submit"
              disabled={
                Object.keys(formData).length < 12 ||
                Object.values(formData).some((e) => e === "")
              }
            >
              Place your oder
            </Button>
          </div>
        </StyledDivForFormContent>
      </StyledSubDivForCard>
    </>

<>
<StyledRightColumn>
<p>Subtotal</p>
<p>Shipping fee</p>
<p>Taxes</p>
<p>Total</p>

</StyledRightColumn>
</>

<h3>back to cart</h3>

</>



    )

}

export default Checkout

const Button = styled.button`
  width: fit-content;
  height: fit-content;
  background-color: #ceff1a;
  padding: 10px 30px;
  border-radius: 30px;
  text-decoration: none;
  color: black;
  font-size: 30px;
  margin: 20px;
  display: block;
  align-content: center;
`;

const StyledSubDivForCard = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  width: 600px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  overflow: hidden;
  /* box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3); */
  margin: 20px auto;
  padding: 25px;
  justify-content: center;
  font-family: "Lora", serif;
  font-size: large;
  background-color: ---color-main-background;
`;

const StyledDivForFormContent = styled.form`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  margin: 10px;
  padding: 5px;
  justify-content: center;
  font-family: "Lora", serif;
  font-size: large;
  line-height: 1.5;
  align-items: flex-end;
`;

const StyledRightColumn = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  padding: 5px;
  width: 150px;
  height: fit-content;
`