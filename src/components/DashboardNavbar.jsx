import { Search, User } from "lucide-react";

function DashboardNavbar() {
  return (
    <>
      <div className="flex h-14 justify-between items-center px-6 shadow sticky top-0 left-0 z-30 bg-white">
        {/* <div className="flex gap-2 items-center bg-gray-100 px-3 py-1 rounded-md ">
          <Search height={16} width={16} />
          <input
            type="text"
            placeholder="Search Courses"
            className="outline-none"
            enterKeyHint="Enter"
          />
        </div> */}
        <div className="flex items-center gap-2">
          <div className="size-10 rounded-full bg-gray-200 grid place-content-center">
            <User />
          </div>
          <p className="font-medium hidden lg:block">Demo student</p>
        </div>
      </div>
    </>
  );
}

export default DashboardNavbar;
