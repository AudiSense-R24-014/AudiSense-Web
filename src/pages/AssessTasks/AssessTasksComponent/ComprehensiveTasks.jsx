import React, { useEffect, useState } from "react";
import ComprehensiveTasksService from "../../../services/ComprehensionTask.service.jsx";
import AssessComprehensiveActivityModal from "../../../components/modals/AssessComprehensiveActivityModal.jsx";
import ViewComprehensiveActivityModal from "../../../components/modals/ViewComprehensiveActivityModal.jsx"; // New modal for viewing tasks

const ComprehensiveTasks = () => {
  const [activities, setActivities] = useState([]);
  const [assessActivity, setAssessActivity] = useState(null);
  const [assessModal, setAssessModal] = useState(false);
  const [viewActivity, setViewActivity] = useState(null);
  const [viewModal, setViewModal] = useState(false); // New state for view modal

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
        setAssessModal(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleView = (task) => {
    ComprehensiveTasksService.getActivityById(task._id)
      .then((data) => {
        setViewActivity(data);
        setViewModal(true); // Open the view modal
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="flex-1">
      <div className="border border-gray-300 rounded-md font-nunito">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 sticky top-0">
              <tr className="text-xs text-gray-700 text-center font-bold uppercase tracking-wider">
                <th className="px-6 py-3">Level</th>
                <th className="px-6 py-3">Total Questions</th>
                <th className="px-6 py-3">Correct Responses</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 text-center">
              {activities.slice().reverse().map((task) => (
                <tr key={task._id} className="text-sm text-gray-600">
                  <td className="px-6 py-4 whitespace-nowrap">{task.level}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {task.totalQuestionCount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {task.correctResponsesCount || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{task.status}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {task.status === "Need Assessment" ? (
                      <button
                        onClick={() => handleAssess(task)}
                        className="text-blue-600 hover:font-bold"
                      >
                        Assess
                      </button>
                    ) : task.status === "Completed" ? (
                      <button
                        onClick={() => handleView(task)}
                        className="text-green-600 hover:font-bold"
                      >
                        View
                      </button>
                    ) : (
                      "N/A"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {assessModal && (
        <AssessComprehensiveActivityModal
          assessActivity={assessActivity}
          visible={assessModal}
          onClose={() => setAssessModal(false)}
        />
      )}
      {viewModal && (
        <ViewComprehensiveActivityModal
          activity={viewActivity}
          visible={viewModal}
          onClose={() => setViewModal(false)}
        />
      )}
    </div>
  );
};

export default ComprehensiveTasks;
