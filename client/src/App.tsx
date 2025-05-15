import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { AuthProvider } from "./auth/AuthContext";
import PrivateRoute from "./auth/PrivateRoute";
import RoleRoute from "./auth/RoleRoute";
import AdminDashboard from "./pages/AdminDashboard";
import { useEffect } from "react";

function App() {

  useEffect(() => {
    const tokenExp = localStorage.getItem("token_exp");
    if (tokenExp) {
      const timeLeft = parseInt(tokenExp) * 1000 - Date.now();
      if (timeLeft > 0) {
        setTimeout(() => {
          alert("Session expired. Please log in again.");
          localStorage.clear();
          naviate("/login");
        }, timeLeft);
      } else {
        localStorage.clear();
        navigate("/login");
      }
    }
  }, []);
  

  const logout = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/logout", {}, { withCredentials: true });
      localStorage.removeItem("token");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <RoleRoute role="admin">
                <Dashboard />
              </RoleRoute>
              // <PrivateRoute>
              // </PrivateRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <RoleRoute role="admin">
                <AdminDashboard />
              </RoleRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
