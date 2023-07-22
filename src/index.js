import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './components/App';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// create root element
const root = ReactDOM.createRoot(document.getElementById('root'));

// render the root element
root.render(
  <React.StrictMode>
    <ToastContainer />
    <App />
  </React.StrictMode>   
);


