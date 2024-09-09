import { X } from "lucide-react";
import React, { useState } from "react";
import PropTypes from "prop-types";
import ComprehensionTaskService from "../../services/ComprehensionTask.service";
import Swal from "sweetalert2";

export default function AssessComprehensiveActivityModal({
  assessActivity,
  visible,
  onClose,
}) {
  const [scores, setScores] = useState({});

  const handleScoreChange = (questionId, value) => {
    setScores((prevScores) => ({
      ...prevScores,
      [questionId]: value,
    }));
  };

  const calculateTotalScore = () => {
    let totalScore = 0;
    for (let i = 0; i < assessActivity.comprehensionTask.questions.length; i++) {
      if (scores[assessActivity.comprehensionTask.questions[i]._id] === undefined) {
        return "N/A";
      }
    }
    for (let i = 0; i < assessActivity.comprehensionTask.questions.length; i++) {
      let scorePerWord = parseInt(scores[assessActivity.comprehensionTask.questions[i]._id]);
      totalScore += scorePerWord;
    }
    return totalScore / (assessActivity.comprehensionTask.questions.length * 10);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let score = calculateTotalScore();
    if (score === "N/A") {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please fill in all the scores",
      });
    } else {
      ComprehensionTaskService.updateActivityById(assessActivity._id, {
        correctResponsesCount: score,
        status: "Completed",
      }).catch((error) => {
        console.error(error);
      });
    }
  };

  const getFullAnswer = (question, correctAnswerLetter) => {
    const answerMapping = {
      A: question.answerA,
      B: question.answerB,
      C: question.answerC,
      D: question.answerD,
    };
    return answerMapping[correctAnswerLetter];
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
          <h1 className="font-bold font-montserrat text-lg">Task Assessment</h1>
        </div>
        <div className="font-montserrat pt-4">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="mt-6">
              <p className="mb-4">{assessActivity.comprehensionTask.passage}</p>
              <div className="space-y-4">
                {assessActivity.comprehensionTask.questions.map((question, index) => (
                  <div key={question._id} className="p-4 border rounded-lg shadow-sm">
                    <p className="text-sm font-semibold">
                      Question {index + 1}: {question.question}
                    </p>
                    <p className="text-sm">
                      Correct Answer: {getFullAnswer(question, question.correctAnswer)}
                    </p>

                    {/* Audio Playback */}
                    {assessActivity.providedAnswers[index] && (
                      <audio controls className="mt-2">
                        <source src={assessActivity.providedAnswers[index]} type="audio/mpeg" />
                        Your browser does not support the audio element.
                      </audio>
                    )}

                    {/* Score Input */}
                    <div className="mt-2">
                      <label
                        htmlFor={`score-${question._id}`}
                        className="block text-sm font-medium"
                      >
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

AssessComprehensiveActivityModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  assessActivity: PropTypes.any
};
