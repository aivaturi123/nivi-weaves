import {React, useContext} from 'react'
import { ShopContext } from '../../context/shop-context';


export const CartItem = (props) => {
  const {id, prodName, price, prodImage} = props.data;
  const { cartItems, addToCart, removeFromCart, updateCartItemAmount } = useContext(ShopContext);
  return (
    <div className='cartItem'>

        <img src = {prodImage}/>
        <div className = "desc">

            <p>
                <b> {prodName} </b>
            </p>
            <p>
                Price: ${price}
            </p>

            <div className = "counthandler">

              <button onClick = {() => removeFromCart(id)}> - </button>
              <input value = {cartItems[id]} onChange = {(e) => updateCartItemAmount(Number(e.target.value))}/>  
              <button onClick = {() => addToCart(id)}> + </button>


            </div>

        </div>

    </div>
  ) 
}
