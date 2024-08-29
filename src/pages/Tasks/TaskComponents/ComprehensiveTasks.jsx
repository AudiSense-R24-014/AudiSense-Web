import React, { useState } from "react";
import ComprehensionTaskService from "../../../services/ComprehensionTask.service";

function ComprehensiveTasks() {
  const [feedback, setFeedback] = useState("");
  const [length, setLength] = useState("medium");
  const [questionCount, setQuestionCount] = useState(5);

  const [generatedComprehension, setGeneratedComprehension] = useState({});
  const [loading, setLoading] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);

  const handlePassageChange = (event) => {
    setGeneratedComprehension((prevState) => ({
      ...prevState,
      passage: event.target.value,
    }));
  };

  const handleQuestionChange = (event, questionIndex) => {
    const { name, value } = event.target;
    setGeneratedComprehension((prevState) => {
      const updatedQuestions = [...prevState.questions];
      console.log("updatedQuestions", updatedQuestions);
      updatedQuestions[questionIndex] = {
        ...updatedQuestions[questionIndex],
        [name]: value, // Update the specific field of the question being modified
      };
      return {
        ...prevState,
        questions: updatedQuestions,
      };
    });
  };

  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value);
  };

  const handleLengthChange = (event) => {
    setLength(event.target.value);
  };

  const handleQuestionCount = (event) => {
    setQuestionCount(event.target.value);
  };

  const handleGeneration = async (event) => {
    event.preventDefault();
    setLoading(true); // Set loading state to true
    ComprehensionTaskService.generate(feedback, length, questionCount)
      .then((data) => {
        setGeneratedComprehension(data);
      })
      .catch((err) => {
        console.error("Error generating comprehensive task:", err);
      })
      .finally(() => {
        setLoading(false); // Set loading state back to false
        setIsGenerated(true); // Set isGenerated state to true
      });
  };

  const saveComprehensiveTask = async (event) => {
    event.preventDefault();
    console.log(generatedComprehension);
    ComprehensionTaskService.persist(generatedComprehension)
      .then((data) => {
        console.log("Comprehensive Task saved successfully:", data);  
      })
      .catch((err) => {
        console.error("Error saving comprehensive task:", err);
      });
  };

  const radioOptions = [
    { value: "short", label: "Short" },
    { value: "medium", label: "Medium" },
    { value: "long", label: "Long" },
  ];

  return (
    <div className="flex-1">
      <div className="border border-gray-300 rounded-md font-nunito p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-nunito font-bold">
            Comprehensive Task Generator
          </h1>
        </div>
        <div className="mb-4 flex items-center">
          <div className="flex-grow w-72 mr-4">
            <p className="text-lg font-nunito font-bold">Instructions:</p>
            <p className="text-s font-nunito font-light">
              (Feedback about the child)
            </p>
          </div>
          <input
            type="text"
            value={feedback}
            onChange={handleFeedbackChange}
            placeholder="Enter Feedback for the Comprehensive Task Generator"
            className="border font-nunito border-gray-400 rounded-md p-4 w-full h-12 mr-4"
          />
        </div>
        <div className="flex items-center mb-4">
          <div className="w-72 mr-4">
            <p className="text-lg font-nunito font-bold">Length:</p>
          </div>
          <div className="flex items-center">
            {radioOptions.map((option) => (
              <React.Fragment key={option.value}>
                <input
                  type="radio"
                  id={option.value}
                  name="length"
                  value={option.value}
                  checked={length === option.value}
                  onChange={handleLengthChange}
                  className="mr-2 "
                />
                <label htmlFor={option.value} className="mr-4 font-nunito">
                  {option.label}
                </label>
              </React.Fragment>
            ))}
          </div>
        </div>
        <div className="mb-4 flex items-center">
          <div className="flex w-64">
            <p className="text-lg font-nunito font-bold">Question Count:</p>
          </div>
          <input
            type="number"
            value={questionCount}
            onChange={handleQuestionCount}
            placeholder="Enter Feedback for the Comprehensive Task Generator"
            className="border font-nunito border-gray-400 rounded-md p-4 h-12 mr-4"
          />
        </div>
        <div>
          <button
            onClick={handleGeneration}
            disabled={loading} // Disable the button when loading is true
            className={`bg-purple-400 font-nunito text-white py-2 px-4 rounded-md hover:bg-purple-600 transition-colors duration-300 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Generating..." : "Generate Comprehensive Task"}
          </button>
        </div>
      </div>
      {generatedComprehension.passage && (
        <div className="border border-gray-300 rounded-md font-nunito p-4">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-nunito font-bold">Generated Task</h1>
            <button
            onClick={saveComprehensiveTask}
            disabled={!isGenerated} // Disable the button when isGenerated is false
            className={`bg-purple-400 font-nunito text-white py-2 px-4 rounded-md hover:bg-purple-600 transition-colors duration-300 ${
              !isGenerated ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Save & Assign
          </button>
          </div>
          <div className="mb-4 flex items-center">
            <div className="flex-grow w-72 mr-4">
              <p className="text-lg font-nunito font-bold">Passage:</p>
            </div>
            <textarea
              type="text"
              value={generatedComprehension.passage}
              onChange={handlePassageChange}
              placeholder="Generated Passage"
              className="border font-nunito border-gray-400 rounded-md p-4 w-full h-32 mr-4"
            />
          </div>
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-xl font-nunito font-bold">Questions</h1>
          </div>
          {generatedComprehension.questions.map((question, index) => (
            <div className="mb-4 flex items-center" key={index}>
              <div className="border rounded-md p-4 w-full">
                <div className="flex items-center">
                  <div className="flex-grow w-72 mr-4">
                    <p className="text-lg font-nunito font-bold">
                      Question {index + 1}:
                    </p>
                  </div>
                  <input
                    type="text"
                    value={question.question}
                    onChange={(event) => handleQuestionChange(event, index)}
                    name="question"
                    placeholder="Question"
                    className="border font-nunito border-gray-400 rounded-md p-2 w-full mr-4 mb-1"
                  />
                </div>
                <div className="flex items-center">
                  <div className="flex-grow w-72 mr-4">
                    <p className="text-lg font-nunito font-bold">Answer (A):</p>
                  </div>
                  <input
                    type="text"
                    value={question.answerA}
                    onChange={(event) => handleQuestionChange(event, index)}
                    name="answerA"
                    placeholder="Answer"
                    className={`border font-nunito border-gray-400 rounded-md p-2 w-full mr-4 mb-1 ${
                      question.correctAnswer === "A"
                        ? "border-green-500"
                        : "border-red-500"
                    }`}
                  />
                </div>
                <div className="flex items-center">
                  <div className="flex-grow w-72 mr-4">
                    <p className="text-lg font-nunito font-bold">Answer (B):</p>
                  </div>
                  <input
                    type="text"
                    value={question.answerB}
                    onChange={(event) => handleQuestionChange(event, index)}
                    name="answerB"
                    placeholder="Answer"
                    className={`border font-nunito border-gray-400 rounded-md p-2 w-full mr-4 mb-1 ${
                      question.correctAnswer === "B"
                        ? "border-green-500"
                        : "border-red-500"
                    }`}
                  />
                </div>
                <div className="flex items-center">
                  <div className="flex-grow w-72 mr-4">
                    <p className="text-lg font-nunito font-bold">Answer (C):</p>
                  </div>
                  <input
                    type="text"
                    value={question.answerC}
                    onChange={(event) => handleQuestionChange(event, index)}
                    name="answerC"
                    placeholder="Answer"
                    className={`border font-nunito border-gray-400 rounded-md p-2 w-full mr-4 mb-1 ${
                      question.correctAnswer === "C"
                        ? "border-green-500"
                        : "border-red-500"
                    }`}
                  />
                </div>
                <div className="flex items-center">
                  <div className="flex-grow w-72 mr-4">
                    <p className="text-lg font-nunito font-bold">Answer (D):</p>
                  </div>
                  <input
                    type="text"
                    value={question.answerD}
                    onChange={(event) => handleQuestionChange(event, index)}
                    name="answerD"
                    placeholder="Answer"
                    className={`border font-nunito border-gray-400 rounded-md p-2 w-full mr-4 mb-1 ${
                      question.correctAnswer === "D"
                        ? "border-green-500"
                        : "border-red-500"
                    }`}
                  />
                </div>
                <div className="flex items-center">
                  <div className="flex-grow w-72 mr-4">
                    <p className="text-lg font-nunito font-bold">
                      Correct Answer:
                    </p>
                  </div>
                  <select
                    value={question.correctAnswer}
                    onChange={(event) => handleQuestionChange(event, index)}
                    name="correctAnswer"
                    className={`border font-nunito border-gray-400 rounded-md p-2 w-full mr-4`}
                  >
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ComprehensiveTasks;
