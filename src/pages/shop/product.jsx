import React, {useContext, useState }from 'react';
import { ShopContext } from '../../context/shop-context';
export const Product = (props) => {
  const {id, prodName, price, prodImage} = props.data;
  const {addToCart, cartItems} = useContext(ShopContext);
  const cartItemAmount = cartItems[id]
  return (
    <div className='product'>
      <img src = {prodImage} />
      <div className='desc'>
        <p> <b> {prodName}</b></p>
        <p> Price: ${price}</p>
      </div>
      <button className='addtocart' onClick = {() => addToCart(id)}> 
        Add to cart {cartItemAmount >0 && <> ({cartItemAmount})</>}</button>
    </div>
  )
}
