import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AccessibilityProvider } from './contexts/AccessibilityContext';
import ScrollToTop from './components/ScrollToTop';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AccessibilityProvider>
      <BrowserRouter>
        <ScrollToTop />
        <App />
      </BrowserRouter>
    </AccessibilityProvider>
  </StrictMode>
);
