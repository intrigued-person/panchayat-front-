import React, { useEffect, useState } from 'react';
import { Container, Table, Button, Modal, Alert } from 'react-bootstrap';
import axios from 'axios';
import './BirthRecords.css'; // Import custom CSS file
import NavB from '../navComp/NavB';

const BirthRecords = () => {
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
            const response = await axios.get('http://localhost:9952/birth/allBirths');
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

    const handleAction = async (recordId, actionType) => {
        setActionLoading(true);
        setActionMessage('');
        try {
            const payload = { birthId: recordId, status: actionType };
            const response = await axios.post('http://localhost:9952/birth/updateBirthStatus', payload);
            if (response.status === 200) {
                setActionMessage(`Successfully ${actionType.toLowerCase()}d!`);
                fetchBirths(); // Refresh the list of births
            } else {
                setActionMessage(`Failed to ${actionType.toLowerCase()}.`);
            }
        } catch (error) {
            console.error('Error updating birth status:', error);
            setActionMessage(`Error occurred: ${error.message}`);
        } finally {
            setActionLoading(false);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <><NavB></NavB>
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
                        <th>Action</th>
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
                                {record.status === 'Approved' ? (
                                    <Button
                                        variant="success"
                                        size="sm"
                                        disabled
                                    >
                                        Approved
                                    </Button>
                                ) : record.status === 'Rejected' ? (
                                    <Button
                                        variant="danger"
                                        size="sm"
                                        disabled
                                    >
                                        Rejected
                                    </Button>
                                ) : (
                                    <>
                                        <Button
                                            variant="success"
                                            size="sm"
                                            onClick={() => handleAction(record.birthId, 'Approved')}
                                            className="custom-button"
                                            disabled={actionLoading}
                                        >
                                            Approve
                                        </Button>
                                        <Button
                                            variant="danger"
                                            size="sm"
                                            onClick={() => handleAction(record.birthId, 'Rejected')}
                                            className="custom-button"
                                            disabled={actionLoading}
                                        >
                                            Reject
                                        </Button>
                                    </>
                                )}
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

export default BirthRecords;

