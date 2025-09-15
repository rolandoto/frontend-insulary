
import { HiOutlineUserGroup } from "react-icons/hi";
import { TfiHome } from "react-icons/tfi";
import { Link, useHref } from 'react-router';
import { PiSuitcaseSimple } from "react-icons/pi";
import { AiOutlineBranches } from "react-icons/ai";


const links = [
    { name: 'Inicio', href: '/dashboard', icon: TfiHome },
    { name: 'Clientes', href: '/dashboard/customers', icon: HiOutlineUserGroup },
    { name: 'Casos', href: '/dashboard/casos', icon: PiSuitcaseSimple },
    { name: 'Usuarios', href: '/dashboard/users', icon: HiOutlineUserGroup },
    { name: 'Intermederios', href: '/dashboard/intermederies', icon: HiOutlineUserGroup},
    { name: 'Sucursales', href: '/dashboard/branches', icon: AiOutlineBranches }
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
              `}>
            <LinkIcon  fontSize={35} className="w-6" />
              <p className="hidden md:block ">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
