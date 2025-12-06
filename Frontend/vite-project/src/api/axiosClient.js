import axios from "axios";

export const axiosClient = axios.create({
  baseURL: "https://mental-health-chatbot-rk3p.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});
