import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './AdminSidebar.css';

const AdminSidebar = () => {
  const location = useLocation();

  const menuItems = [
    {
      path: '/system',
      label: 'ダッシュボード',
      icon: '📊'
    },
    {
      path: '/system/analytics',
      label: 'アナリティクス',
      icon: '📈'
    },
    {
      path: '/system/settings',
      label: '設定',
      icon: '⚙️'
    }
  ];

  return (
    <aside className="admin-sidebar">
      <nav className="admin-sidebar-nav">
        <ul className="admin-sidebar-menu">
          {menuItems.map((item) => (
            <li key={item.path} className="admin-sidebar-item">
              <Link
                to={item.path}
                className={`admin-sidebar-link ${
                  location.pathname === item.path ? 'active' : ''
                }`}
              >
                <span className="admin-sidebar-icon">{item.icon}</span>
                <span className="admin-sidebar-label">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
