// import React, { useState } from 'react';
// import axios from 'axios';
// import './empRegister.css'; // Import the CSS file
// import NavB from '../navComp/NavB';
// import { useNavigate } from 'react-router-dom';

// const AdminRegister = () => {
//     const [employee, setEmployee] = useState({
//         empName: '',
//         role: '',
//         empMobile: '',
//         password: ''
//     });

//     const [errors, setErrors] = useState({}); // State to hold error messages

//     const handleChange = (e) => {
//         setEmployee({
//             ...employee,
//             [e.target.name]: e.target.value
//         });

//         // Clear error for the current field when user types
//         setErrors({
//             ...errors,
//             [e.target.name]: ''
//         });
//     };

//     const validate = () => {
//         const newErrors = {};
//         if (!employee.empName) newErrors.empName = 'Name is required';
//         if (!employee.role) newErrors.role = 'Role is required';
//         if (!employee.empMobile) {
//             newErrors.empMobile = 'Mobile number is required';
//         } else if (!/^\d{10}$/.test(employee.empMobile)) {
//             newErrors.empMobile = 'Mobile number must be 10 digits';
//         }
//         if (!employee.password) newErrors.password = 'Password is required';

//         return newErrors;
//     };

//     const navigate = useNavigate();

//     const handleSubmit = (e) => {
//         e.preventDefault();

//         const validationErrors = validate();
//         if (Object.keys(validationErrors).length > 0) {
//             setErrors(validationErrors);
//             return;
//         }

//         axios.post('http://localhost:9952/emp/addEmp', employee) // Replace with your backend URL
//             .then(response => {
//                 console.log('Employee created:', response.data);
//                 setEmployee({
//                     empName: '',
//                     role: '',
//                     empMobile: '',
//                     password: ''
//                 });
//                 alert('Registration successful!');
//                 navigate('/ViewEmps')
//             })
//             .catch(error => {
//                 console.error('There was an error creating the employee!', error);
//                 alert('Error during registration. Please try again.');
//             });
//     };

//     return (
//         <>
//             <NavB />
//             <div className="register-container">
//                 <div className="register-card">
//                     <h1>Employee Registration</h1>
//                     <form onSubmit={handleSubmit}>
//                         <div className="form-group">
//                             <label htmlFor="empName">Name:</label>
//                             <input
//                                 type="text"
//                                 id="empName"
//                                 name="empName"
//                                 value={employee.empName}
//                                 onChange={handleChange}
//                                 className="form-input"
//                             />
//                             {errors.empName && <p className="error-message">{errors.empName}</p>}
//                         </div>
//                         <div className="form-group">
//                             <label htmlFor="role">Role:</label>
//                             <input
//                                 type="text"
//                                 id="role"
//                                 name="role"
//                                 value={employee.role}
//                                 onChange={handleChange}
//                                 className="form-input"
//                             />
//                             {errors.role && <p className="error-message">{errors.role}</p>}
//                         </div>
//                         <div className="form-group">
//                             <label htmlFor="empMobile">Mobile No:</label>
//                             <input
//                                 type="text"
//                                 id="empMobile"
//                                 name="empMobile"
//                                 value={employee.empMobile}
//                                 onChange={handleChange}
//                                 className="form-input"
//                             />
//                             {errors.empMobile && <p className="error-message">{errors.empMobile}</p>}
//                         </div>
//                         <div className="form-group">
//                             <label htmlFor="password">Password:</label>
//                             <input
//                                 type="password"
//                                 id="password"
//                                 name="password"
//                                 value={employee.password}
//                                 onChange={handleChange}
//                                 className="form-input"
//                             />
//                             {errors.password && <p className="error-message">{errors.password}</p>}
//                         </div>
//                         <button type="submit" className="submit-btn">Register</button>
//                     </form>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default AdminRegister;
import React, { useState } from 'react';
import axios from 'axios';
import './empRegister.css'; // Import the CSS file
import NavB from '../navComp/NavB';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const AdminRegister = () => {
    const [employee, setEmployee] = useState({
        empName: '',
        role: '',
        empMobile: '',
        password: ''
    });

    const [errors, setErrors] = useState({}); // State to hold error messages

    const handleChange = (e) => {
        setEmployee({
            ...employee,
            [e.target.name]: e.target.value
        });

        // Clear error for the current field when user types
        setErrors({
            ...errors,
            [e.target.name]: ''
        });
    };

    const validate = () => {
        const newErrors = {};
        if (!employee.empName) newErrors.empName = 'Name is required';
        if (!employee.role) newErrors.role = 'Role is required';
        if (!employee.empMobile) {
            newErrors.empMobile = 'Mobile number is required';
        } else if (!/^\d{10}$/.test(employee.empMobile)) {
            newErrors.empMobile = 'Mobile number must be 10 digits';
        }
        if (!employee.password) newErrors.password = 'Password is required';

        return newErrors;
    };

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        axios.post('http://localhost:9952/emp/addEmp', employee) // Replace with your backend URL
            .then(response => {
                console.log('Employee created:', response.data);
                setEmployee({
                    empName: '',
                    role: '',
                    empMobile: '',
                    password: ''
                });
                Swal.fire({
                    icon: 'success',
                    title: 'Registration Successful!',
                    text: 'Employee has been registered.',
                    confirmButtonText: 'OK'
                }).then(() => {
                    navigate('/ViewEmps');
                });
            })
            .catch(error => {
                console.error('There was an error creating the employee!', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Registration Failed',
                    text: 'Error during registration. Please try again.',
                    confirmButtonText: 'OK'
                });
            });
    };

    return (
        <>
            <NavB />
            <div className="register-container">
                <div className="register-card">
                    <h1>Employee Registration</h1>
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
                            />
                            {errors.empName && <p className="error-message">{errors.empName}</p>}
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
                            />
                            {errors.role && <p className="error-message">{errors.role}</p>}
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
                            />
                            {errors.empMobile && <p className="error-message">{errors.empMobile}</p>}
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
                            />
                            {errors.password && <p className="error-message">{errors.password}</p>}
                        </div>
                        <button type="submit" className="submit-btn">Register</button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default AdminRegister;

