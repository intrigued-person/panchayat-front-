import React from "react";
import { useNavigate } from "react-router-dom";
const NavB = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear session storage
        sessionStorage.clear();

        // Redirect to login page
        navigate('/adminLog'); // Adjust to your actual login route
    };

    return (
        <nav className="navbar">
            <h1 className="navbar-title">E-Town Panchayat</h1>
            <ul className="navbar-links">
                <li><a href="/ViewEmps">Manage Employees</a></li>
                <li><a href="/viewUsers">Manage Users</a></li>
                <li><a href="#faq">FAQ</a></li>
                <li><a href="#contact">Contact Us</a></li>
                <li><button onClick={handleLogout}>Logout</button></li>
            </ul>
        </nav>
    );
};

export default NavB;
