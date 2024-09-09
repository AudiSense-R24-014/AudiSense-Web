import React from "react";
import {
    AudioLines,
    Combine,
    Shapes,
} from "lucide-react";
import PropTypes from "prop-types";

IdentificationTabs.propTypes = {
    taskList: PropTypes.string,
    toggleTaskStatus: PropTypes.func,
};

export default function IdentificationTabs({ taskList, toggleTaskStatus }) {

    const taskOptions = [
        { id: "generate", label: "Generate Tasks", icon: <AudioLines size={20} /> },
        { id: "all", label: "Get All Tasks", icon: <Combine size={20} /> },
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