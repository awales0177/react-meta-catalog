import React, { useState } from 'react';
import Card from '../components/Card';
import datasets from '/data/datasets.json';
import '/styles/Page.css';

const DataSets = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 6;

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

  return (
    <div className="page-container">
      <header className="page-header">
        <h2>Data Sets</h2>
        <p className="subtitle">Discover and manage datasets with detailed metadata and associated models.</p>
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
              description={dataset.metadata.description}
              onClick={() => alert(`Navigating to ${dataset.name}`)}
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
    </div>
  );
};

export default DataSets;
