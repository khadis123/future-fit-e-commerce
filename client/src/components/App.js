import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Homepage from "./Homepage";
import Confirmation from "./Confirmation";
import Cart from "./Cart";
import Checkout from "./Checkout";
import AboutUs from "./Footer/AboutUs";
import ContactUs from "./Footer/ContactUs";
import { useState } from "react";
import Items from "./Items";
import Category from "../Category";
import ItemDetails from "./ItemDetails";
import { useEffect } from "react";

function App() {

  const [countItem, setCountItem] = useState(null);
  
  
  //Fetching the data from the cart to know what we have in the cart
  
  const itemFetching = () => {
    fetch("/cart")
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data);
        setCountItem(data.data);
      });
  };
useEffect(()=>{

itemFetching();
}, []) 

  return (
    <BrowserRouter>
      <Header itemFetching={itemFetching} countItem={countItem} setCountItem={setCountItem}/>
      <Routes>
        <Route path="/" element={<Homepage/>}/>
        <Route path="/cart" element={<Cart countItem={countItem} setCountItem={setCountItem} itemFetching={itemFetching}/>}/>
        <Route path="/confirmation/:orderId" element={<Confirmation/>}/>
        <Route path="/checkout" element={<Checkout/>}/>
        <Route path="/about" element={<AboutUs/>}/>
        <Route path="/contact" element={<ContactUs/>}/>
        <Route path="/items" element={<Items/>}/>
        <Route path="/items/:_id" element={<ItemDetails countItem={countItem} setCountItem={setCountItem} itemFetching={itemFetching}/>}/>
        <Route path="/categories/:category" element={<Category/>}/>
        <Route path="" element={<h1>404: Oops!</h1>} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
