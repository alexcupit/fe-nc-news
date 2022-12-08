import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import { TopicsProvider } from './contexts/TopicsContext';
import { ErrorProvider } from './contexts/ErrorContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <TopicsProvider>
          <ErrorProvider>
            <App />
          </ErrorProvider>
        </TopicsProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
