import { useContext } from 'react'
import React from 'react'
import { ShopContext } from '../../context/shop-context'
import { PRODS } from '../../prods'
import { CartItem } from './cartItem'
import {Product} from "../shop/product"
import "./cart.css"
import { useNavigate } from 'react-router-dom'

export const Cart = () => {
  const { cartItems, getTotalCartAmount} = useContext(ShopContext);
  const totalamount = getTotalCartAmount();
  const navigate = useNavigate();
  return (
    <div className='cart'>
      <div>
        <h1> Your Cart Items... </h1>
      </div>
      <div className='cartItems'>

        {PRODS.map((product) => {
          if(cartItems[product.id] !== 0) {

            return <CartItem data = {product}/>
          }
        })}
      </div>
        {totalamount > 0 ? ( 
      <div className='checkout'>
        
        <p> Subtotal: ${totalamount}</p>
        <button onClick= {() => navigate("/shop")}> Continue Shopping </button>
        <button> Checkout </button>
      </div>): (

        <h1> Buy something! </h1>
      
    )}</div>
  );
}
