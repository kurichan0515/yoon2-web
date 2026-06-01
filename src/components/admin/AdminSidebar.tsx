'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import './AdminSidebar.css';

interface MenuItem { path: string; label: string; icon: string; }

const MENU_ITEMS: MenuItem[] = [
  { path: '/system',            label: 'ダッシュボード', icon: '📊' },
  { path: '/system/analytics',  label: 'アナリティクス', icon: '📈' },
  { path: '/system/settings',   label: '設定',           icon: '⚙️' },
];

const AdminSidebar = () => {
  const pathname = usePathname();
  return (
    <aside className="admin-sidebar">
      <nav className="admin-sidebar-nav">
        <ul className="admin-sidebar-menu">
          {MENU_ITEMS.map(item => (
            <li key={item.path} className="admin-sidebar-item">
              <Link
                href={item.path}
                className={`admin-sidebar-link ${pathname === item.path ? 'active' : ''}`}
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
