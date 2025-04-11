import React from 'react'
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'phosphor-react';
import { User} from 'phosphor-react';

import './navbar.css';
export const Navbar = () => {
  return (
    <div className='navbar'>
        <div className='links'>
            <Link to="/shop"> Shop </Link>
            <Link to="/cart"> <ShoppingCart className = "cart" size = {27}/></Link>
            <Link to = "/profile"> <User className = "user" size = {27}/> </Link>
            
        </div>
    </div>
  )
};
