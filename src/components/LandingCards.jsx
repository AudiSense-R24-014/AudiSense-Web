import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export default function LandingCards({ props }) {
  return (
    <div className="w-full">
      <div className="bg-white mb-9 rounded-xl py-8 px-7 shadow-md shadow-slate-300 transition-all hover:shadow-lg hover:shadow-purple-300 sm:p-9 lg:px-6 xl:px-9">
        <div className="mx-auto mb-4 inline-block bg-audi-purple p-3.5 px-4 rounded-full">
          <FontAwesomeIcon icon={props.icon} color="white" size="lg"/>
        </div>
        <div>
          <h3 className="mb-4 text font-montserrat font-bold text-black sm:text-base lg:text-lg xl:text-xl">
            {props.title}
          </h3>
          <hr className="bg-audi-purple my-4 w-1/4 pt-0.5" />
          <p className="font-montserrat text-sm font-medium text-gray-600">
            {props.description}
          </p>
        </div>
      </div>
    </div>
  );
}
