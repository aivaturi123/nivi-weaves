import { signInWithEmailAndPassword } from "firebase/auth";
import {React, useState} from "react";
import { auth } from "../../firebase/firebase";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
function Login() {
     const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password)
            console.log("login good")
                        toast.success("login good bruh", {
                            position: "top-center",
                        });
        }
        catch(error) {
            console.log(error.message);
                        toast.error(error.message, {
                            position: "bottom-center",
                        })

        }
        navigate("/shop");
    }

    return (
        <>
        <form onSubmit={handleSubmit}>
            <h3> Login</h3>

            <div className = "mb-3">
                <label> Email address</label>
                <input
                    type = "text"
                    className = "form-control"
                    placeholder = "enter email"
                    value = {email}
                    onChange = {(e) => setEmail(e.target.value)}
                    
                />


            </div>

            <div className = "mb-3">
                <label> Password </label>
                <input 
                    type = "password"
                    className = "form-control"
                    placeholder ="enter pw"
                    value = {password}
                    onChange = {(e) => setPassword(e.target.value)}
                    
                />

            </div>
            <div className = "d-grid">
                <button type = "submit" className = "btn btn-primary">Submit</button>
            </div>
            <p className = "forgot-password text-right">
                New User? <a href = "/register">Register here</a>
            </p>
            
        </form>
        <button onClick={() => {navigate("/")}}> go to home</button>
        </>

    );
}

export default Login;