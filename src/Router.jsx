import { createBrowserRouter, Outlet } from "react-router";
// Landing
import Home from "./Home/Home";
// Admin
import AdminLayout from "./dashboard/admin/AdminLayout";
import AdminDashboard from "./dashboard/admin/AdminDashboard";
// Student
import StudentLayout from "./dashboard/student/StudentLayout";
import StudentDashboard from "./dashboard/student/StudentDashboard";
import CoursePage from "./dashboard/student/CoursePage";
import CourseDetail from "./dashboard/student/CourseDetail";
import CourseContent from "./dashboard/student/CourseContent";
import AnnouncementPage from "./dashboard/student/AnnouncementPage";
import Achievements from "./dashboard/student/Achievements";
import BigCalendar from "./dashboard/student/BigCalendar";
import ExamPage from "./dashboard/student/ExamPage";
import CourseProgressReport from "./dashboard/student/CourseProgressReport";

export const Router = createBrowserRouter([
  { path: "/", element: <Home /> },
  {
    path: "admin",
    element: <AdminLayout />,
    children: [{ path: "", element: <AdminDashboard /> }],
  },
  {
    path: "student",
    element: <StudentLayout />,
    children: [
      {
        index: true,
        element: <StudentDashboard />,
      },
      {
        path: "course",
        element: <Outlet />,
        children: [
          {
            index: true,
            element: <CoursePage />,
          },
          {
            path: ":id/detail",
            element: <CourseDetail />,
          },
          {
            path: ":id/content",
            element: <CourseContent />,
          },
        ],
      },
      {
        path: "announcement",
        element: <AnnouncementPage />,
      },
      {
        path: "achievements",
        element: <Achievements />,
      },
      {
        path: "calender",
        element: <BigCalendar />,
      },
      {
        path: "exam",
        element: <ExamPage />,
      },
      {
        path: "progressReport",
        element: <CourseProgressReport />,
      },
    ],
  },
]);
