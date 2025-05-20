import axios from "axios"
import { toast } from "react-hot-toast"

const Axios = axios.create({
  baseURL:
    import.meta.env.VITE_MODE == "production"
      ? `${import.meta.env.VITE_API_URL}/api`
      : `${import.meta.env.VITE_DEV_API_URL}/api`,
  // baseURL: "https://beczav2.vnvserver.com/api",
  headers: {
    Accept: "application/json",
  },
})

Axios.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("accessToken")
    if (token) {
      config.headers["Authorization"] = "Bearer " + token
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

Axios.interceptors.response.use(
  (res) => {
    return res
  },
  async (err) => {
    const originalConfig = err.config
    if (originalConfig.url !== "/login" && err.response) {
      // Access Token was expired
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true

        try {
          let data = new FormData()
          data.append("token", sessionStorage.getItem("refreshToken"))

          const rs = await axios.post(
            "https://becapi.jlrsaportal.co.za/api/refresh-token",
            // "https://beczav2.vnvserver.com/api/refresh-token",
            data,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          )

          const { access_token } = rs.data
          sessionStorage.setItem("accessToken", access_token)

          return Axios(originalConfig)
        } catch (_error) {
          toast.error("Token has expired, Please login again")
          sessionStorage.clear()
          window.location.href = "/login"
          return Promise.reject(_error)
        }
      }
    }
    if (err.response.status === 500) {
      // window.location.href("/error-page")
      toast.error("Network error! Please try again.")
    }
    return Promise.reject(err)
  }
)

export default Axios
