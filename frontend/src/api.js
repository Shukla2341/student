import axios from "axios";

const API = axios.create({
  baseURL: "https://student-backend-5u8t.onrender.com/api",
});

export default API;