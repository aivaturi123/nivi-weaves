import React, { createContext, useState, useEffect } from 'react';
import { PRODS } from "../prods";
import { db } from "../firebase/firebase"; // Adjust path if needed
import { doc, updateDoc } from "firebase/firestore";
import { useAuth } from "../context/authcontext";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  for (let i = 0; i < PRODS.length; i++) {
    cart[i] = 0;
  }
  return cart;
};

export const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState(getDefaultCart());
  const { currentUser } = useAuth();

  const getTotalCartAmount = () => {
    let total = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let iteminfo = PRODS.find((product) => product.id === Number(item));
        total += cartItems[item] * iteminfo.price;
      }
    }
    return total;
  };

  // 🔥 Update Firestore whenever cartItems change
  useEffect(() => {
    const updateCartInFirestore = async () => {
      if (!currentUser || !currentUser.uid) return;

      const userDocRef = doc(db, "Users", currentUser.uid);

      const updates = {
        sari1: cartItems[0] || 0,
        sari2: cartItems[1] || 0,
        sari3: cartItems[2] || 0,
        sari4: cartItems[3] || 0,
        sari5: cartItems[4] || 0,
        sari6: cartItems[5] || 0,
        total: getTotalCartAmount(),
      };

      try {
        await updateDoc(userDocRef, updates);
      } catch (error) {
        console.error("Error updating Firestore cart:", error);
      }
    };

    updateCartInFirestore();
  }, [cartItems, currentUser]);

  const addToCart = (id) => {
    setCartItems((prev) => ({ ...prev, [id]: prev[id] + 1 }));
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => ({ ...prev, [id]: prev[id] - 1 }));
  };

  const updateCartItemCount = (newamo, id) => {
    setCartItems((prev) => ({ ...prev, [id]: newamo }));
  };

  const contextValue = {
    cartItems,
    addToCart,
    removeFromCart,
    updateCartItemCount,
    getTotalCartAmount,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};



// import React, { createContext, useState } from 'react'
// import {PRODS } from "../prods"

// export const ShopContext = createContext(null);

// const getDefaultCart = () => {

//     let cart = {};
//     for (let i = 0; i < PRODS.length; i++) {
//         cart[i] = 0;
//     }
//     return cart;

// }
// export const ShopContextProvider = (props) => {
  
//     const [cartItems, setCartItems] = useState(getDefaultCart());    
    
//     const getTotalCartAmount = () => {
//         let total = 0;
//         for(const item in cartItems) {

//             if(cartItems[item] > 0) {
//                 let iteminfo = PRODS.find((product) => product.id === Number(item))
//                 total += cartItems[item] * iteminfo.price;
//             }

//         }
//         return total;
//     }
//     const addToCart = (id) => { setCartItems((prev) => ({...prev, [id]: prev[id] + 1}))};
//     const removeFromCart = (id) => { setCartItems((prev) => ({...prev, [id]: prev[id] - 1}))};
//     const updateCartItemCount= (newamo, id) => { setCartItems((prev) => ({...prev, [id]: newamo }))}
//     const contextValue = {cartItems, addToCart, removeFromCart, updateCartItemCount, getTotalCartAmount};
    
//     return (

//         <ShopContext.Provider value = {contextValue}>
//             {props.children}
//         </ShopContext.Provider>

//     );  
// };
