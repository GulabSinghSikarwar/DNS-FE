import React, { useState, useEffect } from 'react';
import { createHostedZoneRecord, getAllHostedZoneRecord } from '../service/hostedZone';
import { useParams } from 'react-router-dom';
import { tableColumn } from '../utils/constant';
import { MdDelete, MdEdit } from "react-icons/md";
import Modal from './Modal'; // Import your Modal component
import DNSRecordForm from './DNSRecordForm';
import ConfirmationModal from '../components/Navbar/ConfirmationModal'
import './DomainTable.css';
import { toast, ToastContainer } from 'react-toastify';

const DomainTable = ({ updateDomainName }) => {
  const [domainRecords, setDomainRecords] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [domainName, setDomainName] = useState('');
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState(null);
  const params = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllHostedZoneRecord(params.zoneId);
        // setDomainRecords(response);
        if (data.length > 0) {
          extractDomainName(data[0].Name);
          setDomainRecords(data);
        }
      } catch (error) {
        console.error('Error fetching domain records:', error);
      }
    };

    fetchData()
  }, [params.zoneId]);

  const extractDomainName = (str) => {
    const regex = /(?:\w+\.)?(\w+\.\w+)/;
    const match = str.match(regex);
    const value = match ? match[1] : null;
    setDomainName(value);
    updateDomainName(value)
  }

  const modifyDNS = (record) => {
    const selectedData = {
      ...record,
      ResourceRecords: getRecordValue(record)
    }
    setSelectedRecord([selectedData]);

    setModalOpen(true);
  };

  const getRecordValue = (record) => {
    if (!record || !record.ResourceRecords) return '';
    return record.ResourceRecords.map(item => item.Value).join('\n');
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedRecord(null);
  };

  const handleDeleteModalOpen = (record) => {
    setRecordToDelete(record);
    setDeleteModalOpen(true);
  };

  const handleDeleteModalClose = () => {
    setDeleteModalOpen(false);
    setRecordToDelete(null);
  };

  const handleDeleteConfirmed = () => {
    // Perform deletion logic here
    createHostedZoneRecord(params.zoneId, [recordToDelete], 'DELETE').then((response) => {
      if (response.status == 200) {
        toast.success("Deleted Successfully ")
      } else {
        toast.error("something went wrong")
      }
      setDeleteModalOpen(false);

    })
    // Update domainRecords state to reflect deletion
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-200">
            {Object.values(tableColumn.hostedZoneRecords).map((columnName, index) => (
              <th key={index} className="px-4 py-2 text-left">{columnName}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {domainRecords.length === 0 ? (
            <tr>
              <td colSpan="11" className="text-center">No data available</td>
            </tr>
          ) : (
            domainRecords.map((record, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
                <td className="px-4 py-2">{record.Name}</td>
                <td className="px-4 py-2">{record.Type}</td>
                <td className="px-4 py-2">-</td>
                <td className="px-4 py-2">-</td>
                <td className="px-4 py-2">-</td>
                <td className="px-4 py-2">{record.ResourceRecords.map((rr, index) => <span key={index}>{rr.Value}<br /></span>)}</td>
                <td className="px-4 py-2">{record.TTL}</td>
                <td className="px-4 py-2">-</td>
                <td className="px-4 py-2">-</td>
                <td className="px-4 py-2">-</td>
                <td className="px-4 py-2 flex items-center justify-between">
                  <button onClick={() => modifyDNS(record)} className="text-blue-500 px-4 py-1 hover:text-blue-700 hover:bg-blue-100 rounded-full mr-2">
                    <div className="flex items-center">
                      <MdEdit />
                      <span className="ml-1">Edit</span>
                    </div>
                  </button>
                  <button onClick={() => handleDeleteModalOpen(record)} className="text-red-500 hover:text-red-700 hover:bg-red-100 px-2 py-1 rounded-full">
                    <div className="flex items-center">
                      <MdDelete />
                      <span className="ml-1">Delete</span>
                    </div>
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <Modal isOpen={modalOpen} onClose={handleModalClose}>
        {domainName !== null && domainName && <DNSRecordForm selectedFormData={selectedRecord} closeModal={handleModalClose} domainName={domainName} />}
      </Modal>
      {deleteModalOpen && <ConfirmationModal
        message={`Are you sure you want to delete this record?`}
        isOpen={deleteModalOpen}
        onCancel={handleDeleteModalClose}
        onConfirm={handleDeleteConfirmed}
      />}

      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

    </div>
  );
};

export default DomainTable;
