import {BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import { Login } from '../pages/login';
import { Register } from '../pages/register';
import { UserPage } from '../pages/userPage';

export const RouterAll = () => {
   

    return(
       <Router>
            <Routes>
                <Route index element={<Login />}/>
                <Route path='cadastro' element={<Register/>}/>
                <Route path="user" element={<UserPage/>}/>
            </Routes>
 
       </Router>
            
        
        
    )

 
}