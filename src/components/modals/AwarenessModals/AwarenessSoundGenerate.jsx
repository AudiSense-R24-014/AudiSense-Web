import React, { useState } from "react";
import { X } from "lucide-react";
import PropTypes from "prop-types";

import AwarenessBasicService from "../../../services/AwarenessSerivce/AwarenessBasic.service";

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

    // State to manage loading state
    const [loading, setLoading] = useState(false);

    // State to track which function was used for generating
    const [generateFunction, setGenerateFunction] = useState(false);
    const [generateSimpleFunction, setGenerateSimpleFunction] = useState(false);

    const [generatedSoundID, setGeneratedSoundID] = useState(null);

    // State to store generated sounds
    const [generatedSounds, setGeneratedSounds] = useState([]);

    // State to handle error messages
    const [errorMessage, setErrorMessage] = useState("");

    if (!visible) {
        return null;
    }

    // Function to handle sound generation
    const handleGenerateSound = () => {
        setGenerateFunction(true);
        setLoading(true);
        setDisableInputs(true);
        setErrorMessage("");

        const selectedSounds = {
            sound1: isChecked1 ? sound1 : null,
            sound2: isChecked2 ? sound2 : null,
            sound3: isChecked3 ? sound3 : null,
        };

        if (!selectedSounds.sound1 && !selectedSounds.sound2 && !selectedSounds.sound3) {
            setErrorMessage("Please select at least one sound to generate.");
            setLoading(false);
            return;
        }

        AwarenessBasicService.generateAwarenessSounds(selectedSounds)
            .then((response) => {
                console.log(response);
                setGeneratedSoundID(response.id);
                setGeneratedSounds(response.sounds); // Store generated sounds
                setShowPreview(true);
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => {
                setLoading(false);
                setDisableInputs(true);
            });
    };

    const handleGenerateSimpleSound = () => {
        setGenerateSimpleFunction(true);
        setLoading(true);
        setDisableInputs(true);

        AwarenessBasicService.generateAwarenessSounds()
            .then((response) => {
                console.log(response);
                setGeneratedSoundID(response._id);
                setGeneratedSounds(response.sounds); // Store generated sounds
                setShowPreview(true);
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleGenerateAgain = () => {

        AwarenessBasicService.deleteAwarenessSound(generatedSoundID)
            .then(() => {
                console.log("Record Deleted");
            })
            .catch((error) => {
                console.error(error);
            });


        setShowPreview(false);
        setDisableInputs(false);
        setErrorMessage("");
    };

    const handleSave = () => {
        setGenerateFunction(false);
        setGenerateSimpleFunction(false);
        // Add logic to save the generated sound
        setGeneratedSoundID(null);
        setGeneratedSounds([]);
        setShowPreview(false);
        setDisableInputs(false);


        onClose();
        getData();
    };

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
                        className={`absolute top-4 right-4 p-1 rounded-lg text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-600 ${disableInputs ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                        aria-label="Close"
                        disabled={disableInputs}
                    >
                        <X />
                    </button>
                    <h1 className="font-bold font-montserrat text-lg">
                        Awareness Sound Generate
                    </h1>
                </div>

                {/* Modal Content */}
                <div className="font-montserrat p-2 lg:p-4 lg:px-8">
                    {/* Error Message Display */}
                    {errorMessage && (
                        <div className="mb-4 text-red-600 text-sm font-semibold">
                            {errorMessage}
                        </div>
                    )}

                    {/* Loading state */}
                    {loading && (
                        <div className="mb-4 text-blue-600 text-sm font-semibold">
                            Generating Sounds... Please wait.
                        </div>
                    )}

                    {!loading && (
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
                                            className={`border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${(!isChecked1 || disableInputs) ? 'bg-gray-100' : ''} ${disableInputs ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                                        />
                                    </div>

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
                                            className={`border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${(!isChecked2 || disableInputs) ? 'bg-gray-100' : ''} ${disableInputs ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                                        />
                                    </div>

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
                                            className={`border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${(!isChecked3 || disableInputs) ? 'bg-gray-100' : ''} ${disableInputs ? 'cursor-not-allowed' : 'cursor-pointer'}`}
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
                                    If you want to generate a simple set, click below
                                </p>

                                <button
                                    onClick={handleGenerateSimpleSound}
                                    disabled={disableInputs}
                                    className="bg-purple-600 text-white py-2 rounded-lg font-medium hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-300 cursor-pointer"
                                >
                                    Generate Simple Sound
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Preview and action buttons */}
                    {showPreview && !loading && (
                        <div className="flex flex-col mt-4 space-y-4">
                            <h3 className="text-lg font-semibold text-gray-900">Preview</h3>
                            {generatedSounds.length > 0 ? (
                                generatedSounds.map((sound, index) => (
                                    <div key={index} className="mb-4">
                                        <p className="mb-2">Sound {index + 1}: {sound.name}</p>
                                        <audio controls>
                                            <source src={sound.url} type="audio/mpeg" />
                                            Your browser does not support the audio element.
                                        </audio>
                                        <p className="text-sm text-gray-600">{sound.description}</p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-sm text-gray-600">No sounds generated.</p>
                            )}

                            <div className="flex space-x-4">
                                <button
                                    onClick={handleGenerateAgain}
                                    className="bg-yellow-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-300 cursor-pointer"
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
    );
}

AwarenessSoundGenerate.propTypes = {
    visible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    getData: PropTypes.func.isRequired,
};