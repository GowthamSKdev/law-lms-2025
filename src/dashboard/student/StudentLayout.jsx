import { Outlet } from "react-router";
import DashboardSidebar from "../../components/DashboardSidebar";
import DashboardNavbar from "../../components/DashboardNavbar";

function StudentLayout() {
  return (
    <>
      {/* <div className="relative flex w-full">
        <DashboardSidebar />
        <div className="flex-1 w-full relative">
          <div className="flex flex-col w-full">
            <DashboardNavbar />
            <div className="flex-1">
              <Outlet />
            </div>
          </div>
        </div>
      </div> */}
      <div className="relative flex w-full">
        <DashboardSidebar />
        <div className="w-full relative">
          <div className="flex flex-col">
            <DashboardNavbar />
            <div className="flex-1 h-[calc(100vh-4rem)]">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default StudentLayout;
