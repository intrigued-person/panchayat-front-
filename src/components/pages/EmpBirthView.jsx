import React, { useEffect, useState } from 'react';
import { Container, Table, Button, Modal, Alert } from 'react-bootstrap';
import axios from 'axios';
import './BirthRecords.css'; // Import custom CSS file
import { useNavigate } from 'react-router-dom';
import Nav from '../navComp/Nav';

const EmpBirth = () => {
    const [showModal, setShowModal] = useState(false);
    const [selectedDocument, setSelectedDocument] = useState(null);
    const [births, setBirths] = useState([]);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(false);
    const [actionMessage, setActionMessage] = useState('');

    useEffect(() => {
        fetchBirths();
    }, []);

    const fetchBirths = async () => {
        try {
            const response = await axios.get('http://localhost:9952/birth/approvedBirth');
            setBirths(response.data);
        } catch (error) {
            console.error('Error fetching birth records:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleViewDocument = (record) => {
        if (record.hospitalImg) {
            const url = `data:image/jpeg;base64,${record.hospitalImg}`;
            setSelectedDocument(url);
            setShowModal(true);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedDocument(null); // Clear selected document when closing
    };

    const navigat = useNavigate();

    const handleGenerateCertificate = async (record) => {
        setActionLoading(true);
        setActionMessage('');
        try {
            // Fetch the birth record details using the birthId
            const response = await axios.get(`http://localhost:9952/birth/findBirth/${record.birthId}`);
            const birthRecord = response.data;

            // Store birth details in session storage
            sessionStorage.setItem('birthId', record.birthId);
            sessionStorage.setItem('childName', birthRecord.childName);
            sessionStorage.setItem('placeOfBirth', birthRecord.placeOfBirth);
            sessionStorage.setItem('dob', birthRecord.dob);
            sessionStorage.setItem('fatherName', birthRecord.fatherName);
            sessionStorage.setItem('motherName', birthRecord.motherName);
            sessionStorage.setItem('address', birthRecord.address);
            sessionStorage.setItem('gender', birthRecord.gender);
            sessionStorage.setItem('userId', birthRecord.user.userId);
            navigat('/birthct');

            // Optionally, you might want to proceed with generating the certificate
            // Here is where you would call the API to generate the certificate
            //  const certResponse = await axios.post('http://localhost:9952/birth/generateCertificate', { birthId: record.birthId });
            //setActionMessage(`Certificate generated successfully for ${record.childName}`);

        } catch (error) {
            console.error('Error generating certificate:', error);
            setActionMessage('Failed to generate certificate');
        } finally {
            setActionLoading(false);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
        <Nav></Nav>
        <Container fluid className="births-container">
            <h2 className="text-center mb-4">Birth Records</h2>
            {actionMessage && <Alert variant={actionMessage.includes('Failed') ? 'danger' : 'success'}>{actionMessage}</Alert>}
            <Table striped bordered hover responsive className="custom-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Gender</th>
                        <th>Date of Birth</th>
                        <th>Place of Birth</th>
                        <th>Father's Name</th>
                        <th>Mother's Name</th>
                        <th>Address</th>
                        <th>Hospital Proof</th>
                        <th>Action</th> {/* New Column for Action */}
                    </tr>
                </thead>
                <tbody>
                    {births.map((record) => (
                        <tr key={record.birthId}>
                            <td>{record.childName}</td>
                            <td>{record.gender}</td>
                            <td>{record.dob}</td>
                            <td>{record.placeOfBirth}</td>
                            <td>{record.fatherName}</td>
                            <td>{record.motherName}</td>
                            <td>{record.address}</td>
                            <td>
                                {record.hospitalImg ? (
                                    <Button
                                        variant="info"
                                        size="sm"
                                        onClick={() => handleViewDocument(record)}
                                        className="custom-button"
                                    >
                                        View Document
                                    </Button>
                                ) : (
                                    'Not Available'
                                )}
                            </td>
                            <td>
                                <Button
                                    variant="primary"
                                    size="sm"
                                    onClick={() => handleGenerateCertificate(record)}
                                    disabled={actionLoading}
                                >
                                    {actionLoading ? 'Generating...' : 'Generate Certificate'}
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal show={showModal} onHide={handleCloseModal} size="xl">
                <Modal.Header closeButton>
                    <Modal.Title>Hospital Proof Document</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedDocument ? (
                        <img
                            src={selectedDocument}
                            alt="Hospital Proof"
                            style={{ width: '100%', height: 'auto' }}
                        />
                    ) : (
                        'No document available'
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
        </>
    );
};

export default EmpBirth;


