import React from 'react';

const ConfirmationModal = ({ message, onCancel, onConfirm }) => {
  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center">
      <div className="bg-gray-900 bg-opacity-50 absolute inset-0"></div>
      <div className="bg-white rounded-lg p-8 max-w-md mx-auto z-20 w-1/4">
        <h2 className="text-lg font-bold text-red-400 mb-4">{message}</h2>
        <div className="flex justify-around mt-10">
          <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-md mr-2" onClick={onCancel}>Cancel</button>
          <button className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md" onClick={onConfirm}>OK</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
