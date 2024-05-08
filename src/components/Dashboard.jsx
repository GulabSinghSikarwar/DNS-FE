// src/components/Dashboard.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DomainTable from './DomainTable';
import DNSRecordForm from './DNSRecordForm';
import Modal from './Modal';

const Dashboard = () => {
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddFormToggle = () => {
    setShowAddForm(!showAddForm);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">DNS Manager Dashboard</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Link to="/all-DNS" className="bg-blue-500 text-white py-3 px-6 rounded-md shadow-md hover:bg-blue-600 transition duration-300">
          View All DNS Records
        </Link>
        <Link to="/addDNS" className="bg-green-500 text-white py-3 px-6 rounded-md shadow-md hover:bg-green-600 transition duration-300">
          Add DNS Record
        </Link>
      </div>
      {/* <DomainTable /> */}
      {showAddForm && <DNSRecordForm />}
      <Modal />
    </div>
  );
};

export default Dashboard;
