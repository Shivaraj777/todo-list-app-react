import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './components/App';
import { ToastProvider } from 'react-toast-notifications';

// create root element
const root = ReactDOM.createRoot(document.getElementById('root'));

// render the root element
root.render(
    <ToastProvider autoDismiss autoDismissTimeout={5000} placement='top-left'>
      <App />
    </ToastProvider>
);


