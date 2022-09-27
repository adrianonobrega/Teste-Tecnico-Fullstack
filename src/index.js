import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { RouterAll } from './routes';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <div>
        
        <RouterAll/>
       
        <ToastContainer/>
    
    </div>
 
    
    
    
   
  
);


