import React, { useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import ConfirmationModal from './ConfirmationModal';

const Navbar = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleLogout = () => {
    // Show the confirmation modal
    setShowModal(true);
  };

  const handleConfirmLogout = () => {
    // Remove token from local storage
    localStorage.removeItem('token');
    // Redirect to login page
    navigate('/login');
  };

  const handleCancelLogout = () => {
    // Close the modal
    setShowModal(false);
  };

  return (
    <nav className="flex justify-between items-center bg-gray-800 text-white p-4">
      <div className="text-xl">Navbar</div>
      <div className="flex items-center">
        <button className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md mr-4" onClick={handleLogout}>Logout</button>
      </div>
      {/* Logout Confirmation Modal */}
      {showModal && (
        <ConfirmationModal
          message="Are you sure you want to logout?"
          onCancel={handleCancelLogout}
          onConfirm={handleConfirmLogout}
        />
      )}
    </nav>
  );
};

export default Navbar;
