import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { PieChart, Pie, Cell, Legend, Tooltip as PieTooltip } from "recharts";
import { GetAllCourses, GetAllUsers } from "../../service/api";

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await GetAllUsers();
        setUsers(data);
      } catch (error) {
        console.error(error);
      }
    };
    const fetchCourse = async () => {
      try {
        const data = await GetAllCourses();
        setCourses(data);
      } catch (error) {
        console.error();
        error;
      }
    };
    fetchUsers();
    fetchCourse();
  }, []);

  // Data for the charts
  const courseData = [
    { name: "January", purchased: 100 },
    { name: "February", purchased: 120 },
    { name: "March", purchased: 150 },
    { name: "April", purchased: 170 },
    { name: "May", purchased: 200 },
  ];

  const mentors = users.filter((user) => user.role === "Mentor").length;
  const students = users.filter((user) => user.role === "Student").length;

  const pieData = [
    { name: "Mentors", value: mentors },
    { name: "Students", value: students },
  ];

  const COLORS = ["#00C49F", "#FFBB28"];
  return (
    <div className=" min-h-screen p-6">
      {/* Dashboard Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">
          Admin Dashboard
        </h1>
      </div>

      {/* Counter Cards */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-lg flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold text-gray-700">
              Total Mentors
            </h2>
            <p className="text-3xl font-bold text-green-600">{mentors || 0}</p>
          </div>
          <div className="bg-green-100 p-4 rounded-full">
            <svg
              className="w-8 h-8 text-green-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4v16m8-8H4"
              />
            </svg>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold text-gray-700">
              Total Students
            </h2>
            <p className="text-3xl font-bold text-blue-600">{students || 0}</p>
          </div>
          <div className="bg-blue-100 p-4 rounded-full">
            <svg
              className="w-8 h-8 text-blue-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4v16m8-8H4"
              />
            </svg>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold text-gray-700">
              Total Courses
            </h2>
            <p className="text-3xl font-bold text-yellow-600">
              {courses.length}
            </p>
          </div>
          <div className="bg-yellow-100 p-4 rounded-full">
            <svg
              className="w-8 h-8 text-yellow-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4v16m8-8H4"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
        {/* Line Chart: Course Purchases */}
        <div className=" bg-white p-6 rounded-lg shadow-lg mb-8 w-full">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Courses Purchased
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={courseData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="purchased" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart: Mentors vs Students */}
        <div className="bg-white p-6 rounded-lg shadow-lg w-full">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Mentors vs Students
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <PieTooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
