import React, { createContext, useState, useEffect, useRef } from 'react';
import { PRODS } from "../prods";
import { db } from "../firebase/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useAuth } from "../context/authcontext";

export const ShopContext = createContext(null);

export const ShopContextProvider = (props) => {
  const { currentUser } = useAuth();
  const [cartItems, setCartItems] = useState({});
  const cartLoadedRef = useRef(false); // ensures Firestore data has been fetched

  // Generates cart from Firestore data or zeros
  const getDefaultCart = (data = {}) => {
    let cart = {};
    for (let i = 1; i <= 6; i++) {
      cart[i - 1] = data[`sari${i}`] || 0;
    }
    return cart;
  };

  // Reset and load cart from Firestore on user login
  useEffect(() => {
    const loadCart = async () => {
      setCartItems({}); // clear stale data
      cartLoadedRef.current = false;

      if (!currentUser || !currentUser.uid) return;

      const userDocRef = doc(db, "Users", currentUser.uid);
      try {
        const docSnap = await getDoc(userDocRef);
        const userData = docSnap.exists() ? docSnap.data() : {};
        const newCart = getDefaultCart(userData);
        setCartItems(newCart);
        cartLoadedRef.current = true;
      } catch (error) {
        console.error("Error loading cart from Firestore:", error);
      }
    };

    loadCart();
  }, [currentUser]);

  const getTotalCartAmount = () => {
    let total = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = PRODS.find((product) => product.id === Number(item));
        total += cartItems[item] * itemInfo.price;
      }
    }
    return total;
  };

  // Update Firestore only after cart is loaded
  useEffect(() => {
    const updateCartInFirestore = async () => {
      if (!currentUser || !currentUser.uid || !cartLoadedRef.current) return;

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
    setCartItems((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => ({ ...prev, [id]: Math.max((prev[id] || 0) - 1, 0) }));
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


// import React, { createContext, useState, useEffect } from 'react';
// import { PRODS } from "../prods";
// import { db } from "../firebase/firebase";
// import { doc, getDoc, updateDoc } from "firebase/firestore";
// import { useAuth } from "../context/authcontext";

// export const ShopContext = createContext(null);

// export const ShopContextProvider = (props) => {
//   const { currentUser } = useAuth();
//   const [cartItems, setCartItems] = useState({});

//   const getDefaultCart = (firestoreData) => {
//     let cart = {};
//     for (let i = 1; i <= 6; i++) {
//       cart[i - 1] = firestoreData?.[`sari${i}`] || 0;
//     }
//     return cart;
//   };

//   // 🟢 Load cart from Firestore when user logs in or refreshes
//   useEffect(() => {
//     const loadCartFromFirestore = async () => {
//       if (!currentUser || !currentUser.uid) return;

//       const userDocRef = doc(db, "Users", currentUser.uid);
//       try {
//         const docSnap = await getDoc(userDocRef);
//         if (docSnap.exists()) {
//           const data = docSnap.data();
//           setCartItems(getDefaultCart(data));
//         }
//       } catch (error) {
//         console.error("Error loading cart from Firestore:", error);
//       }
//     };

//     loadCartFromFirestore();
//   }, [currentUser]);

//   const getTotalCartAmount = () => {
//     let total = 0;
//     for (const item in cartItems) {
//       if (cartItems[item] > 0) {
//         let iteminfo = PRODS.find((product) => product.id === Number(item));
//         total += cartItems[item] * iteminfo.price;
//       }
//     }
//     return total;
//   };

//   useEffect(() => {
//     const updateCartInFirestore = async () => {
//       if (!currentUser || !currentUser.uid) return;

//       const userDocRef = doc(db, "Users", currentUser.uid);

//       const updates = {
//         sari1: cartItems[0] || 0,
//         sari2: cartItems[1] || 0,
//         sari3: cartItems[2] || 0,
//         sari4: cartItems[3] || 0,
//         sari5: cartItems[4] || 0,
//         sari6: cartItems[5] || 0,
//         total: getTotalCartAmount(),
//       };

//       try {
//         await updateDoc(userDocRef, updates);
//       } catch (error) {
//         console.error("Error updating Firestore cart:", error);
//       }
//     };

//     updateCartInFirestore();
//   }, [cartItems, currentUser]);

//   const addToCart = (id) => {
//     setCartItems((prev) => ({ ...prev, [id]: prev[id] + 1 }));
//   };

//   const removeFromCart = (id) => {
//     setCartItems((prev) => ({ ...prev, [id]: prev[id] - 1 }));
//   };

//   const updateCartItemCount = (newamo, id) => {
//     setCartItems((prev) => ({ ...prev, [id]: newamo }));
//   };

//   const contextValue = {
//     cartItems,
//     addToCart,
//     removeFromCart,
//     updateCartItemCount,
//     getTotalCartAmount,
//   };

//   return (
//     <ShopContext.Provider value={contextValue}>
//       {props.children}
//     </ShopContext.Provider>
//   );
// };


// import React, { createContext, useState, useEffect } from 'react';
// import { PRODS } from "../prods";
// import { db } from "../firebase/firebase";
// import { doc, updateDoc } from "firebase/firestore";
// import { useAuth } from "../context/authcontext";

// export const ShopContext = createContext(null);

// export const ShopContextProvider = (props) => {
//   const { currentUser } = useAuth();
//   const [cartItems, setCartItems] = useState({});

//   const getDefaultCart = () => {
//     let cart = {};
//     for (let i = 1; i <= 6; i++) {
//       cart[i - 1] = currentUser?.[`sari${i}`] || 0;
//     }
//     return cart;
//   };

//   useEffect(() => {
//     if (currentUser && currentUser.uid) {
//       setCartItems(getDefaultCart());
//     }
//   }, [currentUser]);

//   const getTotalCartAmount = () => {
//     let total = 0;
//     for (const item in cartItems) {
//       if (cartItems[item] > 0) {
//         let iteminfo = PRODS.find((product) => product.id === Number(item));
//         total += cartItems[item] * iteminfo.price;
//       }
//     }
//     return total;
//   };

//   useEffect(() => {
//     const updateCartInFirestore = async () => {
//       if (!currentUser || !currentUser.uid) return;

//       const userDocRef = doc(db, "Users", currentUser.uid);

//       const updates = {
//         sari1: cartItems[0] || 0,
//         sari2: cartItems[1] || 0,
//         sari3: cartItems[2] || 0,
//         sari4: cartItems[3] || 0,
//         sari5: cartItems[4] || 0,
//         sari6: cartItems[5] || 0,
//         total: getTotalCartAmount(),
//       };

//       try {
//         await updateDoc(userDocRef, updates);
//       } catch (error) {
//         console.error("Error updating Firestore cart:", error);
//       }
//     };

//     updateCartInFirestore();
//   }, [cartItems, currentUser]);

//   const addToCart = (id) => {
//     setCartItems((prev) => ({ ...prev, [id]: prev[id] + 1 }));
//   };

//   const removeFromCart = (id) => {
//     setCartItems((prev) => ({ ...prev, [id]: prev[id] - 1 }));
//   };

//   const updateCartItemCount = (newamo, id) => {
//     setCartItems((prev) => ({ ...prev, [id]: newamo }));
//   };

//   const contextValue = {
//     cartItems,
//     addToCart,
//     removeFromCart,
//     updateCartItemCount,
//     getTotalCartAmount,
//   };

//   return (
//     <ShopContext.Provider value={contextValue}>
//       {props.children}
//     </ShopContext.Provider>
//   );
// };


// import React, { createContext, useState, useEffect } from 'react';
// import { PRODS } from "../prods";
// import { db } from "../firebase/firebase"; // Adjust path if needed
// import { doc, updateDoc } from "firebase/firestore";
// import { useAuth } from "../context/authcontext";

// export const ShopContext = createContext(null);

// const getDefaultCart = () => {
//   let cart = {};
//   for (let i = 0; i < PRODS.length; i++) {
//     cart[i] = 0;
//   }
//   return cart;
// };

// export const ShopContextProvider = (props) => {
//   const [cartItems, setCartItems] = useState(getDefaultCart());
//   const { currentUser } = useAuth();

//   const getTotalCartAmount = () => {
//     let total = 0;
//     for (const item in cartItems) {
//       if (cartItems[item] > 0) {
//         let iteminfo = PRODS.find((product) => product.id === Number(item));
//         total += cartItems[item] * iteminfo.price;
//       }
//     }
//     return total;
//   };

//   useEffect(() => {
//     const updateCartInFirestore = async () => {
//       if (!currentUser || !currentUser.uid) return;

//       const userDocRef = doc(db, "Users", currentUser.uid);

//       const updates = {
//         sari1: cartItems[0] || 0,
//         sari2: cartItems[1] || 0,
//         sari3: cartItems[2] || 0,
//         sari4: cartItems[3] || 0,
//         sari5: cartItems[4] || 0,
//         sari6: cartItems[5] || 0,
//         total: getTotalCartAmount(),
//       };

//       try {
//         await updateDoc(userDocRef, updates);
//       } catch (error) {
//         console.error("Error updating Firestore cart:", error);
//       }
//     };

//     updateCartInFirestore();
//   }, [cartItems, currentUser]);

//   const addToCart = (id) => {
//     setCartItems((prev) => ({ ...prev, [id]: prev[id] + 1 }));
//   };

//   const removeFromCart = (id) => {
//     setCartItems((prev) => ({ ...prev, [id]: prev[id] - 1 }));
//   };

//   const updateCartItemCount = (newamo, id) => {
//     setCartItems((prev) => ({ ...prev, [id]: newamo }));
//   };

//   const contextValue = {
//     cartItems,
//     addToCart,
//     removeFromCart,
//     updateCartItemCount,
//     getTotalCartAmount,
//   };

//   return (
//     <ShopContext.Provider value={contextValue}>
//       {props.children}
//     </ShopContext.Provider>
//   );
// };
