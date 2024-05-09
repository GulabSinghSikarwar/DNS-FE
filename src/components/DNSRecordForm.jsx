import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiX } from 'react-icons/fi'; // Import FiX icon
import './DNSForm.css'; // Import CSS file
import DropdownDivider from '../utils/DropDown'; // Import DropdownDivider component

const DNSRecordForm = ({ selectedFormData }) => {
  const [formData, setFormData] = useState([{ Name: '', Type: '', TTL: '', routing_policy: '', ResourceRecords: '' }]);
  const [mode, setMode] = useState('add');
  const navigate = useNavigate();

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const updatedRecords = [...formData];
    updatedRecords[index] = { ...updatedRecords[index], [name]: value };
    setFormData(updatedRecords);
    console.log(" C2",updatedRecords);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = mode === 'add' ? '/api/addRecord' : '/api/editRecord';
    let requestBody;

    // Convert ResourceRecords string to array of objects only for POST request
    if (mode === 'add') {
      requestBody = formData.map(record => ({
        ...record,
        ResourceRecords: record.ResourceRecords.split(/\s+/).map(value => ({ Value: value }))
      }));
    } else {
      // For edit mode, keep the existing data structure
      requestBody = formData;
    }

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Response:', data);
        // Navigate or perform any other action upon successful response
        navigate('/');
      })
      .catch(error => {
        console.error('Error:', error);
        // Handle error scenarios
      });
  };

  useEffect(() => {
    if (selectedFormData?.length) {
      setFormData(selectedFormData);
      setMode('edit');
    }
  }, [selectedFormData]);

  const addRecordField = () => {
    setFormData([...formData, { Name: '', Type: '', TTL: '', routing_policy: '', ResourceRecords: '' }]);
  };

  const removeRecordField = (index) => {
    const updatedRecords = formData.filter((record, i) => i !== index);
    setFormData(updatedRecords);
  };

  const getRecordValue = (record) => {
    if (!record || !record.ResourceRecords) return '';
    return record.ResourceRecords.map(item => item.Value).join('\n');
  };

  return (
    <div className="my-8 mx-auto max-w-lg dns-form pr-3">
      <h2 className="text-xl font-semibold mb-4">{mode === 'add' ? 'Add' : 'Edit'} DNS Record</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {formData.map((record, index) => (
          <div key={index} className="flex flex-wrap mb-6">
            {index > 0 && (
              <button type="button" onClick={() => removeRecordField(index)} className="pr-2 pb-2 text-red-600 ml-auto focus:outline-none">
                <FiX />
              </button>
            )}
            <div className="flex">
              <input type="text" name={`Name`} value={record.Name} onChange={(e) => handleChange(e, index)} placeholder="Record Name" className="input-field mb-2 mr-2 lg:mb-0" />
              {mode === 'add' ? (
                <DropdownDivider onChange={(e) => handleChange(e, index)} />
              ) : (
                <input type="text" name={`Type`} value={record.Type} onChange={(e) => handleChange(e, index)} placeholder="Record Type" className="input-field mb-2 mr-2 lg:mb-0" />
              )}

            </div>
            <textarea name={`ResourceRecords`} value={mode === 'edit' && getRecordValue(record) || record.ResourceRecords} onChange={(e) => handleChange(e, index)} placeholder="ResourceRecords" className="input-field mb-2 mr-2 lg:mb-0" />
            <div className='flex'>
              <input type="text" name={`TTL`} value={record.TTL} onChange={(e) => handleChange(e, index)} placeholder="TTL" className="input-field mb-2 mr-2 lg:mb-0" />
              <input type="text" name={`routing_policy`} value={record.routing_policy} onChange={(e) => handleChange(e, index)} placeholder="Routing Policy" className="input-field mb-2 mr-2 lg:mb-0" />
            </div>
          </div>
        ))}
        <div className='flex justify-between'>
          {mode === 'add' && (
            <button type="button" onClick={addRecordField} className="button-primary">Add Record</button>
          )}
          <button type="submit" className="button-primary">Save</button>
        </div>
      </form>
    </div>
  );
};

export default DNSRecordForm;
