import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://dummyjson.com",
});
let accessToken = localStorage.getItem("accessToken") || "";
function setAccessToken(token) {
  if (token) {
    localStorage.setItem("accessToken", token);
    accessToken = token;
  }
}
axiosInstance.interceptors.request.use((config) => {
  if (!config.headers.Authorization && accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const prevRequest = error.config;
    if (error.response.status === 403 && !prevRequest.sent) {
      console.log("Не авторизован");
      localStorage.removeItem("accessToken");
    }
    return Promise.reject(error);
  }
);
// запись для того, чтобы все запросы на сервер использовали токен пользователя
export { setAccessToken };
export default axiosInstance;
