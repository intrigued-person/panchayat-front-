import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Table, Button, Modal, Alert } from 'react-bootstrap';
import styles from './IssueTable.module.css'; // Adjust the path as needed
import Nav from '../navComp/Nav';

const IssueTable = () => {
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [actionMessage, setActionMessage] = useState('');

    useEffect(() => {
        const fetchIssues = async () => {
            try {
                const response = await axios.get('http://localhost:9952/allIssues');
                setIssues(response.data);
            } catch (error) {
                setError('Error fetching issues');
                console.error('Error fetching issues:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchIssues();
    }, []);

    const handleStatusChange = (issueId, newStatus, proofImage) => {
        setIssues(prevIssues =>
            prevIssues.map(issue =>
                issue.issueId === issueId ? { ...issue, status: newStatus } : issue
            )
        );

        axios.post('http://localhost:9952/updateIssueStatus', { issueId, status: newStatus })
            .then(response => {
                setActionMessage(`Status updated to ${newStatus} for Issue ID: ${issueId}`);
                console.log('Status updated:', response.data);

                // Open the document if proofImage exists
                if (proofImage) {
                    openModal(proofImage);
                }
            })
            .catch(error => {
                setError('Error updating status');
                console.error('Error updating status:', error);
            });
    };

    const getImageSrc = (imageBlob) => {
        if (!imageBlob) return null;
        return `data:image/jpeg;base64,${imageBlob}`;
    };

    const openModal = (imageBlob) => {
        setSelectedImage(getImageSrc(imageBlob));
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedImage(null);
    };

    if (loading) return <p>Loading issues...</p>;
    if (error) return <Alert variant="danger">{error}</Alert>;

    return (
        <>
        <Nav></Nav>
        <Container fluid className={styles.issueTableContainer}>
            <h2 className="text-center mb-4">Issues Table</h2>
            {actionMessage && <Alert variant="success">{actionMessage}</Alert>}
            <Table striped bordered hover responsive className={styles.issueTable}>
                <thead>
                    <tr>
                        <th>Issue ID</th>
                        <th>Issue Type</th>
                        <th>Description</th>
                        <th>Location</th>
                        <th>Status</th>
                        <th>Proof Image</th>
                    </tr>
                </thead>
                <tbody>
                    {issues.map(issue => (
                        <tr key={issue.issueId}>
                            <td>{issue.issueId}</td>
                            <td>{issue.issueType}</td>
                            <td>{issue.description}</td>
                            <td>{issue.location}</td>
                            <td>
                                <select
                                    value={issue.status}
                                    onChange={(e) => handleStatusChange(issue.issueId, e.target.value, issue.proofImage)}
                                    disabled={issue.status === 'completed'}
                                >
                                    {['pending', 'processing', 'ongoing', 'completed'].map(status => (
                                        <option key={status} value={status}>
                                            {status.charAt(0).toUpperCase() + status.slice(1)}
                                        </option>
                                    ))}
                                </select>
                            </td>
                            <td>
                                {issue.proofImage ? (
                                    <img
                                        src={getImageSrc(issue.proofImage)}
                                        alt={`Proof for issue ${issue.issueId}`}
                                        className={styles.proofImage}
                                        style={{ width: '100px', height: 'auto', cursor: 'pointer' }}
                                        onClick={() => openModal(issue.proofImage)}
                                    />
                                ) : 'No Image'}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Modal for displaying the image */}
            <Modal show={showModal} onHide={closeModal} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Proof Document</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedImage ? (
                        <img
                            src={selectedImage}
                            alt="Proof"
                            style={{ width: '100%', height: 'auto' }}
                        />
                    ) : (
                        'No document available'
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
        </>
    );
};

export default IssueTable;
