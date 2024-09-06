import React, { useState } from "react";
import { X } from "lucide-react";
import PropTypes from "prop-types";

import Ling6SeparateService from "../../../services/AwarenessSerivce/Ling6Separate.service";

export default function Ling6SeparateGenerate({ visible, onClose, getData }) {
    if (!visible) {
        return null;
    }

    // State for checkboxes
    const [isVoiceChecked, setIsVoiceChecked] = useState(false);
    const [isRateChecked, setIsRateChecked] = useState(false);
    const [isPitchChecked, setIsPitchChecked] = useState(false);

    const [generatedData, setGeneratedData] = useState({});

    // State to manage loading state
    const [loading, setLoading] = useState(false);

    // State for input values
    const [voice, setVoice] = useState("");
    const [rate, setRate] = useState("");
    const [pitch, setPitch] = useState("");

    // State to control preview box visibility and disable inputs
    const [showPreview, setShowPreview] = useState(false);
    const [disableInputs, setDisableInputs] = useState(false);

    // State for error message
    const [error, setError] = useState("");

    const validateInputs = () => {
        setError(""); // Reset error message

        // Check if any checked attribute has no input value
        if ((isVoiceChecked && !voice) ||
            (isRateChecked && !rate) ||
            (isPitchChecked && !pitch)) {
            setError("Please fill in the values for all checked attributes.");
            return false;
        }
        return true;
    };

    const generateSounds = () => {
        if (validateInputs()) {
            // Collect only the checked attributes

            setLoading(true);

            const selectedAttributes = {
                voice: isVoiceChecked ? voice : null,
                rate: isRateChecked ? rate : null,
                pitch: isPitchChecked ? pitch : null,
            };

            // Disable inputs and show preview box
            setDisableInputs(true);
            setShowPreview(true);

            console.log(selectedAttributes);

            // Call the service to generate sounds
            Ling6SeparateService.generateLing6Separate(selectedAttributes)
                .then((response) => {
                    console.log(response);
                    setGeneratedData(response);
                })
                .catch((error) => {
                    console.error(error);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }

    const generateAgain = () => {

        // delete prev one
        Ling6SeparateService.deleteLing6Separate(generatedData._id)
            .then(() => {
                console.log('Deleted previous generated data');
            })
            .catch((error) => {
                console.error(error);
            });

        // Reset all states
        setGeneratedData({});
        setShowPreview(false);
        setDisableInputs(false);
    }

    const handleSave = () => {
        setGeneratedData({});
        setShowPreview(false);
        setDisableInputs(false);
        setIsPitchChecked(false);
        setIsRateChecked(false);
        setIsVoiceChecked(false);
        setGeneratedData({});

        onClose();
        getData();
    }

    return (
        <div
            className="fixed inset-0 bg-opacity-20 backdrop-blur-sm bg-black flex justify-center items-center"
            aria-modal="true"
        >
            <div className="bg-white rounded-xl relative w-5/6 lg:w-1/2">
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
                        Ling6 All Generate
                    </h1>
                </div>

                {/* Modal Content */}
                <div className="font-montserrat p-2 lg:p-4 lg:px-8">
                    <div className="flex flex-col space-y-4">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            Set Attributes
                        </h3>
                        <p className="text-sm text-gray-600 mb-4">
                            Configure the following attributes for sound generation:
                        </p>

                        {/* Checkboxes and Inputs */}
                        <div className="flex flex-col space-y-4">
                            {/* Checkbox and Input for Voice */}
                            <div className={`flex items-center space-x-4 ${disableInputs ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
                                <input
                                    type="checkbox"
                                    id="voice"
                                    checked={isVoiceChecked}
                                    onChange={() => setIsVoiceChecked(!isVoiceChecked)}
                                    disabled={disableInputs}
                                    className={disableInputs ? 'cursor-not-allowed' : 'cursor-pointer'}
                                />
                                <label htmlFor="voice" className="text-sm font-medium text-gray-900">Voice</label>
                                <select
                                    id="voiceInput"
                                    value={voice}
                                    onChange={(e) => setVoice(e.target.value)}
                                    disabled={!isVoiceChecked || disableInputs}
                                    className={`w-[200px] border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${(!isVoiceChecked || disableInputs) ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                                >
                                    <option value="">Select Voice</option>
                                    <option value="en-US-AriaNeural">en-US-AriaNeural</option>
                                    <option value="en-US-GuyNeural">en-US-GuyNeural</option>
                                    <option value="en-US-DavisNeural">en-US-DavisNeural</option>
                                    <option value="en-US-JennyNeural">en-US-JennyNeural</option>
                                </select>
                                <input
                                    type="checkbox"
                                    id="rate"
                                    checked={isRateChecked}
                                    onChange={() => setIsRateChecked(!isRateChecked)}
                                    disabled={disableInputs}
                                    className={disableInputs ? 'cursor-not-allowed' : 'cursor-pointer'}
                                />
                                <label htmlFor="rate" className="text-sm font-medium text-gray-900">Rate&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                                <select
                                    id="rateInput"
                                    value={rate}
                                    onChange={(e) => setRate(e.target.value)}
                                    disabled={!isRateChecked || disableInputs}
                                    className={`w-[200px] border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${(!isRateChecked || disableInputs) ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                                >
                                    <option value="">Select Rate</option>
                                    <option value="0%">0%</option>
                                    <option value="-25%">-25%</option>
                                    <option value="-50%">-50%</option>
                                </select>
                            </div>


                            {/* Checkbox and Input for Pitch */}
                            <div className={`flex items-center space-x-4 ${disableInputs ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
                                <input
                                    type="checkbox"
                                    id="pitch"
                                    checked={isPitchChecked}
                                    onChange={() => setIsPitchChecked(!isPitchChecked)}
                                    disabled={disableInputs}
                                    className={disableInputs ? 'cursor-not-allowed' : 'cursor-pointer'}
                                />
                                <label htmlFor="pitch" className="text-sm font-medium text-gray-900">Pitch</label>
                                <select
                                    id="pitchInput"
                                    value={pitch}
                                    onChange={(e) => setPitch(e.target.value)}
                                    disabled={!isPitchChecked || disableInputs}
                                    className={`w-[200px] border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${(!isPitchChecked || disableInputs) ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                                >
                                    <option value="">Select Pitch</option>
                                    <option value="-25%">-25%</option>
                                    <option value="0%">0%</option>
                                    <option value="25%">25%</option>
                                </select>
                            </div>

                            {error && (
                                <p className="text-red-500 text-sm">{error}</p>
                            )}

                            <button
                                onClick={generateSounds}
                                disabled={disableInputs}
                                className={`bg-purple-600 text-white py-2 rounded-lg font-medium hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-300 ${disableInputs ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                            >
                                Generate
                            </button>
                        </div>

                        {/* Loading state */}
                        {loading && (
                            <div className="mb-4 text-blue-600 text-sm font-semibold">
                                Generating Sounds... Please wait.
                            </div>
                        )}

                        {/* Preview Box */}
                        {showPreview && !loading && (
                            <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                                <h4 className="text-lg font-semibold text-gray-800 mb-2">Preview:</h4>
                                <p className="text-sm text-gray-700 mb-4">Here is a preview of the generated sounds with the selected attributes.</p>
                                <div className="grid grid-cols-2 gap-4">
                                    {generatedData.sounds && generatedData.sounds.map((sound) => (
                                        <div key={sound._id} className="flex items-center space-x-4">
                                            <span className="text-sm font-medium text-gray-900">{sound.sound}</span>
                                            <audio controls>
                                                <source src={sound.soundUrl} type="audio/wav" />
                                                Your browser does not support the audio element.
                                            </audio>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-4 flex space-x-4">
                                    <button
                                        onClick={generateAgain}
                                        className="bg-yellow-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                                    >
                                        Generate Again
                                    </button>
                                    <button
                                        onClick={handleSave}
                                        className="bg-green-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
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
    );
}

Ling6SeparateGenerate.propTypes = {
    visible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    getData: PropTypes.func.isRequired,
};