import React, { useState, useEffect } from 'react';
import { getAllHostedZoneRecord } from '../service/hostedZone';
import { useParams } from 'react-router-dom';
import { tableColumn } from '../utils/constant';
import { MdDelete, MdEdit } from "react-icons/md";
import Modal from './Modal'; // Import your Modal component
import DNSRecordForm from './DNSRecordForm';
import './DomainTable.css';

const DomainTable = ({updateDomainName}) => {
  const [domainRecords, setDomainRecords] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [domainName, setDomainName] = useState('');
  const params = useParams();

  useEffect(() => {
    // Simulating fetching data from API
    const fetchData = async () => {
      try {
        const data = [
         
          {
            "Name": "hllowan2gulab.com.",
            "Type": "SOA",
            "TTL": 900,
            "ResourceRecords": [
              { "Value": "ns-154.awsdns-19.com. awsdns-hostmaster.amazon.com. 1 7200 900 1209600 86400" }
            ]
          }
        ];

        // Check if data is not empty
        if (data.length > 0) {
          extractDomainName(data[0].Name);
          setDomainRecords(data);
          return data
          // Set domainName only if data has at least one record
        }
      } catch (error) {
        console.error('Error fetching domain records:', error);
      }
    };

    fetchData() 
  }, [params.zoneId]);

  function extractDomainName(str) {
    const regex = /(?:\w+\.)?(\w+\.\w+)/;
    const match = str.match(regex);
    const value = match ? match[1] : null;
    setDomainName(value);
    updateDomainName(value)
  }

  const modifyDNS = (record) => {
    setSelectedRecord([record]);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedRecord(null);
  };
  const test = () => {
    console.log("....domain..", domainName);
    return domainName
  }

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
                  <button className="text-red-500 hover:text-red-700 hover:bg-red-100 px-2 py-1 rounded-full">
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
      {domainName !== undefined && domainName !== null && test() && <Modal isOpen={modalOpen} onClose={handleModalClose}>
        {domainName !== null && domainName && <DNSRecordForm selectedFormData={selectedRecord} closeModal={handleModalClose} domainName={domainName} />}
      </Modal>}
    </div>
  );
};

export default DomainTable;
