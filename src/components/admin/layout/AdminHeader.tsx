'use client';

import { signOut } from 'next-auth/react';

export default function AdminHeader() {
  return (
    <header className="flex h-14 items-center justify-end border-b bg-white px-6">
      <button
        onClick={() => signOut({ callbackUrl: '/admin/login' })}
        className="rounded bg-gray-200 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-300"
      >
        ログアウト
      </button>
    </header>
  );
}
