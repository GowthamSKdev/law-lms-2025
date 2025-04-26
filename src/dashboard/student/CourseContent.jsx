// import React, { useEffect, useState } from "react";
// import {
//   ArrowLeft,
//   BookCheck,
//   BookOpen,
//   Check,
//   ChevronLeft,
//   ChevronRight,
//   Play,
//   PlayCircle,
// } from "lucide-react";
// import { useLocation, useNavigate } from "react-router";

// // Main CourseContent Component
// function CourseContent() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const course = location.state?.course || null;

//   const [selectedContent, setSelectedContent] = useState(null);

//   const [userId, setUserId] = useState("");
//   const [courseData, setCourseData] = useState({});
//   const [currentCourseData, setCurrentCourseData] = useState({});

//   const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
//   const [currentSubLessonIndex, setCurrentSubLessonIndex] = useState(-1);
//   const [activeAccordion, setActiveAccordion] = useState(null);

//   const [completedExercises, setCompletedExercises] = useState(new Set());

//   useEffect(() => {
//     setCourseData(course);
//   }, []);

//   const renderContent = () => {
//     if (!selectedContent) {
//       return (
//         <div className="text-white text-center py-10 text-lg h-full">
//           <img
//             src={course.thumbnail}
//             alt={course.title}
//             className="bg-green-50 object-cover object-center w-full h-full rounded-md shadow-sm absolute top-0 left-0"
//             onError={(e) => {
//               e.target.onerror = null;
//               e.target.src = "/vite.svg";
//             }}
//           />
//         </div>
//       );
//     }

//     const { fileType, url, data, lessonIndex, subLessonIndex } =
//       selectedContent;

//     if (fileType.startsWith("video")) {
//       console.log(url);

//       return (
//         <video
//           controls
//           className="w-full h-full min-h-[50vh] rounded-md"
//           onEnded={() => handleMediaEnd(data, lessonIndex, subLessonIndex)}
//         >
//           <source src={url} type={fileType} />
//           Your browser does not support the video tag.
//         </video>
//         // <iframe
//         //   src={url}
//         //   title="PDF Viewer"
//         //   className="w-full h-full rounded-md"
//         // ></iframe>
//       );
//     }

//     if (fileType.startsWith("audio")) {
//       return (
//         <div className="flex flex-col items-center justify-center inset-0 h-full">
//           <img
//             src={course.thumbnail}
//             alt={course.title}
//             className="flex-1 bg-green-50 object-cover object-center rounded-md h-full w-full shadow-sm"
//             onError={(e) => {
//               e.target.onerror = null;
//               e.target.src = "/vite.svg";
//             }}
//           />
//           <audio
//             controls
//             className="w-full mt-4"
//             onEnded={() => handleMediaEnd(data, lessonIndex, subLessonIndex)}
//           >
//             <source src={url} type={fileType} />
//             Your browser does not support the audio element.
//           </audio>
//         </div>
//       );
//     }

//     if (fileType === "application/pdf") {
//       return (
//         <iframe
//           src={url}
//           title="PDF Viewer"
//           className="w-full h-full rounded-md"
//         ></iframe>
//       );
//     }
//     if (fileType === "test") {
//       return (
//         <div className="text-white text-center py-10 text-lg">
//           Test content is not supported yet.
//         </div>
//       );
//     }

//     return (
//       <div className="text-white text-center py-10">
//         Unsupported content type: {fileType}
//       </div>
//     );
//   };

//   // Handle Lesson complete

//   // Media end function
//   const handleMediaEnd = async () => {
//     if (
//       currentLessonIndex == null ||
//       currentSubLessonIndex == null ||
//       !courseData?.lessons?.[currentLessonIndex]?.sublessons?.[
//         currentSubLessonIndex
//       ]
//     ) {
//       const exerciseKey = `${currentLessonIndex}-${currentSubLessonIndex}`;
//       setCompletedExercises((prev) => {
//         const updatedSet = new Set(prev);
//         updatedSet.add(exerciseKey);
//         return updatedSet;
//       });

//       const currentVideo =
//         courseData.lessons[currentLessonIndex].sublessons[
//           currentSubLessonIndex
//         ];
//       // setWatchedVideoTitles((prevTitles) => {
//       //   const updatedTitles = new Set(prevTitles);
//       //   updatedTitles.add(currentVideo.title);
//       //   return Array.from(updatedTitles);
//       // });

//       Progress_data(currentLessonIndex, currentSubLessonIndex);
//     }
//   };

//   // progress bar
//   const Progress_data = (lessonIndex, subLessonIndex) => {
//     // Calculate total exercises and progress percentage
//     const totalExercises = courseData.lessons?.reduce(
//       (total, lesson) => total + lesson.sublessons?.length,
//       0
//     );

//     const progress_percentage =
//       totalExercises > 0 ? (completedExercises.size / totalExercises) * 100 : 0;

//     const watchedPercentage = progress_percentage;
//     return null;
//   };

//   const HandleLessonComplete = (lessonIndex, subLessonIndex) => {
//     Progress_data(lessonIndex, subLessonIndex);
//   };

//   // progress bar
//   // HandleLessonComplete(lessonIndex, subLessonIndex);

//   // calculating the course progress
//   const calculateProgress = () => {
//     const totalExercises = courseData.lessons?.reduce(
//       (total, lesson) => total + lesson.sublessons?.length,
//       0
//     );
//     const progress =
//       totalExercises > 0 ? (completedExercises.size / totalExercises) * 100 : 0;

//     localStorage.setItem(`courseProgress-${course.id}`, progress);

//     return progress;
//   };

//   const progress = calculateProgress();

//   console.log([...completedExercises]);
//   return (
//     <div className="flex flex-col lg:flex-row-reverse bg-gray-200 min-h-[calc(100vh-3.5rem)] relative gap-4 p-4">
//       {/* Right Side: Video/Content Area */}
//       <div className="flex-1">
//         <div className="p-4 bg-white shadow-sm rounded-lg flex flex-col gap-4 h-full">
//           <div className="flex justify-between items-center">
//             <h2 className="text-lg font-semibold">{course.title}</h2>
//             <div className="flex items-center gap-2">
//               <button className="px-2 py-1 hover:bg-green-500 hover:text-white rounded-full">
//                 <ChevronLeft />
//               </button>
//               <button className="px-2 py-1 hover:bg-green-500 hover:text-white rounded-full">
//                 <ChevronRight />
//               </button>
//             </div>
//           </div>

//           <div className="w-full lg:h-full rounded-md overflow-auto video-box relative min-h-[250px]">
//             {renderContent()}
//           </div>
//         </div>
//       </div>

//       {/* Left Side: Sidebar */}
//       <div className="flex flex-col gap-4">
//         <div className="p-4 bg-white w-full shadow-sm rounded-lg flex flex-col gap-2">
//           <button
//             className="flex items-center gap-2 text-green-800 font-semibold text-sm"
//             onClick={() => navigate(-1)}
//           >
//             <ArrowLeft className="h-4 w-4" />
//             Courses
//           </button>

//           <div className="h-30">
//             <img
//               src={course.thumbnail}
//               alt={course.title}
//               className="bg-green-50 object-cover object-center w-full h-full rounded-md shadow-sm"
//               onError={(e) => {
//                 e.target.onerror = null;
//                 e.target.src = "/vite.svg";
//               }}
//             />
//           </div>

//           <h2 className="text-base font-semibold">{course.title}</h2>

//           <div className="flex flex-col gap-2 items-end w-full">
//             <p className="text-xs">{progress}% Completed</p>
//             <div className="h-3 bg-green-300 relative w-full rounded-full overflow-hidden">
//               <div
//                 className={`absolute bg-green-700 left-0 h-full`}
//                 style={{ width: `${progress}%` }}
//               ></div>
//             </div>
//           </div>
//         </div>

//         <div className="max-w-xs w-full bg-white flex-1 shadow-sm rounded-lg flex flex-col h-full">
//           <h3 className="text-base uppercase font-semibold px-4 py-2">
//             Contents
//           </h3>
//           <div className="overflow-auto flex-1 max-h-[300px]">
//             <Accordion
//               course={course}
//               onSelectContent={setSelectedContent}
//               completedExercises={completedExercises}
//               setCompletedExercises={setCompletedExercises}
//               setCurrentLessonIndex={setCurrentLessonIndex}
//               setCurrentSubLessonIndex={setCurrentSubLessonIndex}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default CourseContent;

// const Accordion = ({ course, onSelectContent, completedExercises }) => {
//   return (
//     <div className="flex flex-col lg:max-w-xs w-full ">
//       {course.lessons?.map((lesson, lessonIndex) => {
//         const LessonCompleted = lesson.sublessons.every((_, subLessonIndex) =>
//           completedExercises.has(`${lessonIndex}-${subLessonIndex}`)
//         );
//         return (
//           <AccordionItem
//             key={lessonIndex}
//             title={lesson.title}
//             LessonCompleted={LessonCompleted}
//           >
//             {lesson.sublessons?.map((sublesson, subIndex) => (
//               <div
//                 key={subIndex}
//                 className="px-3 py-2 flex items-center gap-2 text-green-800 font-semibold cursor-pointer hover:underline hover:bg-green-200"
//                 onClick={() => {
//                   onSelectContent({
//                     fileType: sublesson.fileType,
//                     url: sublesson.file,
//                     data: sublesson,
//                     lessonIndex: lessonIndex,
//                     subLessonIndex: subIndex,
//                   });
//                   setCurrentLessonIndex(lessonIndex); // Add this
//                   setCurrentSubLessonIndex(subIndex); // Add this
//                 }}
//               >
//                 <div className="flex items-center gap-2">
//                   {/* <PlayCircle className="h-5 w-5 text-green-800" /> */}
//                   {completedExercises.has(`${lessonIndex}-${subIndex}`) ? (
//                     <Check className="h-4 w-4 text-green-700" />
//                   ) : (
//                     <PlayCircle className="h-5 w-5 text-green-800" />
//                   )}
//                   <span>{sublesson.title}</span>
//                 </div>
//                 {/* {completedExercises.has(`${index}-${subIndex}`) && (
//                   <Check className="h-4 w-4 text-green-700" />
//                 )} */}
//               </div>
//             ))}
//           </AccordionItem>
//         );
//       })}
//     </div>
//   );
// };

// const AccordionItem = ({ title, children, LessonCompleted }) => (
//   <details className=" rounded-md duration-300 [open]:bg-green-400 w-full transform-transition">
//     <summary className="cursor-pointer flex px-4 py-3 items-center gap-2 text-green-800 font-semibold text-sm [open]:bg-green-300 hover:bg-green-300 w-full">
//       {LessonCompleted ? (
//         <BookCheck className="h-5 w-5" />
//       ) : (
//         <BookOpen className="h-5 w-5" />
//       )}
//       <span>{title}</span>
//     </summary>
//     <div className="ml-3 py-2 text-sm text-gray-700 flex flex-col gap-2">
//       {children}
//     </div>
//   </details>
// );

import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  BookCheck,
  BookOpen,
  Check,
  ChevronLeft,
  ChevronRight,
  Play,
  PlayCircle,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router";
import { BiMinus, BiPlus } from "react-icons/bi";

// Main CourseContent Component
function CourseContent() {
  const location = useLocation();
  const navigate = useNavigate();
  const course = location.state?.course || null;

  const [selectedContent, setSelectedContent] = useState(null);

  const [userId, setUserId] = useState("");
  // const [courseData, setCourseData] = useState({});
  const [courseData, setCourseData] = useState({ lessons: [] });

  const [currentCourseData, setCurrentCourseData] = useState({});

  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [currentSubLessonIndex, setCurrentSubLessonIndex] = useState(-1);
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [activeLesson, setActiveLesson] = useState(null);

  const [completedExercises, setCompletedExercises] = useState(new Set());

  useEffect(() => {
    if (course) {
      setCourseData(course);
    }
  }, [course]);

  //
  const handleCurrentContent = async (data, lessonIndex, exerciseIndex) => {
    console.log("Selected Content Data:", data);

    // Prepare modified data for the current course content
    const modifiedData = {
      ...data,
      exerciseNo: exerciseIndex + 1,
      lessonNo: lessonIndex + 1,
      type: data.file.type || data.type,
      link: data.file.url,
      // duration: data.duration,
    };

    // Update the current course data and UI state
    setCurrentCourseData(modifiedData);
    setCurrentLessonIndex(lessonIndex);
    setCurrentSubLessonIndex(exerciseIndex);
    setActiveAccordion(lessonIndex);

    // console.log("Current content set:", modifiedData);
  };

  const renderContent = (link, type, data, lessonIndex, exerciseIndex) => {
    console.log(link, type, data, lessonIndex, exerciseIndex);

    if (typeof type === "string" && type.startsWith("video")) {
      console.log(link);

      return (
        <video
          controls
          className="w-full h-full rounded-md"
          onEnded={() => handleMediaEnd(data, lessonIndex, exerciseIndex)}
        >
          <source src={link} type={type} />
          Your browser does not support the video tag.
        </video>
      );
    }

    if (typeof type === "string" && type.startsWith("audio")) {
      return (
        <div className="flex flex-col items-center justify-center inset-0 h-full">
          <img
            src={course.thumbnail}
            alt={course.title}
            className="flex-1 bg-green-50 object-cover object-center rounded-md h-full w-full shadow-sm relative"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/vite.svg";
            }}
          />
          <audio
            controls
            className="w-full mt-4 absolute bottom-5 px-5"
            onEnded={() => handleMediaEnd(data, lessonIndex, exerciseIndex)}
          >
            <source src={link} type={type} />
            Your browser does not support the audio element.
          </audio>
        </div>
      );
    }

    if (typeof type === "string" && type.startsWith("application")) {
      return (
        <>
          <button
            onClick={() => handleMediaEnd(data, lessonIndex, exerciseIndex)}
          >
            Complete
          </button>
          <iframe
            src={link}
            title="PDF Viewer"
            className="w-full h-full rounded-md"
          ></iframe>
        </>
      );
    }

    if (typeof type === "string" && type.startsWith("test")) {
      navigate(`${course.id}/test`, { state: data.test });
      return (
        <div className="text-black text-center py-10 text-lg">
          Test content is not supported yet.
        </div>
      );
    }

    return (
      <div className="text-white text-center py-10">
        Unsupported content type: {type}
      </div>
    );
  };

  // Handle Lesson complete
  const handleLessonClick = (index) => {
    setActiveLesson(index === activeLesson ? null : index);
    setActiveAccordion(index === activeLesson ? null : index);
  };
  // Media end function
  // const handleMediaEnd = async () => {
  //   if (
  //     currentLessonIndex == null ||
  //     currentSubLessonIndex == null ||
  //     !courseData?.lessons?.[currentLessonIndex]?.sublessons?.[
  //       currentSubLessonIndex
  //     ]
  //   ) {
  //     const exerciseKey = `${currentLessonIndex}-${currentSubLessonIndex}`;
  //     setCompletedExercises((prev) => {
  //       const updatedSet = new Set(prev);
  //       updatedSet.add(exerciseKey);
  //       return updatedSet;
  //     });

  //     const currentVideo =
  //       courseData.lessons[currentLessonIndex].sublessons[
  //         currentSubLessonIndex
  //       ];
  //     // setWatchedVideoTitles((prevTitles) => {
  //     //   const updatedTitles = new Set(prevTitles);
  //     //   updatedTitles.add(currentVideo.title);
  //     //   return Array.from(updatedTitles);
  //     // });

  //     Progress_data(currentLessonIndex, currentSubLessonIndex);
  //   }
  // };

  const handleMediaEnd = async () => {
    if (
      currentLessonIndex != null &&
      currentSubLessonIndex != null &&
      courseData?.lessons?.[currentLessonIndex]?.sublessons?.[
        currentSubLessonIndex
      ]
    ) {
      const exerciseKey = `${currentLessonIndex}-${currentSubLessonIndex}`;
      setCompletedExercises((prev) => {
        const updatedSet = new Set(prev);
        updatedSet.add(exerciseKey);
        return updatedSet;
      });

      Progress_data(currentLessonIndex, currentSubLessonIndex);
    }
  };

  // progress bar
  const Progress_data = (lessonIndex, subLessonIndex) => {
    // Calculate total exercises and progress percentage
    const totalExercises = courseData.lessons?.reduce(
      (total, lesson) => total + lesson.sublessons?.length,
      0
    );

    const progress_percentage =
      totalExercises > 0 ? (completedExercises.size / totalExercises) * 100 : 0;

    const watchedPercentage = progress_percentage;
    return null;
  };

  const HandleLessonComplete = (lessonIndex, subLessonIndex) => {
    Progress_data(lessonIndex, subLessonIndex);
  };

  // progress bar
  // HandleLessonComplete(lessonIndex, subLessonIndex);

  // calculating the course progress
  const calculateProgress = () => {
    const totalExercises = courseData.lessons?.reduce(
      (total, lesson) => total + lesson.sublessons?.length,
      0
    );
    const progress =
      totalExercises > 0 ? (completedExercises.size / totalExercises) * 100 : 0;

    localStorage.setItem(`courseProgress-${course.id}`, progress);

    return progress;
  };

  const handleNext = async () => {
    if (courseData.lessons) {
      const currentLesson = courseData.lessons[currentLessonIndex];

      if (currentLessonIndex === 0 && currentSubLessonIndex === -1) {
        // If it's the first lesson and no video has been viewed yet, load the first video
        handleCurrentContent(
          currentLesson.sublessons[0],
          currentLessonIndex,
          0
        );
        // Update progress state
        setCurrentSubLessonIndex(0);
      } else if (currentSubLessonIndex < currentLesson.sublessons.length - 1) {
        // If there are more videos in the current lesson, load the next video
        handleCurrentContent(
          currentLesson.sublessons[currentSubLessonIndex + 1],
          currentLessonIndex,
          currentSubLessonIndex + 1
        );
        // Update progress state
        setCurrentSubLessonIndex(currentSubLessonIndex + 1);
      } else if (currentLessonIndex < courseData.lessons.length - 1) {
        // If this is the last video in the current lesson, move to the next lesson
        const nextLesson = courseData.lessons[currentLessonIndex + 1];
        handleCurrentContent(
          nextLesson.sublessons[0],
          currentLessonIndex + 1,
          0
        );
        // Update progress state
        setCurrentLessonIndex(currentLessonIndex + 1);
        setCurrentSubLessonIndex(0); // Reset to first video of the next lesson
      }
    }
  };

  const handlePrevious = () => {
    if (courseData.lessons) {
      if (currentSubLessonIndex > 0) {
        // Go to previous video in current lesson
        const newVideoIndex = currentSubLessonIndex - 1;
        const currentLesson = courseData.lessons[currentLessonIndex];
        handleCurrentContent(
          currentLesson.sublessons[newVideoIndex],
          currentLessonIndex,
          newVideoIndex
        );
        setCurrentSubLessonIndex(newVideoIndex);
      } else if (currentLessonIndex > 0) {
        // Go to last video of previous lesson
        const newLessonIndex = currentLessonIndex - 1;
        const prevLesson = courseData.lessons[newLessonIndex];
        const newVideoIndex = prevLesson.sublessons.length - 1;
        handleCurrentContent(
          prevLesson.sublessons[newVideoIndex],
          newLessonIndex,
          newVideoIndex
        );
        setCurrentLessonIndex(newLessonIndex);
        setCurrentSubLessonIndex(newVideoIndex);
      }
    }
  };

  const progress = calculateProgress();
  console.log([...completedExercises]);
  console.log("currentCourseData", currentCourseData);

  return (
    <div className="grid lg:grid-cols-4 auto-rows-1fr bg-gray-200 min-h-[calc(100vh-3.5rem)] relative gap-4 p-2 lg:p-4">
      {/* Right Side: Video/Content Area */}
      <div className="col-span-1 row-span-1 p-4 bg-white w-full shadow-sm rounded-lg flex flex-col gap-2">
        <button
          className="flex items-center gap-2 text-green-800 font-semibold text-sm"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-4 w-4" />
          Courses
        </button>

        <div className="h-30">
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

        <h2 className="text-sm lg:text-base font-semibold">{course.title}</h2>

        <div className="flex flex-col gap-2 items-end w-full">
          <p className="text-xs">
            {progress || Progress_data() || "0"}% Completed
          </p>
          <div className="h-3 bg-green-300 relative w-full rounded-full overflow-hidden">
            <div
              className={`absolute bg-green-700 left-0 h-full transition-transform duration-300 ease-in-out`}
              style={{ width: `${progress || Progress_data() || "0"}%` }}
            ></div>
          </div>
        </div>
      </div>
      <div className="col-span-1 lg:col-span-3 row-span-3">
        <div className="p-2 lg:p-4 bg-white shadow-sm rounded-lg flex flex-col gap-4 h-full">
          <div className="flex justify-between items-center">
            <h2 className="text-sm md:text-base lg:text-lg font-semibold">
              {/* {course.title} */}
              {/* {!currentCourseData.title
                ? "0"
                : `${currentCourseData.lessonNo}.${currentCourseData.excerciseNo}`} */}
              {/* {`${currentCourseData.lessonNo}.${currentCourseData.excerciseNo}`} */}
              {/* {!currentCourseData.title */}

              {/* {!currentCourseData.title
                ? courseData.lessons.title
                : currentCourseData.title} */}

              {currentCourseData.title || courseData.title || "Course"}
            </h2>
            <div className="flex items-center gap-2">
              <button
                className="px-2 py-1 hover:bg-green-500 hover:text-white rounded-full"
                onClick={() => handlePrevious()}
              >
                <ChevronLeft />
              </button>
              <button
                className="px-2 py-1 hover:bg-green-500 hover:text-white rounded-full"
                onClick={() => handleNext()}
              >
                <ChevronRight />
              </button>
            </div>
          </div>

          <div className="w-full aspect-video rounded-md overflow-auto video-box relative">
            {/* {renderContent()} */}
            {courseData?.lessons?.length > 0 &&
              renderContent(
                !currentCourseData.link
                  ? courseData.videoUrl
                  : currentCourseData.link,
                !currentCourseData.link ? "video" : currentCourseData.type
              )}
          </div>
        </div>
      </div>

      {/* Left Side: Sidebar */}
      {/* <div className="flex flex-col gap-4"> */}

      <div className="col-span-1 row-span-2 w-full bg-white flex-1 shadow-sm rounded-lg flex flex-col h-full">
        <h3 className="text-sm lg:text-base uppercase font-semibold p-4">
          Contents
        </h3>
        <div className="overflow-auto flex-1 max-h-[300px]">
          {/* <Accordion course={course} /> */}
          {course.lessons.map((lesson, lessonIndex) => {
            const lessonCompleted = lesson.sublessons?.every(
              (_, subLessonIndex) =>
                completedExercises.has(`${lessonIndex}-${subLessonIndex}`)
            );
            return (
              <div
                className="shadow-lg rounded mb-2 bg-white"
                key={lessonIndex}
              >
                <button
                  // onClick={onClick}
                  onClick={() => handleLessonClick(lessonIndex)}
                  className={`w-full flex justify-between items-center p-3 px-4 gap-2 text-left text-lg font-medium hover:bg-green-100 focus:outline-none ${
                    lessonCompleted
                      ? "bg-green-200 text-green-800 border border-green-300"
                      : "bg-white text-black"
                  } `}
                >
                  <span
                    className={`flex items-center gap-2 text-sm font-semibold leading-6 ${
                      activeAccordion === lessonIndex
                        ? "text-green-800"
                        : "text-black"
                    } ${lessonCompleted ? "text-green-800" : ""}`}
                  >
                    {lessonCompleted ? (
                      <BookCheck className="h-5 w-5" />
                    ) : (
                      <BookOpen className="h-5 w-5" />
                    )}
                    {lesson.title}
                  </span>
                  <svg
                    className={`w-4 h-4 transition-transform duration-300 ${
                      activeAccordion === lessonIndex ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                <div
                  className={`overflow-hidden transition-max-height duration-300 text-sm font-medium leading-6 tracking-wider text-gray-700 ${
                    activeAccordion === lessonIndex ? "max-h-full" : "max-h-0"
                  }`}
                >
                  {lesson.sublessons.map((subLesson, subLessonIndex) => (
                    <button
                      className={`p-3 px-4 flex w-full text-xs font-semibold items-center gap-2 hover:bg-green-200 ${
                        completedExercises.has(
                          `${lessonIndex}-${subLessonIndex}`
                        )
                          ? "bg-green-100 text-green-800"
                          : ""
                      }`}
                      onClick={() =>
                        handleCurrentContent(
                          subLesson,
                          lessonIndex,
                          subLessonIndex
                        )
                      }
                      key={subLessonIndex}
                    >
                      {completedExercises.has(
                        `${lessonIndex}-${subLessonIndex}`
                      ) ? (
                        <Check />
                      ) : (
                        <PlayCircle />
                      )}
                      {subLesson.title}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* </div> */}
    </div>
  );
}

export default CourseContent;
