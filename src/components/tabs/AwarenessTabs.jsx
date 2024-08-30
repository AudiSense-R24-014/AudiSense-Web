import React from "react";
import {
    AudioLines,
    Combine,
    SearchCheck,
    BookOpenText,
    Shapes,
} from "lucide-react";
import PropTypes from "prop-types";

AwarenessTabs.propTypes = {
    taskList: PropTypes.string,
    toggleTaskStatus: PropTypes.func,
};

export default function AwarenessTabs({ taskList, toggleTaskStatus }) {

    const taskOptions = [
        { id: "awarenessSounds", label: "Awareness Sounds", icon: <AudioLines size={20} /> },
        { id: "ling6All", label: "Ling 6 All", icon: <Combine size={20} /> },
        { id: "ling6Separate", label: "ling6Separate", icon: <Shapes size={20} /> },
    ]

    return (
        <>
            <div className="flex justify-between font-nunito py-1 my-2">
                <div className="flex items-center space-x-1">
                    {taskOptions.map(option => (
                        <button
                            key={option.id}
                            // to={`/${option.id}`}
                            onClick={() => toggleTaskStatus(option.id)}
                            className={`
              relative flex items-center py-2 px-3 my-1
              font-bold rounded-md cursor-pointer
              transition-colors group 
              ${taskList === option.id
                                    ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
                                    : "hover:bg-indigo-50 text-gray-600 border border-gray-200"
                                }
          `}
                        >
                            {option.icon}
                            <span>&nbsp;{option.label}</span>
                        </button>
                    ))}
                </div>
            </div>
        </>
    )
}
