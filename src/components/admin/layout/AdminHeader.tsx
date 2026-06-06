'use client';

import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function AdminHeader() {
  const router = useRouter();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/admin/login');
    router.refresh();
  }

  return (
    <header className="flex h-14 items-center justify-end border-b bg-white px-6">
      <button
        onClick={handleLogout}
        className="rounded bg-gray-200 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-300"
      >
        ログアウト
      </button>
    </header>
  );
}
