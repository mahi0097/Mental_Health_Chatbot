// axiosClient.js
import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://localhost:5000/api', // or your backend URL
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export { axiosClient };