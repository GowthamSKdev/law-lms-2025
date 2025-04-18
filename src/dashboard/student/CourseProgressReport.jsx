import PageHeader from "../../components/PageHeader";

function CourseProgressReport() {
  return (
    <>
      <PageHeader title={"Course Progress"} />
      <div className="px-8 w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-bases font-medium">Report</h3>
          <input
            type="text"
            placeholder="Search course"
            className="bg-white px-3 py-1 text-black shadow rounded-md"
          />
        </div>
        <ProgressReportTable />
      </div>
    </>
  );
}

export default CourseProgressReport;

const ProgressReportTable = () => {
  return (
    <div className="w-full rounded-md">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-green-600 text-white font-medium h-10 text-left">
            <th className="px-2">COURSE</th>
            <th className="px-2">PROGRESS</th>
            <th className="px-2">SCORE</th>
            <th className="px-2">EXPIRY OF THE COURSE</th>
            <th className="px-2">PERCENTILE</th>
            <th className="px-2">TIME SPENT</th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white text-black font-base h-10">
            <td className="px-2">Full Stack Web Development</td>
            <td className="px-2">80%</td>
            <td className="px-2">85%</td>
            <td className="px-2">2024-12-31</td>
            <td className="px-2">90%</td>
            <td className="px-2">10 hours</td>
          </tr>
          <tr className="bg-white text-black font-base h-10">
            <td className="px-2">Full Stack Web Development</td>
            <td className="px-2">80%</td>
            <td className="px-2">85%</td>
            <td className="px-2">2024-12-31</td>
            <td className="px-2">90%</td>
            <td className="px-2">10 hours</td>
          </tr>
          <tr className="bg-white text-black font-base h-10">
            <td className="px-2">Full Stack Web Development</td>
            <td className="px-2">80%</td>
            <td className="px-2">85%</td>
            <td className="px-2">2024-12-31</td>
            <td className="px-2">90%</td>
            <td className="px-2">10 hours</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
