import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

class StorageUtil {
    static setReason(birthCertificate) {
        sessionStorage.setItem('reason', birthCertificate);
    }
}

function BirthForm() {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(1);
    const [userId, setUserId] = useState('');
    const [birthCertificate, setBirthCertificate] = useState('');
    const [formData, setFormData] = useState({
        district: '',
        mobile: '',
        emailId: '',
        dob: '',
        gender: '',
        childName: '',
        fatherName: '',
        motherName: '',
        placeOfBirth: '',
        hospitalName: '',
        town: '',
        religion: '',
        focup: '',
        mocup: '',
        motherMrgYr: '',
        motherBirthYr: '',
        certificateType: '',
        status: '',
        address: '',
        state: '',
        hospitalImg: null,
    });

    const [errors, setErrors] = useState({});
    // setReason = 'reason';
   // sessionStorage.setItem('birth', reason);
   //sessionStorage.setItem('reason', birthCertificate);

    useEffect(() => {
        const storedUserId = sessionStorage.getItem('userId');
        if (storedUserId) {
            setUserId(storedUserId);
        } else {
            console.error('User ID not found in sessionStorage');
        }
    }, []);

    const validateStep1 = () => {
        const newErrors = {};
        if (!formData.district) newErrors.district = 'District is required';
        if (!formData.mobile || !/^[0-9]{10}$/.test(formData.mobile)) newErrors.mobile = 'Invalid mobile number';
        if (!formData.emailId || !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(formData.emailId)) newErrors.emailId = 'Invalid email format';
        if (!formData.dob) newErrors.dob = 'Date of Birth is required';
        if (!formData.gender) newErrors.gender = 'Gender is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateStep2 = () => {
        const newErrors = {};
        if (!formData.childName) newErrors.childName = "Child's Name is required";
        if (!formData.fatherName) newErrors.fatherName = "Father's Name is required";
        if (!formData.motherName) newErrors.motherName = "Mother's Name is required";
        if (!formData.placeOfBirth) newErrors.placeOfBirth = 'Place of Birth is required';
        if (!formData.hospitalName) newErrors.hospitalName = 'Hospital Name is required';
        if (!formData.town) newErrors.town = 'Town is required';
        if (!formData.religion) newErrors.religion = 'Religion is required';
        if (!formData.focup) newErrors.focup = "Father's Occupation is required";
        if (!formData.mocup) newErrors.mocup = "Mother's Occupation is required";
        if (!formData.motherMrgYr) newErrors.motherMrgYr = "Mother's Marriage Year is required";
        if (!formData.motherBirthYr) newErrors.motherBirthYr = "Mother's Birth Year is required";
        if (!formData.certificateType) newErrors.certificateType = 'Certificate Type is required';
        if (!formData.status) newErrors.status = 'Status is required';
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
            nextStep();
        } else if (currentStep === 4) {
            const formDataToSubmit = new FormData();
            for (const key in formData) {
                formDataToSubmit.append(key, formData[key]);
            }
            formDataToSubmit.append('userId', userId);
            //    formDataToSubmit.append('paymentId', 1);

            // Add the missing 'generate' parameter
            formDataToSubmit.append('generate', '2024-09-11T00:00:00'); // Replace 'someValue' with the appropriate value
            StorageUtil.setReason(birthCertificate);
            axios.post('http://localhost:9952/birth', formDataToSubmit)
                .then((response) => {
                    // Assuming the response contains birthId and reason
                    const { birthId } = response.data;

                    // Store birthId and reason in sessionStorage
                    sessionStorage.setItem('birthId', birthId);
                    

                    Swal.fire({
                        title: "Application Submitted Successfully!",
                        text: "Your application has been submitted successfully.",
                        icon: "success",
                    });
                    navigate("/payment");
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    };



    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     if (currentStep === 1) {
    //         if (validateStep1()) {
    //             nextStep();
    //         }
    //     } else if (currentStep === 2) {
    //         if (validateStep2()) {
    //             nextStep();
    //         }
    //     } else if (currentStep === 3) {
    //         nextStep();
    //     } else if (currentStep === 4) {
    //         const formDataToSubmit = new FormData();
    //         for (const key in formData) {
    //             formDataToSubmit.append(key, formData[key]);
    //         }
    //         formDataToSubmit.append('userId', userId);

    //         axios.post('http://localhost:9952/birth', formDataToSubmit)
    //             .then((response) => {
    //                 Swal.fire({
    //                     title: "Application Submitted Successfully!",
    //                     text: "Your application has been submitted successfully.",
    //                     icon: "success",
    //                 });
    //                 navigate("/home");
    //             })
    //             .catch((error) => {
    //                 console.error(error);
    //             });
    //     }
    // };

    const nextStep = () => {
        if (currentStep < 4) setCurrentStep(currentStep + 1);
    };

    const prevStep = () => {
        if (currentStep > 1) setCurrentStep(currentStep - 1);
    };

    return (
        <Container>
            <Card className="p-4 mb-4 custom-card">
                <div className="progress-bar" style={{ width: `${(currentStep / 4) * 100}%` }}></div>
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
                                <Form.Label>Email ID</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="emailId"
                                    value={formData.emailId}
                                    onChange={handleChange}
                                    placeholder="Enter Email ID"
                                />
                                {errors.emailId && <Form.Text className="text-danger">{errors.emailId}</Form.Text>}
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Date of Birth</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="dob"
                                    value={formData.dob}
                                    onChange={handleChange}
                                />
                                {errors.dob && <Form.Text className="text-danger">{errors.dob}</Form.Text>}
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
                                    <option value="Other">Other</option>
                                </Form.Control>
                                {errors.gender && <Form.Text className="text-danger">{errors.gender}</Form.Text>}
                            </Form.Group>
                            <Button variant="primary" type="button" onClick={nextStep}>Next</Button>
                        </div>
                    )}

                    {currentStep === 2 && (
                        <div>
                            <Card.Title>Birth Details</Card.Title>
                            <Form.Group>
                                <Form.Label>Child's Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="childName"
                                    value={formData.childName}
                                    onChange={handleChange}
                                    placeholder="Enter Child's Name"
                                />
                                {errors.childName && <Form.Text className="text-danger">{errors.childName}</Form.Text>}
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Father's Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="fatherName"
                                    value={formData.fatherName}
                                    onChange={handleChange}
                                    placeholder="Enter Father's Name"
                                />
                                {errors.fatherName && <Form.Text className="text-danger">{errors.fatherName}</Form.Text>}
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Mother's Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="motherName"
                                    value={formData.motherName}
                                    onChange={handleChange}
                                    placeholder="Enter Mother's Name"
                                />
                                {errors.motherName && <Form.Text className="text-danger">{errors.motherName}</Form.Text>}
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Place of Birth</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="placeOfBirth"
                                    value={formData.placeOfBirth}
                                    onChange={handleChange}
                                    placeholder="Enter Place of Birth"
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
                                <Form.Label>Town</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="town"
                                    value={formData.town}
                                    onChange={handleChange}
                                    placeholder="Enter Town"
                                />
                                {errors.town && <Form.Text className="text-danger">{errors.town}</Form.Text>}
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Religion</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="religion"
                                    value={formData.religion}
                                    onChange={handleChange}
                                >
                                    <option value="">Select Religion</option>
                                    <option value="Christian">Christian</option>
                                    <option value="Muslim">Muslim</option>
                                    <option value="Hindu">Hindu</option>
                                    <option value="Other">Other</option>
                                </Form.Control>
                                {errors.religion && <Form.Text className="text-danger">{errors.religion}</Form.Text>}
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Father's Occupation</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="focup"
                                    value={formData.focup}
                                    onChange={handleChange}
                                    placeholder="Enter Father's Occupation"
                                />
                                {errors.focup && <Form.Text className="text-danger">{errors.focup}</Form.Text>}
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Mother's Occupation</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="mocup"
                                    value={formData.mocup}
                                    onChange={handleChange}
                                    placeholder="Enter Mother's Occupation"
                                />
                                {errors.mocup && <Form.Text className="text-danger">{errors.mocup}</Form.Text>}
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Mother's Marriage Year</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="motherMrgYr"
                                    value={formData.motherMrgYr}
                                    onChange={handleChange}
                                    placeholder="Enter Mother's Marriage Year"
                                />
                                {errors.motherMrgYr && <Form.Text className="text-danger">{errors.motherMrgYr}</Form.Text>}
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Mother's Birth Year</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="motherBirthYr"
                                    value={formData.motherBirthYr}
                                    onChange={handleChange}
                                    placeholder="Enter Mother's Birth Year"
                                />
                                {errors.motherBirthYr && <Form.Text className="text-danger">{errors.motherBirthYr}</Form.Text>}
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Certificate Type</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="certificateType"
                                    value={formData.certificateType}
                                    onChange={handleChange}
                                >
                                    <option value="">Select Certificate Type</option>
                                    <option value="Birth Certificate">Birth Certificate</option>
                                    <option value="Stillbirth Certificate">Stillbirth Certificate</option>
                                </Form.Control>
                                {errors.certificateType && <Form.Text className="text-danger">{errors.certificateType}</Form.Text>}
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Status</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                >
                                    <option value="">Select Status</option>
                                    <option value="Pending">Pending</option>
                                    <option value="Approved">Approved</option>
                                    <option value="Rejected">Rejected</option>
                                </Form.Control>
                                {errors.status && <Form.Text className="text-danger">{errors.status}</Form.Text>}
                            </Form.Group>
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
                                <Form.Label>Upload Hospital Image</Form.Label>
                                <Form.Control
                                    type="file"
                                    name="hospitalImg"
                                    onChange={handleChange}
                                    accept="image/*"
                                />
                                {errors.hospitalImg && <Form.Text className="text-danger">{errors.hospitalImg}</Form.Text>}
                            </Form.Group>
                            <Button variant="secondary" type="button" onClick={prevStep}>Previous</Button>
                            <Button variant="primary" type="submit">Submit</Button>
                        </div>
                    )}
                </Form>
            </Card>
        </Container>
    );
}

export default BirthForm;
