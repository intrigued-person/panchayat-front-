import React, { useState, useEffect } from 'react';
import './IssueForm.css';
import axios from 'axios';
import Navbar from '../navComp/Navbar';

const IssueForm = () => {
    const [formData, setFormData] = useState({
        issueType: '',
        description: '',
        location: '',
        status: 'pending',
        proofImage: null,
        userId: '', // Initialize userId
    });

    useEffect(() => {
        const userId = sessionStorage.getItem('userId'); // Get userId from sessionStorage
        if (userId) {
            setFormData((prevData) => ({ ...prevData, userId })); // Set userId in form data
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, proofImage: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();

        // Append all form fields to FormData
        Object.keys(formData).forEach(key => {
            formDataToSend.append(key, formData[key]);
        });

        try {
            const response = await axios.post('http://localhost:9952/add', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response.data); // Handle response as needed
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <>
        <Navbar></Navbar>
        <form className="issue-form" onSubmit={handleSubmit}>
            <h2>Report an Issue</h2>

            <label htmlFor="issueType">Issue Type</label>
            <select name="issueType" value={formData.issueType} onChange={handleChange} required>
                <option value="">Select...</option>
                <option value="Type 1">Water problem</option>
                <option value="Type 2">Electricity issue</option>
                <option value="Type 3">Pits</option>
                <option value="Type 4">Repair of public wells</option>
                <option value="Type 5">Maintenance of village roads</option>
                <option value="Other">Other</option>
            </select>

            <label htmlFor="description">Description</label>
            <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="5"
                required
            ></textarea>

            <label htmlFor="location">Location</label>
            <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
            />

            {/* <label htmlFor="status">Status</label>
      <input
        type="text"
        name="status"
        value={formData.status}
        onChange={handleChange}
        required
      /> */}

            <label htmlFor="proofImage">Proof Image</label>
            <input
                type="file"
                name="proofImage"
                accept="image/*"
                onChange={handleFileChange}
            />
            <br />
            <br />
            <button type="submit">Submit</button>
        </form>
        </>
    );
};

export default IssueForm;
