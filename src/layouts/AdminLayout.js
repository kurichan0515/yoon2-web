import React from 'react';
import AdminHeader from '../components/AdminHeader';
import AdminSidebar from '../components/admin/AdminSidebar';
import './AdminLayout.css';

const AdminLayout = ({ children }) => {
  return (
    <div className="admin-layout">
      <AdminHeader />
      <div className="admin-content">
        <AdminSidebar />
        <main className="admin-main">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
