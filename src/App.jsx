import React, { useState } from 'react';
import './App.css';
import Sidebar from './components/Sidebar/Sidebar';
import Dashboard from './components/Dashboard';
import Politisti from './components/Politisti';
import Nomenclatoare from './components/Nomenclatoare';
import Rapoarte from './components/Rapoarte';
import Setari from './components/Setari';

function App() {
  const [activeSection, setActiveSection] = useState('dashboard');

  const renderSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'politisti':
        return <Politisti />;
      case 'nomenclatoare':
        return <Nomenclatoare />;
      case 'rapoarte':
        return <Rapoarte />;
      case 'setari':
        return <Setari />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="app">
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      <main className="content">
        {renderSection()}
      </main>
    </div>
  );
}

export default App;