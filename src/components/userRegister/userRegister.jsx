import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Form, Button, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './register.module.css'; // Import the updated CSS file

const UserRegister = () => {
    const [user, setUser] = useState({
        uname: '',
        uemail: '',
        mobileNo: '',
        password: ''
    });

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
        setErrors({ ...errors, [e.target.name]: '' }); // Clear error on input change
    };

    const validateForm = () => {
        const newErrors = {};
        if (!user.uname) newErrors.uname = "Username is required.";
        if (!user.uemail) newErrors.uemail = "Email is required.";
        if (!user.mobileNo) newErrors.mobileNo = "Mobile number is required.";
        if (!user.password) newErrors.password = "Password is required.";
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validateForm();

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        axios.post('http://localhost:9952/user/addUser', user) // Replace with your backend URL
            .then(response => {
                console.log('User created:', response.data);
                setUser({
                    uname: '',
                    uemail: '',
                    mobileNo: '',
                    password: ''
                });
                Swal.fire({
                    icon: 'success',
                    title: 'Registration successful!',
                    text: 'You have been registered successfully.'
                });
                navigate('/userLog');
            })
            .catch(error => {
                console.error('There was an error creating the user!', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error during registration',
                    text: 'Please try again.'
                });
            });
    };

    return (
        <Container fluid id="register-container">
            <Row className="justify-content-center align-items-center min-vh-100">
                <Col md={6} lg={4} className="py-5">
                    <div id="register-card" className="p-4 shadow rounded bg-white">
                        <div className="text-center mb-4">
                            <Image
                                src="https://th.bing.com/th/id/OIP.ZQaH_xTSaX11QrpFt6auNQAAAA?rs=1&pid=ImgDetMain"
                                alt="Logo"
                                fluid
                                className="logo"
                            />
                            <h2 id="register-title" className="mt-3">User Registration</h2>
                        </div>

                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="formUsername">
                                <Form.Label id="username-label">Username</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="uname"
                                    placeholder="Enter your username"
                                    value={user.uname}
                                    onChange={handleChange}
                                    id="username-input"
                                    isInvalid={!!errors.uname}
                                />
                                <Form.Control.Feedback type="invalid" style={{ display: errors.uname ? 'block' : 'none' }}>
                                    <span style={{ color: 'red' }}>{errors.uname}</span>
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="formEmail" className="mt-3">
                                <Form.Label id="email-label">Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="uemail"
                                    placeholder="Enter your email"
                                    value={user.uemail}
                                    onChange={handleChange}
                                    id="email-input"
                                    isInvalid={!!errors.uemail}
                                />
                                <Form.Control.Feedback type="invalid" style={{ display: errors.uemail ? 'block' : 'none' }}>
                                    <span style={{ color: 'red' }}>{errors.uemail}</span>
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="formMobileNo" className="mt-3">
                                <Form.Label id="mobile-label">Mobile No</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="mobileNo"
                                    placeholder="Enter your mobile number"
                                    value={user.mobileNo}
                                    onChange={handleChange}
                                    id="mobile-input"
                                    isInvalid={!!errors.mobileNo}
                                />
                                <Form.Control.Feedback type="invalid" style={{ display: errors.mobileNo ? 'block' : 'none' }}>
                                    <span style={{ color: 'red' }}>{errors.mobileNo}</span>
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="formPassword" className="mt-3">
                                <Form.Label id="password-label">Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="password"
                                    placeholder="Enter your password"
                                    value={user.password}
                                    onChange={handleChange}
                                    id="password-input"
                                    isInvalid={!!errors.password}
                                />
                                <Form.Control.Feedback type="invalid" style={{ display: errors.password ? 'block' : 'none' }}>
                                    <span style={{ color: 'red' }}>{errors.password}</span>
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Button
                                variant="primary"
                                type="submit"
                                id="register-button"
                                className="mt-4 w-100"
                            >
                                Register
                            </Button>
                        </Form>
                        <div className="text-center mt-4">
                            <p id="login-prompt" className="text-lg">
                                Already have an account? <Link to="/userLog" className="link">Login Here!</Link>
                            </p>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default UserRegister;
