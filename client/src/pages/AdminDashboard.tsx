import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../auth/AuthContext";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

const AdminDashboard = () => {
  const [users, setUsers] = useState<User[]>([]);
  const { token } = useAuth();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(res.data);
      } catch (error) {
        console.error("Failed to fetch users", error);
      }
    };

    fetchUsers();
  }, [token]);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(users.filter((u) => u._id !== id));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  return (
    <div className="container">
      <h2>Admin Dashboard - Manage Users</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th><th>Email</th><th>Role</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>
                <button onClick={() => handleDelete(u._id)}>Delete</button>
                {/* Later: Add Edit role */}
              </td>
              <td>
  <select
    value={u.role}
    onChange={async (e) => {
      const newRole = e.target.value;
      try {
        const res = await axios.put(
          `http://localhost:5000/api/users/${u._id}/role`,
          { role: newRole },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUsers(users.map(user => user._id === u._id ? res.data : user));
      } catch (err) {
        console.error("Failed to update role", err);
      }
    }}
  >
    <option value="user">User</option>
    <option value="admin">Admin</option>
  </select>
</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;