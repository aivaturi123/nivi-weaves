// import { createUserWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, signInWithPopup } from "firebase/auth";
// import {auth} from "./firebase";
// import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword  } from "firebase/auth";


// export const doCreateUserWithEmailAndPassword = async (email, password) => {
//     return createUserWithEmailAndPassword(auth, email, password);
// };

// export const doSignInWithGoogle = async () => {
//  const provider = new GoogleAuthProvider();
//  const result = await signInWithPopup(auth, provider);
//     // result.user;
//  return result
// }

// export const doSignOut = () => {
//     return auth.signOut();
// }

// export const doPasswordReset = (email) => {
//     return sendPasswordResetEmail(auth, email);
// }

// export const doSendEmailVerification = () => {
//     return sendEmailVerification(auth.currentUser, {
//         url: `${window.location.origin}`,
//     })
// }