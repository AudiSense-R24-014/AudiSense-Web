import React from "react";
import PropTypes from "prop-types";
import { X } from "lucide-react";

export default function ViewComprehensiveActivityModal({
  activity,
  visible,
  onClose,
}) {
  const getFullAnswer = (question, answerLetter) => {
    const answerMapping = {
      A: question.answerA,
      B: question.answerB,
      C: question.answerC,
      D: question.answerD,
    };
    return answerMapping[answerLetter];
  };

  if (!visible) {
    return null;
  }

  const score = `${activity.correctResponsesCount}/${activity.totalQuestionCount}`;

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
          <h1 className="font-bold font-montserrat text-lg">View Comprehensive Activity</h1>
        </div>
        <div className="font-montserrat pt-4">
          <p className="mb-4">{activity.comprehensionTask.passage}</p>
          <div className="space-y-4">
            {activity.comprehensionTask.questions.map((question, index) => {
              const providedAnswerLetter = activity?.providedAnswers[index];
              const providedAnswerText = providedAnswerLetter
                ? getFullAnswer(question, providedAnswerLetter)
                : "No answer provided";

              return (
                <div key={question._id} className="p-4 border rounded-lg shadow-sm">
                  <p className="text-sm font-semibold">
                    Question {index + 1}: {question.question}
                  </p>
                  <p className="text-sm mt-2">
                    Correct Answer: {getFullAnswer(question, question.correctAnswer)}
                  </p>
                  
                  <p className="text-sm mt-2">
                    Provided Answer: {providedAnswerText}
                  </p>

                  {/* Conditional rendering based on level */}
                  {activity.level > 1 && providedAnswerLetter && (
                    <audio controls className="mt-2">
                      <source src={providedAnswerLetter} type="audio/mpeg" />
                      Your browser does not support the audio element.
                    </audio>
                  )}
                </div>
              );
            })}
          </div>
          <div className="pt-4 border-t mt-4">
            <p className="text-sm font-semibold text-right">
              Score: {score}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

ViewComprehensiveActivityModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  activity: PropTypes.shape({
    level: PropTypes.number.isRequired, // Ensure level is part of the activity
    comprehensionTask: PropTypes.shape({
      passage: PropTypes.string.isRequired,
      questions: PropTypes.arrayOf(
        PropTypes.shape({
          _id: PropTypes.string.isRequired,
          question: PropTypes.string.isRequired,
          answerA: PropTypes.string.isRequired,
          answerB: PropTypes.string.isRequired,
          answerC: PropTypes.string.isRequired,
          answerD: PropTypes.string.isRequired,
          correctAnswer: PropTypes.string.isRequired,
        })
      ).isRequired,
    }).isRequired,
    providedAnswers: PropTypes.arrayOf(PropTypes.string),
    correctResponsesCount: PropTypes.number.isRequired,
    totalQuestionCount: PropTypes.number.isRequired,
  }).isRequired,
};
