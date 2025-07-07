import { clsx } from 'clsx';
import { Link } from 'react-router';  // 👈 asegúrate de usar react-router-dom

export default function Breadcrumbs({ breadcrumbs }){

  return (
    <nav aria-label="Breadcrumb" className="mb-6 block">
      <ol className="lusitana flex text-xl md:text-2xl">
        {breadcrumbs.map((breadcrumb, index) => (
          <li
            key={breadcrumb.href}
            aria-current={breadcrumb.active ? 'page' : undefined}  // 'page' cuando es activo
            className={clsx(
              breadcrumb.active ? 'text-gray-900' : 'text-gray-500'
            )}>
            <Link to={breadcrumb.href} replace >
              {breadcrumb.label}
            </Link>
            {index < breadcrumbs.length - 1 && (
              <span className="mx-3 inline-block">/</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}