import React from 'react';
import { Link } from 'react-router-dom';

const Layout = ({ children, theme }) => {
  return (
    <div className={`app ${theme}`}>
      {/* Navbar */}
      <div className="banner">
        <div className="left-section">
          <Link to="/" className="home-link">MetaKnot</Link>
          <div className="page-links">
            <Link to="#data-models">Data Models</Link>
            <Link to="#datasets">DataSets</Link>
            <Link to="#contracts">Contracts</Link>
          </div>
        </div>
      </div>

      {/* Page Content */}
      <main>{children}</main>

      {/* Footer */}
      <div className="footer">
        <div className="footer-links">
          <Link to="#about">About</Link>
          <Link to="#contact">Contact</Link>
          <Link to="#privacy">Privacy Policy</Link>
        </div>
      </div>
    </div>
  );
};

export default Layout;
