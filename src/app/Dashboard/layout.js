
import Sidebar from "./Component/Sidebar";

export default function DashboardLayout({ children }) {

  return (
    <div className="w-full min-h-screen flex flex-col">
      <div className="w-full h-[60px]  px-6"></div>
      <div className="w-full  flex">
        {/* SideBar */}
        <div className="w-[15%]">
          <Sidebar></Sidebar>
        </div>
        
        {/* Main Content */}
        <main className="w-[85%] bg-gray-100 px-6 py-4">{children}</main>
      </div>
      

    </div>
  );
}