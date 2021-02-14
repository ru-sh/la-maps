import React from 'react';
import ReactDOM from 'react-dom';
import { OpenAPI } from './api';
import App from './App';
import reportWebVitals from './reportWebVitals';

OpenAPI.BASE = 'https://localhost:5001';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
