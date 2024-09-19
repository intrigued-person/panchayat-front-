// import React, { useState, useEffect } from 'react';
// import { Container, Card, Button } from 'react-bootstrap';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// function ViewBirthDetails() {
//     const [birthDetails, setBirthDetails] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchBirthDetails = async () => {
//             try {
//                 const userId = sessionStorage.getItem('userId');
//                 if (!userId) {
//                     throw new Error('User ID not found');
//                 }
//                 const response = await axios.get(`http://localhost:9952/birth/findBirthByUserId/${userId}`);
//                 setBirthDetails(response.data);
//                 setLoading(false);
//             } catch (error) {
//                 setError(error.message);
//                 setLoading(false);
//             }
//         };

//         fetchBirthDetails();
//     }, []);

//     if (loading) {
//         return <Container><h3>Loading...</h3></Container>;
//     }

//     if (error) {
//         return <Container><h3>Error: {error}</h3></Container>;
//     }

//     if (!birthDetails) {
//         return <Container><h3>No details found</h3></Container>;
//     }

//     return (
//         <Container>
//             <Card className="p-4 mb-4 custom-card">
//                 <Card.Title>Birth Certificate Details</Card.Title>
//                 <Card.Body>
//                     <div>
//                         <strong>Personal Information:</strong>
//                         <p><strong>District:</strong> {birthDetails.district}</p>
//                         <p><strong>Mobile:</strong> {birthDetails.mobile}</p>
//                         <p><strong>Email:</strong> {birthDetails.emailId}</p>
//                         <p><strong>Date of Birth:</strong> {birthDetails.dob}</p>
//                         <p><strong>Gender:</strong> {birthDetails.gender}</p>
//                     </div>
//                     <div>
//                         <strong>Birth Details:</strong>
//                         <p><strong>Child's Name:</strong> {birthDetails.childName}</p>
//                         <p><strong>Father's Name:</strong> {birthDetails.fatherName}</p>
//                         <p><strong>Mother's Name:</strong> {birthDetails.motherName}</p>
//                         <p><strong>Place of Birth:</strong> {birthDetails.placeOfBirth}</p>
//                         <p><strong>Hospital Name:</strong> {birthDetails.hospitalName}</p>
//                         <p><strong>Town:</strong> {birthDetails.town}</p>
//                         <p><strong>Religion:</strong> {birthDetails.religion}</p>
//                         <p><strong>Father's Occupation:</strong> {birthDetails.focup}</p>
//                         <p><strong>Mother's Occupation:</strong> {birthDetails.mocup}</p>
//                         <p><strong>Mother's Marriage Year:</strong> {birthDetails.motherMrgYr}</p>
//                         <p><strong>Mother's Birth Year:</strong> {birthDetails.motherBirthYr}</p>
//                         <p><strong>Certificate Type:</strong> {birthDetails.certificateType}</p>
//                     </div>
//                     <div>
//                         <strong>Address Information:</strong>
//                         <p><strong>Address:</strong> {birthDetails.address}</p>
//                         <p><strong>State:</strong> {birthDetails.state}</p>
//                     </div>
//                     <div>
//                         {/* <strong>Document:</strong> */}
//                         {/* <p><strong>Hospital Image:</strong> {birthDetails.hospitalImg ? birthDetails.hospitalImg : 'No file uploaded'}</p> */}
//                     </div>
//                     <Button variant="primary" onClick={() => navigate("/userLand")}>Back to Dashboard</Button>
//                 </Card.Body>
//             </Card>
//         </Container>
//     );
// }

// export default ViewBirthDetails;
// import React, { useState, useEffect } from 'react';
// import { Container, Card, Button } from 'react-bootstrap';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import Stepper from 'react-stepper-horizontal';

// function ViewBirthDetails() {
//     const [birthDetails, setBirthDetails] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [currentStep, setCurrentStep] = useState(0);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchBirthDetails = async () => {
//             try {
//                 const userId = sessionStorage.getItem('userId');
//                 if (!userId) {
//                     throw new Error('User ID not found');
//                 }
//                 const response = await axios.get(`http://localhost:9952/birth/findBirthByUserId/${userId}`);
//                 setBirthDetails(response.data);
//                 setLoading(false);
//             } catch (error) {
//                 setError(error.message);
//                 setLoading(false);
//             }
//         };

//         fetchBirthDetails();
//     }, []);

//     const steps = [
//         { title: 'Personal Information' },
//         { title: 'Birth Details' },
//         { title: 'Address Information' }
//     ];

//     if (loading) {
//         return <Container><h3>Loading...</h3></Container>;
//     }

//     if (error) {
//         return <Container><h3>Error: {error}</h3></Container>;
//     }

//     if (!birthDetails) {
//         return <Container><h3>No details found</h3></Container>;
//     }

//     const stepContent = [
//         (
//             <div key="personal-info">
//                 <strong>Personal Information:</strong>
//                 <p><strong>District:</strong> {birthDetails.district}</p>
//                 <p><strong>Mobile:</strong> {birthDetails.mobile}</p>
//                 <p><strong>Email:</strong> {birthDetails.emailId}</p>
//                 <p><strong>Date of Birth:</strong> {birthDetails.dob}</p>
//                 <p><strong>Gender:</strong> {birthDetails.gender}</p>
//             </div>
//         ),
//         (
//             <div key="birth-details">
//                 <strong>Birth Details:</strong>
//                 <p><strong>Child's Name:</strong> {birthDetails.childName}</p>
//                 <p><strong>Father's Name:</strong> {birthDetails.fatherName}</p>
//                 <p><strong>Mother's Name:</strong> {birthDetails.motherName}</p>
//                 <p><strong>Place of Birth:</strong> {birthDetails.placeOfBirth}</p>
//                 <p><strong>Hospital Name:</strong> {birthDetails.hospitalName}</p>
//                 <p><strong>Town:</strong> {birthDetails.town}</p>
//                 <p><strong>Religion:</strong> {birthDetails.religion}</p>
//                 <p><strong>Father's Occupation:</strong> {birthDetails.focup}</p>
//                 <p><strong>Mother's Occupation:</strong> {birthDetails.mocup}</p>
//                 <p><strong>Mother's Marriage Year:</strong> {birthDetails.motherMrgYr}</p>
//                 <p><strong>Mother's Birth Year:</strong> {birthDetails.motherBirthYr}</p>
//                 <p><strong>Certificate Type:</strong> {birthDetails.certificateType}</p>
//             </div>
//         ),
//         (
//             <div key="address-info">
//                 <strong>Address Information:</strong>
//                 <p><strong>Address:</strong> {birthDetails.address}</p>
//                 <p><strong>State:</strong> {birthDetails.state}</p>
//             </div>
//         )
//     ];

//     return (
//         <Container>
//             <Stepper
//                 steps={steps}
//                 activeStep={currentStep}
//                 activeColor="#4CAF50"
//                 completeColor="#4CAF50"
//                 defaultColor="#CCC"
//                 circleFontSize="16px"
//                 circleTop="20px"
//                 titleFontSize="14px"
//                 titleTop="10px"
//             />
//             <Card className="p-4 mb-4 custom-card">
//                 <Card.Title>{steps[currentStep].title}</Card.Title>
//                 <Card.Body>
//                     {stepContent[currentStep]}
//                     <div className="d-flex justify-content-between mt-3">
//                         <Button
//                             variant="secondary"
//                             onClick={() => setCurrentStep(prev => Math.max(prev - 1, 0))}
//                             disabled={currentStep === 0}
//                         >
//                             Previous
//                         </Button>
//                         <Button
//                             variant="primary"
//                             onClick={() => setCurrentStep(prev => Math.min(prev + 1, steps.length - 1))}
//                             disabled={currentStep === steps.length - 1}
//                         >
//                             Next
//                         </Button>
//                     </div>
//                     <Button variant="primary" className="mt-3" onClick={() => navigate("/userLand")}>
//                         Back to Dashboard
//                     </Button>
//                 </Card.Body>
//             </Card>
//         </Container>
//     );
// }

// export default ViewBirthDetails;

import React, { useState, useEffect } from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Stepper from 'react-stepper-horizontal';

function ViewBirthDetails() {
    const [birthDetails, setBirthDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentStep, setCurrentStep] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBirthDetails = async () => {
            try {
                const userId = sessionStorage.getItem('userId');
                if (!userId) {
                    throw new Error('User ID not found');
                }
                const response = await axios.get(`http://localhost:9952/birth/findBirthByUserId/${userId}`);
                setBirthDetails(response.data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchBirthDetails();
    }, []);

    const downloadCertificate = async () => {
        try {
            const userId = sessionStorage.getItem('userId');
            const response = await axios.get(`http://localhost:9952/image/user/${userId}`, {
                responseType: 'blob',
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'birth_certificate.jpeg'); // or appropriate file type
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            setError('Failed to download certificate');
        }
    };

    const steps = [
        { title: 'Personal Information' },
        { title: 'Birth Details' },
        { title: 'Address Information' }
    ];

    if (loading) {
        return <Container><h3>Loading...</h3></Container>;
    }

    if (error) {
        return <Container><h3>Error: {error}</h3></Container>;
    }

    if (!birthDetails) {
        return <Container><h3>No details found</h3></Container>;
    }

    const stepContent = [
        (
            <div key="personal-info">
                <strong>Personal Information:</strong>
                <p><strong>District:</strong> {birthDetails.district}</p>
                <p><strong>Mobile:</strong> {birthDetails.mobile}</p>
                <p><strong>Email:</strong> {birthDetails.emailId}</p>
                <p><strong>Date of Birth:</strong> {birthDetails.dob}</p>
                <p><strong>Gender:</strong> {birthDetails.gender}</p>
            </div>
        ),
        (
            <div key="birth-details">
                <strong>Birth Details:</strong>
                <p><strong>Child's Name:</strong> {birthDetails.childName}</p>
                <p><strong>Father's Name:</strong> {birthDetails.fatherName}</p>
                <p><strong>Mother's Name:</strong> {birthDetails.motherName}</p>
                <p><strong>Place of Birth:</strong> {birthDetails.placeOfBirth}</p>
                <p><strong>Hospital Name:</strong> {birthDetails.hospitalName}</p>
                <p><strong>Town:</strong> {birthDetails.town}</p>
                <p><strong>Religion:</strong> {birthDetails.religion}</p>
                <p><strong>Father's Occupation:</strong> {birthDetails.focup}</p>
                <p><strong>Mother's Occupation:</strong> {birthDetails.mocup}</p>
                <p><strong>Mother's Marriage Year:</strong> {birthDetails.motherMrgYr}</p>
                <p><strong>Mother's Birth Year:</strong> {birthDetails.motherBirthYr}</p>
                <p><strong>Certificate Type:</strong> {birthDetails.certificateType}</p>
                <Button variant="success" onClick={downloadCertificate} className="mt-3">
                    Download Certificate
                </Button>
            </div>
        ),
        (
            <div key="address-info">
                <strong>Address Information:</strong>
                <p><strong>Address:</strong> {birthDetails.address}</p>
                <p><strong>State:</strong> {birthDetails.state}</p>
            </div>
        )
    ];

    return (
        <Container>
            <Stepper
                steps={steps}
                activeStep={currentStep}
                activeColor="#4CAF50"
                completeColor="#4CAF50"
                defaultColor="#CCC"
                circleFontSize="16px"
                circleTop="20px"
                titleFontSize="14px"
                titleTop="10px"
            />
            <Card className="p-4 mb-4 custom-card">
                <Card.Title>{steps[currentStep].title}</Card.Title>
                <Card.Body>
                    {stepContent[currentStep]}
                    <div className="d-flex justify-content-between mt-3">
                        <Button
                            variant="secondary"
                            onClick={() => setCurrentStep(prev => Math.max(prev - 1, 0))}
                            disabled={currentStep === 0}
                        >
                            Previous
                        </Button>
                        <Button
                            variant="primary"
                            onClick={() => setCurrentStep(prev => Math.min(prev + 1, steps.length - 1))}
                            disabled={currentStep === steps.length - 1}
                        >
                            Next
                        </Button>
                    </div>
                    <Button variant="primary" className="mt-3" onClick={() => navigate("/userLand")}>
                        Back to Dashboard
                    </Button>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default ViewBirthDetails;
