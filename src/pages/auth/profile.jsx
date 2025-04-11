import React from 'react';
import { useAuth } from '../../context/authcontext';  // Custom hook to access auth data
import { signOut } from 'firebase/auth';  // Firebase signOut function
import { useNavigate } from 'react-router-dom';  // React Router for navigation
import { auth } from '../../firebase/firebase';  // Firebase auth instance
import { toast } from 'react-toastify';  // For displaying notifications

export const Profile = () => {
  const { currentUser } = useAuth();  // Get currentUser from AuthContext
  const navigate = useNavigate();  // To redirect after logout

  // Log the currentUser to verify it is being passed correctly
  console.log("Current user:", currentUser);

  // Show loading message if currentUser is not available
  if (!currentUser) {
    return <p>Loading user data...</p>;  // You can display a spinner or a different message
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
    <div>
      <h1>Welcome, {currentUser.firstName} {currentUser.lastName}</h1>
      <p>Email: {currentUser.email}</p>
      {/* Add more fields like profile picture, bio, etc. if needed */}

      {/* Logout button */}
      <div>
        <button onClick={handleLogout} className="btn btn-danger">
          Logout
        </button>
      </div>
      <button onClick = {() => {navigate("/shop")}}> back to shopping</button>
    </div>
  );
};

