import axios from "axios";

const API = axios.create({
  baseURL: "https://affiliate-marketing-system-o8xz.onrender.com/api",
});

export default API;