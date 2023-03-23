import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Homepage from "./Homepage";
import Confirmation from "./Confirmation";
import Checkout from "./Checkout";
import AboutUs from "./Footer/AboutUs";
import ContactUs from "./Footer/ContactUs";
import SingleItem from "./SingleItem";
import Items from "./Items";
import Category from "../Category";
import ItemDetails from "./ItemDetails";

function App() {

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage/>}/>
        <Route path="/confirmation" element={<Confirmation/>}/>
        <Route path="/checkout" element={<Checkout/>}/>
        <Route path="/about" element={<AboutUs/>}/>
        <Route path="/contact" element={<ContactUs/>}/>
        <Route path="/items" element={<Items/>}/>
        <Route path="/items/:_id" element={<ItemDetails/>}/>
        <Route path="/categories/:category" element={<Category/>}/>
        <Route path="" element={<h1>404: Oops!</h1>} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
