import React from 'react';
import { useAuth } from '../../context/authcontext';  
import { signOut } from 'firebase/auth';  
import { useNavigate } from 'react-router-dom';  
import { auth } from '../../firebase/firebase';  
import { toast } from 'react-toastify';  
import { NavbarTop } from '../../components/navbartop';

export const Profile = () => {
  const { currentUser } = useAuth();  
  const navigate = useNavigate(); 


  console.log("Current user:", currentUser);

  if (!currentUser) {
    return <p>Loading user data...</p>;  
  }

  // Handle Logout with confirmation
  const handleLogout = async () => {
    // Show a warning toast first
    toast.warning("Are you sure you want to log out?", {
      position: "top-center",
      autoClose: 5000,  // Automatically close after 5 seconds
      closeOnClick: true,
      onClose: async () => {
        try {
          // Log out after confirmation
          await signOut(auth);
          toast.success("Logged out successfully", {
            position: "top-center",
          });
          // Redirect to login page after logout
          navigate('/');
        } catch (error) {
          console.log("Error logging out:", error.message);
          toast.error("Error logging out", {
            position: "bottom-center",
          });
        }
      },
    });
  };

  return (
    <>
    <div className='temp'>
      <NavbarTop/>
    </div>
    <div>
      <h1>Welcome, {currentUser.firstName} {currentUser.lastName}</h1>
      <p>Email: {currentUser.email}</p>
      

      
      <div>
        <button onClick={handleLogout} className="btn btn-danger">
          Logout
        </button>
      </div>
      {/* <button onClick = {() => {navigate("/shop")}}> back to shopping</button> */}
    </div>
    </>
  );
};

