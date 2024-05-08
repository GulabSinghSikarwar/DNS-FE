import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const DomainTable = () => {
  const [domains, setDomains] = useState([]);
  const navigate = useNavigate();

  // Simulated data for demonstration
  const mockDomains = [
    { 
      id: 1, 
      name: 'example.com', 
      records: [
        { type: 'A', value: '192.168.0.1', ttl: 3600 },
        { type: 'MX', value: 'mail.example.com', ttl: 3600 },
        { type: 'CNAME', value: 'www.example.com', ttl: 3600 },
      ]
    },
    { 
      id: 2, 
      name: 'sub.example.com', 
      records: [
        { type: 'A', value: '192.168.0.2', ttl: 3600 },
        { type: 'CNAME', value: 'subdomain.example.com', ttl: 3600 },
      ]
    }
  ];

  const modifyDNS = (domain) => {
    const pathname = `/edit/${domain.id}`
    navigate(pathname, { state: domain });
  }

  useEffect(() => {
    // Simulate fetching data from backend
    setDomains(mockDomains);
  }, []);

  return (
    <div className="my-8">
      <h2 className="text-xl font-semibold mb-4">Domains</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">Domain Name</th>
            <th className="border border-gray-300 px-4 py-2" colSpan="3">Records</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2"></th>
            <th className="border border-gray-300 px-4 py-2">Type</th>
            <th className="border border-gray-300 px-4 py-2">Value</th>
            <th className="border border-gray-300 px-4 py-2">TTL</th>
            <th className="border border-gray-300 px-4 py-2"></th>
          </tr>
        </thead>
        <tbody>
          {domains.map((domain) => (
            <tr key={domain.id} className="bg-white">
              <td className="border border-gray-300 px-4 py-2">{domain.name}</td>
              <td className="border border-gray-300 px-4 py-2">
                {domain.records.map((record, index) => (
                  <div key={index} className={index === domain.records.length - 1 ? "border-gray-300 py-2" : "border-b border-gray-300 py-2"}>
                    <div>{record.type}</div>
                  </div>
                ))}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {domain.records.map((record, index) => (
                  <div key={index} className={index === domain.records.length - 1 ? "border-gray-300 py-2" : "border-b border-gray-300 py-2"}>
                    <div>{record.value}</div>
                  </div>
                ))}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {domain.records.map((record, index) => (
                  <div key={index} className={index === domain.records.length - 1 ? "border-gray-300 py-2" : "border-b border-gray-300 py-2"}>
                    <div>{record.ttl}</div>
                  </div>
                ))}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <span className='text-blue-500 hover:underline' onClick={() => modifyDNS(domain)}>Edit</span> /
                <button className="text-red-500 hover:underline"> Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DomainTable;
