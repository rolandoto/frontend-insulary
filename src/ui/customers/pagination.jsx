import { Link, useLocation, useSearchParams } from 'react-router';
import clsx from 'clsx';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { generatePagination } from '../../lib/utils';


export default function Pagination({ totalPages }) {
const { pathname } = useLocation();
  const [searchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const allPages = generatePagination(currentPage, totalPages);



  // Reconstruye la URL con el nuevo parámetro `page`
  const createPageURL = (page) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page);
    return `${pathname}?${params.toString()}`;
  };

  return (
    <div className="inline-flex items-center">
      <PaginationArrow
        direction="left"
        to={createPageURL(currentPage - 1)}
        disabled={currentPage <= 1}
      />
      <div className="flex -space-x-px">
        {allPages.map((page, idx) => {
          let position = 'middle';
          if (allPages.length === 1) position = 'single';
          else if (idx === 0) position = 'first';
          else if (idx === allPages.length - 1) position = 'last';

          return (
            <PaginationNumber
              key={`${page}-${idx}`}
              to={String(page)}
              href={createPageURL(page)}
              page={page}
              position={position}
              isActive={currentPage === page}
            />
          );
        })}
      </div>

      <PaginationArrow
        direction="right"
        to={createPageURL(currentPage + 1)}
        disabled={currentPage >= totalPages}
      />
    </div>
  );
}

function PaginationNumber({ page, href, position, isActive }) {
  const className = clsx(
    'flex h-10 cursor-pointer w-10 items-center justify-center text-sm border border-gray-200 ',
    {
      'rounded-l-md': position === 'first' || position === 'single',
      'rounded-r-md': position === 'last' || position === 'single',
      'z-10 bg-[#df0209]   text-white': isActive,
      'z-10 bg-[#df0209] text-white': isActive,
      'hover:bg-[#df0209] hover:text-white': !isActive && position !== 'middle',
      'middle cursor-default': position === 'middle',
    }
  );

  // Si es '...', lo mostramos sin enlace
  if (page === '...') {
    return <div className={className}>{page}</div>;
  }

  return isActive ? (
    <div className={className}>{page}</div>
  ) : (
    <Link to={href} className={className}>
      {page}
    </Link>
  );
}

function PaginationArrow({ direction, to, disabled }) {
  const className = clsx(
    'flex h-10 w-10 items-center justify-center rounded-md border-gray-200 border',
    {
      'pointer-events-none border-gray-200 text-gray-300': disabled,
      'hover:bg-gray-100': !disabled,
      'mr-2': direction === 'left',
      'ml-2': direction === 'right',
    }
  );

  const Icon = direction === 'left' ? FiChevronLeft : FiChevronRight;

  return disabled ? (
    <div className={className}>
      <Icon className="w-5 h-5 " />
    </div>
  ) : (
    <Link to={to} className={className}>
      <Icon className="w-5 h-5" />
    </Link>
  );
}
