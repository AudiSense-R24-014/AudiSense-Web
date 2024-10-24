import React, { useEffect, useState } from "react";
import ComprehensionTaskService from "../../../../services/ComprehensionTask.service";
import AssignComprehensiveTaskModal from "../../../../components/modals/AssignComprehensiveTaskModal";
import ViewComprehensiveTaskModal from "../../../../components/modals/ViewComprehensiveTaskModal";
import Loading from "../../../../components/Loading";

const AllTasks = () => {
    const [allFeedback, setAllFeedback] = useState([]);
    const [openSaveModal, setOpenSaveModal] = useState(false);
    const [openViewModal, setOpenViewModal] = useState(false);
    const [comprehensiveTaskId, setComprehensiveTaskId] = useState(null);
    const [feedbackId, setFeedbackId] = useState(null);
    const [totalQuestions, setTotalQuestions] = useState(5);

    useEffect(() => {
        ComprehensionTaskService.getFeedback()
            .then((response) => {
                setAllFeedback(response);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const handleAssign = (feedback) => {
        setComprehensiveTaskId(feedback.Comprehensive_Task);
        setTotalQuestions(feedback.Question_Count);
        setOpenSaveModal(true);
    };
    const handleView = (feedback) => {
        setFeedbackId(feedback._id);
        setOpenViewModal(true);
    };

    if(allFeedback.length === 0) {
        return (
            <Loading />
        );
    }

    return (
        <div className="flex-1">
            <div className="border border-gray-300 rounded-md font-nunito">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr className="text-xs text-gray-700 text-left font-bold uppercase tracking-wider">
                                <th className="px-6 py-3">Corresponding Age</th>
                                <th className="px-6 py-3">
                                    Clinician Provided Context
                                </th>
                                <th className="px-6 py-3">Length</th>
                                <th className="px-6 py-3">Question Count</th>
                                <th className="px-6 py-3">Generated Passage</th>
                                <th className="px-6 py-3">Action</th>
                            </tr>
                        </thead>
                        <tbody
                            className="bg-white divide-y divide-gray-200"
                            style={{ maxHeight: "400px", overflowY: "auto" }} // Setting max-height and making it scrollable
                        >
                            {allFeedback
                                .slice()
                                .reverse()
                                .map((feedback) => (
                                    <tr
                                        key={feedback._id}
                                        className="text-sm text-gray-600"
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {feedback.Input_Age}
                                        </td>
                                        <td className="px-6 py-4 whitespace-pre-wrap">
                                            {feedback.Input_Context
                                                ? feedback.Input_Context
                                                : "N/A"}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {feedback.Input_Length.charAt(
                                                0
                                            ).toUpperCase() +
                                                feedback.Input_Length.slice(
                                                    1
                                                ).toLowerCase()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {feedback.Question_Count}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <pre className="whitespace-pre-wrap text-sm font-nunito">
                                                {feedback.Generated_Passage}
                                            </pre>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex flex-col space-y-2">
                                                <button
                                                    onClick={() =>
                                                        handleAssign(feedback)
                                                    }
                                                    className="text-blue-600 hover:font-bold left"
                                                >
                                                    Assign
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        handleView(feedback)
                                                    }
                                                    className="text-green-600 hover:font-bold"
                                                >
                                                    View
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <AssignComprehensiveTaskModal
                comprehensionTaskId={comprehensiveTaskId}
                totalQuestions={totalQuestions}
                visible={openSaveModal}
                onClose={() => {
                    setOpenSaveModal(false);
                }}
            />
            <ViewComprehensiveTaskModal
                comprehensiveFeedbackId={feedbackId}
                visible={openViewModal}
                onClose={() => {
                    setOpenViewModal(false);
                }}
            />
        </div>
    );
};

export default AllTasks;
