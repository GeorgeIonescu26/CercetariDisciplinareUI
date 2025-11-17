import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./Pages/Login";
import PrivateRoute from "./components/PrivateRoute";
import Sidebar from "./components/Sidebar/Sidebar";
import Dashboard from "./components/Dashboard";
import Politisti from "./components/Politisti";
import Nomenclatoare from "./components/Nomenclatoare";
import Rapoarte from "./components/Rapoarte";
import Setari from "./components/Setari";
import AutoLogout from "./components/AutoLogout";
import { useState } from "react";
import Layout from "./components/Layout";

export function Layout({ children }) {
  const [activeSection, setActiveSection] = useState("dashboard");

  return (
    <div className="app">
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      <main className="content">{children}</main>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      {/* Pagina publică */}
      <Route path="/login" element={<LoginPage />} />

      <Route element={<PrivateRoute />}>
  <Route
    path="/dashboard"
    element={
      <AutoLogout logoutMinutes={30}>
        <Layout>
          <Dashboard />
        </Layout>
      </AutoLogout>
    }
  />
  <Route
    path="/politisti"
    element={
      <AutoLogout logoutMinutes={30}>
        <Layout>
          <Politisti />
        </Layout>
      </AutoLogout>
    }
  />
  <Route
    path="/nomenclatoare"
    element={
      <AutoLogout logoutMinutes={30}>
        <Layout>
          <Nomenclatoare />
        </Layout>
      </AutoLogout>
    }
  />
  <Route
    path="/rapoarte"
    element={
      <AutoLogout logoutMinutes={30}>
        <Layout>
          <Rapoarte />
        </Layout>
      </AutoLogout>
    }
  />
  <Route
    path="/setari"
    element={
      <AutoLogout logoutMinutes={30}>
        <Layout>
          <Setari />
        </Layout>
      </AutoLogout>
    }
  />
</Route>

      {/* Orice altă rută */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
