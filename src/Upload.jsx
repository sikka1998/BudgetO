import { useState } from 'react';
import axios from 'axios';
import { Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Spinner } from "@material-tailwind/react";
import { ArrowUpOnSquareIcon } from '@heroicons/react/24/outline';
import ExcelLogo from './styles/Microsoft-Excel-Icon.png';

const Upload = () => {
  console.log('Upload component rendered');
  const [selectedFile, setSelectedFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isDisabled, setDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const allowedTypes = ['text/csv']; // MIME types for xlsx and csv

  const showErrorMessage = (msg, timeout=5000) => {
    setErrorMessage(msg);

    setTimeout( () => {
      setErrorMessage('');
    }, timeout);
  };

  const showSuccessMessage = (msg, timeout=5000) => {
    setSuccessMessage(msg);

    setTimeout( () => {
      setSuccessMessage('');
    }, timeout);
  }

  const handleFileChange = (event) => {
    let file = event.target.files[0];
    let extension = '';
    if (file){
      extension = file.name.split('.').pop().toLowerCase();
     }
    console.log(file);
    console.log(extension);

    // Validate file type
    if (file && !allowedTypes.includes(file.type)) {
      showErrorMessage('Invalid file type. Allowed types are: csv');
      setDisabled(true);
      return;
    }

    // Validate file extension
    
    if (file && !['csv'].includes(extension)) {
      showErrorMessage('Invalid file extension. Allowed extensions are: csv');
      setDisabled(true);
      return;
    }

    setSelectedFile(file);
    setDisabled(false);
    showErrorMessage('');
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (selectedFile) {
      // Handling file upload logic
      try{
        setIsLoading(true);
        const formData1 = new FormData();
        formData1.append('file', selectedFile);

        const response = await axios.post("http://localhost:5000/imports", formData1, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        });
        if(response.data.message){
          console.log(response.data.message);
        }
        else{
          showErrorMessage(response.data.error);
        }
      }catch(e){
        console.log("Error");
        showErrorMessage(e.message);
      }

      try {
        const formData2 = new FormData();
        formData2.append('file', selectedFile);

        const response = await axios.post("http://localhost:5000/uploads", formData2, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        });
        if(response.data.message){
          showSuccessMessage(response.data.message);
        }
        else{
          showErrorMessage(response.data.error);
        }
      }catch(e){
        showErrorMessage(e.message);
      }

      const fileInput = document.getElementById('formFile');
      if (fileInput) {
        fileInput.value = '';
      }
    } else {
      showErrorMessage('No file selected for upload');
    }
    setSelectedFile(null);
    setDisabled(true);
    setIsLoading(false);
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setDisabled(true);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Import CSV</h1>
        {errorMessage && <Alert variant="danger" className='mr-20'>{errorMessage}</Alert>}
        {successMessage && <Alert variant="success" className='mr-20'>{successMessage}</Alert>}
      </div>
      <div className="relative left-60 h-[calc(120vh-2rem)] w-full max-w-[40rem] aspect-w-2 aspect-h-1 flex flex-row items-center justify-center flex-1 border-2 border-dashed border-gray-300 rounded-md">
  <label
    htmlFor="file-upload"
    className="flex flex-col items-center justify-center gap-2"
  >
    <img
      src={ExcelLogo}
      className="w-18 h-10 mx-2 cursor-pointer"
      alt="Excel Logo"
    />
    {selectedFile ? (
          <div className="flex flex-col items-center gap-2">
            <span className="text-sm text-gray-500">{selectedFile.name}</span>
            <span
              className="h-3 w-3 mr-10 text-red-500 cursor-pointer"
              onClick={handleRemoveFile}>Remove</span>
          </div>
        ) : (
          <span className="text-sm text-gray-400">
            Drop your excel sheet here or{" "}
            <span className="text-blue-500 cursor-pointer">browse</span>
          </span>
        )}
        <input
          id="file-upload"
          type="file"
          className="sr-only"
          onChange={handleFileChange}/>
        </label>
        </div>

      <div className="flex items-center justify-center">
      
      {isLoading ? <button type="submit" className="flex items-center px-64 py-2 mt-5 mr-8 text-white bg-violet-500 rounded-md hover:bg-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2">
      <Spinner size="lg" color="Violet" />
      </button> : <button type="submit" className={`flex items-center px-64 py-2 mt-5 mr-8 text-white bg-violet-500 rounded-md hover:bg-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}`} onClick={handleUpload} disabled={isDisabled}>
      <ArrowUpOnSquareIcon className="w-10 h-5 mx-1"/>
      <span className="text-base"> Upload</span>
      </button>}
      </div>
      </div>
  );
};

export { Upload };
