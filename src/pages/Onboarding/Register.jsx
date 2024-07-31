import React from "react";

const Register = () => {
  return (
    <div className="flex justify-center items-center font-montserrat bg-gray-100">
      <div className="flex flex-col justify-center w-11/12 xl:w-2/3 bg-white rounded-3xl shadow-xl shadow-indigo-200 drop-shadow-2xl xl:px-12 pt-12 px-4 pb-24 md:min-w-96 space-y-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-4xl mb-2 px-4">
          Sign Up
        </h1>
        <form className="space-y-6 px-4">
          <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-8">
            <div className="flex-1">
              <label
                htmlFor="firstName"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                className="input-field"
                placeholder="First Name"
                required
              />
            </div>
            <div className="flex-1">
              <label
                htmlFor="lastName"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                className="input-field"
                placeholder="Last Name"
                required
              />
            </div>
          </div>
          <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-8">
            <div className="flex-1">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Email Address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="input-field"
                placeholder="name@company.com"
                required
              />
            </div>
            <div className="flex-1">
              <label
                htmlFor="regNumber"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Reg. Number
              </label>
              <input
                type="text"
                name="regNumber"
                id="regNumber"
                className="input-field"
                placeholder="XXXXXXXXX"
                required
              />
            </div>
          </div>
          <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-8">
            <div className="flex-1">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className="input-field"
                placeholder="••••••••"
                required
              />
            </div>
            <div className="flex-1">
              <label
                htmlFor="confirmPassword"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                className="input-field"
                placeholder="••••••••"
                required
              />
            </div>
          </div>
          <p className="text-sm font-light text-gray-500">
            Already have an account?{" "}
            <a href="/login" className="font-medium text-purple-600 hover:underline">
              Login
            </a>
          </p>
          <div className="flex justify-center py-10">
            <button
              type="submit"
              className="text-white bg-audi-purple hover:bg-purple-900 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-12 py-2.5"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
