import React, { useState } from 'react';
import Card from '../components/Card';
import dataModels from '/data/dataModels.json';
import datasets from '/data/datasets.json'; // Assuming you have datasets linked to models
import '/styles/Page.css';
import '/styles/Modal.css';

import '/styles/SmallCards.css';

// Modal Component
const Modal = ({ model, onClose }) => (
  <div className="modal-overlay">
    <div className="modal-content">
      <button className="close-modal" onClick={onClose}>X</button>
      <h3>{model.title}</h3>
      <p>{model.description}</p>
      <br />
      <ul>
        {Object.entries(model)
          .filter(([key]) => key !== 'contracts') // Exclude contracts from basic details
          .map(([key, value]) => (
            <li key={key}>
              <strong>{key}:</strong> {Array.isArray(value) ? value.join(', ') : value}
            </li>
          ))}
      </ul>
      <h4>Data Contracts</h4>
      <div className="small-card-container">
        {model.contracts.map((contractName, index) => (
          <div className="small-card" key={index} onClick={() => console.log(`Clicked: ${contractName}`)}>
            <img src="/src/assets/handshake-b.svg" alt="Contract icon" />
            <h4>{contractName}</h4>
          </div>
        ))}
      </div>
    </div>
  </div>
);


const DataModels = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedModel, setSelectedModel] = useState(null);

  const itemsPerPage = 5;

  // Filter data models based on the search term
  const filteredDataModels = dataModels.filter((model) =>
    model.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Paginate the filtered data models
  const totalPages = Math.ceil(filteredDataModels.length / itemsPerPage);
  const paginatedDataModels = filteredDataModels.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const countAssociatedDatasets = (modelName) => {
    return datasets.filter((dataset) =>
      dataset.metadata.transformedToModels.includes(modelName)
    ).length;
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleCardClick = (model) => {
    setSelectedModel(model);
  };

  const handleCloseModal = () => {
    setSelectedModel(null);
  };

  return (
    <div className="page-container">
      <header className="page-header">
        <h2>Data Models</h2>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search Data Models..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
      </header>
      <div className="card-container">
        {paginatedDataModels.length > 0 ? (
          paginatedDataModels.map((model, index) => (
            <Card
              key={index}
              title={model.title}
              description={
                <>
                  {model.description}
                  <br />
                  <br />
                  <img
                    src="/src/assets/handshake-b.svg"
                    alt="Contract icon"
                    style={{
                      marginLeft: '8px',
                      verticalAlign: 'middle',
                      width: '16px',
                      height: '16px',
                    }}
                  />
                  <span>{model.contracts.length} Data Contracts</span>
                  <br />
                  <img
                    src="src/assets/data-b.svg"
                    alt="Dataset icon"
                    style={{
                      marginLeft: '8px',
                      verticalAlign: 'middle',
                      width: '16px',
                      height: '16px',
                    }}
                  />
                  <span> {countAssociatedDatasets(model.title)} Data Sets</span>
                </>
              }
              onClick={() => handleCardClick(model)}
            />
          ))
        ) : (
          <p className="no-results">No data models found.</p>
        )}
      </div>
      <footer className="pagination-controls">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </footer>

      {selectedModel && <Modal model={selectedModel} onClose={handleCloseModal} />}
    </div>
  );
};

export default DataModels;
