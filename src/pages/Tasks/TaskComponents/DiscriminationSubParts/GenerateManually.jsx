import React from 'react';

function GenManually() {
  return (
    <div className="mt-5">
      <div className="mb-5">
        <label htmlFor="">Word</label>
        <input
          type="text"
          placeholder="Enter Word"
          className="ml-36 mt-6 mb-5"
        />
      </div>
      <div>
        <button className="bg-purple-400 font-nunito text-white py-2 px-4 rounded-md hover:bg-purple-600 transition-colors duration-300 ">Generate Task</button>
      </div>
    </div>
  );
}

export default GenManually;