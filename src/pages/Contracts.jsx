import React, { useState } from 'react';
import Card from '../components/Card';
import contracts from '/data/contracts.json';
import '/styles/Page.css';

const Contracts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

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

  return (
    <div className="page-container">
      <header className="page-header">
        <h2>Contracts</h2>
        <p className="subtitle">
          Browse and explore contracts governing data models and processes, ensuring compliance and clear terms.
        </p>
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
              onClick={() => alert(`Navigating to ${contract.name}`)}
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
    </div>
  );
};

export default Contracts;
