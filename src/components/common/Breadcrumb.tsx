import Link from 'next/link';
import './Breadcrumb.css';

export interface BreadcrumbItem {
  name: string;
  href?: string;
}

interface Props {
  items: BreadcrumbItem[];
}

function Breadcrumb({ items }: Props) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      ...(item.href ? { item: `https://yoon2.com${item.href}` } : {}),
    })),
  };

  return (
    <nav className="breadcrumb" aria-label="パンくずリスト">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <ol className="breadcrumb-list">
        {items.map((item, i) => (
          <li key={item.name} className="breadcrumb-item">
            {item.href ? (
              <Link href={item.href} className="breadcrumb-link">{item.name}</Link>
            ) : (
              <span aria-current="page">{item.name}</span>
            )}
            {i < items.length - 1 && <span className="breadcrumb-separator" aria-hidden="true">›</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export default Breadcrumb;
