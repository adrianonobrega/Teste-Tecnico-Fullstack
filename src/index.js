import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import { Login } from './pages/login';
import { Register } from './pages/register';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ToastContainer/>
    <Login />
    <Register/>
  </React.StrictMode>
);


