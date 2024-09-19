import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ViewEmp.module.css'; // Import your CSS file
import NavB from '../navComp/NavB';

const ViewEmp = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await axios.get('http://localhost:9952/emp/getAllEmps');
                // Filter out employees with role 'admin'
                const filteredData = response.data.filter(emp => emp.role !== 'admin');
                setEmployees(filteredData);
            } catch (err) {
                setError('Error fetching employees');
            } finally {
                setLoading(false);
            }
        };

        fetchEmployees();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <>
        <NavB></NavB>
        <div className="container">
            <h1>Employee List</h1>
            <a href='/empReg'><button>Add Employee</button></a>
            <table className="emp-table">
                <thead>
                    <tr>
                        <th>Employee ID</th>
                        <th>Name</th>
                        <th>Role</th>
                        <th>Mobile No</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map(emp => (
                        <tr key={emp.empId}>
                            <td>{emp.empId}</td>
                            <td>{emp.empName}</td>
                            <td>{emp.role}</td>
                            <td>{emp.empMobile}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </>
    );
};

export default ViewEmp;
