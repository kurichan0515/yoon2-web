import Link from 'next/link';

const navItems = [
  { href: '/admin/posts', label: '記事' },
  { href: '/admin/categories', label: 'カテゴリ' },
  { href: '/admin/tags', label: 'タグ' },
];

export default function AdminSidebar() {
  return (
    <aside className="w-52 bg-gray-800 text-white flex flex-col">
      <div className="px-4 py-5 text-lg font-bold border-b border-gray-700">
        yoon² 管理
      </div>
      <nav className="flex-1 py-4">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="block px-4 py-2 text-sm hover:bg-gray-700 transition-colors"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
