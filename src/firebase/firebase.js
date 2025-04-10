// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAgk5sXBNO5l277qvAtEC2Gd4TbQxpjIdM",
  authDomain: "nivi-weaves.firebaseapp.com",
  projectId: "nivi-weaves",
  storageBucket: "nivi-weaves.firebasestorage.app",
  messagingSenderId: "397644830290",
  appId: "1:397644830290:web:383fc2fcaef7a74418b18b",
  measurementId: "G-BSG9NDR3NH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export {app, auth};
export const db = getFirestore(app)