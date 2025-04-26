import { createBrowserRouter, Outlet } from "react-router";
// Landing
import Navbar from "./components/Navbar";
import Home from "./Home/Home";
// Authentication
import Login from "./authentication/Login";
// Admin
import AdminLayout from "./dashboard/admin/AdminLayout";
import AdminDashboard from "./dashboard/admin/AdminDashboard";
import UserManagement from "./dashboard/admin/UserManagement";
import AdminCoursePage from "./dashboard/admin/AdminCoursePage";
import AddNewCourse from "./dashboard/admin/AddNewCourse";
import EditCourse from "./dashboard/admin/EditCourse";
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
import ForumPage from "./components/ForumPage";
import { GetAllCourses, GetAllUsers } from "./service/api";
import AdminAnnouncement from "./dashboard/admin/AdminAnnouncement";
import { Suspense } from "react";

export const Router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <div className="flex flex-col h-screen bg-gray-100 relative">
          <Navbar />
          <Outlet />
        </div>
      </>
    ),
    children: [{ index: true, element: <Home /> }],
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "admin",
    element: <AdminLayout />,
    children: [
      { path: "", element: <AdminDashboard /> },
      {
        path: "users",
        element: <UserManagement />,
        loader: GetAllUsers,
        errorElement: <>Error</>,
      },
      {
        path: "courses",
        element: <Outlet />,
        children: [
          {
            index: true,
            element: <AdminCoursePage />,
            loader: GetAllCourses,
            errorElement: <>Error</>,
          },
          {
            path: "new",
            element: <AddNewCourse />,
          },
          {
            path: "edit/:id",
            element: <EditCourse />,
          },
        ],
      },
      {
        path: "announcement",
        element: <AdminAnnouncement />,
      },
      {
        path: "forum",
        element: <ForumPage />,
      },
    ],
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
          {
            path: ":id/test",
            element: <div className="">test</div>,
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
      {
        path: "forum",
        element: <ForumPage />,
      },
    ],
  },
]);
