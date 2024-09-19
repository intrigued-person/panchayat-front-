import React from "react";
import { useNavigate } from "react-router-dom";
const Nav = () => {
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
                <li><a href="/empIssue">Manage Issues</a></li>
                <li><a href="/empBirthView">Manage Birth Certificates</a></li>
                <li><a href="/empDeathView">Manage Death Certificates</a></li>
              
                <li><button onClick={handleLogout}>Logout</button></li>
            </ul>
        </nav>
    );
};
export default Nav;