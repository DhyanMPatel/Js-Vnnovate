import axios from "axios";

const Axios = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/",
  headers: {
    "Content-Type": "application/json",
  },
});

Axios.interceptors.request.use(
  (config) => {
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

Axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) => {
    return Promise.reject(err);
  }
);
