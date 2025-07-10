import React, { useState } from 'react';

const AuthForm = ({ onSubmit, buttonText }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
    avatar: ''
  });

  const isRegister = buttonText === 'Register';

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-sm">
      {isRegister && (
        <>
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="border p-2 w-full rounded"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="avatar"
            placeholder="Avatar URL (optional)"
            className="border p-2 w-full rounded"
            onChange={handleChange}
          />
        </>
      )}

      <input
        type="email"
        name="email"
        placeholder="Email"
        className="border p-2 w-full rounded"
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        className="border p-2 w-full rounded"
        onChange={handleChange}
        required
      />
      <button
        type="submit"
        className="w-full bg-red-600 text-white py-2 rounded"
      >
        {buttonText}
      </button>
    </form>
  );
};

export default AuthForm;

