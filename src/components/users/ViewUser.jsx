import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ViewUser.module.css'; // Import your CSS file
import NavB from '../navComp/NavB';

const ViewUser = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:9952/user/getUsers');
                setUsers(response.data);
            } catch (err) {
                setError('Error fetching users');
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <><NavB></NavB>
            <div className="container">
                <h1>User List</h1>
                <table className="user-table">
                    <thead>
                        <tr>
                            <th>User ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Mobile No</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.userId}>
                                <td>{user.userId}</td>
                                <td>{user.uname}</td>
                                <td>{user.uemail}</td>
                                <td>{user.mobileNo}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default ViewUser;
