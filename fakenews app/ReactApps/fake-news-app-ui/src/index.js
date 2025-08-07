import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Keep this one if you want basic styling, or delete if you want only Tailwind
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);