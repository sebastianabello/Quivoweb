import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8081", // directamente al backend
});

export default instance;
