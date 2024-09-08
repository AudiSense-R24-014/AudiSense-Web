import React, { useEffect, useState } from "react";
import ComprehensiveTasksService from "../../../services/ComprehensionTask.service.jsx";

const ComprehensiveTasks = () => {
  const [activities, setActivities] = useState([]);
  const [assessActivity, setAssessActivity] = useState(null);
  const [scores, setScores] = useState({});

  useEffect(() => {
    ComprehensiveTasksService.getAllActivity()
      .then((data) => {
        setActivities(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleAssess = (task) => {
    ComprehensiveTasksService.getActivityById(task._id)
      .then((data) => {
        setAssessActivity(data);
        setScores({}); // Reset scores for new assessment
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleScoreChange = (questionId, value) => {
    setScores((prevScores) => ({
      ...prevScores,
      [questionId]: value,
    }));
  };

  return (
    <div className="flex-1">
      <div className="border border-gray-300 rounded-md font-nunito">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 sticky top-0">
              <tr className="text-xs text-gray-700 text-left font-bold uppercase tracking-wider">
                <th className="px-6 py-3">Level</th>
                <th className="px-6 py-3">Total Questions</th>
                <th className="px-6 py-3">Correct Responses</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {activities.map((task) => (
                <tr key={task._id} className="text-sm text-gray-600">
                  <td className="px-6 py-4 whitespace-nowrap">{task.level}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {task.totalQuestionCount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {task.correctResponsesCount || 0}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{task.status}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {task.status === "Need Assessment" && (
                      <button
                        onClick={() => handleAssess(task)}
                        className="text-blue-600 hover:font-bold"
                      >
                        Assess
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Assessment Section */}
      {assessActivity && (
        <div className="mt-6">
          <h3 className="text-lg font-bold mb-2">Task Assessment</h3>
          <p className="mb-4">{assessActivity.comprehensionTask.passage}</p>

          <div className="space-y-4">
            {assessActivity.comprehensionTask.questions.map((question, index) => (
              <div key={question._id} className="p-4 border rounded-lg shadow-sm">
                <p className="text-sm font-semibold">
                  Question {index + 1}: {question.question}
                </p>
                <p className="text-sm">Correct Answer: {question.correctAnswer}</p>

                {/* Audio Playback */}
                {assessActivity.providedAnswers[index] && (
                  <audio controls className="mt-2">
                    <source src={assessActivity.providedAnswers[index]} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                )}

                {/* Score Input */}
                <div className="mt-2">
                  <label htmlFor={`score-${question._id}`} className="block text-sm font-medium">
                    Score:
                  </label>
                  <input
                    type="number"
                    id={`score-${question._id}`}
                    name={`score-${question._id}`}
                    value={scores[question._id] || ""}
                    onChange={(e) => handleScoreChange(question._id, e.target.value)}
                    className="mt-1 block w-20 p-2 border border-gray-300 rounded-md"
                    min="1"
                    max="10"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ComprehensiveTasks;
