// import { onAuthStateChanged } from "firebase/auth";
// import {auth} from "../../firebase/firebase"
// import { useEffect } from "react";
// import { useContext } from "react";
// import { onAuthStateChanged } from "firebase/auth";
// import { doSignInWithGoogle, doSignInWithEmailAndPassword } from "../../firebase/auth";
// import {useAuth} from "../../../contexts/authcontext";
// const AuthContext = React.createContext();

// export function useAuth() {
//     return useContext(AuthContext);
// }

// export function AuthProvider ({children}) {

//     const [currentUser, setCurrentUser] = useState(null);
//     const [userLoggedIn, setUserLoggedIn] = useState(false);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const unsubscribe = onAuthStateChanged(auth, initalizeUser);
//         return unsubscribe;
//     }, []);

//     async function initalizeUser(user) {
//         if(user) {
//             setCurrentUser({...user});
//             setUserLoggedIn(true);
//         }
//         else {
//             setCurrentUser(null);
//             setUserLoggedIn(false);
//         }
//         setLoading(false);
//     }
//     const value = {
//         currentUser,
//         userLoggedIn,
//         loading
//     }
//     return (
//         <AuthContext.Provider value = {value}>
//             {!loading && children}
//         </AuthContext.Provider>
//     )
// }