import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Navbar from '../navComp/Navbar';
import './EditProfile.css';

const EditProfile = () => {
    const [user, setUser] = useState({
        uname: '',
        uemail: '',
        mobileNo: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const userId = sessionStorage.getItem('userId');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://localhost:9952/user/findUser/${userId}`);
                setUser(response.data);
            } catch (err) {
                setError('Failed to fetch user data.');
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [userId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:9952/user/userUpdate/${userId}`, {
                uname: user.uname,
                uemail: user.uemail,
                mobileNo: user.mobileNo
            });
            Swal.fire({
                title: 'Success!',
                text: 'User profile updated successfully!',
                icon: 'success',
                confirmButtonText: 'Okay'
            });
        } catch (err) {
            Swal.fire({
                title: 'Error!',
                text: 'Failed to update profile.',
                icon: 'error',
                confirmButtonText: 'Okay'
            });
        }
    };

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <>
            <Navbar />
            <div className="edit-profile-container">
                <h2>Edit Profile</h2>
                <form onSubmit={handleSubmit} className="edit-profile-form">
                    <div className="form-group">
                        <label>Username:</label>
                        <input type="text" name="uname" value={user.uname} readOnly className="readonly-input" />
                    </div>
                    <div className="form-group">
                        <label>Email:</label>
                        <input type="email" name="uemail" value={user.uemail} readOnly className="readonly-input" />
                    </div>
                    <div className="form-group">
                        <label>Mobile Number:</label>
                        <input
                            type="text"
                            name="mobileNo"
                            value={user.mobileNo}
                            onChange={handleChange}
                            className="input"
                        />
                    </div>
                    <button type="submit" className="update-button">Update</button>
                </form>
            </div>
        </>
    );
};

export default EditProfile;
