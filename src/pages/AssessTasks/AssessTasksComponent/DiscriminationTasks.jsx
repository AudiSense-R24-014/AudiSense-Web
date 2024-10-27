import React, { useEffect, useState } from "react";
import ComprehensiveTasksService from "../../../services/ComprehensionTask.service.jsx";
import DiscriminationTaskService from "../../../services/DiscriminationTask.service.jsx";
import AssessComprehensiveActivityModal from "../../../components/modals/AssessComprehensiveActivityModal.jsx";
import ViewDiscriminationActivityModal from "../../../components/modals/ViewDiscriminationActivityModal.jsx";
import SearchBar from "../../../components/pagination/SearchBar.jsx";
import Swal from "sweetalert2";
import PaginationButtons from "../../../components/pagination/PaginationButtons.jsx";

const DiscriminationTasks = () => {
    const orgId = JSON.parse(localStorage.getItem("audi-user"))?.organization;
    const [activities, setActivities] = useState([]);
    const [filteredActivities, setFilteredActivities] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const activitiesPerPage = 8;
    const [assessActivity, setAssessActivity] = useState(null);
    const [assessModal, setAssessModal] = useState(false);
    const [viewActivity, setViewActivity] = useState(null);
    const [viewModal, setViewModal] = useState(false);

    useEffect(() => {
        loadActivities();
    }, [orgId]);

    const loadActivities = () => {
        DiscriminationTaskService.getAcitivitiesByOrganization(orgId)
            .then((data) => {
                setActivities(data);
                setFilteredActivities(data);
            })
            .catch((error) => {
                console.error("Error loading activities:", error);
            });
    };

    // Search filter
    useEffect(() => {
        const filtered = activities.filter((activity) => {
            const { firstName, lastName } = activity?.patient || {};
            return (
                (firstName &&
                    firstName
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase())) ||
                (lastName &&
                    lastName.toLowerCase().includes(searchQuery.toLowerCase()))
            );
        });
        setFilteredActivities(filtered);
        setCurrentPage(1); // Reset to first page when search query changes
    }, [searchQuery, activities]);

    // Pagination calculations
    const indexOfLastActivity = currentPage * activitiesPerPage;
    const indexOfFirstActivity = indexOfLastActivity - activitiesPerPage;
    const currentActivities = filteredActivities.slice(
        indexOfFirstActivity,
        indexOfLastActivity
    );
    const totalPages = Math.ceil(filteredActivities.length / activitiesPerPage);
    // Handle page change
    const handlePageChange = (page) => {
        if (page === "first") {
            setCurrentPage(1);
        } else if (page === "last") {
            setCurrentPage(totalPages);
        } else if (typeof page === "number") {
            setCurrentPage(page);
        } else if (page === "next" && currentPage < totalPages) {
            console.log("next");
            setCurrentPage(currentPage + 1);
        } else if (page === "previous" && currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
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
            <SearchBar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                placeholder="Search by Name"
            />

            <div className="border border-gray-300 rounded-md font-nunito">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50 sticky top-0">
                            <tr className="text-xs text-gray-700 text-center font-bold uppercase tracking-wider">
                                <th className="px-6 py-3">Name</th>
                                <th className="px-6 py-3">Level</th>
                                <th className="px-6 py-3">Word 1</th>
                                <th className="px-6 py-3">Word 2</th>
                                <th className="px-6 py-3">Status</th>
                                <th className="px-6 py-3">Score</th>
                                <th className="px-6 py-3">Action</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200 text-center">
                            {currentActivities.length > 0 ? (
                                currentActivities.map((task) => (
                                    <tr
                                        key={task._id}
                                        className="text-sm text-gray-600"
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {task?.patient?.firstName}{" "}
                                            {task?.patient?.lastName}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {task.discriminationTask.level}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {task.discriminationTask.word1}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {task.discriminationTask.word2}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {task.status}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {task.score === undefined
                                                ? "N/A"
                                                : task.score}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {renderTaskActionButton(task)}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="7"
                                        className="px-6 py-4 text-center"
                                    >
                                        No activities found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pagination */}
            <PaginationButtons
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />

            {assessModal && (
                <AssessComprehensiveActivityModal
                    assessActivity={assessActivity}
                    visible={assessModal}
                    onClose={() => setAssessModal(false)}
                />
            )}
            {viewModal && (
                <ViewDiscriminationActivityModal
                    activity={viewActivity}
                    visible={viewModal}
                    onClose={() => setViewModal(false)}
                />
            )}
        </div>
    );
};

export default DiscriminationTasks;
