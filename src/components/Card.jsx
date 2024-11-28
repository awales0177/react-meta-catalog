import React from 'react';
import '/styles/Card.css';

const Card = ({ title, description, onClick }) => (
  <div className="card" onClick={onClick}>
    <div className="card-icon">
      <span role="img" aria-label="icon"></span> {/* Example icon */}
    </div>
    <h3>{title}</h3>
    <p>{description}</p>
  </div>
);

export default Card;
