import axios from 'axios'

const token = localStorage.getItem('token');

export const Api = axios.create({
    
    baseURL: 'https://api-teste-tecnico.herokuapp.com/',
})

export const ApiGet = axios.create({
        baseURL: "https://api-teste-tecnico.herokuapp.com/",
        headers: {
            'Authorization': `Bearer ${token}`
         }

})

