import React, { useState } from 'react';
import axios from 'axios';
import './empRegister.css'; // Import the CSS file

const AdminRegister = () => {
    const [employee, setEmployee] = useState({
        empName: '',
        role: '',
        empMobile: '',
        password: ''
    });

    const handleChange = (e) => {
        setEmployee({
            ...employee,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('http://localhost:9952/emp/addEmp', employee) // Replace with your backend URL
            .then(response => {
                console.log('Employee created:', response.data);
                setEmployee({
                    empName: '',
                    role: '',
                    empMobile: '',
                    password: ''
                });
                alert('Registration successful!');
            })
            .catch(error => {
                console.error('There was an error creating the employee!', error);
                alert('Error during registration. Please try again.');
            });
    };

    return (
        <div className="register-container">
            <div className="register-card">
                <h1>Admin Registration</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="empName">Name:</label>
                        <input
                            type="text"
                            id="empName"
                            name="empName"
                            value={employee.empName}
                            onChange={handleChange}
                            className="form-input"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="role">Role:</label>
                        <input
                            type="text"
                            id="role"
                            name="role"
                            value={employee.role}
                            onChange={handleChange}
                            className="form-input"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="empMobile">Mobile No:</label>
                        <input
                            type="text"
                            id="empMobile"
                            name="empMobile"
                            value={employee.empMobile}
                            onChange={handleChange}
                            className="form-input"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={employee.password}
                            onChange={handleChange}
                            className="form-input"
                            required
                        />
                    </div>
                    <button type="submit" className="submit-btn">Register</button>
                </form>
            </div>
        </div>
    );
};

export default AdminRegister;
