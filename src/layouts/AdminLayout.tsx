'use client';

import React, { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import AdminHeader from '../components/AdminHeader';
import AdminSidebar from '../components/admin/AdminSidebar';
import './AdminLayout.css';

interface Props { children: ReactNode; }

const AdminLayout = ({ children }: Props) => {
  const router = useRouter();
  return (
    <div className="admin-layout">
      <AdminHeader onLogout={() => router.push('/system/login')} />
      <div className="admin-content">
        <AdminSidebar />
        <main className="admin-main">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
