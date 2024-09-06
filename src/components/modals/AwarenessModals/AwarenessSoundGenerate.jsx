import React, { useState } from "react";
import { X } from "lucide-react";
import PropTypes from "prop-types";

export default function AwarenessSoundGenerate({ visible, onClose, getData }) {
    // State for checkboxes
    const [isChecked1, setIsChecked1] = useState(false);
    const [isChecked2, setIsChecked2] = useState(false);
    const [isChecked3, setIsChecked3] = useState(false);

    // State for input values
    const [sound1, setSound1] = useState("");
    const [sound2, setSound2] = useState("");
    const [sound3, setSound3] = useState("");

    // State to control preview box visibility and disable inputs
    const [showPreview, setShowPreview] = useState(false);
    const [disableInputs, setDisableInputs] = useState(false);

    if (!visible) {
        return null;
    }

    // Function to handle sound generation
    const handleGenerateSound = () => {
        // Collect only the checked sound inputs
        const selectedSounds = {
            sound1: isChecked1 ? sound1 : null,
            sound2: isChecked2 ? sound2 : null,
            sound3: isChecked3 ? sound3 : null,
        };

        // If all sounds are unchecked, return
        if (!selectedSounds.sound1 && !selectedSounds.sound2 && !selectedSounds.sound3) {
            alert("Please select at least one sound to generate");
            return;
        }

        // If any sound is checked but the input is empty, return
        if ((isChecked1 && (!sound1 || sound1.trim() === "")) ||
            (isChecked2 && (!sound2 || sound2.trim() === "")) ||
            (isChecked3 && (!sound3 || sound3.trim() === ""))) {
            alert("Please enter a valid sound name for the checked sounds.");
            return;
        }

        // Disable inputs and show preview box
        setDisableInputs(true);
        setShowPreview(true);
    };

    // Function to handle generating again
    const handleGenerateAgain = () => {
        // Hide preview box and re-enable inputs
        setShowPreview(false);
        setDisableInputs(false);
    };

    // Function to handle saving
    const handleSave = () => {
        alert("Sounds saved!");
        // You can send the data using the getData function if required
        const selectedSounds = {
            sound1: isChecked1 ? sound1 : null,
            sound2: isChecked2 ? sound2 : null,
            sound3: isChecked3 ? sound3 : null,
        };
        console.log("Selected Sounds:", selectedSounds);
        // getData(selectedSounds);
    };

    // Function to handle generating initial set
    const handleGenerateSimpleSound = () => {
        // Disable inputs and show preview box
        setDisableInputs(true);
        setShowPreview(true);
    }

    return (
        <div
            className="fixed inset-0 bg-opacity-20 backdrop-blur-sm bg-black flex justify-center items-center"
            aria-modal="true"
        >
            <div className="bg-white rounded-xl relative w-5/6 lg:w-1/2">
                {/* Close Button */}
                <div className="border-b-2 p-2 lg:p-4 lg:px-8">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-1 rounded-lg text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-600 cursor-pointer"
                        aria-label="Close"
                    >
                        <X />
                    </button>
                    <h1 className="font-bold font-montserrat text-lg">
                        Awareness Sound Generate
                    </h1>
                </div>

                {/* Modal Content */}
                <div className="font-montserrat p-2 lg:p-4 lg:px-8">
                    <div className="flex flex-row space-x-8">
                        {/* First column */}
                        <div className="flex flex-col flex-1 space-y-4">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                Set Necessary Attributes
                            </h3>
                            <p className="text-sm text-gray-600 mb-4">
                                If you need to generate a specific set, type here
                            </p>

                            <div className="flex flex-col space-y-4">
                                {/* Checkbox and Input for Sound 1 */}
                                <div className="flex items-center space-x-4">
                                    <input
                                        type="checkbox"
                                        id="checkbox1"
                                        checked={isChecked1}
                                        onChange={() => setIsChecked1(!isChecked1)}
                                        disabled={disableInputs}
                                    />
                                    <label htmlFor="sound1" className="text-sm font-medium text-gray-900">Sound 1</label>
                                    <input
                                        type="text"
                                        id="sound1"
                                        value={sound1}
                                        onChange={(e) => setSound1(e.target.value)}
                                        disabled={!isChecked1 || disableInputs}
                                        className={`border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${(!isChecked1 || disableInputs) ? 'bg-gray-100' : ''}`}
                                    />
                                </div>

                                {/* Checkbox and Input for Sound 2 */}
                                <div className="flex items-center space-x-4">
                                    <input
                                        type="checkbox"
                                        id="checkbox2"
                                        checked={isChecked2}
                                        onChange={() => setIsChecked2(!isChecked2)}
                                        disabled={disableInputs}
                                    />
                                    <label htmlFor="sound2" className="text-sm font-medium text-gray-900">Sound 2</label>
                                    <input
                                        type="text"
                                        id="sound2"
                                        value={sound2}
                                        onChange={(e) => setSound2(e.target.value)}
                                        disabled={!isChecked2 || disableInputs}
                                        className={`border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${(!isChecked2 || disableInputs) ? 'bg-gray-100' : ''}`}
                                    />
                                </div>

                                {/* Checkbox and Input for Sound 3 */}
                                <div className="flex items-center space-x-4">
                                    <input
                                        type="checkbox"
                                        id="checkbox3"
                                        checked={isChecked3}
                                        onChange={() => setIsChecked3(!isChecked3)}
                                        disabled={disableInputs}
                                    />
                                    <label htmlFor="sound3" className="text-sm font-medium text-gray-900">Sound 3</label>
                                    <input
                                        type="text"
                                        id="sound3"
                                        value={sound3}
                                        onChange={(e) => setSound3(e.target.value)}
                                        disabled={!isChecked3 || disableInputs}
                                        className={`border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${(!isChecked3 || disableInputs) ? 'bg-gray-100' : ''}`}
                                    />
                                </div>

                                <button
                                    onClick={handleGenerateSound}
                                    disabled={disableInputs}
                                    className="bg-purple-600 text-white py-2 rounded-lg font-medium hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-300 cursor-pointer"
                                >
                                    Generate Sound
                                </button>
                            </div>
                        </div>

                        {/* Second column */}
                        <div className="flex flex-col flex-1 space-y-4">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                Generate Initial Set
                            </h3>
                            <p className="text-sm text-gray-600 mb-4">
                                Generate a sound set for initial actions
                            </p>

                            <button
                                onClick={handleGenerateSimpleSound}
                                disabled={disableInputs}
                                className="bg-purple-600 text-white py-2 rounded-lg font-medium hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-300 cursor-pointer"
                            >
                                Generate Sound
                            </button>

                            {/* Sound Preview Box */}
                            {showPreview && (
                                <div className="mt-4 p-4 border rounded-lg bg-gray-50">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                        Sound Preview
                                    </h3>
                                    <p className="text-sm text-gray-600 mb-4">
                                        Preview the sound set you have generated.
                                    </p>
                                    <div className="flex space-x-4">
                                        <button
                                            onClick={handleGenerateAgain}
                                            className="bg-red-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 cursor-pointer"
                                        >
                                            Generate Again
                                        </button>
                                        <button
                                            onClick={handleSave}
                                            className="bg-green-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300 cursor-pointer"
                                        >
                                            Save
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

AwarenessSoundGenerate.propTypes = {
    visible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    getData: PropTypes.func.isRequired,
};