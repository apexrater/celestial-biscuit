import { useState, useContext, useEffect } from "react";
import { UserContext } from "../../components/LoginPage/UserContext";
import { Navigate } from "react-router-dom";
import axios from "axios";

export default function UsernamePage() {
  const { user, setUser } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkLoggedIn() {
      try {
        const response = await axios.get("http://localhost:5173/profile");
        setUser(response.data); // Assuming the response contains user data
      } catch (error) {
        setUser(null);
      }
      setLoading(false);
    }

    checkLoggedIn();
  }, [setUser]);

  // Render loading state while checking authentication status
  if (loading) {
    return <div>Loading...</div>;
  }

  // Redirect to login page if user is not logged in
  if (!user) {
    return <Navigate to="/login" />;
  }
  console.log(user);
  // Handle username submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can handle the username submission, for example, sending it to the backend
    setSubmitted(true);
    console.log("Submitted username:", username);
  };

  // Render the username input form
  return (
    <div>
      <h1>Welcome, {user.name}!</h1>
      <p>Please enter your username:</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      {submitted && <p>Username submitted successfully!</p>}
    </div>
  );
}
