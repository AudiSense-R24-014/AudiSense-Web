import { X } from "lucide-react";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ComprehensionTaskService from "../../services/ComprehensionTask.service";
import Loading from "../Loading";

export default function ViewComprehensiveTaskModal({
    comprehensiveFeedbackId,
    visible,
    onClose,
}) {
    const [comprehensionTask, setComprehensionTask] = useState(null);

    useEffect(() => {
        if (comprehensiveFeedbackId) {
            ComprehensionTaskService.getFeedbackById(
                comprehensiveFeedbackId
            )
                .then((data) => {
                    setComprehensionTask(data);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, [comprehensiveFeedbackId]);

    if (!visible) return null;

    if (!comprehensionTask) {
        return <Loading />;
    }

    const {
        Input_Age,
        Input_Context,
        Input_Length,
        Question_Count,
        Clinician_Overall_Rating,
        Age_Wise_Content_Rating,
        Context_Wise_Content_Rating,
        Length_Wise_Feedback,
        Comprehensive_Task: { passage, questions } = {}, // Add optional chaining
    } = comprehensionTask || {}; // Add optional chaining

    return (
        <div
            className="fixed inset-0 bg-opacity-20 backdrop-blur-sm bg-black flex justify-center items-center z-50"
            aria-modal="true"
        >
            <div className="bg-white rounded-xl relative w-full max-w-3xl mx-4 sm:mx-8 lg:w-2/3 xl:w-1/2 p-4 sm:p-6 lg:p-8 max-h-full overflow-auto">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-4 p-1 rounded-lg text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-600"
                    aria-label="Close"
                >
                    <X />
                </button>
                <h1 className="font-bold font-montserrat text-lg text-center">
                    Comprehension Task
                </h1>

                {/* Task Information Section */}
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <h2 className="font-semibold">Age:</h2>
                        <p>{Input_Age || "N/A"}</p>
                    </div>
                    <div>
                        <h2 className="font-semibold">Context:</h2>
                        <p>{Input_Context || "N/A"}</p>
                    </div>
                    <div>
                        <h2 className="font-semibold">Length:</h2>
                        <p>{Input_Length || "N/A"}</p>
                    </div>
                    <div>
                        <h2 className="font-semibold">Question Count:</h2>
                        <p>{Question_Count || "N/A"}</p>
                    </div>
                </div>

                {/* Passage Section */}
                <div className="mt-6">
                    <h2 className="font-semibold text-lg">Passage:</h2>
                    <p className="font-montserrat mt-2 p-4 bg-gray-100 rounded-lg">
                        {passage || "N/A"}
                    </p>
                </div>

                {/* Questions Section */}
                <div className="mt-6">
                    <h2 className="font-semibold text-lg">Questions:</h2>
                    <ul className="space-y-4">
                        {questions?.map((question, index) => (
                            <li
                                key={question?._id}
                                className="p-4 bg-gray-50 rounded-lg shadow-sm"
                            >
                                <p className="font-medium">{`${index + 1}. ${question?.question || "N/A"}`}</p>
                                <div className="mt-2 space-y-2">
                                    <p className="font-montserrat">
                                        A: {question?.answerA || "N/A"}
                                    </p>
                                    <p className="font-montserrat">
                                        B: {question?.answerB || "N/A"}
                                    </p>
                                    <p className="font-montserrat">
                                        C: {question?.answerC || "N/A"}
                                    </p>
                                    <p className="font-montserrat">
                                        D: {question?.answerD || "N/A"}
                                    </p>
                                    <p className="font-bold text-green-600">
                                        Correct Answer: {question?.correctAnswer || "N/A"}
                                    </p>
                                </div>
                            </li>
                        )) || <li>No questions available</li>}
                    </ul>
                </div>

                {/* Ratings Section */}
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <h2 className="font-semibold">Clinician's Overall Rating:</h2>
                        <p>{Clinician_Overall_Rating || "N/A"}</p>
                    </div>
                    <div>
                        <h2 className="font-semibold">Age-Wise Content Rating:</h2>
                        <p>{Age_Wise_Content_Rating || "N/A"}</p>
                    </div>
                    <div>
                        <h2 className="font-semibold">Context-Wise Content Rating:</h2>
                        <p>{Context_Wise_Content_Rating || "N/A"}</p>
                    </div>
                    <div>
                        <h2 className="font-semibold">Length-Wise Feedback:</h2>
                        <p>{Length_Wise_Feedback || "N/A"}</p>
                    </div>
                </div>

                {/* Close Button */}
                <div className="flex justify-center py-6">
                    <button
                        onClick={onClose}
                        className="text-white bg-audi-purple hover:bg-purple-900 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-12 py-2.5"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}

ViewComprehensiveTaskModal.propTypes = {
    comprehensiveFeedbackId: PropTypes.any,
    visible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};
