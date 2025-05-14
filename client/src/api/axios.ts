import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Match your backend
  withCredentials: true
});

api.interceptors.response.use(
    res => res,
    async err => {
      const originalRequest = err.config;
      if (err.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        const { data } = await api.post("/auth/refresh");
        localStorage.setItem("token", data.accessToken);
        api.defaults.headers.common["Authorization"] = `Bearer ${data.accessToken}`;
        return api(originalRequest);
      }
      return Promise.reject(err);
    }
  );

export default api;
