import { Outlet } from "react-router";
import DashboardSidebar from "../../components/DashboardSidebar";
import DashboardNavbar from "../../components/DashboardNavbar";
import { BookOpen, Home, Megaphone, MessagesSquare, Users } from "lucide-react";
function AdminLayout() {
  const NavLinks = [
    {
      path: "/admin",
      label: "Dashboard",
      icon: <Home className="h-5" />,
    },
    {
      path: "/admin/users",
      label: "Users",
      icon: <Users className="h-5" />,
    },
    {
      path: "/admin/courses",
      label: "Courses",
      icon: <BookOpen className="h-5" />,
    },
    {
      path: "/admin/announcement",
      label: "Announcements",
      icon: <Megaphone className="h-5" />,
    },
    {
      path: "/admin/forum",
      label: "Forum",
      icon: <MessagesSquare className="h-5" />,
    },
  ];
  return (
    <>
      <div className="relative flex w-full">
        <DashboardSidebar NavLinks={NavLinks} />
        <div className="flex-1 w-full relative">
          <div className="flex flex-col w-full">
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

export default AdminLayout;
