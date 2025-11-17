// src/components/Layout.jsx
import React, { useState } from "react";
import Sidebar from "./Sidebar/Sidebar";

export default function Layout({ children }) {
  const [activeSection, setActiveSection] = useState("dashboard");

  return (
    <div className="app">
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      <main className="content">{children}</main>
    </div>
  );
}
