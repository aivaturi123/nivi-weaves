import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { NavbarTop } from './components/navbartop.jsx';
import { Cart } from './pages/cart/cart.jsx';
import { Shop } from './pages/shop/shop.jsx';
import { Profile } from './pages/auth/profile.jsx'
import { ShopContextProvider } from './context/shop-context'; 
import Login from "./pages/auth/login.jsx";       
import Register from "./pages/auth/register.jsx"; 
import { ToastContainer } from 'react-toastify';
import { useAuth } from './context/authcontext';
import { Navigate } from 'react-router-dom';

function App() {
  const { userLoggedIn, loading } = useAuth();
  
  if (loading) return <p>Loading...</p>; // Wait for Firebase to check auth
  
  return (
    <div className="App">
      <ShopContextProvider>
       
        <Router>
 
          <ToastContainer />
          
          
          {userLoggedIn && <NavbarTop />}

          <Routes>
            
            <Route
              path="/shop"
              element={userLoggedIn ? <Shop /> : <Navigate to="/login" />}
            />
            <Route
              path="/cart"
              element={userLoggedIn ? <Cart /> : <Navigate to="/login" />}
            />
            <Route
              path="/profile"
              element={<Profile/>}
            />
         
            <Route
              path="/login"
              element={userLoggedIn ? <Shop/> : <Login />}
            />
            <Route
              path="/register"
              element={ <Register />}
            />
            
          </Routes>
        </Router>
      </ShopContextProvider>
    </div>
  );
}

export default App;
