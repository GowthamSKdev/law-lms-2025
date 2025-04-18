import React, { useState } from "react";
import {
  ArrowLeft,
  BookOpen,
  Check,
  ChevronLeft,
  ChevronRight,
  Play,
  PlayCircle,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router";

// Main CourseContent Component
function CourseContent() {
  const location = useLocation();
  const navigate = useNavigate();
  const course = location.state?.course || null;

  const [selectedContent, setSelectedContent] = useState(null);

  const renderContent = () => {
    if (!selectedContent) {
      return (
        <div className="text-white text-center py-10 text-lg">
          <img
            src={course.thumbnail}
            alt={course.title}
            className="bg-green-50 object-cover object-center w-full h-full rounded-md shadow-sm absolute top-0 left-0"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/vite.svg";
            }}
          />
        </div>
      );
    }

    const { fileType, url } = selectedContent;

    if (fileType.startsWith("video")) {
      console.log(url);

      return (
        // <video controls className="w-full h-full min-h-[50vh] rounded-md">
        //   <source src={url} type={fileType} />
        //   Your browser does not support the video tag.
        // </video>
        <iframe
          src={url}
          title="PDF Viewer"
          className="w-full h-full rounded-md"
        ></iframe>
      );
    }

    if (fileType.startsWith("audio")) {
      return (
        <>
          <div className="flex flex-col items-center justify-center h-full">
            <img
              src={course.thumbnail}
              alt={course.title}
              className="bg-green-50 object-cover object-center w-full h-full rounded-md shadow-sm"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/vite.svg";
              }}
            />
            <audio controls className="w-full mt-4">
              <source src={url} type={fileType} />
              Your browser does not support the audio element.
            </audio>
          </div>
        </>
      );
    }

    if (fileType === "application/pdf") {
      return (
        <iframe
          src={url}
          title="PDF Viewer"
          className="w-full h-full rounded-md"
        ></iframe>
      );
    }
    if (fileType === "test") {
      return (
        <div className="text-white text-center py-10 text-lg">
          Test content is not supported yet.
        </div>
      );
    }

    return (
      <div className="text-white text-center py-10">
        Unsupported content type: {fileType}
      </div>
    );
  };

  return (
    <div className="flex flex-col lg:flex-row-reverse bg-gray-200 min-h-[calc(100vh-4rem)]">
      {/* Right Side: Video/Content Area */}
      <div className="flex-1 p-4">
        <div className="p-4 bg-white shadow-sm rounded-lg flex flex-col gap-4 h-full">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">{course.title}</h2>
            <div className="flex items-center gap-2">
              <button className="px-2 py-1 hover:bg-green-500 hover:text-white rounded-full">
                <ChevronLeft />
              </button>
              <button className="px-2 py-1 hover:bg-green-500 hover:text-white rounded-full">
                <ChevronRight />
              </button>
            </div>
          </div>

          <div className="w-full h-full rounded-md overflow-auto video-box relative min-h-[50vh]">
            {renderContent()}
          </div>
        </div>
      </div>

      {/* Left Side: Sidebar */}
      <div className="p-4 flex flex-col gap-4">
        <div className="p-4 bg-white shadow-sm rounded-lg flex flex-col gap-2">
          <button
            className="flex items-center gap-2 text-green-800 font-semibold text-sm"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4" />
            Courses
          </button>

          <div className="h-40">
            <img
              src={course.thumbnail}
              alt={course.title}
              className="bg-green-50 object-cover object-center w-full h-full rounded-md shadow-sm"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/vite.svg";
              }}
            />
          </div>

          <h2 className="text-lg font-semibold">{course.title}</h2>

          <div className="flex flex-col gap-2 items-end w-full">
            <p className="text-xs">10% Completed</p>
            <div className="h-2 bg-green-300 relative w-full rounded-full overflow-hidden">
              <div className="absolute bg-green-700 left-0 w-[50%] h-full"></div>
            </div>
          </div>
        </div>

        <div className="min-w-xs w-full bg-white flex-1 shadow-sm rounded-lg flex flex-col gap-2">
          <h3 className="text-base uppercase font-semibold px-4 py-3">
            Contents
          </h3>
          <div className="overflow-auto h-[300px]">
            <Accordion course={course} onSelectContent={setSelectedContent} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseContent;

const Accordion = ({ course, onSelectContent }) => {
  return (
    <div className="flex flex-col lg:max-w-xs">
      {course.lessons?.map((lesson, index) => (
        <AccordionItem key={index} title={lesson.title}>
          {lesson.sublessons?.map((sublesson, subIndex) => (
            <div
              key={subIndex}
              className="px-3 py-2 flex items-center gap-2 text-green-800 font-semibold cursor-pointer hover:underline hover:bg-green-200"
              onClick={() =>
                onSelectContent({
                  fileType: sublesson.fileType,
                  url: sublesson.file,
                })
              }
            >
              <div className="flex items-center gap-2">
                <PlayCircle className="h-5 w-5 text-green-800" />
                <span>{sublesson.title}</span>
              </div>
              {sublesson.completed && (
                <Check className="h-4 w-4 text-green-700" />
              )}
            </div>
          ))}
        </AccordionItem>
      ))}
    </div>
  );
};

const AccordionItem = ({ title, children }) => (
  <details className=" rounded-md duration-300 [open]:bg-green-400 w-full transform-transition">
    <summary className="cursor-pointer flex px-4 py-3 items-center gap-2 text-green-800 font-semibold text-sm [open]:bg-green-300 hover:bg-green-300 w-full">
      <BookOpen className="h-5 w-5" />
      <span>{title}</span>
    </summary>
    <div className="ml-3 py-2 text-sm text-gray-700 flex flex-col gap-2">
      {children}
    </div>
  </details>
);
