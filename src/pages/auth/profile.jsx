import { useAuth } from '../../context/authcontext'; // Correct path


export const Profile = () => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <p>Please log in to see your profile.</p>;
  }

  return (
    <div>
      <h1>Welcome, {currentUser.firstName} {currentUser.lastName}</h1>
      <p>Email: {currentUser.email}</p>
      {/* You can access other fields here */}
    </div>
  );
};

export default Profile;
