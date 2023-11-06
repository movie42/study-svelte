import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:4000",
  headers: {
    "Content-Type": "Application/json",
  },
});

export { api };
