import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { AuthProvider } from "./auth/AuthContext";
import PrivateRoute from "./auth/PrivateRoute";
import RoleRoute from "./auth/RoleRoute";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
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
