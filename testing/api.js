import axios from "axios";
import { toast } from "react-toastify";

const Axios = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  headers: {
    Accept: "application/json",
    // Accept: "multipart/form-data",
  },
});

Axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("isAuth");

    if (token) {
      // config.headers["Authorization"] = "Bearer " + token;
      config.headers["x-auth-token"] = token;
    }
    return config;
  },
  (error) => {
    console.log(error, "request error");
    return Promise.reject(error);
  }
);

Axios.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;

    if (originalConfig.url !== "/" && err.response) {
      // Access Token was expired
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;

        try {
          let data = new FormData();
          data.append("token", sessionStorage.getItem("refreshToken"));

          const rs = await axios.post("", data, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });

          const { access_token } = rs.data;
          sessionStorage.setItem("accessToken", access_token);

          return Axios(originalConfig);
        } catch (_error) {
          console.log(_error, "_errrrrrr");
          toast.error("Token has expired, Please login again", {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          sessionStorage.clear();
          // window.location.href = "/";
          return Promise.reject(_error);
        }
      }
    }
    if (err.response.status === 500) {
      // window.location.href("/error-page")
      toast.error("Network error! Please try again.", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    return Promise.reject(err);
  }
);

export default Axios;
