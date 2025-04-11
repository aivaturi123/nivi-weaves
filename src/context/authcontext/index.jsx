// import React, { useContext, useEffect, useState } from "react";
// import { onAuthStateChanged } from "firebase/auth";
// import { auth } from "../../firebase/firebase"; // Adjust path if needed
// import { doc, getDoc } from "firebase/firestore";
// const AuthContext = React.createContext();

// // 👇 Custom hook to use auth anywhere
// export function useAuth() {
//   return useContext(AuthContext);
// }

// // 👇 Context provider
// export function AuthProvider({ children }) {
//   const [currentUser, setCurrentUser] = useState(null);
//   const [userLoggedIn, setUserLoggedIn] = useState(false);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         setCurrentUser({ ...user });
//         setUserLoggedIn(true);
//       } else {
//         setCurrentUser(null);
//         setUserLoggedIn(false);
//       }
//       setLoading(false); // Done checking auth
//     });

//     return () => unsubscribe();
//   }, []);

//   const value = {
//     currentUser,
//     userLoggedIn,
//     loading,
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// }

import React, { useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../firebase/firebase"; // Firebase imports
import { doc, getDoc } from "firebase/firestore"; // Firestore functions

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true); // Wait for Firebase to check auth

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // User is logged in, now fetch extra data from Firestore
        const userDocRef = doc(db, "Users", user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          // If Firestore doc exists, add extra data to the user
          setCurrentUser({
            ...user, // Include Firebase Auth user data
            firstName: userDoc.data().firstName,
            lastName: userDoc.data().lastName,
            // You can add more fields here if needed (like profile pic, etc.)
          });
        } else {
          setCurrentUser(user); // If no extra data in Firestore, just use the Firebase Auth user
        }

        setUserLoggedIn(true);
      } else {
        setCurrentUser(null);
        setUserLoggedIn(false);
      }
      setLoading(false); // Done with loading state
    });

    return () => unsubscribe(); // Clean up listener when the component is unmounted
  }, []);

  const value = {
    currentUser,
    userLoggedIn,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children} {/* Render children only after Firebase auth finishes */}
    </AuthContext.Provider>
  );
}
