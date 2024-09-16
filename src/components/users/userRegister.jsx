import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Form, Button, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './userRegister.css'; // Import the updated CSS file

const UserRegister = () => {
    const [user, setUser] = useState({
        uname: '',
        uemail: '',
        mobileNo: '',
        password: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

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
                navigate('/userlogin');
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
        <Container fluid className="register-container">
            <Row className="justify-content-center align-items-center min-vh-100">
                <Col md={6} lg={4} className="py-5">
                    <div className="register-card p-4 shadow rounded bg-white">
                        <div className="text-center mb-4">
                            <Image
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Seal_of_India.svg/1200px-Seal_of_India.svg.png"
                                alt="Government Seal"
                                fluid
                                className="logo"
                            />
                            <h2 className="mt-3">User Registration</h2>
                        </div>

                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="formUsername">
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="uname"
                                    placeholder="Enter your username"
                                    value={user.uname}
                                    onChange={handleChange}
                                    className="form-input"
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="formEmail" className="mt-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="uemail"
                                    placeholder="Enter your email"
                                    value={user.uemail}
                                    onChange={handleChange}
                                    className="form-input"
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="formMobileNo" className="mt-3">
                                <Form.Label>Mobile No</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="mobileNo"
                                    placeholder="Enter your mobile number"
                                    value={user.mobileNo}
                                    onChange={handleChange}
                                    className="form-input"
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="formPassword" className="mt-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="password"
                                    placeholder="Enter your password"
                                    value={user.password}
                                    onChange={handleChange}
                                    className="form-input"
                                    required
                                />
                            </Form.Group>
                            <Button
                                variant="primary"
                                type="submit"
                                className="mt-4 w-100 submit-btn"
                            >
                                Register
                            </Button>
                        </Form>
                        <div className="text-center mt-4">
                            <p className="text-lg">
                                Already have an account? <Link to="/userlogin" className="link">Login Here!</Link>
                            </p>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default UserRegister;
