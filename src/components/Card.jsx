import React from 'react';
import '/styles/Card.css';

const Card = ({ title, description, path, onClick, svg }) => {
  return (
    <div className="card" onClick={onClick}>
      <div className="card-header">
        <h3>{title}</h3>
        {svg && <img src={svg} alt={title} className="card-svg" />}
      </div>
      <p>{description}</p>
    </div>
  );
};

export default Card;
