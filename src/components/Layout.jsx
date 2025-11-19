import React from 'react';
import Sidebar from './Sidebar/Sidebar';
import './Layout.css';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="app">
      <Sidebar />
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
