import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:5131/api", // כתובת הבסיס של ה-API
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor להוספת הטוקן לכל בקשה
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // קבלת הטוקן מ-localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // הוספת הטוקן לכותרת Authorization
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;