import React from 'react';
import AutoGenerateService from '../../../../services/DiscriminationTask.service'
import { useState } from 'react'
import Swal from 'sweetalert2';


function GenManually() {
  const [loading, setLoading] = useState(false);
  const [generatedWords, setGeneratedWord] = useState({});
  const [isGenerated, setIsGenerated] = useState(false);
  const [word, setWord] = useState([]);
  const [stage, setStage] = useState('');
  const [selectedWords, setSelectedWords] = useState([]);
  const [firstWordSet, setFirstWordSet] = useState(null); // To store the first selected word
  const [secondWordSet, setSecondWordSet] = useState(null);
  const [level, setLevel] = useState('');

  const handleLevel = (event) => {
    setLevel(event.target.value);
  };

  const handleWord = (event) => {
    setWord(event.target.value);
  };

  const handleGeneration = async (event) => {
    event.preventDefault();
    setLoading(true);
    AutoGenerateService.manual_generate(word)
      .then((data) => {
        setGeneratedWord(data);
      })
      .catch((err) => {
        console.error("Error generating rhyming words: ", err);
      })
      .finally(() => {
        setLoading(false);
        setIsGenerated(true);
      });
  };

  const saveGeneratedWords = async (event) => {
    event.preventDefault();
    AutoGenerateService.createDiscriminationQuestion(firstWordSet, secondWordSet, parseInt(level))
      .then(() => {
        Swal.fire("Success", "Task has been saved", "success");
      })
      .catch((err) => {
        console.error("Error saving: ", err);
      });
  };


  // Updated handleWordClick function
  const handleWordClick = (word) => {
    setSelectedWords((prevSelectedWords) => {
      let updatedSelectedWords;

      if (prevSelectedWords.includes(word)) {
        // Remove the word if it's already selected
        updatedSelectedWords = prevSelectedWords.filter(
          (selectedWord) => selectedWord !== word
        );
      } else if (prevSelectedWords.length < 2) {
        // Add the word if it's not already selected, and there are less than 2 words selected
        updatedSelectedWords = [...prevSelectedWords, word];
      } else {
        updatedSelectedWords = prevSelectedWords;
      }

      // Update the first and second word sets based on the updated selections
      const firstWord = updatedSelectedWords[0] || null;
      const secondWord = updatedSelectedWords[1] || null;

      setFirstWordSet(firstWord);
      setSecondWordSet(secondWord);

      return updatedSelectedWords;
    });
  };
  const isButtonEnabled = firstWordSet && secondWordSet;
  const radioOptions = [
    { value: "1", label: "Level 1" },
    { value: "2", label: "Level 2" },
  ];

  return (
    <div className="mt-5">
      <div className="flex items-center mb-4">
        <div className="w-72 ">
          <p className="text-lg font-nunito font-bold">Level:</p>
        </div>
        <div className="flex">
          {radioOptions.map((option) => (
            <React.Fragment key={option.value}>
              <input
                type="radio"
                id={option.value}
                name="level"
                value={option.value}
                checked={level === option.value}
                onChange={handleLevel}
                className="mr-2 "
              />
              <label htmlFor={option.value} className="mr-4 font-nunito">
                {option.label}
              </label>
            </React.Fragment>
          ))}
        </div>
      </div>
      <div className="mb-4 flex items-center">
        <div className="flex-grow w-72 mr-4">
          <p className="text-lg font-nunito font-bold">Word:</p>
          <p className="text-s font-nunito font-light">

          </p>
        </div>
        <input
          type="text"
          value={word}
          onChange={handleWord}
          placeholder="Enter Choice of Word"
          className="border font-nunito border-gray-400 rounded-md p-4 w-full h-12 mr-4"
        />
      </div>
      <div className="mt-10">
        <button
          onClick={handleGeneration}
          disabled={loading} // Disable the button when loading is true
          className={`bg-purple-400 font-nunito text-white py-2 px-4 rounded-md hover:bg-purple-600 transition-colors duration-300 ${loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
        >
          {loading ? "Generating..." : "Generate Task"}
        </button></div>
      <div className="mt-5">
        {isGenerated ? (
          <div className="list-disc pl-5">
            <h3>Words:</h3>
            {generatedWords.map((word, index) => (
              <span
                key={index}
                onClick={() => handleWordClick(word)}
                className={`mt-2 flex justify-center border border-purple-400 rounded-md p-2 cursor-pointer transition-colors duration-200 ${selectedWords.includes(word) ? 'bg-purple-100' : ''
                  }`}
              >
                {word}
              </span>
            ))}
          </div>
        ) : (
          <p></p>
        )}
        <div>
          {firstWordSet && secondWordSet && (
            <div className="mt-5">
              <button
                onClick={saveGeneratedWords}
                className={`mt-4 px-4 py-2 rounded-md ${isButtonEnabled ? 'bg-purple-500 hover:bg-purple-600' : 'bg-gray-400 cursor-not-allowed'} text-white`}
                disabled={!isButtonEnabled}
              >
                Assign & Save
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default GenManually;