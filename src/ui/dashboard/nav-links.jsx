
import { HiOutlineUserGroup } from "react-icons/hi";
import { TfiHome } from "react-icons/tfi";
import { IoDocumentsOutline } from "react-icons/io5";
import { Link, useHref } from 'react-router';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.

const links = [
    { name: 'Inicio', href: '/dashboard', icon: TfiHome },
    {name: 'Facturas',href: '/dashboard/invoices',icon: IoDocumentsOutline,},
    { name: 'Clientes', href: '/dashboard/customers', icon: HiOutlineUserGroup },
    { name: 'Casos', href: '/dashboard/casos', icon: HiOutlineUserGroup },
    { name: 'Usuarios', href: '/dashboard/users', icon: HiOutlineUserGroup },
    { name: 'Intermederios', href: '/dashboard/intermederies', icon: HiOutlineUserGroup }
];

export default function NavLinks() {

    let href = useHref();


  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            to={link.href}
            className={`flex h-[48px] text-black grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm  hover:bg-sky-100 hover:[#df0209] md:flex-none md:justify-start md:p-2 md:px-3"
              ${href === link.href ?"bg-sky-100 text-[#df0209] " :"" }
              `}
          >
            <LinkIcon  fontSize={35} className="w-6" />
            <p className="hidden md:block ">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
