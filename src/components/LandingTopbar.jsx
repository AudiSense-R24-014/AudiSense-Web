import React, { useEffect, useState } from "react";
import AudiSenseLogoWithoutName from "../assets/images/audisense-logo-without-name.png";
import AudiSenseLogoWordOnly from "../assets/images/audisense-words-only.png";
import { ArrowRightIcon } from "lucide-react";

function DeterminePath() {
  const currentPath = window.location.pathname;
  if (currentPath == "/login") {
    return "login";
  } else if (currentPath == "/register") {
    return "register";
  } else {
    return "landing";
  }
}

export default function LandingTopbar() {
  const [path, setPath] = useState("");

  useEffect(() => {
    setPath(DeterminePath());
  }, [path]);

  return (
    <header className="bg-gray-100">
      <div className="container mx-auto py-4 flex justify-between items-center">
        <div className="flex items-center">
          <img
            src={AudiSenseLogoWithoutName}
            alt="AudiSense Logo"
            className="h-12 ml-4 w-auto"
          />
          <img
            src={AudiSenseLogoWordOnly}
            alt="AudiSense Logo"
            className="hidden lg:block h-5 ml-2 w-auto"
          />
        </div>

        <nav className="flex space-x-6 items-center font-montserrat font-semibold text-base mr-2">
          {path == "register" ? (
            <>
              <a href="/" className={`hover:text-purple-900`}>
                Home
              </a>
              <a
                href="/register"
                className={`hover:text-purple-900 text-audi-purple`}
              >
                Register
              </a>
              <button
                className="bg-audi-purple text-white py-2 px-4 rounded-md hover:bg-purple-900 flex-grow flex items-center justify-center"
                onClick={() => {
                  window.location = "./login";
                }}
              >
                Login
                <div>&nbsp;</div>
                <ArrowRightIcon size={18} />
              </button>
            </>
          ) : (
            <>
              <a
                href="/"
                className={`hover:text-purple-900 ${
                  path == "landing" ? "text-audi-purple" : ""
                }`}
              >
                Home
              </a>
              <a
                href="/login"
                className={`hover:text-purple-900 ${
                  path == "login" ? "text-audi-purple" : ""
                }`}
              >
                Login
              </a>
              <button
                className="bg-audi-purple text-white py-2 px-4 rounded-md hover:bg-purple-900 flex-grow flex items-center justify-center"
                onClick={() => {
                  window.location = "./register";
                }}
              >
                Join Us
                <div>&nbsp;</div>
                <ArrowRightIcon size={18} />
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
