// src/components/Home.jsx
import React from 'react';
import './home.css'; // We'll create this CSS file next
import { useNavigate } from 'react-router-dom'
function Home() {
    const navigate = useNavigate()
  const handleGetStarted = async () => {
    try {
        const response = await fetch('http://localhost:5000/dashboard', {
            method:'GET',
            credentials:'include'
        })
        if (response.status === 401) {
            navigate('/login')
            return;
        }
        const data = await response.json()
        if (data.userType == 'employer') {
            navigate('/employer/dashboard')
        } else if (data.userType == 'university') {
            navigate('/university/dashboard')
        } else {
            navigate('/government/dashboard')
        }
    } catch (err) {
        console.error('Error fetching dashboard data:', err);
    }
  };

  const handleAboutUs = () => {
    alert('Navigating to About Us page!');
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Fake Degree/Certificate Recognition System</h1>
        <p className="subtitle">Ensuring Academic Integrity Across Jharkhand</p>
      </header>

      <section className="home-intro">
        <p>
          Welcome to the digital platform designed to combat the pervasive issue of fake degrees and forged academic certificates. Our system provides a robust, efficient, and secure mechanism for verifying educational credentials.
        </p>
        <p>
          With increasing digitization, the need for a reliable verification process is paramount. We aim to preserve academic integrity and public trust by offering a seamless way to authenticate documents, leveraging advanced technologies like AI, OCR, and blockchain.
        </p>
      </section>

      <section className="home-features">
        <h2>Key Features</h2>
        <ul>
          <li>Upload interface for verifying entities</li>
          <li>Certificate authenticity checker with OCR and database matching</li>
          <li>Digital watermark and blockchain verification support</li>
          <li>Institution integration for bulk record uploads</li>
          <li>Admin dashboard for monitoring and trend analysis</li>
          <li>Alert system for forged entries</li>
          <li>Robust data privacy and access control</li>
        </ul>
      </section>

      <div className="home-actions">
        <button className="action-button primary" onClick={handleGetStarted}>
          Get Started
        </button>
        <button className="action-button secondary" onClick={handleAboutUs}>
          About Us
        </button>
      </div>

      <footer className="home-footer">
        <p>&copy; {new Date().getFullYear()} Fake Degree Recognition System. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;