import React, { useState } from "react";
import LoginRight from "../../assets/images/login-right.png";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  function signIn(e) {
    e.preventDefault();
    window.location = "./dashboard";
  }
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="flex flex-col md:flex-row">
      <div className="flex-[2_2_0%] mb-6 md:mb-0 my-6 font-montserrat">
        <div className="w-full xl:ml-20 bg-white rounded-3xl shadow-xl shadow-indigo-200 drop-shadow-2xl sm:max-w-md xl:px-8 pt-8 pb-24 md:min-w-96">
          <div className="p-6 space-y-8 md:space-y-10 sm:p-8 ">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-3xl">
              Login
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={signIn}>
              <div>
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
                  required=""
                />
              </div>
              <div className="relative">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="input-field"
                  required=""
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-4 pt-8"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <FontAwesomeIcon
                      icon={faEyeSlash}
                      className="h-4 w-4 text-gray-500"
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faEye}
                      className="h-4 w-4 text-gray-500"
                    />
                  )}
                </button>
              </div>
              <div className="flex items-center justify-between py-1">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 checked:accent-audi-purple"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="remember" className="text-gray-500">
                      Remember me
                    </label>
                  </div>
                </div>
                <a
                  href="./register"
                  className="text-sm font-medium text-audi-purple hover:underline"
                >
                  Forgot password?
                </a>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-audi-purple hover:bg-purple-900 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Sign in
              </button>
              <p className="text-sm font-light text-gray-500">
                Don’t have an account yet?{" "}
                <a
                  href="/register"
                  className="font-medium text-purple-600 hover:underline"
                >
                  Sign up
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
      <div className="flex-[3_3_0%] flex justify-end items-center my-6 ml-6">
        <img src={LoginRight} alt="Landing Right" className="w-full" />
      </div>
    </div>
  );
};

export default Login;
