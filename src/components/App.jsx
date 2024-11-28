import React, { useState, useEffect } from 'react';
import Card from './Card'; // Card component for each section
import DataModels from '../pages/DataModels';
import DataSets from '../pages/DataSets';
import Contracts from '../pages/Contracts';
import '/styles/HomePage.css';

const App = () => {
  const [theme, setTheme] = useState('light'); // Theme state
  const [currentPage, setCurrentPage] = useState('homepage'); // Track current page

  // Card data for homepage
  const cards = [
    {
      title: 'Data Models',
      description: 'Explore structured models for organizing your data efficiently.',
      path: 'dataModels', // Represents state value for this page
    },
    {
      title: 'DataSets',
      description: 'Access and manage datasets with ease and simplicity.',
      path: 'dataSets', // Represents state value for this page
    },
    {
      title: 'Contracts',
      description: 'Define terms and agreements for your data operations.',
      path: 'contracts', // Represents state value for this page
    },
  ];

  // Apply theme to the document body
  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  // Render content based on currentPage state
  const renderPage = () => {
    switch (currentPage) {
      case 'dataModels':
        return <DataModels />;
      case 'dataSets':
        return <DataSets />;
      case 'contracts':
        return <Contracts />;
      default:
        return (
          <div className="homepage">
            <h2>Welcome to the MetaData Catalog</h2>
            <div className="card-container">
              {cards.map((card, index) => (
                <Card
                  key={index}
                  title={card.title}
                  description={card.description}
                  path={card.path}
                  onClick={() => setCurrentPage(card.path)} // Update state on click
                />
              ))}
            </div>
          </div>
        );
    }
  };

  return (
    <div className={`app ${theme}`}>
      {/* Banner */}
      <div className="banner">
        <div className="left-section">
          <a href="#" className="home-link" onClick={() => setCurrentPage('homepage')}>
            MetaKnot
          </a>
          <div className="page-links">
            <a href="#" onClick={() => setCurrentPage('dataModels')}>Data Models</a>
            <a href="#" onClick={() => setCurrentPage('dataSets')}>DataSets</a>
            <a href="#" onClick={() => setCurrentPage('contracts')}>Contracts</a>
          </div>
        </div>
      </div>

      {/* Main Content */}
      {renderPage()}

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
