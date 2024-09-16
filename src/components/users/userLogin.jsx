import React, { useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, Button, Image } from 'react-bootstrap';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Link, useNavigate } from 'react-router-dom';
import './userLogin.css'; // Import the CSS file

const UserLogin = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.get(`http://localhost:9952/user/studentLogin/${credentials.email}/${credentials.password}`)
            .then(response => {
                const user = response.data;
                if (user && user.userId) {
                    sessionStorage.setItem('userId', user.userId);
                    navigate('/birth');
                } else {
                    setError('Login response does not contain userId');
                }
            })
            .catch(() => {
                Swal.fire({
                    icon: 'error',
                    title: 'Invalid Login',
                    text: 'Please enter valid credentials or click sign-up if you are new.',
                });
                setError('Invalid email or password');
            });
    };

    return (
        <div>
            <Container fluid className="bg-gradient login-container">
                <Row className="justify-content-center align-items-center min-vh-100">
                    <Col md={6} lg={4} className="py-5">
                        <div className="login-card p-4 shadow rounded bg-white">
                            <div className="text-center mb-4">
                                <Image
                                    src="https://th.bing.com/th/id/OIP.ZQaH_xTSaX11QrpFt6auNQAAAA?rs=1&pid=ImgDetMain"
                                    alt="Logo"
                                    fluid
                                    className="logo"
                                />
                                <h2 className="mt-3">User Login</h2>
                            </div>

                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="formEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        placeholder="Enter your email"
                                        value={credentials.email}
                                        onChange={handleChange}
                                        isInvalid={!!error}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {error}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group controlId="formPassword" className="mt-3">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="password"
                                        placeholder="Enter your password"
                                        value={credentials.password}
                                        onChange={handleChange}
                                        isInvalid={!!error}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {error}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Button
                                    variant="primary"
                                    type="submit"
                                    className="mt-4 w-100"
                                >
                                    Login
                                </Button>
                            </Form>
                            <div className="text-center mt-4">
                                <p className="text-lg">
                                    Don't have an account?{' '}
                                    <Link to="/userReg" className="link">Register here</Link>
                                </p>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>

            <footer className="bg-dark text-light py-4">
                <Container>
                    <Row>
                        <Col>
                            <p className="mb-0">University of Houston</p>
                            <p className="mb-0">Houston, Texas 77204</p>
                            <p className="mb-0">(713) 743-2255</p>
                        </Col>
                        <Col>
                            <h5>About Us</h5>
                            <p>
                                You can follow us on our social media platforms including Facebook, Instagram, YouTube, Twitter, and Google+ @ University of Houston.
                            </p>
                        </Col>
                    </Row>
                </Container>
            </footer>
        </div>
    );
};

export default UserLogin;
