// Dashboard.js
import React, { useState } from 'react';
import DomainTable from './DomainTable';
import DNSRecordForm from './DNSRecordForm';
import Modal from './Modal';
import Navbar from './Navbar/Navbar';
import FileUploadButton from './FileUpload/fileUpload';
import './DomainTable.css';

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({}); // For passing data to DNSRecordForm

  // Function to handle opening and closing the modal
  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
    setFormData({ mode: 'add' }); // Set mode for adding new record by default
  };

  // Function to handle editing existing records
  const handleEditRecord = (domain) => {
    setIsModalOpen(true);
    setFormData({ mode: 'edit', domain });
  };

  // Function to handle closing the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({}); // Reset form data
  };

  // Function to handle file upload
  const handleFileUpload = (file) => {
    // Implement your file upload logic here
    console.log('Uploaded file:', file);
    handleCloseModal(); // Close modal after uploading file
  };

  return (
    <div className="mx-auto">
      <Navbar />
      {/* <h1 className="text-3xl font-bold mb-4">DNS Manager Dashboard</h1> */}
      <div className=" mt-5 flex justify-center space-x-4 mb-4 align-center">
        <button onClick={handleModalToggle} className="bg-green-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-green-600 transition duration-300">
          Add DNS Record
        </button>
        <FileUploadButton onSubmit={handleFileUpload} />
      </div>
      <DomainTable handleEditRecord={handleEditRecord} />
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <DNSRecordForm formData={formData} closeModal={handleCloseModal} />
      </Modal>
    </div>
  );
};

export default Dashboard;
