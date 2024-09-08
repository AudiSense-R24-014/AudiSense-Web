import React, { useState } from 'react';
import AutoGenerateService from '../../../../services/DiscriminationTask.service';

const AutoGenerate = () => {
  const [age, setAge] = useState('');
  const [stage, setStage] = useState('');
  const [level, setLevel] = useState('');
  const [loading, setLoading] = useState(false);
  const [generatedWords, setGeneratedWord] = useState({});
  const [isGenerated, setIsGenerated] = useState(false);

  const [firstWordSet, setFirstWordSet] = useState(null);
  const [secondWordSet, setSecondWordSet] = useState(null);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  const handleStageChange = (event) => {
    setStage(event.target.value);
    console.log('Selected stage:', event.target.value);
  };

  const handleAgeChange = (event) => {
    event.preventDefault();
    setAge(event.target.value);
  }

  const handleLevel = (event) => {
    setLevel(event.target.value);
  };

  const handleGeneration = async (event) => {
    event.preventDefault();
    setLoading(true);
    AutoGenerateService.auto_generate(age, stage, level)
      .then((data) => {
        console.log(data);
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
    AutoGenerateService.createDiscriminationQuestion(firstWordSet, secondWordSet,parseInt(level))
      .then((data) => {
        console.log("Rhyming Words saved Successfully: ", data);
      })
      .catch((err) => {
        console.error("Error saving: ", err);
      });
  };

  const handleWordClick = (wordset) => {
    setFirstWordSet(wordset[0]);
    setSecondWordSet(wordset[1]);
    console.log("First Word: ", firstWordSet);
    console.log("Second Word: ", secondWordSet);
    setIsButtonEnabled(true);
  };

  const radioOptions = [
    { value: "1", label: "Level 1" },
    { value: "2", label: "Level 2" },
  ];

  return (
    <div className="mt-5">
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
      <div className="text-lg font-nunito font-bold flex items-center">
        <label htmlFor="stage">Stage</label>
        <select
          id="stage"
          value={stage}
          onChange={handleStageChange}
          className="ml-36 mt-6 mb-5" // Adjust this value to increase the distance
        >
          <option value="" disabled>Select Stage</option>
          <option value="Advanced">Advanced</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Beginner">Beginner</option>
        </select>
      </div>


      <div className="flex items-center mb-4">
        <div className="w-72 mr-4">
          <p className="text-lg font-nunito font-bold">Level:</p>
        </div>
        <div className="flex items-center">
          {radioOptions.map((option) => (
            <React.Fragment key={option.value}>
              <input
                type="radio"
                id={option.value}
                name="level"
                value={option.value}
                checked={level === option.value}
                onChange={handleLevel}
                className="mt-6 mb-5"
              />
              <label htmlFor={option.value} className="mr-4 font-nunito">
                {option.label}
              </label>
            </React.Fragment>
          ))}
        </div>
      </div>
      <div className="mt-10">
        <button
          onClick={handleGeneration}
          className="bg-purple-400 font-nunito text-white py-2 px-4 rounded-md hover:bg-purple-600 transition-colors duration-300 ">Generate Task</button>
      </div>
      <div className="mt-5">
        {isGenerated && generatedWords.rhymes && generatedWords.rhymes.length > 0 ? (
          <div className="p-4">
            <h3>Words:</h3>
            {generatedWords.rhymes.map((row, rowIndex) => (
              <div
                key={rowIndex}
                className="mt-2 flex justify-center border border-purple-400 rounded-md hover:bg-purple-100 transition-colors duration-200"
                onClick={() => { handleWordClick(row) }} // Attach click handler to this div
              >
                <button>
                  {row.map((word, colIndex) => (
                    <span
                      key={colIndex}
                      className="mr-2 p-2"
                    >
                      {word}
                    </span>
                  ))}
                </button>

              </div>
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
                className="mt-4 px-4 py-2 rounded-md bg-purple-500 text-white hover:bg-purple-600"
              >
                Assign & Save
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AutoGenerate;
