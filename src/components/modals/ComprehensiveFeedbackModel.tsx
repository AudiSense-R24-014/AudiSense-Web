import { X } from "lucide-react";
import React, { useState } from "react";
import PropTypes from "prop-types";
import ComprehensionTaskService from "../../services/ComprehensionTask.service";
import Swal from "sweetalert2";

export default function ComprehensiveFeedbackModal({
  generatedComprehension,
  age,
  context,
  length,
  visible,
  onClose,
}) {
  const [ratings, setRatings] = useState({
    overall_rating: 5,
    rating_for_generated_passage_considering_age: 5,
    rating_for_generated_passage_considering_provided_context: 5,
    feedback_considering_provided_length: "",
  });

  const handleRatingChange = (e: any) => {
    const { name, value } = e.target;
    setRatings({
      ...ratings,
      [name]: isNaN(value) ? value : parseInt(value),
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    persistComprehensionTask();
  };

  const persistComprehensionTask = () => {
    ComprehensionTaskService.persist(generatedComprehension)
      .then((data) => {
        persistFeedback();
      })
      .catch((err) => {
        console.error("Error saving comprehensive task:", err);
      });
  };

  const persistFeedback = () => {
    const feedback = {
      Input_Age: age,
      Input_Context: context,
      Input_Length: length,
      Generated_Passage: generatedComprehension.passage,
      Clinician_Overall_Rating: ratings.overall_rating,
      Age_Wise_Content_Rating:
        ratings.rating_for_generated_passage_considering_age,
      Context_Wise_Content_Rating:
        ratings.rating_for_generated_passage_considering_provided_context,
      Length_Wise_Feedback: ratings.feedback_considering_provided_length,
    };
    ComprehensionTaskService.persistFeedback(feedback)
      .then((data) => {
        Swal.fire({
          title: "Success!",
          text: "Task created! Feedback submitted successfully!",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          window.location.reload();
        });
      })
      .catch((err) => {
        console.error("Error saving feedback:", err);
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
            Comprehensive Feedback
          </h1>
        </div>
        <div className="font-montserrat pt-4">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="flex flex-col space-y-4">
              <div className="flex items-center space-x-4">
                <label
                  htmlFor="overall_rating"
                  className="block text-sm font-medium text-gray-900 w-1/3"
                >
                  Clinician's Overall Rating (1-10)
                </label>
                <input
                  type="range"
                  name="overall_rating"
                  id="overall_rating"
                  min="1"
                  max="10"
                  value={ratings.overall_rating}
                  onChange={handleRatingChange}
                  className="w-full slider accent-purple-600"
                />
                <span className="text-sm font-medium text-gray-900">
                  {ratings.overall_rating}
                </span>
              </div>
              <div className="flex items-center space-x-4">
                <label
                  htmlFor="rating_for_generated_passage_considering_age"
                  className="block text-sm font-medium text-gray-900 w-1/3"
                >
                  Age-wise Content Rating (1-10)
                </label>
                <input
                  type="range"
                  name="rating_for_generated_passage_considering_age"
                  id="rating_for_generated_passage_considering_age"
                  min="1"
                  max="10"
                  value={ratings.rating_for_generated_passage_considering_age}
                  onChange={handleRatingChange}
                  className="w-full slider accent-purple-600"
                />
                <span className="text-sm font-medium text-gray-900">
                  {ratings.rating_for_generated_passage_considering_age}
                </span>
              </div>
              <div className="flex items-center space-x-4">
                <label
                  htmlFor="rating_for_generated_passage_considering_provided_context"
                  className="block text-sm font-medium text-gray-900 w-1/3"
                >
                  Context-wise Content Rating (1-10)
                </label>
                <input
                  type="range"
                  name="rating_for_generated_passage_considering_provided_context"
                  id="rating_for_generated_passage_considering_provided_context"
                  min="1"
                  max="10"
                  value={
                    ratings.rating_for_generated_passage_considering_provided_context
                  }
                  onChange={handleRatingChange}
                  className="w-full slider accent-purple-600"
                />
                <span className="text-sm font-medium text-gray-900">
                  {
                    ratings.rating_for_generated_passage_considering_provided_context
                  }
                </span>
              </div>
              <div className="flex items-center space-x-4">
                <label
                  htmlFor="feedback_considering_provided_length"
                  className="block text-sm font-medium text-gray-900 w-1/3"
                >
                  Length-wise Feedback
                </label>
                <input
                  type="text"
                  name="feedback_considering_provided_length"
                  id="feedback_considering_provided_length"
                  value={ratings.feedback_considering_provided_length}
                  onChange={handleRatingChange}
                  className="input-field w-full"
                  placeholder="Enter feedback"
                  required
                />
              </div>
            </div>
            <div className="flex justify-center py-10">
              <button
                type="submit"
                className="text-white bg-audi-purple hover:bg-purple-900 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-12 py-2.5"
              >
                Submit Feedback
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

ComprehensiveFeedbackModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
