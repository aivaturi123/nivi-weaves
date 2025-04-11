import videobg from "../assets/bgvid.mp4"
import { Navigate, useNavigate } from "react-router-dom"
import './home.css'
export const Home = () => {

    const nav = useNavigate();
    const regit = () => {
        nav("/register");
    }
    const logit = () => {
        nav("/login");
    }
    return (
        <>
            <div className = "reg">
                <button onClick = {regit}> Register </button>
                <button onClick = {logit}> Login </button>
            </div>
            <video src = {videobg} muted loop autoPlay/>
        </>
        
        
    )

}

