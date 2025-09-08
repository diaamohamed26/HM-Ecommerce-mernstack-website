import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const logout = async () => {
    await api.post("/logout");
    setUser(null);
    navigate("/login");
  };

  return <button onClick={logout} className="text-red-500">Logout</button>;
};

export default LogoutButton;
