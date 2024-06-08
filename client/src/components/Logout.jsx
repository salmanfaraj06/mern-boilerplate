import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/user/userSlice';
import { persistor } from '../redux/store';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Invoke useNavigate

  const handleLogout = () => {
    dispatch(logout());
    persistor.purge();
    navigate('/'); // Navigate to home page
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
