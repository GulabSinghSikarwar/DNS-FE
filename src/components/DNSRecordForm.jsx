import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

const DNSRecordForm = () => {
  const [formData, setFormData] = useState({
    domain: '',
    records: [{ type: '', value: '', ttl: '' }] // Initialize with a single record entry
  });
  const [mode, setMode] = useState('add'); // 'add' or 'edit'
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();

  // Function to handle form field changes
  // const handleChange = (e, index) => {
  //   const { name, value } = e.target;
  //   const updatedRecords = [...formData.records];
  //   updatedRecords[index] = { ...updatedRecords[index], [name]: value };
  //   setFormData({ ...formData, records: updatedRecords });
  // };
// Function to handle form field changes
const handleChange = (e, index) => {
  console.log('here : ');
  console.log(" e: ",e);
  const { name, value } = e.target;
  console.log(" name: ", name , " --", " value : ",value);
  const updatedRecords = [...formData.records];
  updatedRecords[index] = { ...updatedRecords[index], [name]: value };
  console.log(" updated: ",updatedRecords);
  setFormData(prevState => ({
    ...prevState,
    records: updatedRecords
  }));
};


  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform form submission based on mode (add or edit)
    if (mode === 'add') {
      // Handle adding DNS record
      console.log('Adding DNS record:', formData);
    } else if (mode === 'edit') {
      // Handle editing DNS record
      console.log('Editing DNS record:', formData);
    }
    // Reset form fields
    setFormData({
      domain: '',
      records: [{ type: '', value: '', ttl: '' }] // Reset with a single record entry
    });
    // Redirect to home page after form submission
    navigate('/');
  };

  useEffect(() => {
    if (params.id && location.state) {
      const { state } = location;
      if (state.name && state.records && state.records.length > 0) {
        setFormData({
          domain: state.name || '',
          records: state.records || [] // Set records from state
        });
        setMode('edit');
      }
    }
  }, [params.id, location.state]);

  // Function to add a new record field
  const addRecordField = () => {
    setFormData({
      ...formData,
      records: [...formData.records, { type: '', value: '', ttl: '' }]
    });
  };

  return (
    <div className="my-8">
      <h2 className="text-xl font-semibold mb-4">{mode === 'add' ? 'Add' : 'Edit'} DNS Record</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Form inputs */}
        <input type="text" name="domain" value={formData.domain} onChange={(e) => setFormData({ ...formData, domain: e.target.value })} placeholder="Domain" className="border border-gray-300 rounded-md px-3 py-2" />
        {formData.records.map((record, index) => (
          <div key={index}>
            <input type="text" name={`type`} value={record.type} onChange={(e) => handleChange(e, index)} placeholder="Record Type" className="border border-gray-300 rounded-md px-3 py-2" />
            <input type="text" name={`value`} value={record.value} onChange={(e) => handleChange(e, index)} placeholder="Record Value" className="border border-gray-300 rounded-md px-3 py-2" />
            <input type="number" name={`ttl`} value={record.ttl} onChange={(e) => handleChange(e, index)} placeholder="TTL" className="border border-gray-300 rounded-md px-3 py-2" />
          </div>
        ))}
        {mode === 'add' && (
          <button type="button" onClick={addRecordField} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Add Record</button>
        )}
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Save</button>
      </form>
    </div>
  );
};

export default DNSRecordForm;
