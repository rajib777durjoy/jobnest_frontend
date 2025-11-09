
import Sidebar from "./Component/Sidebar";

export default function DashboardLayout({ children }) {

  return (
    <div className="w-full min-h-screen flex flex-col">
     
      <div className="w-full h-[60px]  flex items-center px-6"></div>

      <div className="flex ">
        {/* Sidebar */}
        <Sidebar></Sidebar>

        {/* Main Content */}
        <main className="flex-1 bg-gray-100 px-6 py-4">{children}</main>
      </div>
    </div>
  );
}