import { X } from "lucide-react";
import React, { useState } from "react";
import PropTypes from "prop-types";
import DiscriminationTaskService from "../../services/DiscriminationTask.service";
import Swal from "sweetalert2";

export default function AssessDiscriminationActivityModal({
    assessActivity,
    visible,
    onClose,
}) {
    const [score, setScore] = useState(0);

    const handleScoreChange = (e) => {
        setScore(parseInt(e.target.value));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (score < 0 || score > 10) {
            Swal.fire({
                icon: "error",
                title: "Invalid Score",
                text: "Please enter a score between 0 and 10.",
            });
            return;
        }

        const convertedScore = (score / 10) * 2;

        Swal.fire({
            title: "Are you sure?",
            text: `Do you really want to finish the assessment?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, finish assessment!",
        }).then((result) => {
            if (result.isConfirmed) {
                const updatedActivity = {
                    ...assessActivity,
                    discriminationTask: assessActivity.discriminationTask._id,
                    score: convertedScore,
                    status: "Completed",
                };

                DiscriminationTaskService.updateActivityById(
                    assessActivity._id,
                    updatedActivity
                )
                    .then(() => {
                        Swal.fire("Saved!", "Assessment has been saved.", "success").then(window.location.reload());
                    })
                    .catch((error) => {
                        console.error(error);
                        Swal.fire("Error", "Could not save the assessment.", "error");
                    });
            }
        });
    };

    if (!visible) {
        return null;
    }

    return (
        <div
            className="fixed inset-0 bg-opacity-20 backdrop-blur-sm bg-black flex justify-center items-center"
            aria-modal="true"
        >
            <div className="bg-white rounded-xl relative w-full max-w-3xl mx-4 sm:mx-8 lg:w-2/3 xl:w-1/2 overflow-auto max-h-full p-4 sm:p-6 lg:p-8">
                <div className="pb-2">
                    <button
                        onClick={onClose}
                        className="absolute top-3 right-4 p-1 rounded-lg text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-600"
                        aria-label="Close"
                    >
                        <X />
                    </button>
                    <h1 className="font-bold font-montserrat text-lg">
                        Task Assessment
                    </h1>
                </div>
                <div className="font-montserrat pt-4">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {/* Audio players for each provided answer */}
                        <div className="mt-6 space-y-4">
                            <h2 className="text-sm font-medium">Provided Answers:</h2>
                            {assessActivity.providedAnswers.map((answerUrl, index) => (
                                <div key={index} className="flex items-center space-x-3">
                                    <span>Answer {index + 1}:</span>
                                    <span className="font-medium text-gray-700">
                                        Target Word: {index === 0 ? assessActivity.discriminationTask.word1 : assessActivity.discriminationTask.word2}
                                    </span>
                                    <audio controls src={answerUrl} className="w-full">
                                        Your browser does not support the audio element.
                                    </audio>
                                </div>
                            ))}
                        </div>

                        <div className="mt-6">
                            <label htmlFor="score" className="block text-sm font-medium">
                                Score (Out of 10):
                            </label>
                            <input
                                type="number"
                                id="score"
                                name="score"
                                value={score || ""}
                                onChange={handleScoreChange}
                                className="mt-1 block w-20 p-2 border border-gray-300 rounded-md"
                                min="0"
                                max="10"
                            />
                        </div>

                        <div className="flex justify-center py-10">
                            <button
                                type="submit"
                                className="text-white bg-audi-purple hover:bg-purple-900 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-12 py-2.5"
                            >
                                Finish Assessment
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

AssessDiscriminationActivityModal.propTypes = {
    visible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    assessActivity: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        patient: PropTypes.object.isRequired,
        providedAnswers: PropTypes.arrayOf(PropTypes.string).isRequired,
        discriminationTask: PropTypes.shape({
            _id: PropTypes.string.isRequired,
            word1: PropTypes.string.isRequired,
            word2: PropTypes.string.isRequired,
        }).isRequired,
    }),
};
