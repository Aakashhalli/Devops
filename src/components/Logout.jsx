import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
function Logout() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        await axios.get("/api/users/logout");
        toast.success("Logged out successfully!"); // Show a success
        setLoading(false); // Stop the loading state
        navigate("/login"); // Redirect to the login page
      } catch (error) {
        console.error("Error while logging out:", error);
        setLoading(false); // Ensure loading stops even on error
      }
    };

    handleLogout();
  }, [navigate]);

  return <div>{loading ? <div>Logging Out...</div> : null}</div>;
}

export default Logout;
