import { FaRegFaceFrown } from "react-icons/fa6";
import { Link } from 'react-router';
import Layout from "../../dashboard/layout";
 
export default function NotFound() {
  return (
    
    <main className="flex h-full flex-col items-center justify-center gap-2">
      <FaRegFaceFrown className="w-10 text-gray-400" />
      <h2 className="text-xl font-semibold">404 Not Found</h2>
      <p>Could not find the requested invoice.</p>
      <Link
        to="/dashboard/customers"
        className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400">
            Go Back
      </Link>
    </main>
 
  );
}