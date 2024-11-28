// src/pages/DataModels.jsx

import React from 'react';
import DataModelCard from '../components/DataModelCard'; // Import the DataModelCard component
import dataModels from '/data/dataModels.json'; // Import the data models JSON file

const DataModels = () => {
  return (
    <div className="data-models">
      <h2>Data Models</h2>
      <p>Explore structured models for organizing your data efficiently.</p>
      <div className="card-container">
        {dataModels.map((model) => (
          <DataModelCard
            key={model.id}
            title={model.title}
            description={model.description}
            fields={model.fields}
            createdBy={model.createdBy}
            path={`/data-models/${model.id}`}
          />
        ))}
      </div>
    </div>
  );
};

export default DataModels;
