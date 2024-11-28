// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import '/styles/index.css'; // Ensure the correct path

// React 18 uses `ReactDOM.createRoot()` for rendering
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
