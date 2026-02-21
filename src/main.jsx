import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

// Load CSS asynchronously to avoid blocking render
const loadCSS = () => {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = '/src/index.css';
  document.head.appendChild(link);
};
loadCSS();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
