import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';

// Find the root div in index.html and render the App inside it
createRoot(document.getElementById('root')!).render(
  // StrictMode shows extra warnings during development
  <StrictMode>
    <App />
  </StrictMode>,
);
