import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import { TopicsProvider } from './contexts/TopicsContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <TopicsProvider>
          <App />
        </TopicsProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
