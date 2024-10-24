import React, { useEffect, useState } from "react";
import ComprehensiveTasksService from "../../../services/ComprehensionTask.service.jsx";
import AssessComprehensiveActivityModal from "../../../components/modals/AssessComprehensiveActivityModal.jsx";
import ViewComprehensiveActivityModal from "../../../components/modals/ViewComprehensiveActivityModal.jsx";
import Swal from "sweetalert2";

const ComprehensiveTasks = () => {
    const orgId = JSON.parse(localStorage.getItem("audi-user"))?.organization;
    const [activities, setActivities] = useState([]);
    const [assessActivity, setAssessActivity] = useState(null);
    const [assessModal, setAssessModal] = useState(false);
    const [viewActivity, setViewActivity] = useState(null);
    const [viewModal, setViewModal] = useState(false);

    useEffect(() => {
        loadActivities();
    }, [orgId]);

    const loadActivities = () => {
        ComprehensiveTasksService.getAcitivitiesByOrganization(orgId)
            .then((data) => {
                console.log(data);
                setActivities(data);
            })
            .catch((error) => {
                console.error("Error loading activities:", error);
            });
    };

    const handleAssess = (task) => {
        ComprehensiveTasksService.getActivityById(task._id)
            .then((data) => {
                setAssessActivity(data);
                setAssessModal(true);
            })
            .catch((error) => {
                console.error("Error loading activity details:", error);
            });
    };

    const handleView = (task) => {
        ComprehensiveTasksService.getActivityById(task._id)
            .then((data) => {
                setViewActivity(data);
                setViewModal(true);
            })
            .catch((error) => {
                console.error("Error loading activity details:", error);
            });
    };

    const handleDelete = (task) => {
        Swal.fire({
            title: "Are you sure?",
            text: `Do you really want to delete the activity for ${task?.patient?.firstName} ${task?.patient?.lastName}?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "Cancel",
        }).then((result) => {
            if (result.isConfirmed) {
                ComprehensiveTasksService.deleteActivityById(task._id)
                    .then(() => {
                        setActivities((prev) =>
                            prev.filter((activity) => activity._id !== task._id)
                        );
                        Swal.fire(
                            "Deleted!",
                            "The activity has been deleted.",
                            "success"
                        );
                    })
                    .catch((error) => {
                        console.error("Error deleting activity:", error);
                        Swal.fire(
                            "Error",
                            "Failed to delete activity. Please try again.",
                            "error"
                        );
                    });
            }
        });
    };
    const renderTaskActionButton = (task) => {
        if (task.status === "Need Assessment") {
            return (
                <button
                    onClick={() => handleAssess(task)}
                    className="text-blue-600 hover:font-bold"
                >
                    Assess
                </button>
            );
        } else if (task.status === "Completed") {
            return (
                <button
                    onClick={() => handleView(task)}
                    className="text-green-600 hover:font-bold"
                >
                    View
                </button>
            );
        } else {
            return (
                <button
                    onClick={() => handleDelete(task)}
                    className="text-red-600 hover:font-bold"
                >
                    Remove
                </button>
            );
        }
    };

    return (
        <div className="flex-1">
            <div className="border border-gray-300 rounded-md font-nunito">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50 sticky top-0">
                            <tr className="text-xs text-gray-700 text-center font-bold uppercase tracking-wider">
                                <th className="px-6 py-3">Name</th>
                                <th className="px-6 py-3">Level</th>
                                <th className="px-6 py-3">Total Questions</th>
                                <th className="px-6 py-3">Correct Responses</th>
                                <th className="px-6 py-3">Status</th>
                                <th className="px-6 py-3">Action</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200 text-center">
                            {activities
                                .slice()
                                .reverse()
                                .map((task) => (
                                    <tr
                                        key={task._id}
                                        className="text-sm text-gray-600"
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {task?.patient?.firstName}{" "}
                                            {task?.patient?.lastName}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {task.level}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {task.totalQuestionCount}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {task.correctResponsesCount ||
                                                "N/A"}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {task.status}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {renderTaskActionButton(task)}
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
