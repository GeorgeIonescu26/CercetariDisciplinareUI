import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock, FaGlobe, FaEye, FaEyeSlash } from "react-icons/fa";
import "./Login.css";
import { API_BASE_URL } from "../apiClient";



export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [domain, setDomain] = useState("igpr.ro"); // prestabilit
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${API_BASE_URL}api/Authentication/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password, domain }),
            });

            if (!response.ok) throw new Error("Autentificare eșuată");

            const data = await response.json();
            localStorage.setItem("token", data.token);
            localStorage.setItem("username", username);
            localStorage.setItem("isAdmin", data.isAdmin);
            navigate("/cercetariDisciplinare");
        } catch {
            setError("Autentificare eșuată. Verificați datele introduse.");
        }
    };

    return (
        <div className="login-page">
            <div className="login-card">
                <h2 className="login-title">Logare</h2>
                <form onSubmit={handleLogin}>

                    {/* Username */}
                    <div className="input-group">
                        <FaUser className="input-icon" />
                        <input
                            type="text"
                            placeholder="Utilizator"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>

                    {/* Password cu 👁️ */}
                    <div className="input-group">
                        <FaLock className="input-icon" />
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Parola"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <span
                            className="toggle-eye"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>

                    {/* Domeniu */}
                    <div className="input-group">
                        <FaGlobe className="input-icon" />
                        <select
                            value={domain}
                            onChange={(e) => setDomain(e.target.value)}
                            required
                        >
                            <option value="igpr.ro">igpr.ro</option>
                            <option value="politia.local">politia.local</option>
                        </select>
                    </div>

                    {/* Eroare */}
                    {error && <div className="error-text">{error}</div>}

                    {/* Buton logare */}
                    <button type="submit" className="login-btn">Logare</button>

                    {/* Manual */}
                    <a href="/manual.pdf" target="_blank" rel="noreferrer" className="manual-btn">
                        📘 Manual de utilizare
                    </a>
                </form>
            </div>
        </div>
    );
}
