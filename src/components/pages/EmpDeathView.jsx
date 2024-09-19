import React, { useEffect, useState } from 'react';
import { Container, Table, Button, Modal, Alert } from 'react-bootstrap';
import axios from 'axios';
import './BirthRecords.css'; // Import custom CSS file
import { useNavigate } from 'react-router-dom';
import Nav from '../navComp/Nav';

function EmpDeathView() {

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
            const response = await axios.get('http://localhost:9952/death/approvedDeath');
            setBirths(response.data);
        } catch (error) {
            console.error('Error fetching birth records:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleViewDocument = (record) => {
        if (record.deathImg) {
            const url = `data:image/jpeg;base64,${record.deathImg}`;
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
            const response = await axios.get(`http://localhost:9952/death/findDeath/${record.deathId}`);
            const birthRecord = response.data;

            // Check if user property exists
            if (!birthRecord.user) {
                throw new Error('User information not found');
            }

            // Store birth details in session storage
            sessionStorage.setItem('deathId', record.deathId);
            sessionStorage.setItem('deathName', birthRecord.dname);
            sessionStorage.setItem('deathplace', birthRecord.placeOfBirth);
            sessionStorage.setItem('date', birthRecord.date);
            sessionStorage.setItem('Nominee', birthRecord.nominee);
            sessionStorage.setItem('NomineeName', birthRecord.nomineeName);
            sessionStorage.setItem('address', birthRecord.address);
            sessionStorage.setItem('gender', birthRecord.gender);
            sessionStorage.setItem('userId', birthRecord.user.userId);
            navigat('/deathct');
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
                <h2 className="text-center mb-4">Death Records</h2>
                {actionMessage && <Alert variant={actionMessage.includes('Failed') ? 'danger' : 'success'}>{actionMessage}</Alert>}
                <Table striped bordered hover responsive className="custom-table">
                    <thead>
                        <tr>
                            <th>Demise Person Name</th>
                            <th>Gender</th>
                            {/* <th>Date of Birth</th> */}
                            <th>Death Place</th>
                            <th>Nominee</th>
                            <th>Nominee Name</th>
                            <th>Address</th>
                            <th>Hospital Proof</th>
                            <th>Action</th> {/* New Column for Action */}
                        </tr>
                    </thead>
                    <tbody>
                        {births.map((record) => (
                            <tr key={record.deathId}>
                                <td>{record.dname}</td>
                                <td>{record.gender}</td>
                                {/* <td>{record.dob}</td> */}
                                <td>{record.placeOfBirth}</td>
                                <td>{record.nominee}</td>
                                <td>{record.nomineeName}</td>
                                <td>{record.address}</td>
                                <td>
                                    {record.deathImg ? (
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
    )
}

export default EmpDeathView