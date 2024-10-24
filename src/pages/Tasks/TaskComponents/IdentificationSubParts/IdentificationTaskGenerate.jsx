import { useState } from "react";
import IdentificationLevelOneService from "../../../../services/IdentificationService/Level1.service.jsx";
import IdentificationLevelTwoService from "../../../../services/IdentificationService/Level2.service.jsx";
import PropTypes from "prop-types";

IdentificationTaskGenerate.propTypes = {
  patients: PropTypes.array.isRequired,
};

function IdentificationTaskGenerate({ patients }) {
  console.log("Patients:", patients);
  const [instructions, setInstructions] = useState("");
  const [level, setLevel] = useState("1");
  const [difficulty, setDifficulty] = useState("Easy");
  const [questionCount, setQuestionCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [generatedTasks, setGeneratedTasks] = useState([]);
  const [assignedTasks, setAssignedTasks] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);

  const handleInstructionsChange = (event) => setInstructions(event.target.value);

  const handleLevelChange = (event) => {
    const newLevel = event.target.value;
    setLevel(newLevel);
    if (newLevel === "3") {
      setDifficulty(""); // Clear difficulty if Level 3 is selected
    } else {
      setDifficulty("Easy"); // Default difficulty for Level 1 or 2
    }
  };

  const handleDifficultyChange = (event) => setDifficulty(event.target.value);

  const handleQuestionCountChange = (event) => {
    const value = parseInt(event.target.value, 10);
    if (value >= 0) setQuestionCount(value);
  };

  // Generate and save tasks using the appropriate endpoint
  const generateTask = async (event) => {
    event.preventDefault();
    setLoading(true);

    const taskData = {
      patientID: selectedPatient,
      instructions,
      level,
      difficulty: level === "3" ? null : difficulty,
      questionCount,
    };

    try {
      let response;
      if (level === "1") {
        response = await IdentificationLevelOneService.generateIdentificationLevel1(taskData);
      } else if (level === "2") {
        response = await IdentificationLevelTwoService.generateIdentificationLevel2(taskData);
      }

      const newTasks = response.tasks;

      // Log the generated tasks to the console
      console.log("Generated Tasks JSON:", JSON.stringify(newTasks, null, 2));

      // Update state to display generated tasks
      setGeneratedTasks(newTasks);
      setMessage("Task successfully generated!");

      // Clear form fields after generation
      setInstructions("");
      setQuestionCount(0);
    } catch (error) {
      setMessage("Failed to generate task!");
      console.error("Error while generating task:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle task assignment (mark all tasks as assigned)
  const handleAssignAllTasks = () => {
    const allTaskIds = generatedTasks.map(task => task.id);
    setAssignedTasks(allTaskIds); // Mark all tasks as assigned
    alert("All tasks have been assigned successfully!");
  };

  return (
    <div className="container mx-auto p-4 border border-black rounded-md">
      <h1 className="text-2xl font-bold mb-4">Identification Task Generator</h1>
      {message && (
        <div className={`mb-4 ${message.includes("Failed") ? "text-red-500" : "text-green-500"}`}>
          {message}
        </div>
      )}
      <form onSubmit={generateTask}>
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Assign Patient</h3>
          <select
            value={selectedPatient}
            onChange={(e) => setSelectedPatient(e.target.value)}
            className="block w-full px-3 py-2 mt-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Select a patient</option>
            {patients.length > 0 &&
              patients.map((patient) => (
                <option key={patient._id} value={patient._id}>
                  {patient.firstName} {patient.lastName}
                </option>
              ))}
          </select>
          <br />
          <label
            htmlFor="instructions"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Instructions:
            <br />

            <small className="text-gray-500 text-sm">
              (Feedback about the child)
            </small>
          </label>
          <textarea
            id="instructions"
            className="shadow appearance-none border border-gray-300 focus:border-black rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={instructions}
            onChange={handleInstructionsChange}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="level"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Level:
          </label>
          <select
            id="level"
            value={level}
            onChange={handleLevelChange}
            className="shadow appearance-none border border-gray-300 focus:border-black rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="1">Level 1</option>
            <option value="2">Level 2</option>
            <option value="3">Level 3</option>
          </select>
        </div>

        {(level === "1" || level === "2") && (
          <div className="mb-4">
            <label
              htmlFor="difficulty"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Difficulty Level:
            </label>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="easy"
                  name="difficulty"
                  value="Easy"
                  checked={difficulty === "Easy"}
                  onChange={handleDifficultyChange}
                  className="mr-2"
                />
                <label
                  htmlFor="easy"
                  className="text-gray-700 text-sm font-normal"
                >
                  Easy
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="intermediate"
                  name="difficulty"
                  value="Intermediate"
                  checked={difficulty === "Intermediate"}
                  onChange={handleDifficultyChange}
                  className="mr-2"
                />
                <label
                  htmlFor="intermediate"
                  className="text-gray-700 text-sm font-normal"
                >
                  Intermediate
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="difficult"
                  name="difficulty"
                  value="Difficult"
                  checked={difficulty === "Difficult"}
                  onChange={handleDifficultyChange}
                  className="mr-2"
                />
                <label
                  htmlFor="difficult"
                  className="text-gray-700 text-sm font-normal"
                >
                  Difficult
                </label>
              </div>
            </div>
          </div>
        )}

        <div className="mb-4">
          <label
            htmlFor="questionCount"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Question Count:
          </label>
          <input
            type="number"
            id="questionCount"
            className="shadow appearance-none border border-gray-300 focus:border-black rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={questionCount}
            onChange={handleQuestionCountChange}
            min="0"
          />
        </div>

        <button
          type="submit"
          className="bg-audi-purple hover:bg-purple-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          disabled={loading} // Disable button when loading
        >
          {loading ? "Generating..." : "Generate Identification Task"}
        </button>
      </form>

      {/* Display generated tasks below the form */}
      {generatedTasks?.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">
            Generated Tasks: {generatedTasks?.length}
          </h2>

          <div>
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
              {generatedTasks?.map((task, index) => (
                <div key={index} className="border border-gray-300 p-4 rounded flex flex-col">
                  <h3 className="font-bold mb-2">Task {index + 1}</h3>
                  <p><strong>Level:</strong> {task.level}</p>
                  <p><strong>Difficulty:</strong> {task.difficulty || "N/A"}</p>

                  {/* Conditionally render sound if available */}
                  {task.soundUrl ? (
                    <>
                      <p><strong>Sound:</strong></p>
                      <audio controls>
                        <source src={task.soundUrl} type="audio/mpeg" />
                        Your browser does not support the audio element.
                      </audio>
                    </>
                  ) : (
                    <p>No sound available</p>
                  )}

                  {/* Conditionally render images or labels based on level */}
                  {level === "1" && task.answers?.length > 0 ? (
                    <div className="w-full h-full flex flex-wrap">
                      {task.answers.map((answer, imgIndex) => (
                        <div
                          key={imgIndex}
                          className="border rounded p-2 m-2 flex flex-col items-center w-32 h-32"
                        >
                          <img
                            src={answer.ImgUrl}
                            alt={`Task ${index + 1} Image ${imgIndex + 1}`}
                            className="w-full h-full object-contain"
                            onError={() => console.error(`Failed to load image: ${answer.ImgUrl}`)}
                          />
                        </div>
                      ))}
                    </div>
                  ) : level === "2" && task.answers?.length > 0 ? (
                    <div className="w-full h-full flex flex-wrap">
                      {task.answers.map((answer, labelIndex) => (
                        <div
                          key={labelIndex}
                          className="border rounded p-2 m-2 flex flex-col items-center w-32 h-32 bg-gray-200"
                        >
                          <p className="text-sm mt-2">{answer.Label.charAt(0).toUpperCase() + answer.Label.slice(1)}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p>No answers available</p>
                  )}

                </div>
              ))}
            </div>
          </div>
          <br />
          {/* Common Assign All Tasks Button */}
          <button
            onClick={handleAssignAllTasks}
            className={`mb-4 bg-audi-purple hover:bg-purple-900 text-white font-bold py-2 px-4 rounded ${assignedTasks.length === generatedTasks.length ? "bg-green-500" : ""
              }`}
          >
            {assignedTasks.length === generatedTasks.length ? "All Tasks Assigned" : "Assign All Tasks"}
          </button>
        </div>
      )}
    </div>
  );
}

export default IdentificationTaskGenerate;
