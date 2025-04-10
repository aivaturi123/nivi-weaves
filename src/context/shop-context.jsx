import React, { createContext, useState } from 'react'
import {PRODS } from "../prods"

export const ShopContext = createContext(null);

const getDefaultCart = () => {

    let cart = {};
    for (let i = 0; i < PRODS.length; i++) {
        cart[i] = 0;
    }
    return cart;

}
export const ShopContextProvider = (props) => {
  
    const [cartItems, setCartItems] = useState(getDefaultCart());    
    
    const getTotalCartAmount = () => {
        let total = 0;
        for(const item in cartItems) {

            if(cartItems[item] > 0) {
                let iteminfo = PRODS.find((product) => product.id === Number(item))
                total += cartItems[item] * iteminfo.price;
            }

        }
        return total;
    }
    const addToCart = (id) => { setCartItems((prev) => ({...prev, [id]: prev[id] + 1}))};
    const removeFromCart = (id) => { setCartItems((prev) => ({...prev, [id]: prev[id] - 1}))};
    const updateCartItemCount= (newamo, id) => { setCartItems((prev) => ({...prev, [id]: newamo }))}
    const contextValue = {cartItems, addToCart, removeFromCart, updateCartItemCount, getTotalCartAmount};
    
    return (

        <ShopContext.Provider value = {contextValue}>
            {props.children}
        </ShopContext.Provider>

    );  
};
