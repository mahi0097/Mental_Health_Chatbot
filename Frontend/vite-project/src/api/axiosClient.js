// axiosClient.js
import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'https://mental-health-chatbot-rk3p.onrender.com', 
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export { axiosClient };