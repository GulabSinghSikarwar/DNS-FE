import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { createHostedZone } from '../../service/hostedZone';
import { SOMETHIN_WENT_WRONG } from '../../utils/messages.string';
const CreateHostedZoneForm = ({ closeModal }) => {
    const [formData, setFormData] = useState({
        domainName: '',
        callerReference: generateCallerReference(),
        comment: '',
        isPrivateZone: false,
        vpcId: null,
        vpcRegion: null
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
         
        e.preventDefault();
        // Validate domain name
        if (!validateDomainName(formData.domainName)) {
            return;
        }
        // Perform form submission logic here
        createHostedZone(formData).then((response) => {
            if (response.ok) {
                toast.success("Successfully Created HostZone")
            } else {
                toast.error(SOMETHIN_WENT_WRONG)
            }
        })
        console.log('Form submitted:', formData);

        closeModal(); // Close the modal after submission
    };

    // Function to validate domain name using regular expression
    const validateDomainName = (domainName) => {
        const regex = /^[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*\.[a-z]{2,6}$/;
        const isValid = regex.test(domainName);
        if (!isValid) {
          // You can use toast here or any other notification method
          toast.error('Please enter a valid domain name.');
        }
        return isValid;
      };
      
    // Function to generate caller reference
    function generateCallerReference() {
        const currentDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
        const uniqueString = Math.random().toString(36).substring(2, 8); // Generate a random string
        return `unique-string-${currentDate}-${uniqueString}`;
    }

    return (
        <form onSubmit={handleSubmit} className="bg-white  rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
                <label htmlFor="domainName" className="block text-gray-700 text-sm font-bold mb-2">Domain Name:</label>
                <input type="text" id="domainName" name="domainName" value={formData.domainName} onChange={handleChange} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div className="mb-4">
                <label htmlFor="callerReference" className="block text-gray-700 text-sm font-bold mb-2">Caller Reference:</label>
                <input type="text" id="callerReference" name="callerReference" value={formData.callerReference} onChange={handleChange} required disabled className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200" />
            </div>
            <div className="mb-4">
                <label htmlFor="comment" className="block text-gray-700 text-sm font-bold mb-2">Comment:</label>
                <input type="text" id="comment" name="comment" value={formData.comment} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div className="mb-4">
                <label htmlFor="isPrivateZone" className="block text-gray-700 text-sm font-bold mb-2">Private Zone:</label>
                <input type="checkbox" id="isPrivateZone" name="isPrivateZone" checked={formData.isPrivateZone} disabled  onChange={() => setFormData(prevData => ({ ...prevData, isPrivateZone: !prevData.isPrivateZone }))} className="mr-2 leading-tight" />
            </div>
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Create Hosted Zone</button>
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
        </form>
    );
};

export default CreateHostedZoneForm;
