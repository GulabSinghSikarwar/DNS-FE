import React, { useState } from 'react';

import ConfirmationModal from '../Navbar/ConfirmationModal';
import FileUploadUI from './FileUploadUI';

const FileUploadButton = ({ onSubmit }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleConfirm = () => {
        onSubmit(selectedFile);
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleButtonClick = () => {
        setIsModalOpen(true);
    };

    return (
        <div>
            <button
                onClick={handleButtonClick}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Upload File
            </button>

            {isModalOpen && (
                <ConfirmationModal
                    message={
                        <FileUploadUI handleFileChange={handleFileChange} />}
                    onCancel={handleCancel}
                    onConfirm={handleConfirm}
                    cancelButtonText="Cancel"
                    confirmButtonText="Upload"
                />
            )}
        </div>
    );
};

export default FileUploadButton;


