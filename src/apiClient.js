import axios from "axios";

// URL-ul de bază al backend-ului
// export const API_BASE_URL = "http://10.2.14.55:2602/"; // publish backend URL
export const API_BASE_URL = "https://localhost:44381/"; // local backend URL

// Instanță Axios centralizată
export const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// 1. Interceptor REQUEST (Îl aveai deja)
// Adaugă token-ul la fiecare cerere
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 2. Interceptor RESPONSE (NOU 🌟)
// Verifică răspunsurile pentru erori de tip 401
apiClient.interceptors.response.use(
    (response) => {
        // Dacă răspunsul e OK (status 200-299), îl lăsăm să treacă
        return response;
    },
    (error) => {
        // Verificăm dacă avem un răspuns de la server și dacă statusul e 401
        if (error.response && error.response.status === 401) {
            console.warn("Sesiune expirată sau token invalid. Se redirecționează către login...");
            
            localStorage.removeItem("token");

            if (window.location.pathname !== "/login") {
                window.location.href = "/login";
            }
        }
        return Promise.reject(error);
    }
);