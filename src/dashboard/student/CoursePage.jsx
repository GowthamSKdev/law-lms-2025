import PageHeader from "../../components/PageHeader";
import courses from "../../api/course.json";
import CourseList from "../../components/CourseList";

function CoursePage() {
  const purchasedCoursesIds = JSON.parse(
    localStorage.getItem("purchasedCourses") || "[]"
  );

  const purchasedCourses = courses.filter((course) =>
    purchasedCoursesIds.includes(course.id)
  );

  const unPurchasedCourses = courses.filter(
    (course) => !purchasedCoursesIds.includes(course.id)
  );

  return (
    <>
      <PageHeader title={"Course"} />
      {purchasedCourses.length > 0 && (
        <div className="px-4 lg:px-8 py-4 rounded-md mb-4">
          <h2 className="text-lg font-semibold text-green-800">
            Purchased Courses
          </h2>
          <div className="mt-4">
            <CourseList courses={purchasedCourses} />
          </div>
        </div>
      )}
      <div className="px-4 lg:px-8 py-4 rounded-md mb-4">
        <h2 className="text-lg font-semibold text-green-800">
          Recommended Courses
        </h2>
        <div className="mt-4">
          <CourseList courses={unPurchasedCourses} />
        </div>
      </div>
    </>
  );
}

export default CoursePage;
