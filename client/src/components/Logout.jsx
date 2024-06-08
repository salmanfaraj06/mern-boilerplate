import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/user/userSlice';
import { persistor } from '../redux/store';
import { useNavigate } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa'; // Import logout icon
import { MdCached } from 'react-icons/md'; // Import loading spinner icon

const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // State for loading effect

  const handleLogout = async () => {
    setLoading(true); // Start loading
    await dispatch(logout());
    persistor.purge();
    setLoading(false); // Stop loading
    navigate('/'); // Navigate to home page
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center space-x-2 bg-red-500 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600"
    >
      {loading ? (
        <MdCached className="animate-spin h-5 w-5" />
      ) : (
        <FaSignOutAlt className="h-5 w-5" />
      )}
      <span>Logout</span>
    </button>
  );
};

export default LogoutButton;
