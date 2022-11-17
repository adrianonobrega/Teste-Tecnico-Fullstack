import axios from 'axios'

export const Api = axios.create({
  baseURL: 'https://api-contact-deploy.herokuapp.com/',
})