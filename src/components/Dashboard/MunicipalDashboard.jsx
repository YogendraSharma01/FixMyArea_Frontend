import { useEffect, useState } from 'react';
import axios from 'axios';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const MunicipalDashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get(`${API_BASE_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => setUser(response.data))
        .catch(() => localStorage.removeItem('token'));
    }
  }, []);

  if (!user) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-blue-600">Municipal Dashboard</h1>
      <p className="mt-4">Welcome, {user.name}! Manage issues and updates.</p>
      {/* Add municipal-specific features */}
    </div>
  );
};

export default MunicipalDashboard;