import React from "react";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear session storage
        sessionStorage.clear();

        // Redirect to login page
        navigate('/userLog'); // Adjust to your actual login route
    };

    return (
        <nav className="navbar">
            <h1 className="navbar-title">E-Town Panchayat</h1>
            <ul className="navbar-links">
                <li><a href="/userLand">Home</a></li>
                <li><a href="/editUser">Edit Profile</a></li>
                <li><a href="/pay">Payment history</a></li>
                <li><a href="#contact">Contact Us</a></li>
                <li><button onClick={handleLogout}>Logout</button></li>
            </ul>
        </nav>
    );
};
export default Navbar;