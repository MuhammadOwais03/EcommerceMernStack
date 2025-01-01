import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// import './index.css';
import App from './App.jsx';
import { TotalProvider } from './TotalContext.jsx'; // Import the correct provider

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TotalProvider> {/* Use TotalProvider to wrap the app */}
      <App />
    </TotalProvider>
  </StrictMode>
);
