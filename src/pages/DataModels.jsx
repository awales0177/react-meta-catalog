import React, { useState } from 'react';
import Card from '../components/Card';
import dataModels from '/data/dataModels.json';
import '/styles/Page.css';
import '/styles/Modal.css';

// Modal for displaying detailed data
const Modal = ({ model, onClose }) => (
  <div className="modal-overlay">
    <div className="modal-content">
      <button className="close-modal" onClick={onClose}>X</button>
      <h3>{model.title}</h3>
      <p>{model.description}</p>
      {/* Display all other attributes */}
      <ul>
        {Object.entries(model).map(([key, value]) => (
          <li key={key}><strong>{key}:</strong> {value}</li>
        ))}
      </ul>
    </div>
  </div>
);

const DataModels = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedModel, setSelectedModel] = useState(null); // For selected model details

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

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  // Show modal when card is clicked
  const handleCardClick = (model) => {
    setSelectedModel(model);
  };

  // Close modal
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
              setCurrentPage(1); // Reset to first page on search
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
              description={model.description}
              onClick={() => handleCardClick(model)} // Open modal on click
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

      {/* Render modal if a model is selected */}
      {selectedModel && <Modal model={selectedModel} onClose={handleCloseModal} />}
    </div>
  );
};

export default DataModels;
