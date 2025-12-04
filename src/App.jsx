import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./Pages/Login";
import PrivateRoute from "./components/PrivateRoute";
import CercetareDisciplinara from "./components/CercetareDisciplinara";
import Nomenclatoare from "./components/Nomenclatoare";
import Rapoarte from "./components/Rapoarte";
import Setari from "./components/Setari";
import AutoLogout from "./components/AutoLogout";
import Layout from "./components/Layout";
import AdaugaCercetareModal from "./components/AdaugaCercetareModal";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route element={<PrivateRoute />}>
        <Route element={<AutoLogout logoutMinutes={30}><Layout /></AutoLogout>}>
          <Route path="/cercetariDisciplinare" element={<CercetareDisciplinara />} />
          <Route path="/adaugareModal" element={<AdaugaCercetareModal />} />
          <Route path="/nomenclatoare" element={<Nomenclatoare />} />
          <Route path="/rapoarte" element={<Rapoarte />} />
          <Route path="/setari" element={<Setari />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}