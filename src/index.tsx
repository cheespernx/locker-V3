import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// Reset Global CSS
import './styles/global/reset.scss';

// CSS Global
import './styles/global/global.scss';

// Firebase
import './services/firebase';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);