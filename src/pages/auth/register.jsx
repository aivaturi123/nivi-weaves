import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth, db } from "../../firebase/firebase";
import { setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authcontext'; // ✅ import the context

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const navigate = useNavigate();
  const { updateCurrentUserFromFirestore } = useAuth(); // ✅ use exposed updater

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "Users", user.uid), {
        email: user.email,
        firstName: fname,
        lastName: lname,
      });

      // ✅ force update after Firestore write
      await updateCurrentUserFromFirestore(user.uid);

      toast.success("Registration successful! Welcome!", {
        position: "top-center",
      });

      navigate("/shop");

    } catch (error) {
      toast.error(error.message, {
        position: "bottom-center",
      });
    }
  };

  return (
    <>
      <form onSubmit={handleRegister}>
        <h3>Register</h3>
        <div className="mb-3">
          <label>First name</label>
          <input type="text" className="form-control" onChange={(e) => setFname(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label>Last name</label>
          <input type="text" className="form-control" onChange={(e) => setLname(e.target.value)} />
        </div>
        <div className="mb-3">
          <label>Email address</label>
          <input type="email" className="form-control" onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input type="password" className="form-control" onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-primary">Sign Up</button>
        </div>
        <p className="forgot-password text-right">
          Already registered? <a href="/login">Login</a>
        </p>
      </form>
      <button onClick={() => navigate("/")}>Go to Home</button>
    </>
  );
}

export default Register;

// ----------------------------------------------------------------------------------------------------------------

// import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
// import React, { useState } from "react";
// import { auth, db } from "../../firebase/firebase";
// import { setDoc, doc } from "firebase/firestore";
// import { toast } from "react-toastify";
// import { useNavigate } from 'react-router-dom';  // Added for redirecting after successful registration

// function Register() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [fname, setFname] = useState("");
//   const [lname, setLname] = useState("");
//   const navigate = useNavigate();  // Initialize navigate for redirecting

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     try {
//       // Create the user with email and password
//       const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//       const user = userCredential.user;

//       // After registration, log the user in automatically (this is generally automatic in Firebase)
//       await signInWithEmailAndPassword(auth, email, password); // Explicit login (optional)

//       // Store additional user data in Firestore (firstName, lastName)
//       if (user) {
//         await setDoc(doc(db, "Users", user.uid), {
//           email: user.email,
//           firstName: fname,
//           lastName: lname,
//         });
//       }

//       console.log("Registration and login successful");
//       toast.success("Registration successful! Welcome!", {
//         position: "top-center",
//       });

//       // Redirect the user to the /shop page after successful registration and login
//       navigate("/shop");

//     } catch (error) {
//       console.log(error.message);
//       toast.error(error.message, {
//         position: "bottom-center",
//       });
//     }
//   };

//   return (
//     <>
//     <form onSubmit={handleRegister}>
//       <h3>Register</h3>

//       <div className="mb-3">
//         <label>First name</label>
//         <input
//           type="text"
//           className="form-control"
//           placeholder="First name"
//           onChange={(e) => setFname(e.target.value)}
//           required
//         />
//       </div>

//       <div className="mb-3">
//         <label>Last name</label>
//         <input
//           type="text"
//           className="form-control"
//           placeholder="Last name"
//           onChange={(e) => setLname(e.target.value)}
//         />
//       </div>

//       <div className="mb-3">
//         <label>Email address</label>
//         <input
//           type="email"  // Changed to email type for better validation
//           className="form-control"
//           placeholder="Email"
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//       </div>

//       <div className="mb-3">
//         <label>Password</label>
//         <input
//           type="password"  // Changed to password type for better security
//           className="form-control"
//           placeholder="Password"
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//       </div>

//       <div className="d-grid">
//         <button type="submit" className="btn btn-primary">
//           Sign Up
//         </button>
//       </div>

//       <p className="forgot-password text-right">
//         Already registered? <a href="/login">Login</a>
//       </p>
      
//     </form>
//     </>
    
//   );
// }

// export default Register;