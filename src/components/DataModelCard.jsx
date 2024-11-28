// src/components/DataModels.jsx

import React from 'react';
import '/styles/Card.css'; // Import the CSS file for card styling

const DataModelCard = ({ title, description, path }) => {
  const handleClick = () => {
    window.location.href = path; // Change the URL to the respective page path
  };

  return (
    <div className="card" onClick={handleClick}>
      <div className="card-icon">
        <span role="img" aria-label="icon"></span> {/* Example icon */}
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default DataModelCard;

