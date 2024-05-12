import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FiX } from 'react-icons/fi'; // Import FiX icon
import './DNSForm.css'; // Import CSS file
import DropdownDivider from '../utils/DropDown'; // Import DropdownDivider component
import { createHostedZoneRecord } from '../service/hostedZone';
import { toast, ToastContainer } from 'react-toastify';
import { RECORD_SUCCESSFULLY_SAVED, SOMETHIN_WENT_WRONG } from '../utils/messages.string';

const DNSRecordForm = ({ selectedFormData, domainName }) => {

  const [formData, setFormData] = useState([{ Name: '', Type: '', TTL: '', routing_policy: '', ResourceRecords: '' }]);
  const [mode, setMode] = useState('add');
  const navigate = useNavigate();
  const params = useParams()
  const [domainname, setDomainname] = useState()

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const updatedRecords = [...formData];
    updatedRecords[index] = { ...updatedRecords[index], [name]: value };
    setFormData(updatedRecords);
    console.log(" C2", updatedRecords);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Append domainName to each Name field before making the API call
    const updatedFormData = formData.map(record => ({
      ...record,
      Name: `${record.Name}.${domainName}`
    }));

    let requestBody;

    // Convert ResourceRecords string to array of objects only for POST request

    requestBody = updatedFormData.map(record => ({
      ...record,
      ResourceRecords: record.ResourceRecords
        .split(/\s+/)
        .filter(value => value.trim() !== '') // Filter out empty values
        .map(value => ({ Value: value }))
    }));

    let method = 'PUT'
    if (mode === 'add') {
      method = 'POST'
    }
    console.log('Request Body:', requestBody);

    createHostedZoneRecord(params.zoneId, requestBody,method)
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          toast.error(data.error)
        } else {

          toast.success(RECORD_SUCCESSFULLY_SAVED)
        }
        // Navigate or perform any other action upon successful response
      })
      .catch(error => {
        toast.error(SOMETHIN_WENT_WRONG)
        // Handle error scenarios
      });
  };

  useEffect(() => {

    if (domainName) {
      console.log("dom: ", domainName);
      setDomainname(domainName);

    }

    if (selectedFormData?.length) {
      console.log("select: ", selectedFormData);
      if (!(mode === 'edit' && formData[0].ResourceRecords.length > 0)) {

        const selectedData = {
          Name: getSubdomain(selectedFormData[0].Name), Type: selectedFormData[0].Type, TTL: selectedFormData[0].TTL, routing_policy: '', ResourceRecords: selectedFormData[0].ResourceRecords
        }
        // selectedData.ResourceRecords=selectedData.r.replace(/,/g, '');

        setFormData([{ ...selectedData }]);
        setMode('edit');
      }
    }
  }, [selectedFormData]);

  const addRecordField = () => {
    setFormData([...formData, { Name: '', Type: '', TTL: '', routing_policy: '', ResourceRecords: '' }]);
  };

  const removeRecordField = (index) => {
    const updatedRecords = formData.filter((record, i) => i !== index);
    setFormData(updatedRecords);
  };

  // const getRecordValue = (record) => {
  //   console.log("record : ",record);

  //   if (!record || !record.ResourceRecords) return '';
  //    const value = record.ResourceRecords.map(item => item.Value).join('\n');
  //    console.log(" return value : ", value , " resuorce : ",record.ResourceRecords); 
  //    return value
  //  };

  function getSubdomain(str) {
    // Split on "." and reverse the order (subdomain is typically at the beginning)
    const parts = str.split(".");
    const remainingParts = parts[parts.length - 4]
    if (!remainingParts)
      return '';
    return remainingParts;
  }
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
              <input type="text" name={`Name`} value={record.Name} onChange={(e) => handleChange(e, index)} placeholder="Record Name" className="input-field mb-2 mr-2 lg:mb-0" required />
              {mode === 'add' ? (
                <DropdownDivider onChange={(e) => handleChange(e, index)} />
              ) : (
                <input type="text" name={`Type`} value={record.Type} onChange={(e) => handleChange(e, index)} placeholder="Record Type" className="input-field mb-2 mr-2 lg:mb-0" />
              )}

            </div>
            <textarea name={`ResourceRecords`} value={record.ResourceRecords} onChange={(e) => handleChange(e, index)} placeholder="ResourceRecords" className="input-field mb-2 mr-2 lg:mb-0" />
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

export default DNSRecordForm;
