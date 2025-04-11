import React from 'react'
import './shop.css';
import { PRODS } from "../../prods";
import { Product} from "./product";
import {Sidebar} from '../../components/sidebar.jsx';
import { NavbarTop } from '../../components/navbartop.jsx';
import '../../components/navbartop.css';

export const Shop = () => {
  return (
    <>
    <div className='temp'>
    <NavbarTop/>
    </div>
    <div className='shop'>
      
        <div className='header'>
            
            <h1> <b> Nivi Weaves.</b></h1>
            <marquee> <b> Beautiful, handwoven saris, crafted from India. Navigate using "Shop" and "Cart."</b></marquee>

        </div>

        <div className='prods'> {PRODS.map((product) => 
          <Product data = {product}/>)}


        </div>

    </div>
    </>
    
  );
};