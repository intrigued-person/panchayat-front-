// import React from 'react';
// import './style.css';
// import template from './Media.png';
// import html2canvas from 'html2canvas';
// import jsPDF from 'jspdf';

// function BirthCertificate() {
//     const name = sessionStorage.getItem('childName');
//     const place = sessionStorage.getItem('placeOfBirth');
//     const dob = sessionStorage.getItem('dob');
//     const father = sessionStorage.getItem('fatherName');
//     const mother = sessionStorage.getItem('motherName');
//     const address = sessionStorage.getItem('address');
//     const gender = sessionStorage.getItem('gender');

//     const downloadPDF = () => {
//         html2canvas(document.querySelector('.container1')).then(canvas => {
//             const imgData = canvas.toDataURL('image/jpeg', 1.0);
//             const link = document.createElement('a');
//             link.href = imgData;
//             link.download = 'birth-certificate.jpeg';
//             link.click();
//         });
//     };

//     return (
//         <div>
//             <div className='container1'>
//                 <button 
//                     className='download-btn1' 
//                     onClick={downloadPDF}
//                 >
//                     Download as PDF
//                 </button>
//                 <img src={template} height={700} alt="Certificate Template" />
//                 <div className='content'>
//                     <p className='name1'>{name}</p>
//                     <p className='name2'>{gender}</p>
//                     <p className='name3'>{dob}</p>
//                     <h1 className='name4'>{place}</h1>
//                     <p className='name5'>{father}</p>
//                     <p className='name6'>{mother}</p>
//                     <p className='name7'>{address}</p>
//                     <p className='name8'>{address}</p>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default BirthCertificate;

import React, { useState } from 'react';
import './style.css';
import template from './Media.png';
import html2canvas from 'html2canvas';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function BirthCertificate() {
    const name = sessionStorage.getItem('childName');
    const place = sessionStorage.getItem('placeOfBirth');
    const dob = sessionStorage.getItem('dob');
    const father = sessionStorage.getItem('fatherName');
    const mother = sessionStorage.getItem('motherName');
    const address = sessionStorage.getItem('address');
    const gender = sessionStorage.getItem('gender');
    const userId = sessionStorage.getItem('userId'); // Assuming userId is stored in sessionStorage

    const [file, setFile] = useState(null);
    const navigate = useNavigate();

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = () => {
        if (!file) {
            Swal.fire({
                icon: 'warning',
                title: 'No File Selected',
                text: 'Please select a file to upload.',
            });
            return;
        }

        const formData = new FormData();
        formData.append("image", file); // Use "image" as the key
        formData.append("userId", userId); // Pass userId

        axios.post('http://localhost:9952/image', formData) // Replace with your backend URL
            .then(response => {
                Swal.fire({
                    icon: 'success',
                    title: 'Document Sent',
                    text: 'Your document has been sent successfully!',
                });
                navigate('/empBirthView');
            })
            .catch(error => {
                console.error("There was an error uploading the file!", error);
                Swal.fire({
                    icon: 'error',
                    title: 'Upload Failed',
                    text: 'There was an error uploading your document.',
                });
            });
    };

    const downloadPDF = () => {
        html2canvas(document.querySelector('.container1')).then(canvas => {
            const imgData = canvas.toDataURL('image/jpeg', 1.0);
            const link = document.createElement('a');
            link.href = imgData;
            link.download = 'birth-certificate.jpeg';
            link.click();
        });
    };

    return (
        <div>
            <div className='container1'>
                <button 
                    className='download-btn1' 
                    onClick={downloadPDF}
                >
                    Download as PDF
                </button>
                <img src={template} height={700} alt="Certificate Template" />
                <div className='content'>
                    <p className='name1'>{name}</p>
                    <p className='name2'>{gender}</p>
                    <p className='name3'>{dob}</p>
                    <h1 className='name4'>{place}</h1>
                    <p className='name5'>{father}</p>
                    <p className='name6'>{mother}</p>
                    <p className='name7'>{address}</p>
                    <p className='name8'>{address}</p>
                </div>
                <div className='upload-container'>
                    <input 
                        type="file" 
                        onChange={handleFileChange} 
                        className='inputField'
                    />
                    <button 
                        className='upload-btn' 
                        onClick={handleUpload}
                    >
                        Upload Document
                    </button>
                </div>
            </div>
        </div>
    );
}

export default BirthCertificate;
