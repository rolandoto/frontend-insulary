
import { CiPower } from "react-icons/ci";
import NavLinks from './nav-links';
import { Link } from "react-router";
import AcmeLogo from "../logo";

export default function SideNav() {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <Link
        className="mb-2 flex h-20 items-center justify-center rounded-md bg-black md:h-40"
        href="/">
        <div className="w-32 text-white md:w-40">
            <AcmeLogo />
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        <form>
          <button className="flex h-[48px] Lusitana text-black w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
            <CiPower fontSize={35} className="w-6" />
            <div className=" cursor-pointer hidden md:block">Cerrar sesión</div>
          </button>
        </form>
      </div>
    </div>
  );
}
