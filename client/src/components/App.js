import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Homepage from "./Homepage";
import Confirmation from "./Confirmation";
import Checkout from "./Checkout";
import AboutUs from "./Footer/AboutUs";
import Help from "./Footer/Help";
import ContactUs from "./Footer/ContactUs";
import SingleItem from "./SingleItem";
import Items from "./Items";

function App() {

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage/>}/>
        <Route path="/confirmation" element={<Confirmation/>}/>
        <Route path="/checkout" element={<Checkout/>}/>
        <Route path="/about" element={<AboutUs/>}/>
        <Route path="/help" element={<Help/>}/>
        <Route path="/contact" element={<ContactUs/>}/>
        <Route path="/items" element={<Items/>}/>
        <Route path="/items/:itemId" element={<SingleItem/>}/>
        <Route path="" element={<h1>404: Oops!</h1>} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
