import { Outlet } from "react-router";
import DashboardSidebar from "../../components/DashboardSidebar";
import DashboardNavbar from "../../components/DashboardNavbar";

function StudentLayout() {
  return (
    <>
      <div className="relative flex min-h-dvh w-full">
        <DashboardSidebar />
        <div className="flex-1 w-full relative">
          <div className="flex flex-col w-full">
            <DashboardNavbar />
            <div className="flex-1">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default StudentLayout;
