import axios from 'axios'

const token = localStorage.getItem('@mi-au-food:token');

export const Api = axios.create({
    
    baseURL: 'https://api-teste-tecnico.herokuapp.com/',
})