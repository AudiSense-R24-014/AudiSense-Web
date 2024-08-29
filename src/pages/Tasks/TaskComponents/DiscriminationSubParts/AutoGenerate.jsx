import React from 'react'
import { useState } from 'react'


const AutoGenerate = () => {
  const [selectedStage, setSelectedStage] = useState('');

  const handleStageChange = (event) => {
    setSelectedStage(event.target.value);
  };

  return (
    <div className="mt-5">
      <div className="mb-5">
        <label>Age</label>
        <input
          type="text"
          placeholder="Enter Age"
          className="ml-36 mt-6 mb-5"
        />
      </div>
      <div>
        <label>Stage</label>
        <select
          id="stage"
          value={selectedStage}
          onChange={handleStageChange}
          className="ml-34"
        >
          <option value="" disabled>Select Stage</option>
          <option value="stage1">Advanced</option>
          <option value="stage2">Stage 2</option>
          <option value="stage3">Stage 3</option>
          <option value="stage4">Stage 4</option>
        </select>
        <div className="mt-10">
          <button className="bg-purple-400 font-nunito text-white py-2 px-4 rounded-md hover:bg-purple-600 transition-colors duration-300 ">Generate Task</button>
        </div>
      </div>
    </div>
  );
};

export default AutoGenerate;