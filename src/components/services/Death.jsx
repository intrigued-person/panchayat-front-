import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import Navbar from '../navComp/Navbar';

function DeathForm() {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(1);
    const [userId, setUserId] = useState('');
    const [paymentId, setPaymentId] = useState('');
    const [formData, setFormData] = useState({
        district: '',
        state: '',
        address: '',
        mobile: '',
        gender: '',
        dname: '',
        nominee: '',
        nomineeName: '',
        placeOfBirth: '',
        hospitalName: '',
        date: '',
        time: '',
        deathImg: null,
        status: 'applied',
    });

    const [paymentData, setPaymentData] = useState({
        amount: 500.00,
        transactionId: '',
        date: new Date().toISOString().slice(0, -1), // Remove the 'Z'
        reason: 'death certificate',
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const storedUserId = sessionStorage.getItem('userId');
        if (storedUserId) {
            setUserId(storedUserId);
        } else {
            console.error('User ID not found in sessionStorage');
        }
    }, []);

    const generateTransactionId = () => {
        return 'TXN-' + Math.random().toString(36).substr(2, 9).toUpperCase();
    };

    const validateStep1 = () => {
        const newErrors = {};
        if (!formData.district) newErrors.district = 'District is required';
        if (!formData.mobile || !/^[0-9]{10}$/.test(formData.mobile)) newErrors.mobile = 'Invalid mobile number';
        if (!formData.gender) newErrors.gender = 'Gender is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateStep2 = () => {
        const newErrors = {};
        if (!formData.dname) newErrors.dname = "Deceased Name is required";
        if (!formData.nominee) newErrors.nominee = 'Nominee is required';
        if (!formData.nomineeName) newErrors.nomineeName = "Nominee Name is required";
        if (!formData.placeOfBirth) newErrors.placeOfBirth = 'Place of Birth is required';
        if (!formData.hospitalName) newErrors.hospitalName = 'Hospital Name is required';
        if (!formData.date) newErrors.date = 'Date is required';
        if (!formData.time) newErrors.time = 'Time is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateStep3 = () => {
        const newErrors = {};
        if (!formData.address) newErrors.address = 'Address is required';
        if (!formData.state) newErrors.state = 'State is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'file' ? files[0] : value
        });
    };

     const handlePaymentChange = (e) => {
        const { name, value } = e.target;
        setPaymentData(prevData => ({
            ...prevData,
            [name]: value,
            transactionId: generateTransactionId() // Auto-generate transactionId
            }));
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        if (currentStep === 1) {
            if (validateStep1()) {
                nextStep();
            }
        } else if (currentStep === 2) {
            if (validateStep2()) {
                nextStep();
            }
        } else if (currentStep === 3) {
            if (validateStep3()) {
                nextStep();
            }
        } else if (currentStep === 4) {
            const formDataToSubmit = new FormData();
            for (const key in formData) {
                formDataToSubmit.append(key, formData[key]);
            }
            formDataToSubmit.append('userId', userId);
            //     formDataToSubmit.append('generate', new Date().toISOString());

            axios.post('http://localhost:9952/death', formDataToSubmit)
                .then((response) => {
                    const { deathId } = response.data;
                    sessionStorage.setItem('deathId', deathId);
                    nextStep();
                })
                .catch((error) => {
                    console.error(error);
                });
        } else if (currentStep === 5) {
            axios.post('http://localhost:9952/payment', paymentData)
                .then((response) => {
                    const { paymentId } = response.data;
                    setPaymentId(paymentId); // Set paymentId in state
                    sessionStorage.setItem('paymentId', paymentId);
                    Swal.fire({
                        title: "Payment Successful!",
                        text: "Your payment has been processed successfully.",
                        icon: "success",
                    });
                    nextStep();
                })
                .catch((error) => {
                    console.error(error);
                    Swal.fire({
                        title: "Payment Failed!",
                        text: "There was an error processing your payment.",
                        icon: "error",
                    });
                });
        } else if (currentStep === 6) {
            const finalFormData = new FormData();
            for (const key in formData) {
                finalFormData.append(key, formData[key]);
            }
            finalFormData.append('userId', userId);
            finalFormData.append('paymentId', paymentId);
            finalFormData.append('generate', new Date().toISOString());
            axios.post('http://localhost:9952/death', finalFormData)
                .then((response) => {
                    console.log(response.data)
                    Swal.fire({
                        title: "Submission Successful!",
                        text: "Your death certificate application has been submitted successfully.",
                        icon: "success",
                    });
                    navigate("/userLand"); // Navigate to a confirmation page or dashboard
                })
                .catch((error) => {
                    console.error(error);
                    Swal.fire({
                        title: "Submission Failed!",
                        text: "There was an error submitting your death certificate application.",
                        icon: "error",
                    });
                });
        }
    };

    const nextStep = () => {
        if (currentStep === 4) {
            // Generate transaction ID when entering the payment step
            setPaymentData(prevData => ({
                ...prevData,
                transactionId: generateTransactionId() // Generate transaction ID
            }));
        }
        if (currentStep < 6) setCurrentStep(currentStep + 1);
    };

    const prevStep = () => {
        if (currentStep > 1) setCurrentStep(currentStep - 1);
    };

    return (
        <> 
            <Container>
                <Card className="p-4 mb-4 custom-card">
                    <div className="progress-bar" style={{ width: `${(currentStep / 6) * 100}%` }}></div>
                    <Form onSubmit={handleSubmit}>
                        {currentStep === 1 && (
                            <div>
                                <Card.Title>Personal Information</Card.Title>
                                <Form.Group>
                                    <Form.Label>District</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="district"
                                        value={formData.district}
                                        onChange={handleChange}
                                        placeholder="Enter District"
                                    />
                                    {errors.district && <Form.Text className="text-danger">{errors.district}</Form.Text>}
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Mobile Number</Form.Label>
                                    <Form.Control
                                        type="tel"
                                        name="mobile"
                                        value={formData.mobile}
                                        onChange={handleChange}
                                        placeholder="Enter Mobile Number"
                                    />
                                    {errors.mobile && <Form.Text className="text-danger">{errors.mobile}</Form.Text>}
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Gender</Form.Label>
                                    <Form.Control
                                        as="select"
                                        name="gender"
                                        value={formData.gender}
                                        onChange={handleChange}
                                    >
                                        <option value="">Select Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </Form.Control>
                                    {errors.gender && <Form.Text className="text-danger">{errors.gender}</Form.Text>}
                                </Form.Group>
                                <Button variant="primary" type="button" onClick={nextStep}>Next</Button>
                            </div>
                        )}
                        {currentStep === 2 && (
                            <div>
                                <Card.Title>Death Details</Card.Title>
                                <Form.Group>
                                    <Form.Label>Deceased Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="dname"
                                        value={formData.dname}
                                        onChange={handleChange}
                                        placeholder="Enter Deceased Name"
                                    />
                                    {errors.dname && <Form.Text className="text-danger">{errors.dname}</Form.Text>}
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Nominee</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="nominee"
                                        value={formData.nominee}
                                        onChange={handleChange}
                                        placeholder="Enter Nominee"
                                    />
                                    {errors.nominee && <Form.Text className="text-danger">{errors.nominee}</Form.Text>}
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Nominee Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="nomineeName"
                                        value={formData.nomineeName}
                                        onChange={handleChange}
                                        placeholder="Enter Nominee Name"
                                    />
                                    {errors.nomineeName && <Form.Text className="text-danger">{errors.nomineeName}</Form.Text>}
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Place of Death</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="placeOfBirth"
                                        value={formData.placeOfBirth}
                                        onChange={handleChange}
                                        placeholder="Enter Place of Death"
                                    />
                                    {errors.placeOfBirth && <Form.Text className="text-danger">{errors.placeOfBirth}</Form.Text>}
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Hospital Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="hospitalName"
                                        value={formData.hospitalName}
                                        onChange={handleChange}
                                        placeholder="Enter Hospital Name"
                                    />
                                    {errors.hospitalName && <Form.Text className="text-danger">{errors.hospitalName}</Form.Text>}
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Date of Death</Form.Label>
                                    <Form.Control
                                        type="date"
                                        name="date"
                                        value={formData.date}
                                        onChange={handleChange}
                                    />
                                    {errors.date && <Form.Text className="text-danger">{errors.date}</Form.Text>}
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Time of Death</Form.Label>
                                    <Form.Control
                                        type="time"
                                        name="time"
                                        value={formData.time}
                                        onChange={handleChange}
                                    />
                                    {errors.time && <Form.Text className="text-danger">{errors.time}</Form.Text>}
                                </Form.Group>
                                {/* <Form.Group>
                                <Form.Label>Hospital Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="hospitalName"
                                    onChange={handleChange}
                                    value={formData.hospitalName}
                                />
                                {errors.hospitalName && <Form.Text className="text-danger">{errors.hospitalName}</Form.Text>}
                            </Form.Group> */}
                                <Button variant="secondary" type="button" onClick={prevStep}>Previous</Button>
                                <Button variant="primary" type="button" onClick={nextStep}>Next</Button>
                            </div>
                        )}
                        {currentStep === 3 && (
                            <div>
                                <Card.Title>Address Information</Card.Title>
                                <Form.Group>
                                    <Form.Label>Address</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        placeholder="Enter Address"
                                    />
                                    {errors.address && <Form.Text className="text-danger">{errors.address}</Form.Text>}
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>State</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="state"
                                        value={formData.state}
                                        onChange={handleChange}
                                        placeholder="Enter State"
                                    />
                                    {errors.state && <Form.Text className="text-danger">{errors.state}</Form.Text>}
                                </Form.Group>
                                <Button variant="secondary" type="button" onClick={prevStep}>Previous</Button>
                                <Button variant="primary" type="button" onClick={nextStep}>Next</Button>
                            </div>
                        )}
                        {currentStep === 4 && (
                            <div>
                                <Card.Title>Document Upload</Card.Title>
                                <Form.Group>
                                    <Form.Label>Upload Death Image</Form.Label>
                                    <Form.Control
                                        type="file"
                                        name="deathImg"
                                        onChange={handleChange}
                                        accept="image/*"
                                    />
                                    {errors.deathImg && <Form.Text className="text-danger">{errors.deathImg}</Form.Text>}
                                </Form.Group>
                                <Button variant="secondary" type="button" onClick={prevStep}>Previous</Button>
                                <Button variant="primary" type="button" onClick={nextStep}>Next</Button>
                            </div>
                        )}
                        {currentStep === 5 && (
                            <div>
                                 <h3>Amount for Death Certificate is 500</h3>
                                <Card.Title>Payment</Card.Title>
                                <Form.Group>
                                    <Form.Label>Amount</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="amount"
                                        value={paymentData.amount}
                                        readOnly
                                    />
                                </Form.Group>
                               
                                <Button variant="secondary" type="button" onClick={prevStep}>Previous</Button>
                                <Button variant="primary" type="submit">Submit Payment</Button>
                            </div>
                        )}
                        {currentStep === 6 && (
                            <div>
                                <Card.Title>Summary</Card.Title>
                                <div>
                                    <strong>Personal Information:</strong>
                                    <p>District: {formData.district}</p>
                                    <p>Mobile: {formData.mobile}</p>
                                    <p>Gender: {formData.gender}</p>
                                    <strong>Death Details:</strong>
                                    <p>Deceased Name: {formData.dname}</p>
                                    <p>Nominee: {formData.nominee}</p>
                                    <p>Nominee Name: {formData.nomineeName}</p>
                                    <p>Place of Birth: {formData.placeOfBirth}</p>
                                    <p>Hospital Name: {formData.hospitalName}</p>
                                    <p>Date of Death: {formData.date}</p>
                                    <p>Time of Death: {formData.time}</p>
                                    <p>Status: {formData.status}</p>
                                    <strong>Address Information:</strong>
                                    <p>Address: {formData.address}</p>
                                    <p>State: {formData.state}</p>
                                    <strong>Payment:</strong>
                                    <p>Amount: {paymentData.amount}</p>
                                    <p>Transaction ID: {paymentData.transactionId}</p>
                                    <p>Date: {paymentData.date}</p>
                                    <Button variant="secondary" type="button" onClick={prevStep}>Previous</Button>
                                    <Button variant="primary" type="submit">Confirm & Submit</Button>
                                </div>
                            </div>
                        )}
                    </Form>
                </Card>
            </Container>
        </>
    );
}

export default DeathForm;