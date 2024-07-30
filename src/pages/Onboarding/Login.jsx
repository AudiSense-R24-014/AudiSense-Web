import React, { useState } from "react";
import LoginRight from "../../assets/images/login-right.png";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TherapistService from "../../services/Therapist.service";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({ email: "", password: "" });
  const [isEmtpy, setIsEmpty] = useState(true);

  const validateEmail = (value) => {
    if (!value) {
      setError((prevError) => ({ ...prevError, email: "Email is required" }));
      setIsEmpty(true);
    } else if (!/\S+@\S+\.\S+/.test(value)) {
      setError((prevError) => ({ ...prevError, email: "Email is invalid" }));
      setIsEmpty(false);
    } else {
      setError((prevError) => ({ ...prevError, email: "" }));
      setIsEmpty(false);
    }
  };

  const validatePassword = (value) => {
    if (!value) {
      setError((prevError) => ({ ...prevError, password: "Password is required" }));
      setIsEmpty(true);
    } else if (value.length < 6) {
      setError((prevError) => ({ ...prevError, password: "Password must be at least 6 characters" }));
      setIsEmpty(false);
    } else {
      setError((prevError) => ({ ...prevError, password: "" }));
      setIsEmpty(false);
    }
  };

  const handleEmailChange = (e) => {
    const { value } = e.target;
    setEmail(value);
    validateEmail(value);
  };

  const handlePasswordChange = (e) => {
    const { value } = e.target;
    setPassword(value);
    validatePassword(value);
  };

  const signIn = (e) => {
    e.preventDefault();

    if (isEmtpy) {
      alert("Please fill in the required fields.");
      return;
    }

    if (error.email || error.password) {
      alert("Please fix the errors before submitting.");
      return;
    }

    TherapistService.login(email, password)
      .then((response) => {
        if (response.user) {
          if (response.password) {
            alert("Login successful!");
            localStorage.setItem("token", response.token);
            window.location.href = "/dashboard";
          } else {
            alert("Incorrect password! Check the password again.");
          }

        } else {
          alert("User not found! Check the email again.");
        }
      }
      ).catch((error) => {
        console.log(error);
      });

  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="flex-[2_2_0%] mb-6 md:mb-0 my-6 font-montserrat">
        <div className="w-full xl:ml-20 bg-white rounded-3xl shadow-xl shadow-indigo-200 drop-shadow-2xl sm:max-w-md xl:px-8 pt-8 pb-24 md:min-w-96">
          <div className="p-6 space-y-8 md:space-y-10 sm:p-8">
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
                  type="text"
                  name="email"
                  id="email"
                  className="input-field"
                  placeholder="name@company.com"
                  value={email}
                  onChange={handleEmailChange}
                />
                {error.email && (
                  <p className="text-red-500 text-xs mt-1">{error.email}</p>
                )}
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
                  value={password}
                  onChange={handlePasswordChange}
                />
                {error.password ? (
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-4 pt-2"
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
                ) : (
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
                )}
                {error.password && (
                  <p className="text-red-500 text-xs mt-1">{error.password}</p>
                )}
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