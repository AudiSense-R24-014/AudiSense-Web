import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { X } from "lucide-react";

export default function ViewDiscriminationActivityModal({
  activity,
  visible,
  onClose,
}) {
  if (!visible) {
    return null;
  }

  const score = `${activity.score}/2`;

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
          <h1 className="font-bold font-montserrat text-lg">View Discrimination Activity</h1>
        </div>
        <div className="font-montserrat pt-4">
          <h2 className="text-sm font-semibold">{activity.discriminationTask.word1.toUpperCase()}</h2>
          <div className="space-y-4">
            <h2 className="text-sm font-semibold">{activity.discriminationTask.word2.toUpperCase()}</h2>
          </div>
          <div className="pt-4 border-t mt-4">
            <p className="text-sm font-semibold text-right">
              Score: {score}
            </p>
          </div>
          <div>
            {/* Conditional rendering for audio */}
            {activity.discriminationTask.level > 1 && activity.providedAnswers && activity.providedAnswers.length > 0 && (
              <div className="mt-4">
                {activity.providedAnswers.map((audioSrc, index) => (
                  <audio key={index} controls className="mt-2">
                    <source src={audioSrc} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

ViewDiscriminationActivityModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  activity: PropTypes.shape({
    level: PropTypes.number.isRequired,
    discriminationTask: PropTypes.shape({
      word1: PropTypes.string.isRequired,
      word2: PropTypes.string.isRequired,
    }).isRequired,
    providedAnswers: PropTypes.arrayOf(PropTypes.string),
    score: PropTypes.number.isRequired,
  }).isRequired,
};
