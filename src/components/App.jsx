import React, { useState, useEffect } from 'react';
import Card from './Card'; // Card component for each section
import '/styles/HomePage.css';

const App = () => {
  const [theme, setTheme] = useState('light');
  const [currentPage, setCurrentPage] = useState('homepage'); // Track the current page

  // Card data with paths for each "page"
  const cards = [
    {
      title: 'Data Models',
      description: 'Explore structured models for organizing your data efficiently.',
      path: '/data-models', // Path for navigation
    },
    {
      title: 'DataSets',
      description: 'Access and manage datasets with ease and simplicity.',
      path: '/datasets', // Path for navigation
    },
    {
      title: 'Contracts',
      description: 'Define terms and agreements for your data operations.',
      path: '/contracts', // Path for navigation
    },
  ];

  // Update currentPage based on window location
  useEffect(() => {
    const path = window.location.pathname;
    if (path === '/data-models') {
      setCurrentPage('dataModels');
    } else if (path === '/datasets') {
      setCurrentPage('dataSets');
    } else if (path === '/contracts') {
      setCurrentPage('contracts');
    } else {
      setCurrentPage('homepage');
    }
  }, [window.location.pathname]);

  return (
    <div className={`app ${theme}`}>
      {/* Banner */}
      <div className="banner">
        <div className="left-section">
          <a href="/" className="home-link">MetaKnot</a>
          <div className="page-links">
            <a href="/data-models">Data Models</a>
            <a href="/datasets">DataSets</a>
            <a href="/contracts">Contracts</a>
          </div>
        </div>
      </div>

      {/* Homepage - Display Cards */}
      {currentPage === 'homepage' && (
        <div className="homepage">
          <h2>Welcome to the MetaData Catalog</h2>
          <div className="card-container">
            {cards.map((card, index) => (
              <Card
                key={index}
                title={card.title}
                description={card.description}
                path={card.path} // Pass the path to navigate
              />
            ))}
          </div>
        </div>
      )}

      {/* Render the content for each page based on the currentPage */}
      {currentPage === 'dataModels' && (
        <div>
          <h2>Data Models</h2>
          <p>Explore structured models for organizing your data efficiently.</p>
        </div>
      )}

      {currentPage === 'dataSets' && (
        <div>
          <h2>DataSets</h2>
          <p>Access and manage datasets with ease and simplicity.</p>
        </div>
      )}

      {currentPage === 'contracts' && (
        <div>
          <h2>Contracts</h2>
          <p>Define terms and agreements for your data operations.</p>
        </div>
      )}

      {/* Footer */}
      <div className="footer">
        <div className="footer-links">
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
          <a href="#privacy">Privacy Policy</a>
        </div> 
      </div>
    </div>
  );
};

export default App;
