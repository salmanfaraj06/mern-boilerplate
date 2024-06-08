import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, setLoading, setError, setSuccess, clearStatus } from '../redux/user/userSlice';
import OAuth from 'components/OAuth';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, success } = useSelector((state) => state.user);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    dispatch(clearStatus());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    dispatch(clearStatus());
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        console.log('Login successful:', data);
        dispatch(setSuccess('Login successful!'));
        dispatch(setUser(data.user)); // Assuming the API returns user data in a 'user' field
        setFormData({
          email: '',
          password: '',
        });
        navigate('/dashboard'); // Use the correct path for your dashboard
      } else {
        if (data.errors) {
          Object.keys(data.errors).forEach((key) => {
            dispatch(setError({ field: key, message: data.errors[key] }));
          });
        } else {
          dispatch(setError({ field: 'general', message: data.message || 'An error occurred' }));
        }
      }
    } catch (err) {
      dispatch(setError({ field: 'general', message: error.message || 'An error occurred' }));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center h-screen p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Log In</h2>
        
        <form onSubmit={handleSubmit}>
          {/* Email Field */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${error.email ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'}`}
              required
              value={formData.email}
              onChange={handleChange}
            />
            {error.email && <p className="text-red-500 text-sm mt-1">{error.email}</p>}
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${error.password ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'}`}
              required
              value={formData.password}
              onChange={handleChange}
            />
            {error.password && <p className="text-red-500 text-sm mt-1">{error.password}</p>}
          </div>

          {/* Submit Button */}
          <div className="mb-6">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-300 flex items-center mb-2 justify-center"
              disabled={loading}
              aria-busy={loading}
            >
              {loading ? (
                <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24" aria-hidden="true">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.963 7.963 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                'Log In'
              )}
            </button>
            <OAuth />
          </div>
          {error.general && <div className="mb-4 text-red-500">{error.general}</div>}
          {success && <div className="mb-4 text-green-500">{success}</div>}
        </form>

        {/* Signup Link */}
        <p className="text-gray-600 text-center">
          Don't have an account?{' '}
          <Link to="/signup" className="text-blue-500 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
