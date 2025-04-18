import { ArrowRightCircle } from "lucide-react";
import PageHeader from "../../components/PageHeader";

function StudentDashboard() {
  return (
    <>
      <div className="flex flex-col w-full relative">
        <PageHeader
          title={"Welcome, User."}
          description={"Welcome to Trending, check your priority learning."}
        />
        <div className="px-4 lg:px-8">
          <div className="flex justify-between items-center">
            <h3 className="mb-4 font-semibold">Courses in Progress</h3>
            <button className="text-sm rounded-md px-3 py-1 hover:bg-green-600 hover:text-green-50">
              View
            </button>
          </div>
          <div className="flex gap-4">
            <CourseProgressCard />
            {/* <CourseProgressCard /> */}
            {/* <CourseProgressCard /> */}
            {/* <CourseProgressCard /> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default StudentDashboard;

const CourseProgressCard = () => {
  return (
    <>
      <div className="p-6 bg-white flex flex-col items-start gap-2 w-full shadow max-w-[250px] rounded-md">
        <p className="text-xs font-semibold bg-green-200 px-2 py-1 inline rounded-full">
          Course
        </p>
        <p>Introduction to Law</p>
        <div className="flex flex-col lg:flex-row items-start gap-4 w-full">
          <div className="flex flex-col gap-2 items-end w-full">
            <p className="text-xs"> 10% Completed</p>
            <div className="h-2 bg-green-300 relative w-full rounded-full overflow-hidden">
              <div className="absolute bg-green-700 left-0 w-[50%] h-full"></div>
            </div>
          </div>
          <button className="bg-green-500 text-white px-2 py-1 flex items-center gap-2 rounded-md">
            <span className="text-sm">Continue</span>
            <ArrowRightCircle />
          </button>
        </div>
      </div>
    </>
  );
};
