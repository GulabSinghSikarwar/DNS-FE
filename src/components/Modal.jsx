import React from 'react';

const Modal = ({ children, isOpen, onClose }) => {
  const modalStyle = isOpen ? "block" : "hidden";

  return (
    <div id="dns-modal" tabIndex="-1" aria-hidden="true" className={`overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center h-full bg-gray-900 bg-opacity-50 ${modalStyle}`}>
      <div className="relative bg-white rounded-lg shadow-md pl-6   w-full max-w-md">
        <button type="button" onClick={onClose} className="absolute top-2 right-2 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 p-2 rounded-lg text-sm w-8 h-8">
          <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
          </svg>
          <span className="sr-only">Close modal</span>
        </button>
        <div className="max-h-250 scrollbar-thumb-rounded-full overflow-auto hover:overflow-auto ">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
