import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Table.module.css'; // Import the CSS file
import Navbar from '../navComp/Navbar';

const IssuesTable = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = sessionStorage.getItem('userId');

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const response = await axios.get(`http://localhost:9952/findIssueByUserId/${userId}`);
        setIssues(response.data);
      } catch (error) {
        console.error('Error fetching issues:', error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchIssues();
    }
  }, [userId]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <> <Navbar></Navbar>
    <div className="table-container">
      <h1>User Issues</h1>
      <a href='/issue'><button className='btn'>Add issue</button></a>
      <table>
       
        <thead>
          <tr>
            <th>Issue ID</th>
            <th>Issue Type</th>
            <th>Description</th>
            <th>Location</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {issues.map(issue => (
            <tr key={issue.issueId}>
              <td>{issue.issueId}</td>
              <td>{issue.issueType}</td>
              <td>{issue.description}</td>
              <td>{issue.location}</td>
              <td>{issue.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
};

export default IssuesTable;
