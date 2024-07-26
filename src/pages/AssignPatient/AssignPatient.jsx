import React from "react";

function AssignPatient() {
  return (
    <div className="relative py-3 sm:max-w-xl sm:mx-auto">
      <div className="relative px-4 py-10 bg-black mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
        <div className="max-w-md mx-auto text-white">
          <div className="text-center">
            <h2 className="text-xl font-semibold">Assign New Child</h2>
          </div>
          <div className="mt-5">
            <label
              className="font-semibold text-sm text-gray-400 pb-1 block"
              htmlFor="fullname"
            >
              Full Name
            </label>
            <input
              className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full bg-gray-800 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              type="text"
              id="fullname"
            />
          </div>
          <div>
            <label
              className="font-semibold text-sm text-gray-400 pb-1 block"
              htmlFor="dob"
            >
              Date of Birth
            </label>
            <input
              className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full bg-gray-800 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              type="date"
              id="dob"
            />
          </div>
          <div>
            <label
              className="font-semibold text-sm text-gray-400 pb-1 block"
              htmlFor="hearingAge"
            >
              Hearing Age
            </label>
            <input
              className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full bg-gray-800 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              type="number"
              id="hearingAge"
              placeholder="Years"
            />
          </div>
          <div>
            <label
              className="font-semibold text-sm text-gray-400 pb-1 block"
              htmlFor="gender"
            >
              Gender
            </label>
            <select
              className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full bg-gray-800 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              id="gender"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label
              className="font-semibold text-sm text-gray-400 pb-1 block"
              htmlFor="parentsName"
            >
              Parent's Name
            </label>
            <input
              className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full bg-gray-800 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              type="text"
              id="parentsName"
            />
          </div>
          <div>
            <label
              className="font-semibold text-sm text-gray-400 pb-1 block"
              htmlFor="level"
            >
              Level
            </label>
            <select
              className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full bg-gray-800 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              id="level"
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
          <div>
            <button
              className="py-2 px-4 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
              type="submit"
              style={{
                background:
                  "linear-gradient(to right, #af40ff, #5b42f3, #00ddeb)",
                border: "none",
              }}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AssignPatient;
