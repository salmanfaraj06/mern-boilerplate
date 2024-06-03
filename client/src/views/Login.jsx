// Login.jsx
import React, { useState } from 'react';

function Login() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate(form);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      // Submit form
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <form onSubmit={handleSubmit} className="w-full max-w-sm bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="mb-4 text-2xl">Login</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
          />
          {errors.username && <p className="text-red-500 text-xs italic">{errors.username}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
          />
          {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>}
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
          />
          {errors.password && <p className="text-red-500 text-xs italic">{errors.password}</p>}
        </div>
        <div className="flex items-center justify-between">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
}

function validate(form) {
  let errors = {};
  if (!form.username) errors.username = 'Username is required';
  if (!form.email) errors.email = 'Email is required';
  if (!form.password) errors.password = 'Password is required';
  return errors;
}

export default Login;