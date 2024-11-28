import React, { useState } from 'react';
import Card from '../components/Card';
import dataModels from '/data/dataModels.json'; // Assuming dataModels are linked to datasets
import datasets from '/data/datasets.json';
import '/styles/Page.css';
import '/styles/Modal.css';

// Modal for displaying dataset details
const Modal = ({ dataset, onClose }) => (
  <div className="modal-overlay">
    <div className="modal-content">
      <button className="close-modal" onClick={onClose}>X</button>
      <h3>{dataset.name}</h3>
      <p>{dataset.metadata.description}</p>
      <br />
      <ul>
        {Object.entries(dataset.metadata).map(([key, value]) => {
          if (key !== "description" && key !== "transformedToModels") {
            return (
              <li key={key}><strong>{key}:</strong> {value}</li>
            );
          }
          return null;
        })}
      </ul>
    </div>
  </div>
);

const DataSets = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDataset, setSelectedDataset] = useState(null); // For selected dataset details

  const itemsPerPage = 5;

  // Filter datasets based on the search term
  const filteredDataSets = datasets.filter((dataset) =>
    dataset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dataset.metadata.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Paginate the filtered datasets
  const totalPages = Math.ceil(filteredDataSets.length / itemsPerPage);
  const paginatedDataSets = filteredDataSets.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  // Show modal when dataset is clicked
  const handleCardClick = (dataset) => {
    setSelectedDataset(dataset);
  };

  // Close the modal
  const handleCloseModal = () => {
    setSelectedDataset(null);
  };

  return (
    <div className="page-container">
      <header className="page-header">
        <h2>Data Sets</h2>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search Data Sets..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Reset to first page on search
            }}
          />
        </div>
      </header>
      <div className="card-container">
        {paginatedDataSets.length > 0 ? (
          paginatedDataSets.map((dataset, index) => (
            <Card
              key={index}
              title={dataset.name}
              description={
                <>
                  <p>{dataset.metadata.description}</p> {/* Put the description back in */}
                  <br />
                  <img 
                    src="src/assets/model-b.svg" 
                    alt="Models Icon" 
                    style={{ marginLeft: '8px', width: '20px', height: '20px' }} // Adjust size as needed
                  />
                  <span>{dataset.metadata.transformedToModels.length} Data Products</span> 
                </>
              }
              onClick={() => handleCardClick(dataset)} // Open modal on click
            />
          ))
        ) : (
          <p className="no-results">No data sets found.</p>
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

      {/* Render modal if a dataset is selected */}
      {selectedDataset && <Modal dataset={selectedDataset} onClose={handleCloseModal} />}
    </div>
  );
};

export default DataSets;
