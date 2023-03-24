import { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Checkout = () => {
  //useState
//   const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({});
  const [selectedItem, setSelectedItem] = useState("");
  const [cartItems, setCartItems] = useState([]);

  const navigate = useNavigate();

  let total = 0;

  //useEffect
  useEffect(() => {
    //fetch all my items
    fetch("/cart")
      .then((response) => response.json())
      .then((data) => {
        console.log(data.data);
        setCartItems(data.data);
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
  const handleClick = (e) => {
    total = 0;
    e.preventDefault();
    console.log(formData);


    fetch("/confirmation", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      // fname, lname, phone, address, email, price, and item.
      body: JSON.stringify(
        {
        firstName: formData.firstName,
        lastName: formData.lastName,
        address: formData.address,
        email: formData.email,
        apartment: formData.apartment,
        city: formData.city,
        province: formData.province,
        postalcode: formData.postalcode,
        country: formData.country,
        phone: formData.phone

    }
        ), //HERE I'M NOT SURE: order or cart should be there?
    })
      //sends the data to the server
      .then((res) => res.json())
      //receives the data back from the server
      .then((data) => {
        console.log(data);
        navigate(`/confirmation/${data.data.orderId}`);
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
  cartItems.map((cartItem) => {



    total = total + (Number((cartItem.price).slice(1)) * cartItem.quantity);
    //toFixed(2)
  })

  //JSX
  return (
    <WrapperCheckout>
      <>
        <StyledSubDivForCard>
          <StyledDivForFormContent>
            <h2>Shipping information</h2>
            <StyledRowsForForm>
              <div>
                <label htmlFor="email"></label>
                <input
                  placeholder="Email"
                  type="text"
                  id="email"
                  onChange={handleChange}
                  required
                />
              </div>
            </StyledRowsForForm>
            <StyledRowsForForm>
              <div>
                <label htmlFor="firstName"> </label>
                <input
                  placeholder="First Name"
                  type="text"
                  id="firstName"
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="lastName"></label>
                <input
                  placeholder="Last Name"
                  type="text"
                  id="lastName"
                  onChange={handleChange}
                  required
                />
              </div>
            </StyledRowsForForm>

            <StyledRowsForForm>
              <div>
                <label htmlFor="address"></label>
                <input
                  placeholder="Address"
                  type="text"
                  id="address"
                  onChange={handleChange}
                  required
                />
              </div>
            </StyledRowsForForm>

            <StyledRowsForForm>
              <div>
                <label htmlFor="apartment"></label>
                <input
                  placeholder="Apartment"
                  type="text"
                  id="apartment"
                  onChange={handleChange}
                />
              </div>
            </StyledRowsForForm>

            <StyledRowsForForm>
              <div>
                <label htmlFor="city"></label>
                <input
                  placeholder="City"
                  type="text"
                  id="city"
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="province"></label>
                <input
                  placeholder="Province"
                  type="text"
                  id="province"
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="postalcode"></label>
                <input
                  placeholder="Postal code"
                  type="text"
                  id="postalcode"
                  onChange={handleChange}
                  required
                />
              </div>
            </StyledRowsForForm>

            <StyledRowsForForm>
              <div>
                <label htmlFor="country"></label>
                <input
                  placeholder="Country"
                  type="text"
                  id="country"
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="phone"></label>
                <input
                  placeholder="Phone number"
                  type="phone"
                  id="phone"
                  onChange={handleChange}
                  required
                />
              </div>
            </StyledRowsForForm>

            <div>
              <StyledCartLink to="/cart">Back to cart</StyledCartLink>
            </div>
          </StyledDivForFormContent>
        </StyledSubDivForCard>
      </>

      <>
        <StyledRightColumn>
          <h4>Total $: {total.toFixed(2)}</h4>
          
             
                    {/* // console.log(cartItem["quantity"])
                    // console.log(cartItem["price"])
console.log(total)
                    // console.log("cartItem: ", cartItem)
                //   return (
                //     <option key={cartItem.id} value={cartItem.id}>
                //         {cartItem.price} 
                //         </option>
                //   ); */}
                
          <Button onClick={(e) => handleClick(e)}>Place your oder</Button>
        </StyledRightColumn>
      </>
    </WrapperCheckout>
  );
};

export default Checkout;

const WrapperCheckout = styled.div`
  background-color: #edf0f2;
  display: flex;
  flex-direction: row;
`;

const Button = styled.button`
  width: max-content;
  height: fit-content;
  background-color: #ceff1a;
  padding: 10px 30px;
  border-radius: 30px;
  text-decoration: none;
  color: black;
  font-size: 20px;
  margin: 10px;
  display: block;
  align-content: center;
`;

const StyledSubDivForCard = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  width: 700px;
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
  padding: 10px;
  justify-content: left;
  font-family: "Lora", serif;
  font-size: large;
  line-height: 2;
  align-items: flex-start;
`;

const StyledRightColumn = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  width: 250px;
  height: fit-content;
  padding: 20px;
  margin-right: 30px;
  margin-top: 20px;
  border: 1px solid rgba(0, 0, 0, 0.1);
`;
const StyledCartLink = styled(Link)`
  font-weight: 700;
`;
const StyledRowsForForm = styled.div`
  display: flex;
  flex-direction: row;
  width: 650px;
  height: fit-content;
`;
