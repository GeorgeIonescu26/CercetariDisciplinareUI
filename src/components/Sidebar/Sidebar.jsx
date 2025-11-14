import React from 'react';
import './Sidebar.css';

const Sidebar = ({ activeSection, setActiveSection }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'politisti', label: 'Polițiști', icon: '👮' },
    { id: 'nomenclatoare', label: 'Nomenclatoare', icon: '📋' },
    { id: 'rapoarte', label: 'Rapoarte', icon: '📈' },
    { id: 'setari', label: 'Setări', icon: '⚙️' }
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>Discipline Admin</h2>
        <span className="version">v1.0</span>
      </div>

      <nav className="menu">
        {menuItems.map(item => (
  <a
    key={item.id}
    href={`#${item.id}`}
    className={`menu-item ${activeSection === item.id ? 'active' : ''}`}
    onClick={(e) => {
      e.preventDefault();
      setActiveSection(item.id);
    }}
  >
    <span className="icon">{item.icon}</span>
    <span>{item.label}</span>
  </a>
))}

      </nav>

      <div className="sidebar-footer">
        <div className="user-info">
          <div className="user-avatar">AD</div>
          <div className="user-details">
            <div className="user-name">Administrator</div>
            <div className="user-role">Admin</div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;