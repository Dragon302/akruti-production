import axios from 'axios';

// WHEN WE DEPLOY, WE WILL CHANGE THIS URL
const API_URL = 'https://akruti-backend.onrender.com'; 

export const api = axios.create({
  baseURL: API_URL,
});

// Use this api instance instead of axios in your pages!