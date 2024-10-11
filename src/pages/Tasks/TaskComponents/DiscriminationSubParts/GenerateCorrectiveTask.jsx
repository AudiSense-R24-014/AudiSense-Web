import React from 'react'
import { useState } from 'react'
import AutoGenerateService from '../../../../services/DiscriminationTask.service'

const GenCorrectiveTask = () => {
  const [selectedStage, setSelectedStage] = useState('');
  const [loading, setLoading] = useState(false);
  const [generatedWords, setGeneratedWord] = useState({});
  const [isGenerated, setIsGenerated] = useState(false);
  const [age, setAge] = useState('');
  const [stage, setStage] = useState('');
  const [mistake, setMistake] = useState("");
  const [level, setLevel] = useState('');
  const [selectedWords, setSelectedWords] = useState([])

  const [firstWordSet, setFirstWordSet] = useState(null);
  const [secondWordSet, setSecondWordSet] = useState(null);


  const handleStageChange = (event) => {
    setStage(event.target.value);
    // Additional logic can be added here
    console.log('Selected stage:', event.target.value);
  };

  const handleAgeChange = (event) => {
    event.preventDefault();
    setAge(event.target.value);
  }
  const handleMistake = (event) => {
    setMistake(event.target.value);
  };
  const handleLevel = (event) => {
    setLevel(event.target.value);
  };

  const handleGeneration = async (event) => {
    event.preventDefault();
    setLoading(true);
    AutoGenerateService.corrective_generate(age, stage, mistake, level)
      .then((data) => {
        console.log(data)
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
    console.log(generatedWords);
    AutoGenerateService.createDiscriminationQuestion(firstWordSet, secondWordSet, parseInt(level))
      .then((data) => {
        console.log("Rhyming Words saved Successfully: ", data);
      })
      .catch((err) => {
        console.error("Error saving: ", err);
      });
  };

  const handleWordClick = (word) => {
    setSelectedWords(prevSelectedWords => {
      let updatedSelectedWords;

      if (prevSelectedWords.includes(word)) {
        // Remove the word if it's already selected
        updatedSelectedWords = prevSelectedWords.filter(selectedWord => selectedWord !== word);
      } else {
        // Add the word if it's not already selected
        updatedSelectedWords = [...prevSelectedWords, word];
      }

      // Update the first and second word sets based on the updated selections
      const firstWord = updatedSelectedWords[0] || null;
      const secondWord = updatedSelectedWords[1] || null;

      setFirstWordSet(firstWord);
      setSecondWordSet(secondWord);

      // Log the updated sets for debugging
      console.log("First Word: ", firstWord);
      console.log("Second Word: ", secondWord);

      return updatedSelectedWords;
    });
  };
  const isButtonEnabled = firstWordSet && secondWordSet;
  const radioOptions = [
    { value: "1", label: "Level 1" },
    { value: "2", label: "Level 2" },
  ];

  return (
    <div className="mt-5 flex flex-col space-y-5">
      <div className="text-lg font-nunito font-bold">
        <label>Age</label>
        <input
          type="text"
          value={age}
          onChange={handleAgeChange}
          placeholder="Enter Age"
          className="ml-36 mt-6 mb-5"
        />
      </div>
      <div className="mb-4 flex items-center">
        <div className="flex-grow w-72 mr-4">
          <p className="text-lg font-nunito font-bold">Previous Mistakes:</p>
          <p className="text-s font-nunito font-light">

          </p>
        </div>
        <input
          type="text"
          value={mistake}
          onChange={handleMistake}
          placeholder="Enter Previous Mistakes"
          className="border font-nunito border-gray-400 rounded-md p-4 w-full h-12 mr-4"
        />
      </div>
      <div>
        <div className="text-lg font-nunito font-bold flex items-center">
          <label htmlFor="stage">Stage</label>
          <select
            id="stage"
            value={stage}
            onChange={handleStageChange}
            className="ml-36 mt-6 mb-5"
          >
            <option value="" disabled>Select Stage</option>
            <option value="Advanced">Advanced</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Beginner">Beginner</option>
          </select>
        </div>
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

        <div className="mt-10"
          onClick={handleGeneration}>
          <button className="bg-purple-400 font-nunito text-white py-2 px-4 rounded-md hover:bg-purple-600 transition-colors duration-300 ">Generate Task</button>
        </div>
        <div className="mt-5">
          {isGenerated && generatedWords.rhymes.length > 0 ? (
            <div className="flex flex-col space-y-2">
              <h3 className="p-4">Words:</h3>
              {generatedWords.rhymes.map((word, index) => (
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
    </div>
  );
};

export default GenCorrectiveTask;