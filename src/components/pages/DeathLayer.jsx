import React from 'react'
import DeathForm from '../services/Death';
import ViewDeathDetails from '../users/ViewDeathDetails';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../navComp/Navbar';

function DeathLayer() {
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
                .get("http://localhost:9952/death/findDeathByUserId/" + userId)
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
            <h1>Death Certificate</h1>
            {hasApplied ? (
                // Render view application component
                <ViewDeathDetails></ViewDeathDetails>
            ) : (
                // Render apply form component

                <DeathForm />
            )}
        </div>
    )
}

export default DeathLayer