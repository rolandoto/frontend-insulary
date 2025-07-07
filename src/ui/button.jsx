import clsx from 'clsx';

export function Button({ children, className, ...rest }) {
  return (
    <button
      {...rest}
      className={clsx(
        'flex h-10 items-center rounded-lg bg-[#df0209] px-4 text-sm font-medium text-white transition-colors hover:[#df0209] cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#df0209] active:bg-[#df0209] aria-disabled:cursor-not-allowed aria-disabled:opacity-50',
        className)}>
      {children}
    </button>
  );
}
