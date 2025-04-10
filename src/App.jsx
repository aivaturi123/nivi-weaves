// daddyo
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/navbar';
import { Cart } from './pages/cart/cart.jsx';
import { Shop } from './pages/shop/shop.jsx';
import { ShopContextProvider } from './context/shop-context'; 
import Login from "./pages/auth/login.jsx";       
import Register from "./pages/auth/register.jsx"; 
import { ToastContainer } from 'react-toastify';


function App() {
  return (
    <div className="App">
      <ShopContextProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Shop />} />
            <Route path="/cart" element={<Cart />} />
            <Route path = "/login" element = {<Login/>}/>
            <Route path = "/register" element = {<Register/>}/>
          </Routes>
          <ToastContainer />
        </Router>
      </ShopContextProvider>

    </div>
  );
}

export default App;
