import { useAuth } from "../auth/AuthContext";

const Dashboard = () => {
  const { logout } = useAuth();

  return (
    <div>
      <h1>Welcome to your dashboard!</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Dashboard;
