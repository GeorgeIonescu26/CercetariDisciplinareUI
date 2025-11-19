import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./Pages/Login";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./components/Dashboard";
import Politisti from "./components/Politisti";
import Nomenclatoare from "./components/Nomenclatoare";
import Rapoarte from "./components/Rapoarte";
import Setari from "./components/Setari";
import AutoLogout from "./components/AutoLogout";
import Layout from "./components/Layout";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route element={<PrivateRoute />}>
        <Route element={<AutoLogout logoutMinutes={30}><Layout /></AutoLogout>}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/politisti" element={<Politisti />} />
          <Route path="/nomenclatoare" element={<Nomenclatoare />} />
          <Route path="/rapoarte" element={<Rapoarte />} />
          <Route path="/setari" element={<Setari />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}