import React from 'react';
import axios from 'axios';
import AuthForm from '../components/AuthForm';
import { useNavigate } from 'react-router-dom';

const Login = ({ setUser }) => {
  const navigate = useNavigate();

  const handleLogin = async (formData) => {
    try {
      const res = await axios.post('/api/auth/login', formData);
      const token = res.data.token;

      // Save token in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(res.data.user));

      // Apply token to axios globally
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      setUser(res.data.user);
      navigate('/');
    } catch (err) {
      console.error('Login error:', err.response?.data || err.message);
      alert('Login failed');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <AuthForm onSubmit={handleLogin} buttonText="Login" />
    </div>
  );
};

export default Login;
