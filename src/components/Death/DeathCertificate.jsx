// import React from 'react';
// import './styles.css';
// import template from './Death2.png';
// import html2canvas from 'html2canvas';

// function DeathCertificate() {
//     const id = sessionStorage.getItem('deathId');
//     const dname = sessionStorage.getItem('deathName');
//     const place = sessionStorage.getItem('deathplace');
//     const date = sessionStorage.getItem('date');
//     const nom = sessionStorage.getItem('Nominee');
//     const nomName = sessionStorage.getItem('NomineeName');
//     const address = sessionStorage.getItem('address');
//     const gender = sessionStorage.getItem('gender');

//     const downloadJPEG = () => {
//         html2canvas(document.querySelector('.container1')).then(canvas => {
//             const imgData = canvas.toDataURL('image/jpeg', 1.0);
//             const link = document.createElement('a');
//             link.href = imgData;
//             link.download = 'death-certificate.jpeg';
//             link.click();
//         });
//     };

//     return (
//         <div>
//             <div className='container1'>
//                 <button
//                     className='download-btn1'
//                     onClick={downloadJPEG}
//                 >
//                     Download as JPEG
//                 </button>
//                 <img src={template} height={700} alt="Certificate Template" />
//                 <div className='content'>
//                     <strong><p id='name1'>{dname}</p></strong>
//                     <p id='name2'>{gender}</p>
//                     <p id='name3'>{date}</p>
//                     <p id='name4'>{place}</p>
//                     <p id='name5'>{nom}</p>
//                     <p id='name6'>{nomName}</p>
//                     <p id='name7'>{address}</p>
//                     <p id='name8'>{address}</p>
//                     <p id='name9'>{id}</p>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default DeathCertificate;
import React, { useState } from 'react';
import './styles.css';
import template from './Death2.png';
import html2canvas from 'html2canvas';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function DeathCertificate() {
    const id = sessionStorage.getItem('deathId');
    const dname = sessionStorage.getItem('deathName');
    const place = sessionStorage.getItem('deathplace');
    const date = sessionStorage.getItem('date');
    const nom = sessionStorage.getItem('Nominee');
    const nomName = sessionStorage.getItem('NomineeName');
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
                navigate('/empDeathView');
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

    const downloadJPEG = () => {
        html2canvas(document.querySelector('.container1')).then(canvas => {
            const imgData = canvas.toDataURL('image/jpeg', 1.0);
            const link = document.createElement('a');
            link.href = imgData;
            link.download = 'death-certificate.jpeg';
            link.click();
        });
    };

    return (
        <div>
            <div className='container1'>
                <button
                    className='download-btn1'
                    onClick={downloadJPEG}
                >
                    Download as JPEG
                </button>
                <img src={template} height={700} alt="Certificate Template" />
                <div className='content'>
                    <strong><p id='name1'>{dname}</p></strong>
                    <p id='name2'>{gender}</p>
                    <p id='name3'>{date}</p>
                    <p id='name4'>{place}</p>
                    <p id='name5'>{nom}</p>
                    <p id='name6'>{nomName}</p>
                    <p id='name7'>{address}</p>
                    <p id='name8'>{address}</p>
                    <p id='name9'>{id}</p>
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

export default DeathCertificate;



