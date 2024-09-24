import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './chain/ui/page'; // Assuming you have an App component
import './index.css';

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}