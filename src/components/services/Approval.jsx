import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Button, Form, Card } from 'react-bootstrap';
import Stepper from 'react-stepper-horizontal';

const ApprovalForm = () => {
  const [formData, setFormData] = useState({
    mobileNo: '',
    appName: '',
    gender: '',
    doorNo: '',
    streetName: '',
    city: '',
    aadhar: '',
    gst: '',
    tradeloc: '',
    validity: '',
    type: '',
    property: '',
    status: 'applied',
    userId: '',
    paymentId: '',
  });

  const [paymentData, setPaymentData] = useState({
    amount: 450.00,
    transactionId: '',
    date: new Date().toISOString(),
    reason: 'trade license approval',
  });

  const generateTransactionId = () => {
    return 'TXN-' + Math.random().toString(36).substr(2, 9).toUpperCase();
  };

  const [images, setImages] = useState({
    appImage: null,
    addressProof: null,
    propertyTax: null,
    noc: null,
  });

  const [currentStep, setCurrentStep] = useState(0);
  const [errors, setErrors] = useState({}); // State for validation errors

  useEffect(() => {
    const userId = sessionStorage.getItem('userId');
    setFormData(prevState => ({
      ...prevState,
      userId,
    }));
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.mobileNo) newErrors.mobileNo = 'Mobile No is required.';
    if (!formData.appName) newErrors.appName = 'Applicant Name is required.';
    if (!formData.gender) newErrors.gender = 'Gender is required.';
    if (!formData.doorNo) newErrors.doorNo = 'Door No is required.';
    if (!formData.streetName) newErrors.streetName = 'Street Name is required.';
    if (!formData.city) newErrors.city = 'City is required.';
    if (!formData.aadhar) newErrors.aadhar = 'Aadhar No is required.';
    if (!formData.gst) newErrors.gst = 'GST No is required.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
    setErrors(prevErrors => ({ ...prevErrors, [name]: '' })); // Clear error on change
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setImages(prevState => ({
      ...prevState,
      [name]: files[0],
    }));
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    
    // Generate a new transaction ID just before submission
    const newTransactionId = generateTransactionId();
    
    const dataWithTransactionId = {
      ...paymentData,
      transactionId: newTransactionId,
    };

    try {
      const response = await axios.post('http://localhost:9952/payment', dataWithTransactionId);
      const { paymentId } = response.data;
      setFormData(prevData => ({
        ...prevData,
        paymentId,
      }));
      sessionStorage.setItem('paymentId', paymentId);
      Swal.fire({
        title: "Payment Successful!",
        text: "Your payment has been processed successfully.",
        icon: "success",
      });
      setCurrentStep(2); // Move to summary step
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Payment Failed!",
        text: "There was an error processing your payment.",
        icon: "error",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const approvalData = new FormData();

    // Append form data
    for (const key in formData) {
      approvalData.append(key, formData[key]);
    }
    // Append image files
    for (const key in images) {
      approvalData.append(key, images[key]);
    }

    try {
      const response = await axios.post('http://localhost:9952/approve', approvalData);
      Swal.fire({
        title: "Submission Successful!",
        text: "Your application has been submitted.",
        icon: "success",
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Submission Failed!",
        text: "There was an error submitting your application.",
        icon: "error",
      });
    }
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setCurrentStep(1);
    }
  };

  return (
    <div>
      <Stepper
        steps={[{ title: 'Approval Details' }, { title: 'Upload Images & Payment' }, { title: 'Summary' }]}
        activeStep={currentStep}
      />
      
      {currentStep === 0 && (
        <Form onSubmit={handleNextStep}>
          <h2>Approval Details</h2>
          {/* Form Fields with Validation Errors */}
          {['mobileNo', 'appName', 'gender', 'doorNo', 'streetName', 'city', 'aadhar', 'gst'].map(field => (
            <Form.Group key={field}>
              <Form.Label>{field.replace(/([A-Z])/g, ' $1')}</Form.Label>
              <Form.Control
                type={field === 'gender' ? 'select' : 'text'}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                required
              />
              {errors[field] && <div style={{ color: 'red' }}>{errors[field]}</div>}
            </Form.Group>
          ))}
          <Button variant="primary" type="submit">Next</Button>
        </Form>
      )}

      {currentStep === 1 && (
        <div>
          <h2>Upload Images & Payment</h2>
          <Form onSubmit={handlePaymentSubmit}>
            {['appImage', 'addressProof', 'propertyTax', 'noc'].map(field => (
              <Form.Group key={field}>
                <Form.Label>{field.replace(/([A-Z])/g, ' $1')}</Form.Label>
                <Form.Control type="file" name={field} onChange={handleFileChange} required={field !== 'propertyTax' && field !== 'noc'} />
              </Form.Group>
            ))}
            <h3>Fee for Trade License is {paymentData.amount}</h3>
            <Button variant="secondary" type="button" onClick={() => setCurrentStep(0)}>Previous</Button>
            <Button variant="primary" type="submit">Submit Payment</Button>
          </Form>
        </div>
      )}

      {currentStep === 2 && (
        <div>
          <h2>Summary</h2>
          <Card>
            <Card.Body>
              <Card.Title>Application Summary</Card.Title>
              <Card.Text>
                <strong>Mobile No:</strong> {formData.mobileNo}<br />
                <strong>Applicant Name:</strong> {formData.appName}<br />
                <strong>Payment ID:</strong> {formData.paymentId}<br />
                <strong>Total Amount:</strong> {paymentData.amount}
              </Card.Text>
              <Button variant="primary" onClick={handleSubmit}>Submit Application</Button>
            </Card.Body>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ApprovalForm;
