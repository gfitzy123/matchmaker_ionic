import React, { useState } from 'react'

const UploadPictures = () => {
    const [selectedFile, setSelectedFile] = useState(null)

    const handleFileChange = (e) => {
        // Handle file selection
        const file = e.target.files[0]
        setSelectedFile(file)
        alert('File picked')
    }

    const handleUpload = () => {
        // Handle the upload logic here
        if (selectedFile) {
            // Implement your upload logic (e.g., using a server API)
            console.log('Uploading file:', selectedFile)
        } else {
            console.log('No file selected')
        }
    }

    return (
        <div class="wrapper">
            <input
                type="file"
                id="fileInput"
                className="file-input"
                onChange={handleFileChange}
            />
            <label className="upload-label" htmlFor="fileInput">
                Choose a File
            </label>
            <button className="upload-button" onClick={handleUpload}>
                Upload
            </button>
        </div>
    )
}

export default UploadPictures
