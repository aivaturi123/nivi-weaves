import { Navigate, useNavigate } from "react-router-dom"
import './home.css'
import Register from "./auth/register";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./auth/login.jsx"
import bg from "../assets/justbg.png"


export const Home = () => {

    const nav = useNavigate();

    const reg = () =>{
        nav("/register")
    }
    const log = () =>{
        nav("/login")
    }
    
    return (
        <div className="home">
            {/* <NavbarCat/>
                <NavbarTop/>
                <Sidebar/> */}
            <div className = "reg">
                <button onClick = {reg}> Register </button>
                <button onClick = {log}> Login </button>
            </div>
            
        </div>
        
        
    )

}

