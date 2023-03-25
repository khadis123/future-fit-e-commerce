import { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Checkout = ({setCountItem}) => {
  //useState
  const [formData, setFormData] = useState({});
  const [selectedItem, setSelectedItem] = useState("");
  const [cartItems, setCartItems] = useState([]);

  const navigate = useNavigate();
  let total = 0;

  useEffect(() => {
    //fetch all my items in the cart
    fetch("/cart")
      .then((response) => response.json())
      .then((data) => {
        console.log(data.data);
        setCartItems(data.data);
      })
      .catch((error) => console.log(error));
  }, []);

  //onSubmit handler
  const handleClick = (e) => {
    total = 0;
    e.preventDefault();

    fetch("/confirmation", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      // fname, lname, phone, address, email, price, and item.
      body: JSON.stringify({
        firstName: formData.firstName,
        lastName: formData.lastName,
        address: formData.address,
        email: formData.email,
        apartment: formData.apartment,
        city: formData.city,
        province: formData.province,
        postalCode: formData.postalcode,
        country: formData.country,
        phone: formData.phone,
      }),
    })
      //sends the data to the server
      .then((res) => res.json())
      //receives the data back from the server
      .then((data) => {
        setCountItem(null)
        navigate(`/confirmation/${data.orderId}`);
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
    total = total + Number(cartItem.price.slice(1)) * cartItem.quantity;
  });

  //JSX
  return (
    <WrapperCheckout>
      <>
        <Title>Shipping information</Title>
        <StyledSubDivForCard>
          <StyledDivForFormContent>
            <SectionContact>Contact Information</SectionContact>
            <StyledRowsForForm>
              <div>
                <label htmlFor="email"></label>
                <StyledInput
                  placeholder="Email"
                  type="text"
                  id="email"
                  onChange={handleChange}
                  required
                />
              </div>
            </StyledRowsForForm>
            <SectionShip>Shipping Address</SectionShip>
            <StyledRowsForForm>
              <div>
                <label htmlFor="firstName"> </label>
                <StyledInput
                  placeholder="First Name"
                  type="text"
                  id="firstName"
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="lastName"></label>
                <StyledInput
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
                <StyledInput
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
                <StyledInput
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
                <StyledInput
                  placeholder="City"
                  type="text"
                  id="city"
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="province"></label>
                <StyledInput
                  placeholder="Province"
                  type="text"
                  id="province"
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="postalcode"></label>
                <StyledInput
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
                <StyledInput
                  placeholder="Country"
                  type="text"
                  id="country"
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="phone"></label>
                <StyledInput
                  placeholder="Phone number"
                  type="phone"
                  id="phone"
                  onChange={handleChange}
                  required
                />
              </div>
            </StyledRowsForForm>

            <StyledCartLink to="/cart">Back to cart</StyledCartLink>
          </StyledDivForFormContent>
        </StyledSubDivForCard>
      </>

      <>
        <StyledRightColumn>
          <h5>Order Total: ${total.toFixed(2)}</h5>

          <Button onClick={(e) => handleClick(e)}>Place your order</Button>
        </StyledRightColumn>
      </>
    </WrapperCheckout>
  );
};

export default Checkout;

const Title = styled.h1`
  font-size: 30px;
  margin: 48px;
`;

const WrapperCheckout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 50px;
`;

const SectionContact = styled.h6`
  margin-bottom: 5px;
`;

const SectionShip = styled.h6`
  margin-top: 30px;
  margin-bottom: 5px;
`;

const Button = styled.button`
  margin-top: 10px;
  width: 250px;
`;

const StyledSubDivForCard = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  border: 1px solid gray;
  border-radius: 2px;
  padding: 24px;
  max-width: 600px;
  justify-content: center;
  background-color: ---color-main-background;
`;

const StyledDivForFormContent = styled.form`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  margin: 10px;
  padding: 10px;
  justify-content: left;
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
  align-items: center;
`;
const StyledCartLink = styled(Link)`
  margin-top: 20px;
  text-decoration: underline;
  font-size: 12px;
  cursor: pointer;
`;
const StyledRowsForForm = styled.div`
  display: flex;
  flex-direction: row;
  width: 650px;
  height: fit-content;
`;

const StyledInput = styled.input`
  width: 160px;
  margin: 5px;
`;
