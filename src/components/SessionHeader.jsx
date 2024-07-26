import React from "react";
import userIcon from "../assets/images/user.png";

export default function SessionHeader() {
  return (
    <div className="flex justify-end shadow-md shadow-blue-900/20">
      <div className="px-2 lg:px-4 py-2">
        <div className="flex flex-row items-center">
          <div className="mx-3 font-montserrat whitespace-nowrap">
            <h1 className="text-right font-semibold text-base leading-tight">
              Levi Ackerman
            </h1>
            <h2 className="text-right text-sm text-gray-500 leading-tight">
              Position
            </h2>
          </div>
          <img
            className="w-11 h-11 rounded-full ring-2 ring-purple-300"
            src={userIcon}
            alt="Bordered avatar"
          />
        </div>
      </div>
    </div>
  );
}
