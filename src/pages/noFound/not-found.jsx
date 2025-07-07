
import { HiOutlineFaceFrown } from "react-icons/hi2";
import { Link } from "react-router";
 
export default function NotFound() {
  return (
    <main className="flex h-screen flex-col items-center justify-center gap-2">
      <HiOutlineFaceFrown fontSize={50} className="w-10 text-gray-400" />
      <h2 className="text-xl font-semibold">404 Not Found</h2>
      <p>Dashboard </p>
      <Link
        to="/dashboard"
        className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400">
            Regresar
      </Link>
    </main>
  );
}