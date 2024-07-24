import React, { useState } from "react";
import AudiSenseLogoWithoutName from "../assets/images/audisense-logo-without-name.png";
import AudiSenseLogoWordOnly from "../assets/images/audisense-words-only.png";
import { ArrowRightIcon } from "lucide-react";

export default function LandingTopbar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className="bg-gray-50">
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
          <a href="#" className="hover:text-audi-purple">
            Home
          </a>
          <a href="#" className="hover:text-audi-purple">
            Login
          </a>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="bg-audi-purple text-white py-2 px-4 rounded-md hover:bg-purple-700 flex-grow flex items-center justify-center"
          >
            Join Us
            <span className="ml-1" />
            <ArrowRightIcon size={18}/>
          </button>
        </nav>
      </div>
    </header>
  );
}
