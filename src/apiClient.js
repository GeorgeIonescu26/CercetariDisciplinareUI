import axios from "axios";

// URL-ul de bază al backend-ului
//export const API_BASE_URL = "http://10.2.14.55:2602/"; // publish backend URL

export const API_BASE_URL = "https://localhost:44381/"; // local backend URL

// Instanță Axios centralizată
export const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Adaugă interceptor pentru JWT
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
