// src/UserLanding.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBeer, FaCoffee, FaApple, FaAnchor, FaAndroid, FaBirthdayCake, FaHome, FaHandHoldingWater, FaBuilding, FaSms } from 'react-icons/fa';
import { GiDeathNote } from "react-icons/gi";
import { SiLinuxprofessionalinstitute } from "react-icons/si";
import { MdOutlinePayment } from "react-icons/md";
import { AiOutlineIssuesClose } from "react-icons/ai";
import { GrLicense } from "react-icons/gr";
import { IoManSharp } from "react-icons/io5";
import './userLanding.css'; // Import CSS for styling

// Navbar Component
const Navbar = () => {
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

// Card Component
const Card = ({ icon, name, onClick }) => {
    return (
        <div className="card" onClick={onClick}>
            <div className="card-icon">{icon}</div>
            <div className="card-name">{name}</div>
        </div>
    );
};

// CardGrid Component
const CardGrid = () => {
    const navigate = useNavigate();

    const cardData = [
        { icon: <FaBirthdayCake />, name: 'Birth Certificate', route: '/birthView' },
        { icon: <GiDeathNote />, name: 'Death Certificate', route: '/deathView' },
        { icon: <FaHome />, name: 'Property Tax', route: '/taxView' },
        { icon: <FaAnchor />, name: 'Professional Tax', route: '/professional-tax' },
        { icon: <SiLinuxprofessionalinstitute />, name: 'Property Tax Calculator', route: '/property-tax-calculator' },
        { icon: <MdOutlinePayment />, name: 'Online Payment', route: '/online-payment' },
        { icon: <FaHandHoldingWater />, name: 'Water Charges', route: '/waterView' },
        { icon: <AiOutlineIssuesClose />, name: 'Non Tax', route: '/non-tax' },
        { icon: <FaBuilding />, name: 'Building Plan', route: '/building-plan' },
        { icon: <GrLicense />, name: 'Trade License', route: '/licenseView' },
        { icon: <FaBirthdayCake />, name: 'Birth Details', route: '/birth-details' },
        { icon: <GiDeathNote />, name: 'Death Details', route: '/death-details' },
        { icon: <FaApple />, name: 'Grievance Redressal', route: '/grievance-redressal' },
        { icon: <FaSms />, name: 'SMS Service', route: '/sms-service' },
        { icon: <IoManSharp />, name: 'Citizen Portal', route: '/citizen-portal' }
    ];

    return (
        <div className="card-grid">
            {cardData.map((data, index) => (
                <Card
                    key={index}
                    icon={data.icon}
                    name={data.name}
                    onClick={() => navigate(data.route)}
                />
            ))}
        </div>
    );
};

// Main Component
const DashBoard = () => {
    return (
        <div className="user-landing">
            <Navbar />
            <section id="home">
                <h2>Welcome to E-Town Panchayat</h2>
            </section>
            {/* <section id="terms">
                <h2>Terms & Conditions</h2>
                <p>Content for Terms & Conditions...</p>
            </section>
            <section id="faq">
                <h2>FAQ</h2>
                <p>Content for FAQ...</p>
            </section>
            <section id="contact">
                <h2>Contact Us</h2>
                <p>Content for Contact Us...</p>
            </section> */}
            <CardGrid />
        </div>
    );
};

export default DashBoard;
