import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createNightowl } from '@bufferhead/nightowl';

const root = ReactDOM.createRoot(document.getElementById('root'));
createNightowl({
  defaultMode: 'dark',
  toggleButtonMode: 'newState'
})

root.render(
  <BrowserRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BrowserRouter>
);

reportWebVitals();
