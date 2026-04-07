import SideNav from "../../ui/dashboard/sidenav";

export default function Layout({ children }) {
  return (
    <div className="flex min-h-screen w-full flex-col md:flex-row">
      <div className="w-full flex-none md:w-64 lg:w-72">
        <SideNav />
      </div>
      <div className="min-w-0 flex-1 p-4 md:p-6 lg:p-8">{children}</div>
    </div>
  );
}
