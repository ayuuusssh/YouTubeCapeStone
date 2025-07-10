import React from 'react';
import axios from 'axios';
import AuthForm from '../components/AuthForm';
import { useNavigate } from 'react-router-dom';

const Register = ({ setUser }) => {
  const navigate = useNavigate();

  const handleRegister = async (formData) => {
    try {
      const res = await axios.post('/api/auth/register', formData);
      const token = res.data.token;

      // Save token and user
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(res.data.user));

      // Set global axios token
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      setUser(res.data.user);
      navigate('/');
    } catch (err) {
      console.error('Register error:', err.response?.data || err.message);
      alert('Registration failed');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Register</h2>
      <AuthForm onSubmit={handleRegister} buttonText="Register" />
    </div>
  );
};

export default Register;
