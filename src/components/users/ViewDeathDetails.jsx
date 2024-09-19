    // import React, { useState, useEffect } from 'react';
    // import { Container, Card, Button } from 'react-bootstrap';
    // import axios from 'axios';
    // import { useNavigate } from 'react-router-dom';
    // import Stepper from 'react-stepper-horizontal';
    // function ViewDeathDetails() {
    //     const [deathDetails, setDeathDetails] = useState(null);
    //     const [loading, setLoading] = useState(true);
    //     const [error, setError] = useState(null);
    //     const [currentStep, setCurrentStep] = useState(0);
    //     const navigate = useNavigate();

    //     useEffect(() => {
    //         const fetchDeathDetails = async () => {
    //             try {
    //                 const userId = sessionStorage.getItem('userId');
    //                 if (!userId) {
    //                     throw new Error('User ID not found');
    //                 }
    //                 const response = await axios.get(`http://localhost:9952/death/findDeathByUserId/${userId}`);
    //                 setDeathDetails(response.data);
    //                 setLoading(false);
    //             } catch (error) {
    //                 setError(error.message);
    //                 setLoading(false);
    //             }
    //         };

    //         fetchDeathDetails();
    //     }, []);

    //     const steps = [
    //         { title: 'Personal Information' },
    //         { title: 'Death Details' },
    //         // { title: 'Address Information' }
    //     ];

    //     if (loading) {
    //         return <Container><h3>Loading...</h3></Container>;
    //     }

    //     if (error) {
    //         return <Container><h3>Error: {error}</h3></Container>;
    //     }

    //     if (!deathDetails) {
    //         return <Container><h3>No details found</h3></Container>;
    //     }

    //     const stepContent = [
    //         (
    //             <div key="personal-details">
    //                 <strong>Personal Details:</strong>
    //                 <p><strong>District:</strong> {deathDetails.district}</p>
    //                 <p><strong>State:</strong> {deathDetails.state}</p>
    //                 <p><strong>Address:</strong> {deathDetails.address}</p>
    //                 <p><strong>Mobile:</strong> {deathDetails.mobile}</p>
    //                 <p><strong>Gender:</strong> {deathDetails.gender}</p>
    //             </div>
    //         ),
    //         (
    //             <div key="death-info">
    //                 <strong>Death Information:</strong>
    //                 <p><strong>Name:</strong> {deathDetails.dname}</p>
    //                 <p><strong>Nominee:</strong> {deathDetails.nominee}</p>
    //                 <p><strong>Nominee Name:</strong> {deathDetails.nomineeName}</p>
    //                 <p><strong>Place of Birth:</strong> {deathDetails.placeOfBirth}</p>
    //                 <p><strong>Hospital Name:</strong> {deathDetails.hospitalName}</p>
    //                 <p><strong>Date of Death:</strong> {deathDetails.date}</p>
    //                 <p><strong>Time of Death:</strong> {deathDetails.time}</p>
    //                 <p><strong>Status:</strong> {deathDetails.status}</p>
    //             </div>
    //         )
    //         // (
    //         //     <div key="additional-details">
    //         //         <strong>Additional Details:</strong>
    //         //         <p><strong>Death Image:</strong> {deathDetails.deathImg ? 'Image available' : 'No image provided'}</p>
    //         //         <p><strong>User:</strong> {deathDetails.user}</p>
    //         //         <p><strong>Payment:</strong> {deathDetails.payment}</p>
    //         //     </div>
    //         // )
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
    //                     <Button variant="primary" className="mt-3" onClick={() => window.location.href = "/userLand"}>
    //                         Back to Dashboard
    //                     </Button>
    //                 </Card.Body>
    //             </Card>
    //         </Container>
    //     )
    // }

    // export default ViewDeathDetails
    
    import React, { useState, useEffect } from 'react';
    import { Container, Card, Button } from 'react-bootstrap';
    import axios from 'axios';
    import { useNavigate } from 'react-router-dom';
    import Stepper from 'react-stepper-horizontal';

    function ViewDeathDetails() {
        const [deathDetails, setDeathDetails] = useState(null);
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState(null);
        const [currentStep, setCurrentStep] = useState(0);
        const navigate = useNavigate();

        useEffect(() => {
            const fetchDeathDetails = async () => {
                try {
                    const userId = sessionStorage.getItem('userId');
                    if (!userId) {
                        throw new Error('User ID not found');
                    }
                    const response = await axios.get(`http://localhost:9952/death/findDeathByUserId/${userId}`);
                    setDeathDetails(response.data);
                    setLoading(false);
                } catch (error) {
                    setError(error.message);
                    setLoading(false);
                }
            };

            fetchDeathDetails();
        }, []);

        // const downloadCertificate = async () => {
        //     try {
        //         const userId = sessionStorage.getItem('userId');
        //         const response = await axios.get(`http://localhost:9952/image/user/${userId}`, {
        //             responseType: 'blob', // Important for downloading files
        //         });
        //         const url = window.URL.createObjectURL(new Blob([response.data]));
        //         const link = document.createElement('a');
        //         link.href = url;
        //         link.setAttribute('download', 'certificate.pdf'); // or use the actual name
        //         document.body.appendChild(link);
        //         link.click();
        //         link.remove();
        //     } catch (error) {
        //         setError('Failed to download certificate');
        //     }
        // };

        const downloadCertificate = async () => {
            try {
                const userId = sessionStorage.getItem('userId');
                const response = await axios.get(`http://localhost:9952/image/user/${userId}`, {
                    responseType: 'blob', // Important for downloading files
                });
                
                // Create a blob URL from the response data
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                
                // Set the href to the blob URL and the download attribute to specify the file name
                link.href = url;
                link.setAttribute('download', 'certificate.jpeg'); // Change to .jpeg for image format
                document.body.appendChild(link);
                
                // Trigger the download
                link.click();
                
                // Clean up and remove the link
                link.remove();
                window.URL.revokeObjectURL(url); // Revoke the blob URL after the download
            } catch (error) {
                setError('Failed to download certificate');
            }
        };
        

        const steps = [
            { title: 'Personal Information' },
            { title: 'Death Details' },
        ];

        if (loading) {
            return <Container><h3>Loading...</h3></Container>;
        }

        if (error) {
            return <Container><h3>Error: {error}</h3></Container>;
        }

        if (!deathDetails) {
            return <Container><h3>No details found</h3></Container>;
        }

        const stepContent = [
            (
                <div key="personal-details">
                    <strong>Personal Details:</strong>
                    <p><strong>District:</strong> {deathDetails.district}</p>
                    <p><strong>State:</strong> {deathDetails.state}</p>
                    <p><strong>Address:</strong> {deathDetails.address}</p>
                    <p><strong>Mobile:</strong> {deathDetails.mobile}</p>
                    <p><strong>Gender:</strong> {deathDetails.gender}</p>
                </div>
            ),
            (
                <div key="death-info">
                    <strong>Death Information:</strong>
                    <p><strong>Name:</strong> {deathDetails.dname}</p>
                    <p><strong>Nominee:</strong> {deathDetails.nominee}</p>
                    <p><strong>Nominee Name:</strong> {deathDetails.nomineeName}</p>
                    <p><strong>Place of Birth:</strong> {deathDetails.placeOfBirth}</p>
                    <p><strong>Hospital Name:</strong> {deathDetails.hospitalName}</p>
                    <p><strong>Date of Death:</strong> {deathDetails.date}</p>
                    <p><strong>Time of Death:</strong> {deathDetails.time}</p>
                    <p><strong>Status:</strong> {deathDetails.status}</p>
                    <Button variant="success" onClick={downloadCertificate} className="mt-3">
                        Download Certificate
                    </Button>
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
                        <Button variant="primary" className="mt-3" onClick={() => window.location.href = "/userLand"}>
                            Back to Dashboard
                        </Button>
                    </Card.Body>
                </Card>
            </Container>
        )
    }

    export default ViewDeathDetails;
