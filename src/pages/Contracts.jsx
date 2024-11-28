import React, { useState } from 'react';
import Card from '../components/Card';
import contracts from '/data/contracts.json';
import '/styles/Page.css';
import '/styles/Modal.css';

// Modal for displaying contract details
const Modal = ({ contract, onClose }) => (
  <div className="modal-overlay">
    <div className="modal-content">
      <button className="close-modal" onClick={onClose}>X</button>
      <h3>{contract.name}</h3>
      <p>{contract.description}</p>
      <a href={contract.link} target="_blank" rel="noopener noreferrer">
        View Full Documentation
      </a>
    </div>
  </div>
);

const Contracts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedContract, setSelectedContract] = useState(null); // For selected contract details

  const itemsPerPage = 5;

  // Filter contracts based on the search term
  const filteredContracts = contracts.filter((contract) =>
    contract.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Paginate the filtered contracts
  const totalPages = Math.ceil(filteredContracts.length / itemsPerPage);
  const paginatedContracts = filteredContracts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  // Show modal when contract is clicked
  const handleCardClick = (contract) => {
    setSelectedContract(contract);
  };

  // Close the modal
  const handleCloseModal = () => {
    setSelectedContract(null);
  };

  return (
    <div className="page-container">
      <header className="page-header">
        <h2>Contracts</h2>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search Contracts..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Reset to first page on search
            }}
          />
        </div>
      </header>
      <div className="card-container">
        {paginatedContracts.length > 0 ? (
          paginatedContracts.map((contract, index) => (
            <Card
              key={index}
              title={contract.name}
              description={contract.description}
              onClick={() => handleCardClick(contract)} // Open modal on click
            />
          ))
        ) : (
          <p className="no-results">No contracts found.</p>
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

      {/* Render modal if a contract is selected */}
      {selectedContract && <Modal contract={selectedContract} onClose={handleCloseModal} />}
    </div>
  );
};

export default Contracts;
