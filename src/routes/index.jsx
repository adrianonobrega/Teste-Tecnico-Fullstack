import {BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import { Login } from '../pages/login';
import { Register } from '../pages/register';
import { UserPage } from '../pages/userPage';
import { useEffect } from 'react';
import { useState } from 'react';

export const RouterAll = () => {

    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
    
        if (token) {
          return setAuthenticated(true);
        }
      }, [authenticated]);
   

    return(
       <Router>
            <Routes>
                <Route index element={<Login authenticated={authenticated} setAuthenticated={setAuthenticated}/>}/>
                <Route path='cadastro' element={<Register/>}/>
                <Route path="user" element={<UserPage authenticated={authenticated} setAuthenticated={setAuthenticated}/>}/>
            </Routes>
 
       </Router>
            
        
        
    )

 
}