'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import './AdminSidebar.css';

const AdminSidebar = () => {
  const pathname = usePathname();

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
                href={item.path}
                className={`admin-sidebar-link ${
                  pathname === item.path ? 'active' : ''
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
