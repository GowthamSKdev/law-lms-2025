import React, { useEffect, useState } from "react";
// import { addnewTest, getLessonTest, updateTest } from "../../../api/baseApi";
// import { convertToUTC } from "../../../hooks/newCourseFunctions";

const AddTest = ({ testId, closeTest, addTest }) => {
  const initialState = {
    question: "",
    correctAnswer: null,
    options: [],
    questionNumber: null,
    updateIndex: null,
  };

  const [currentTest, setCurrentTest] = useState({
    title: "testing Exam",
    timeLimit: 11,
    questions: [],
  });

  const [currentQuestion, setCurrentQuestion] = useState(initialState);
  const [dropDown, setDropDown] = useState(false);
  const [duration, setDuration] = useState({ hours: 0, minutes: 0 });

  useEffect(() => {
    // const getTest = async () => {
    //   if (testId?.length > 1) {
    //     const { data } = await getLessonTest(testId);
    //     setCurrentTest(data?.test);
    //     const time = convertToUTC(data?.test?.timeLimit);
    //     setDuration(time);
    //   }
    // };
    // getTest();
    if (testId) {
      setCurrentTest(testId);
    }
  }, [testId]);

  const handleChoiceSelect = (index, value) => {
    setDropDown(false);
    setCurrentQuestion({
      ...currentQuestion,
      correctAnswer: currentQuestion?.options[index],
    });
  };

  const handleChoiceInput = (index, value) => {
    const newChoices = [...currentQuestion.options];
    newChoices[index] = value;
    setCurrentQuestion({ ...currentQuestion, options: newChoices });
  };

  const handleNext = () => {
    const updatedtest = [...currentTest.questions];
    if (currentQuestion.updateIndex === null) {
      updatedtest?.push(currentQuestion);
      setCurrentTest({ ...currentTest, questions: updatedtest });
      setCurrentQuestion(initialState);
    } else if (
      currentQuestion.updateIndex + 1 ===
      currentTest?.questions?.length
    ) {
      updatedtest[currentQuestion.updateIndex] = currentQuestion;
      setCurrentTest({ ...currentTest, questions: updatedtest });
      setCurrentQuestion(initialState);
    } else {
      updatedtest[currentQuestion.updateIndex] = currentQuestion;
      setCurrentTest({ ...currentTest, questions: updatedtest });
      setCurrentQuestion(
        currentTest?.questions?.[currentQuestion.updateIndex + 1]
      );
    }
  };

  const checkquestionMatch = (index) => {
    if (
      currentQuestion?.updateIndex === index ||
      currentTest?.questions?.indexOf(currentQuestion) === index
    )
      return "#8949ff";
    return "transparent";
  };

  const questionValidation = () => {
    if (
      currentQuestion?.question?.length > 5 &&
      currentQuestion?.correctAnswer &&
      currentQuestion?.options?.length === 4
    )
      return true;
    return false;
  };

  const handleAddTest = async () => {
    if (testId?.length > 5) {
      try {
        // const { data } = await updateTest(currentTest);
        // addTest(data?.test?._id);
        addTest(currentTest);
        closeTest();
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        // const { data } = await addnewTest(currentTest);
        // addTest(data?.test?._id);
        addTest(currentTest);
        closeTest();
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    if (duration?.hours !== 0 || duration?.minutes !== 0) {
      const totalSeconds = duration?.hours * 60 * 60 + duration?.minutes * 60;
      if (totalSeconds !== undefined) {
        setCurrentTest((currentTest) => {
          return { ...currentTest, timeLimit: totalSeconds };
        });
      }
    }
  }, [duration]);

  console.log(currentTest);

  return (
    // <div className="add-test-cnt">
    //   <div className="test-top-header">
    //     <div>
    //       {/* <p>Test for this lessons</p> */}
    //       <div className="lesson-name-cnt">
    //         <p>Lesson Title</p>
    //         <input
    //           type="text"
    //           name=""
    //           value={currentTest?.title}
    //           className="lesson-title-input test-title-input"
    //           onChange={(e) =>
    //             setCurrentTest({
    //               ...currentTest,
    //               title: e.target.value,
    //             })
    //           }
    //         />
    //       </div>
    //     </div>
    //     <div className="ela-description-cnt">
    //       <p>Set Duration</p>
    //       <div className="ela-timer-input-cnt">
    //         <div className="ela-timer-cover">
    //           <input
    //             type="number"
    //             name=""
    //             value={duration?.hours}
    //             onChange={(e) =>
    //               setDuration({ ...duration, hours: e.target.value })
    //             }
    //             className="ela-timer-input description-input "
    //           />
    //           <p>Hours</p>
    //         </div>
    //         <div className="ela-timer-cover">
    //           <input
    //             type="number"
    //             name=""
    //             value={duration?.minutes}
    //             onChange={(e) =>
    //               setDuration({ ...duration, minutes: e.target.value })
    //             }
    //             className="ela-timer-input description-input "
    //           />
    //           <p>Minutes</p>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    //   <div className="questions-block-cnt">
    //     {currentTest?.questions?.map((test, index) => (
    //       <div
    //         className="question-block"
    //         style={{ background: checkquestionMatch(index) }}
    //         key={index}
    //         onClick={() => setCurrentQuestion({ ...test, updateIndex: index })}
    //       >
    //         <p
    //           key={index}
    //           className="question-number"
    //           style={{
    //             color: checkquestionMatch(index) === "transparent" && "#8949ff",
    //           }}
    //         >
    //           {index + 1}
    //         </p>
    //       </div>
    //     ))}
    //     <div
    //       className="question-block"
    //       style={{
    //         background: checkquestionMatch(null),
    //       }}
    //       onClick={() => setCurrentQuestion(initialState)}
    //     >
    //       <p
    //         className="question-number"
    //         style={{
    //           color: checkquestionMatch(null) === "transparent" && "#8949ff",
    //         }}
    //       >
    //         {currentTest?.questions?.length + 1}
    //       </p>
    //     </div>
    //   </div>
    //   <div className="question-inputs-cnt">
    //     <div className="question-input-cnt">
    //       <p>Question</p>
    //       <textarea
    //         className="question-input"
    //         value={currentQuestion?.question}
    //         onChange={(e) =>
    //           setCurrentQuestion({
    //             ...currentQuestion,
    //             question: e.target.value,
    //           })
    //         }
    //       />
    //     </div>
    //     <div className="choice-cnt">
    //       <div className="choice-header">
    //         <p>Choices</p>
    //         <div className="select-answer-cnt">
    //           <p>Select Answer</p>
    //           <div className="selected-choice-display">
    //             <p onClick={() => setDropDown(true)}>
    //               {currentQuestion?.correctAnswer
    //                 ? currentQuestion?.correctAnswer
    //                 : "Not selected"}
    //             </p>
    //             {dropDown && (
    //               <div className="drop-down-cnt">
    //                 <div
    //                   className="drop-down-choice"
    //                   onClick={() => handleChoiceSelect(0, "Choice one")}
    //                 >
    //                   <p>Choice one</p>
    //                 </div>
    //                 <div
    //                   className="drop-down-choice"
    //                   onClick={() => handleChoiceSelect(1, "Choice two")}
    //                 >
    //                   <p>Choice two</p>
    //                 </div>
    //                 <div
    //                   className="drop-down-choice"
    //                   onClick={() => handleChoiceSelect(2, "Choice three")}
    //                 >
    //                   <p>Choice three</p>
    //                 </div>
    //                 <div
    //                   className="drop-down-choice"
    //                   onClick={() => handleChoiceSelect(3, "Choice four")}
    //                 >
    //                   <p>Choice four</p>
    //                 </div>
    //               </div>
    //             )}
    //           </div>
    //         </div>
    //       </div>
    //       <div className="choice">
    //         <p>Choice one</p>
    //         <input
    //           type="text"
    //           name=""
    //           placeholder="Enter choice one"
    //           value={
    //             currentQuestion?.options[0] ? currentQuestion?.options[0] : ""
    //           }
    //           onChange={(e) => handleChoiceInput(0, e.target.value)}
    //         />
    //       </div>
    //       <div className="choice">
    //         <p>Choice two</p>
    //         <input
    //           type="text"
    //           name=""
    //           placeholder="Enter choice two"
    //           value={
    //             currentQuestion?.options[1] ? currentQuestion?.options[1] : ""
    //           }
    //           onChange={(e) => handleChoiceInput(1, e.target.value)}
    //         />
    //       </div>
    //       <div className="choice">
    //         <p>Choice three</p>
    //         <input
    //           type="text"
    //           name=""
    //           placeholder="Enter choice three"
    //           value={
    //             currentQuestion?.options[2] ? currentQuestion?.options[2] : ""
    //           }
    //           onChange={(e) => handleChoiceInput(2, e.target.value)}
    //         />
    //       </div>
    //       <div className="choice">
    //         <p>Choice four</p>
    //         <input
    //           type="text"
    //           name=""
    //           placeholder="Enter choice four"
    //           value={
    //             currentQuestion?.options[3] ? currentQuestion?.options[3] : ""
    //           }
    //           onChange={(e) => handleChoiceInput(3, e.target.value)}
    //         />
    //       </div>
    //     </div>
    //   </div>
    //   <div className="action-btns-cnt">
    //     <div
    //       className=" course-delete-btn cancel-test-btn"
    //       onClick={() => closeTest()}
    //     >
    //       Cancel
    //     </div>
    //     <div
    //       className=" course-delete-btn save-next "
    //       onClick={() => handleNext()}
    //       style={{
    //         background: !questionValidation() && "gray",
    //         pointerEvents: !questionValidation() && "none",
    //       }}
    //     >
    //       Save and Next
    //     </div>
    //     <div className="add-new-lesson-btn" onClick={() => handleAddTest()}>
    //       Add to Lesson
    //     </div>
    //   </div>
    // </div>
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 p-6 bg-white rounded shadow-md">
      <div className="flex flex-col md:flex-row justify-between mb-6">
        <div>
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-700">Lesson Title</p>
            <input
              type="text"
              value={currentTest?.title}
              className="mt-1 w-full md:w-96 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              onChange={(e) =>
                setCurrentTest({
                  ...currentTest,
                  title: e.target.value,
                })
              }
            />
          </div>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">Set Duration</p>
          <div className="flex space-x-4">
            <div className="flex items-center space-x-2">
              <input
                type="number"
                value={duration?.hours}
                onChange={(e) =>
                  setDuration({ ...duration, hours: e.target.value })
                }
                className="w-20 border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <p>Hours</p>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                value={duration?.minutes}
                onChange={(e) =>
                  setDuration({ ...duration, minutes: e.target.value })
                }
                className="w-20 border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <p>Minutes</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {currentTest?.questions?.map((test, index) => (
          <div
            key={index}
            className={`w-10 h-10 flex items-center justify-center border rounded cursor-pointer ${
              checkquestionMatch(index) !== "transparent"
                ? "bg-purple-200"
                : "bg-white"
            }`}
            onClick={() => setCurrentQuestion({ ...test, updateIndex: index })}
          >
            <p
              className={`font-medium ${
                checkquestionMatch(index) === "transparent"
                  ? "text-purple-600"
                  : "text-gray-800"
              }`}
            >
              {index + 1}
            </p>
          </div>
        ))}
        <div
          className={`w-10 h-10 flex items-center justify-center border rounded cursor-pointer ${
            checkquestionMatch(null) !== "transparent"
              ? "bg-purple-200"
              : "bg-white"
          }`}
          onClick={() => setCurrentQuestion(initialState)}
        >
          <p
            className={`font-medium ${
              checkquestionMatch(null) === "transparent"
                ? "text-purple-600"
                : "text-gray-800"
            }`}
          >
            {currentTest?.questions?.length + 1}
          </p>
        </div>
      </div>

      <div className="mb-6">
        <p className="text-sm font-medium text-gray-700 mb-1">Question</p>
        <textarea
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          value={currentQuestion?.question}
          onChange={(e) =>
            setCurrentQuestion({
              ...currentQuestion,
              question: e.target.value,
            })
          }
        />
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <p className="text-sm font-medium text-gray-700">Choices</p>
          <div className="relative">
            <p className="text-sm font-medium text-gray-700 mb-1">
              Select Answer
            </p>
            <div
              className="border border-gray-300 px-3 py-2 rounded cursor-pointer bg-white"
              onClick={() => setDropDown(true)}
            >
              {currentQuestion?.correctAnswer
                ? currentQuestion?.correctAnswer
                : "Not selected"}
            </div>
            {dropDown && (
              <div className="absolute z-10 mt-1 w-48 bg-white border border-gray-200 rounded shadow-lg">
                {[
                  "Choice one",
                  "Choice two",
                  "Choice three",
                  "Choice four",
                ].map((label, i) => (
                  <div
                    key={i}
                    className="px-4 py-2 hover:bg-purple-100 cursor-pointer"
                    onClick={() => handleChoiceSelect(i, label)}
                  >
                    {label}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {[0, 1, 2, 3].map((index) => (
          <div className="mb-3" key={index}>
            <p className="text-sm text-gray-600 mb-1">Choice {index + 1}</p>
            <input
              type="text"
              placeholder={`Enter choice ${index + 1}`}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={currentQuestion?.options[index] || ""}
              onChange={(e) => handleChoiceInput(index, e.target.value)}
            />
          </div>
        ))}
      </div>

      <div className="flex justify-end gap-4 mt-4">
        <button
          className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-5 py-2 rounded"
          onClick={() => closeTest()}
        >
          Cancel
        </button>
        <button
          className={`text-white px-5 py-2 rounded ${
            !questionValidation()
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-purple-600 hover:bg-purple-700"
          }`}
          onClick={() => handleNext()}
          disabled={!questionValidation()}
        >
          Save and Next
        </button>
        <button
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded"
          onClick={() => handleAddTest()}
        >
          Add to Lesson
        </button>
      </div>
    </div>
  );
};

export default AddTest;
