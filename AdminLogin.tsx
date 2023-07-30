import React, { useState } from 'react';
import axios from 'axios';

const AdminLogin: React.FC = () => {
  const [adminId, setAdminId] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    axios
      .post('/api/login', { adminId, password })
      .then((response) => {
        const { success, token } = response.data;
        if (success) {
          // Store the JWT token in local storage
          localStorage.setItem('adminToken', token);
          // Redirect to the admin dashboard
          window.location.href = '/admin/dashboard';
        } else {
          // Show error message
          alert('Invalid credentials');
        }
      })
      .catch((error) => {
        console.error('Error logging in:', error);
      });
  };

  return (
    <div className="admin-login">
      <input
        type="text"
        placeholder="Admin ID"
        value={adminId}
        onChange={(e) => setAdminId(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default AdminLogin;
