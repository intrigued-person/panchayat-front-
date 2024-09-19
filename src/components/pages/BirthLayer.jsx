import React from 'react'
import BirthForm from '../services/Birth';
import { useState , useEffect} from 'react';
import axios from 'axios';
import ViewBirthDetails from '../users/ViewBirthDetails';
import Navbar from '../navComp/Navbar';

function BirthLayer() {

    const [hasApplied, setHasApplied] = useState(false);
    const [applications, setApplications] = useState([]);
    const userId = sessionStorage.getItem("userId");

    useEffect(() => {
        validate();
        console.log(hasApplied);
    }, [hasApplied]); // Empty dependency array ensures this effect runs only once on component mount

    const validate = async () => {
        console.log(userId);
        if (userId) {
            // Check if the user has already applied
            await axios
                .get("http://localhost:9952/birth/findBirthByUserId/" + userId)
                .then((response) => {
                    console.log(response.data);
                    if (response.data) {
                        // User has already applied
                        setHasApplied(true);

                        setApplications(response.data);
                    }
                });
        }
    };

    return (
        <div>
            <Navbar></Navbar>
            <h1>Birth Certificate</h1>
            {hasApplied ? (
                // Render view application component
                <ViewBirthDetails></ViewBirthDetails>
            ) : (
                // Render apply form component

                <BirthForm />
            )}
        </div>
    )
}

export default BirthLayer