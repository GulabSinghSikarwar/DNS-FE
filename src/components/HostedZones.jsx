import { toast, ToastContainer } from 'react-toastify';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import { deleteHostedZone, getAllHostedZones } from '../service/hostedZone';

import ConfirmationModal from './Navbar/ConfirmationModal';
import Modal from './Modal'; // Import the Modal component
import CreateHostedZoneForm from './createHostZone/HostCreationForm'; // Import the CreateHostedZoneForm component

function HostedZones() {
    const [hostedZones, setHostedZones] = useState([]);
    const [selectedZone, setSelectedZone] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isZoneModalOpen, setIsZoneModalOpen] = useState(false)

    useEffect(() => {
        // Fetch hosted zones data from API
        fetchHostedZones();
    }, []);

    const fetchHostedZones = () => {
        console.log(" HOST ");
        getAllHostedZones()
            .then(response => setHostedZones(response))
            .catch(error => console.error("Error fetching hosted zones:", error));
    };

    const extractZoneId = (fullId) => {
        return fullId.split('/')[2];
    };

    const renderData = (data) => {
        return data ? data : "-";
    };

    const renderType = (privateZone) => {
        return privateZone ? "Private" : "Public";
    };

    const handleDelete = () => {
        // Perform deletion logic here
        console.log("Deleting zone:", selectedZone);
        const reqBody = {
            id: extractZoneId(selectedZone.Id)
        };
        deleteHostedZone(reqBody).then((response) => {
            if (response.status === 200) {
                toast.success("Deleted Successfully ");
                fetchHostedZones();
            } else {
                toast.error("Something Went Wrong");
            }

            setIsModalOpen(false);
        });
    };

    const createdHostZoneHandeler = () => {
        setIsZoneModalOpen(false)
       setTimeout(() => {
        // toast.success()
        fetchHostedZones()
       }, 1000);
    }

    return (
        <div className="mx-auto ">
            <Navbar />
            <div className='text-center'>
                <button className="bg-green-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-green-600 transition duration-300" onClick={() => setIsZoneModalOpen(true)}>Add Hosted Zone</button>

            </div>
            <table className="min-w-full table-auto shadow-md rounded-lg overflow-hidden">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="text-center py-3 px-4 uppercase font-semibold text-sm text-gray-700">Hosted Zone Name</th>
                        <th className="text-center py-3 px-4 uppercase font-semibold text-sm text-gray-700">Type</th>
                        <th className="text-center py-3 px-4 uppercase font-semibold text-sm text-gray-700">Created By</th>
                        <th className="text-center py-3 px-4 uppercase font-semibold text-sm text-gray-700">Record Count</th>
                        <th className="text-center py-3 px-4 uppercase font-semibold text-sm text-gray-700">Description</th>
                        <th className="text-center py-3 px-4 uppercase font-semibold text-sm text-gray-700">Hosted Zone ID</th>
                        <th className="text-center py-3 px-4 uppercase font-semibold text-sm text-gray-700">Actions</th>
                    </tr>
                </thead>
                <tbody className="text-gray-700">
                    {hostedZones.map(zone => (
                        <tr key={zone.Id} className="bg-white border-b">
                            <td className="py-3 px-4 text-center">
                                <Link to={`/zone/${extractZoneId(zone.Id)}`} className="text-blue-500 hover:text-blue-700">
                                    {renderData(zone.Name)}
                                </Link>
                            </td>
                            <td className="py-3 px-4 text-center">{renderType(zone.Config.PrivateZone)}</td>
                            <td className="py-3 px-4 text-center"> Route 53</td>
                            <td className="py-3 px-4 text-center">{renderData(zone.ResourceRecordSetCount)}</td>
                            <td className="py-3 px-4 text-center">{renderData(zone.Config.Comment)}</td>
                            <td className="py-3 px-4 text-center">{extractZoneId(renderData(zone.Id))}</td>
                            <td className="py-3 px-4 text-center">
                                <button onClick={() => {
                                    setSelectedZone(zone);
                                    setIsModalOpen(true);
                                }} className="text-red-500 hover:text-red-700">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* Button to open the modal */}
            {/* Modal for adding hosted zone */}
            {isZoneModalOpen && <Modal isOpen={isZoneModalOpen} onClose={() => setIsZoneModalOpen(false)}>
                <CreateHostedZoneForm closeModal={createdHostZoneHandeler} />
            </Modal>}
            {isModalOpen && (
                <ConfirmationModal
                    message={`Are you sure you want to delete ${selectedZone.Name}?`}
                    onCancel={() => setIsModalOpen(false)}
                    onConfirm={handleDelete}
                />
            )}
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
}

export default HostedZones;
