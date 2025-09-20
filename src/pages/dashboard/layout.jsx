import SideNav from "../../ui/dashboard/sidenav";

export default function Layout({ children }) {
  return (
    <div className="flex  flex-col md:flex-row ">
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      <div className="flex-grow p-6  md:p-12">{children}</div>
    </div>
  );
}