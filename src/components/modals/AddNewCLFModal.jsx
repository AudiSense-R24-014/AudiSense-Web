import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import PropTypes from "prop-types";
import CLFService from "../../services/CLF.service";
import Swal from "sweetalert2";

export default function AddNewCLFModal({ visible, onClose, patient }) {
    const [formData, setFormData] = useState({
        patient: "",
        date: "",
        basic: {
            device: "",
            aidedAge: "",
            implantAge: "",
            listeningAge: "",
            AVorOther: "",
        },
        lingSounds: {
            detect: "",
            distanceDetect: "",
            imitate: "",
            distanceImitate: "",
            additionalConditions: "",
        },
        hearingLoss: {
            degree: "",
            etiology: "",
        },
        audition: {
            auditionComments: "",
            auditionLevel: "",
        },
        language: {
            receptiveVocabulary: "",
            receptiveLevel: "",
            expressiveVocabulary: "",
            expressiveLevel: "",
            MLU: "",
            BnLphaseorCASLLS: "",
        },
        speechProduction: {
            vowels: "",
            vowelsLevel: "",
            consonants: "",
            consonantsLevel: "",
            intelligibility: "",
            vocalQuality: "",
        },
        generalDevelopment: {
            fineMotor: "",
            grossMotor: "",
            nonVerbalCognition: "",
            language: "",
            selfHelp: "",
            socialEmotional: "",
        },
        concerns: "", // For storing concerns
        CLFAge: "", // To capture the CLF Age
    });

    useEffect(() => {
        setFormData((prevState) => ({
            ...prevState,
            patient: patient._id,
        }));
    }, [patient]);

    const [step, setStep] = useState(1); // Step control state

    const handleNext = () => {
        setStep(step + 1); // Move to the next step
    };

    const handlePrevious = () => {
        setStep(step - 1); // Go back to the previous step
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const updateNestedField = (path, value, obj) => {
            const keys = path.split(".");
            let current = obj;
            keys.forEach((key, index) => {
                if (index === keys.length - 1) {
                    current[key] = value;
                } else {
                    current[key] = current[key] || {};
                    current = current[key];
                }
            });
        };

        setFormData((prevState) => {
            const updatedFormData = { ...prevState };
            updateNestedField(name, value, updatedFormData);
            return updatedFormData;
        });
    };
    const addCLF = (e) => {
        e.preventDefault();

        Swal.fire({
            title: "Are you sure?",
            text: "Do you want to add this CLF Record?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, add it!",
        }).then((result) => {
            if (result.isConfirmed) {
                CLFService.createCLF(formData)
                    .then(() => {
                        Swal.fire({
                            title: "Success!",
                            text: "CLF Record added successfully",
                            icon: "success",
                        }).finally(window.location.reload());
                    })
                    .catch((err) => {
                        console.error("Error adding CLF Record: ", err);
                        Swal.fire({
                            title: "Error",
                            text: "Failed to add CLF Record",
                            icon: "error",
                        });
                    });
            }
        });
    };

    if (!visible) {
        return null;
    }

    return (
        <div
            className="fixed inset-0 bg-opacity-20 backdrop-blur-sm bg-black flex justify-center items-center py-2"
            aria-modal="true"
        >
            <div className="bg-white rounded-xl relative w-full max-w-3xl mx-4 sm:mx-8 lg:w-2/3 xl:w-1/2 overflow-auto max-h-full p-4 sm:p-6 lg:p-8">
                <div className="border-b-2 p-2 lg:p-4 lg:px-8">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-1 rounded-lg text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-600"
                        aria-label="Close"
                    >
                        <X />
                    </button>
                    <h1 className="font-bold font-montserrat text-lg">
                        Add New CLF Record
                    </h1>
                    {/* Navigation Buttons */}
                    <div className="flex space-x-1 mt-2">
                        {[
                            "Basic Information & Hearing Profile",
                            "Communication Skills",
                            "Development & Assessment",
                        ].map((label, index) => (
                            <div className="flex flex-row" key={label}>
                                <button
                                    onClick={() => setStep(index + 1)}
                                    className={`${
                                        step === index + 1
                                            ? "bg-purple-700 text-white"
                                            : "bg-gray-200 text-gray-600"
                                    } px-2 py-1 rounded text-xs font-nunito`}
                                >
                                    {label}
                                </button>
                                {index < 2 && <div>{" > "}</div>}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="font-montserrat p-2 lg:p-4 lg:px-8">
                    <form className="space-y-6 px-4" onSubmit={addCLF}>
                        {/* Step 1 */}
                        {step === 1 && (
                            <>
                                {/* First Name and Last Name */}
                                <h1 className="font-bold font-montserrat text-base ">
                                    Primary Details
                                </h1>
                                <div className="flex-1">
                                        <label
                                            htmlFor="date"
                                            className="block mb-2 text-sm font-medium text-gray-900"
                                        >
                                            Date
                                        </label>
                                        <input
                                            type="date"
                                            name="date"
                                            id="date"
                                            className="input-field"
                                            value={formData?.date}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-8">
                                    <div className="flex-1">
                                        <label
                                            htmlFor="basic.device"
                                            className="block mb-2 text-sm font-medium text-gray-900"
                                        >
                                            Device
                                        </label>
                                        <input
                                            type="text"
                                            name="basic.device"
                                            id="basic.device"
                                            className="input-field"
                                            placeholder="Device"
                                            value={formData?.basic?.device}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <label
                                            htmlFor="basic.aidedAge"
                                            className="block mb-2 text-sm font-medium text-gray-900"
                                        >
                                            Aided Age
                                        </label>
                                        <input
                                            type="text"
                                            name="basic.aidedAge"
                                            id="basic.aidedAge"
                                            className="input-field"
                                            placeholder="Aided Age"
                                            value={formData?.basic?.aidedAge}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-8">
                                    <div className="flex-1">
                                        <label
                                            htmlFor="basic.implantAge"
                                            className="block mb-2 text-sm font-medium text-gray-900"
                                        >
                                            Implant Age
                                        </label>
                                        <input
                                            type="text"
                                            name="basic.implantAge"
                                            id="basic.implantAge"
                                            className="input-field"
                                            placeholder="Implant Age"
                                            value={formData?.basic?.implantAge}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <label
                                            htmlFor="basic.listeningAge"
                                            className="block mb-2 text-sm font-medium text-gray-900"
                                        >
                                            Listening Age
                                        </label>
                                        <input
                                            type="text"
                                            name="basic.listeningAge"
                                            id="basic.listeningAge"
                                            className="input-field"
                                            placeholder="Listening Age"
                                            value={
                                                formData?.basic?.listeningAge
                                            }
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-8">
                                    <div className="flex-1">
                                        <label
                                            htmlFor="basic.AVorOther"
                                            className="block mb-2 text-sm font-medium text-gray-900"
                                        >
                                            AV/Other
                                        </label>
                                        <input
                                            type="text"
                                            name="basic.AVorOther"
                                            id="basic.AVorOther"
                                            className="input-field"
                                            placeholder="AV/Other"
                                            value={formData?.basic?.AVorOther}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                                <h1 className="font-bold font-montserrat text-base ">
                                    Ling Sounds
                                </h1>
                                <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-8">
                                    <div className="flex-1">
                                        <label
                                            htmlFor="lingSounds.detect"
                                            className="block mb-2 text-sm font-medium text-gray-900"
                                        >
                                            Detect
                                        </label>
                                        <input
                                            type="text"
                                            name="lingSounds.detect"
                                            id="lingSounds.detect"
                                            className="input-field"
                                            placeholder="Detection"
                                            value={formData?.lingSounds?.detect}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <label
                                            htmlFor="lingSounds.distanceDetect"
                                            className="block mb-2 text-sm font-medium text-gray-900"
                                        >
                                            Detect Distance
                                        </label>
                                        <input
                                            type="text"
                                            name="lingSounds.distanceDetect"
                                            id="lingSounds.distanceDetect"
                                            className="input-field"
                                            placeholder="Detection Distance"
                                            value={
                                                formData?.lingSounds
                                                    ?.distanceDetect
                                            }
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-8">
                                    <div className="flex-1">
                                        <label
                                            htmlFor="lingSounds.imitate"
                                            className="block mb-2 text-sm font-medium text-gray-900"
                                        >
                                            Imitate/Identify
                                        </label>
                                        <input
                                            type="text"
                                            name="lingSounds.imitate"
                                            id="lingSounds.imitate"
                                            className="input-field"
                                            placeholder="Imitation/Identification"
                                            value={
                                                formData?.lingSounds?.imitate
                                            }
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <label
                                            htmlFor="lingSounds.imitateDistance"
                                            className="block mb-2 text-sm font-medium text-gray-900"
                                        >
                                            Imitate Distance
                                        </label>
                                        <input
                                            type="text"
                                            name="lingSounds.imitateDistance"
                                            id="lingSounds.imitateDistance"
                                            className="input-field"
                                            placeholder="Imitate Distance"
                                            value={
                                                formData?.lingSounds
                                                    ?.imitateDistance
                                            }
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-8 my-2">
                                    {/* Complaints Text Area */}
                                    <div className="flex-1">
                                        <label
                                            htmlFor="lingSounds.additionalConditions"
                                            className="block mb-2 text-sm font-medium text-gray-900"
                                        >
                                            Additional Conditions
                                        </label>
                                        <textarea
                                            name="lingSounds.additionalConditions"
                                            id="lingSounds.additionalConditions"
                                            className="input-field"
                                            placeholder="Enter Additional Conditions"
                                            rows="6" // Adjust as needed
                                            value={
                                                formData?.lingSounds
                                                    ?.additionalConditions
                                            }
                                            onChange={handleInputChange}
                                        ></textarea>
                                    </div>
                                </div>
                                <h1 className="font-bold font-montserrat text-base ">
                                    Hearing Loss
                                </h1>
                                {/* Date of Birth and Gender */}
                                <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-8">
                                    <div className="flex-1">
                                        <label
                                            htmlFor="hearingLoss.degree"
                                            className="block mb-2 text-sm font-medium text-gray-900"
                                        >
                                            Degree
                                        </label>
                                        <input
                                            type="text"
                                            name="hearingLoss.degree"
                                            id="hearingLoss.degree"
                                            className="input-field"
                                            placeholder="Degree of Hearing Loss"
                                            value={
                                                formData?.hearingLoss?.degree
                                            }
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <label
                                            htmlFor="hearingLoss.etiology"
                                            className="block mb-2 text-sm font-medium text-gray-900"
                                        >
                                            Etiology
                                        </label>
                                        <input
                                            type="text"
                                            name="hearingLoss.etiology"
                                            id="hearingLoss.etiology"
                                            className="input-field"
                                            placeholder="Etiology"
                                            value={
                                                formData?.hearingLoss?.etiology
                                            }
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                                <h1 className="font-bold font-montserrat text-base ">
                                    Audition
                                </h1>
                                <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-8 my-2">
                                    {/* Complaints Text Area */}
                                    <div className="flex-1">
                                        <label
                                            htmlFor="audition.auditionComments"
                                            className="block mb-2 text-sm font-medium text-gray-900"
                                        >
                                            Audition Comments
                                        </label>
                                        <textarea
                                            name="audition.auditionComments"
                                            id="audition.auditionComments"
                                            className="input-field"
                                            placeholder="Enter Comments for Auditions"
                                            rows="6" // Adjust as needed
                                            value={
                                                formData?.audition
                                                    ?.auditionComments
                                            }
                                            onChange={handleInputChange}
                                        ></textarea>
                                    </div>
                                    <div className="flex-1">
                                        <label
                                            htmlFor="audition.auditionLevel"
                                            className="block mb-2 text-sm font-medium text-gray-900"
                                        >
                                            Audition Ability Level
                                        </label>
                                        <input
                                            type="text"
                                            name="audition.auditionLevel"
                                            id="audition.auditionLevel"
                                            className="input-field"
                                            placeholder="Enter Level"
                                            value={
                                                formData?.audition
                                                    ?.auditionLevel
                                            }
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                                {/* Other inputs for step 1 */}
                                <div className="flex justify-end py-4">
                                    <button
                                        type="button"
                                        className="text-white bg-audi-purple hover:bg-purple-900 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-8 py-2.5"
                                        onClick={handleNext}
                                    >
                                        Next
                                    </button>
                                </div>
                            </>
                        )}
                        {step === 2 && (
                            <div>
                                {/* contactNo and email */}
                                <h1 className="font-bold font-montserrat text-base ">
                                    Language
                                </h1>
                                <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-8 my-2">
                                    <div className="flex-1">
                                        <label
                                            htmlFor="language.receptiveVocabulary"
                                            className="block mb-2 text-sm font-medium text-gray-900"
                                        >
                                            Receptive Vocabulary
                                        </label>
                                        <textarea
                                            name="language.receptiveVocabulary"
                                            id="language.receptiveVocabulary"
                                            className="input-field"
                                            placeholder="Enter Comments for Receptive Vocabulary"
                                            rows="6" // Adjust as needed
                                            value={
                                                formData?.language
                                                    ?.receptiveVocabulary
                                            }
                                            onChange={handleInputChange}
                                        ></textarea>
                                    </div>
                                    <div className="flex-1">
                                        <label
                                            htmlFor="language.receptiveLevel"
                                            className="block mb-2 text-sm font-medium text-gray-900"
                                        >
                                            Receptive Ability Level
                                        </label>
                                        <input
                                            type="text"
                                            name="language.receptiveLevel"
                                            id="language.receptiveLevel"
                                            className="input-field"
                                            placeholder="Enter Level"
                                            value={
                                                formData?.language
                                                    ?.receptiveLevel
                                            }
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-8 my-2">
                                    <div className="flex-1">
                                        <label
                                            htmlFor="language.expressiveVocabulary"
                                            className="block mb-2 text-sm font-medium text-gray-900"
                                        >
                                            Expressive Vocabulary
                                        </label>
                                        <textarea
                                            name="language.expressiveVocabulary"
                                            id="language.expressiveVocabulary"
                                            className="input-field"
                                            placeholder="Enter Comments for Expressive Vocabulary"
                                            rows="6" // Adjust as needed
                                            value={
                                                formData?.language
                                                    ?.expressiveVocabulary
                                            }
                                            onChange={handleInputChange}
                                        ></textarea>
                                    </div>
                                    <div className="flex-1">
                                        <label
                                            htmlFor="language.expressiveLevel"
                                            className="block mb-2 text-sm font-medium text-gray-900"
                                        >
                                            Expressive Ability Level
                                        </label>
                                        <input
                                            type="text"
                                            name="language.expressiveLevel"
                                            id="language.expressiveLevel"
                                            className="input-field"
                                            placeholder="Enter Level"
                                            value={
                                                formData?.language
                                                    ?.expressiveLevel
                                            }
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-8 my-2">
                                    <div className="flex-1">
                                        <label
                                            htmlFor="language.MLU"
                                            className="block mb-2 text-sm font-medium text-gray-900"
                                        >
                                            MLU
                                        </label>
                                        <input
                                            type="text"
                                            name="language.MLU"
                                            id="language.MLU"
                                            className="input-field"
                                            placeholder="MLU"
                                            value={formData?.language?.MLU}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <label
                                            htmlFor="language.BnLphaseorCASLLS"
                                            className="block mb-2 text-sm font-medium text-gray-900"
                                        >
                                            B&L phase or CASLLS Band
                                        </label>
                                        <input
                                            type="text"
                                            name="language.BnLphaseorCASLLS"
                                            id="language.BnLphaseorCASLLS"
                                            className="input-field"
                                            placeholder="Enter"
                                            value={
                                                formData?.language
                                                    ?.BnLphaseorCASLLS
                                            }
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                                <h1 className="font-bold font-montserrat text-base  mt-5 mb-2">
                                    Speech Production
                                </h1>
                                <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-8 py-2">
                                    <div className="flex-1">
                                        <label
                                            htmlFor="speechProduction.vowels"
                                            className="block mb-2 text-sm font-medium text-gray-900"
                                        >
                                            Vowels/Diphthongs
                                        </label>
                                        <input
                                            type="text"
                                            name="speechProduction.vowels"
                                            id="speechProduction.vowels"
                                            className="input-field"
                                            placeholder="Vowels/Diphthongs"
                                            value={
                                                formData?.speechProduction
                                                    ?.vowels
                                            }
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <label
                                            htmlFor="speechProduction.vowelsLevel"
                                            className="block mb-2 text-sm font-medium text-gray-900"
                                        >
                                            Vowels Level
                                        </label>
                                        <input
                                            type="text"
                                            name="speechProduction.vowelsLevel"
                                            id="speechProduction.vowelsLevel"
                                            className="input-field"
                                            placeholder="Vowels Level"
                                            value={
                                                formData?.speechProduction
                                                    ?.vowelsLevel
                                            }
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-8 py-2">
                                    <div className="flex-1">
                                        <label
                                            htmlFor="speechProduction.consonants"
                                            className="block mb-2 text-sm font-medium text-gray-900"
                                        >
                                            Consonants
                                        </label>
                                        <input
                                            type="text"
                                            name="speechProduction.consonants"
                                            id="speechProduction.consonants"
                                            className="input-field"
                                            placeholder="Consonants"
                                            value={
                                                formData?.speechProduction
                                                    ?.consonants
                                            }
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <label
                                            htmlFor="speechProduction.consonantsLevel"
                                            className="block mb-2 text-sm font-medium text-gray-900"
                                        >
                                            Consonants Level
                                        </label>
                                        <input
                                            type="text"
                                            name="speechProduction.consonantsLevel"
                                            id="speechProduction.consonantsLevel"
                                            className="input-field"
                                            placeholder="Consonants Level"
                                            value={
                                                formData?.speechProduction
                                                    ?.consonantsLevel
                                            }
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-8 py-2">
                                    <div className="flex-1">
                                        <label
                                            htmlFor="speechProduction.intelligibility"
                                            className="block mb-2 text-sm font-medium text-gray-900"
                                        >
                                            Intelligibility
                                        </label>
                                        <input
                                            type="text"
                                            name="speechProduction.intelligibility"
                                            id="speechProduction.intelligibility"
                                            className="input-field"
                                            placeholder="Intelligibility"
                                            value={
                                                formData?.speechProduction
                                                    ?.intelligibility
                                            }
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <label
                                            htmlFor="speechProduction.vocalQuality"
                                            className="block mb-2 text-sm font-medium text-gray-900"
                                        >
                                            Vocal Quality
                                        </label>
                                        <input
                                            type="text"
                                            name="speechProduction.vocalQuality"
                                            id="speechProduction.vocalQuality"
                                            className="input-field"
                                            placeholder="Vocal Quality"
                                            value={
                                                formData?.speechProduction
                                                    ?.vocalQuality
                                            }
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                                {/* Navigation buttons */}
                                <div className="flex justify-between py-4">
                                    <button
                                        type="button"
                                        className="bg-gray-300 hover:bg-gray-500 text-black font-medium rounded-lg text-sm px-8 py-2.5"
                                        onClick={handlePrevious}
                                    >
                                        Previous
                                    </button>
                                    <button
                                        type="button"
                                        className="text-white bg-audi-purple hover:bg-purple-900 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-8 py-2.5"
                                        onClick={handleNext}
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        )}
                        {step === 3 && (
                            <div>
                                <h1 className="font-bold font-montserrat text-base ">
                                    General Development
                                </h1>
                                <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-8 my-2">
                                    <div className="flex-1">
                                        <label
                                            htmlFor="generalDevelopment.fineMotor"
                                            className="block mb-2 text-sm font-medium text-gray-900"
                                        >
                                            Fine Motor
                                        </label>
                                        <input
                                            type="text"
                                            name="generalDevelopment.fineMotor"
                                            id="generalDevelopment.fineMotor"
                                            className="input-field"
                                            placeholder="Fine Motor"
                                            value={
                                                formData?.generalDevelopment
                                                    ?.fineMotor
                                            }
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <label
                                            htmlFor="generalDevelopment.grossMotor"
                                            className="block mb-2 text-sm font-medium text-gray-900"
                                        >
                                            Gross Motor
                                        </label>
                                        <input
                                            type="text"
                                            name="generalDevelopment.grossMotor"
                                            id="generalDevelopment.grossMotor"
                                            className="input-field"
                                            placeholder="Gross Motor"
                                            value={
                                                formData?.generalDevelopment
                                                    ?.grossMotor
                                            }
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-8 py-2">
                                    <div className="flex-1">
                                        <label
                                            htmlFor="generalDevelopment.nonVerbalCognition"
                                            className="block mb-2 text-sm font-medium text-gray-900"
                                        >
                                            Non-Verbal Cognition
                                        </label>
                                        <input
                                            type="text"
                                            name="generalDevelopment.nonVerbalCognition"
                                            id="generalDevelopment.nonVerbalCognition"
                                            className="input-field"
                                            placeholder="Non-Verbal Cognition"
                                            value={
                                                formData?.generalDevelopment
                                                    ?.nonVerbalCognition
                                            }
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <label
                                            htmlFor="generalDevelopment.language"
                                            className="block mb-2 text-sm font-medium text-gray-900"
                                        >
                                            Language
                                        </label>
                                        <input
                                            type="text"
                                            name="generalDevelopment.language"
                                            id="generalDevelopment.language"
                                            className="input-field"
                                            placeholder="Language"
                                            value={
                                                formData?.generalDevelopment
                                                    ?.language
                                            }
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-8 py-2">
                                    <div className="flex-1">
                                        <label
                                            htmlFor="generalDevelopment.selfHelp"
                                            className="block mb-2 text-sm font-medium text-gray-900"
                                        >
                                            Self Help
                                        </label>
                                        <input
                                            type="text"
                                            name="generalDevelopment.selfHelp"
                                            id="generalDevelopment.selfHelp"
                                            className="input-field"
                                            placeholder="Self Help"
                                            value={
                                                formData?.generalDevelopment
                                                    ?.selfHelp
                                            }
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <label
                                            htmlFor="generalDevelopment.socialEmotional"
                                            className="block mb-2 text-sm font-medium text-gray-900"
                                        >
                                            Social Emotional
                                        </label>
                                        <input
                                            type="text"
                                            name="generalDevelopment.socialEmotional"
                                            id="generalDevelopment.socialEmotional"
                                            className="input-field"
                                            placeholder="Social Emotional"
                                            value={
                                                formData?.generalDevelopment
                                                    ?.socialEmotional
                                            }
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                                {/* contactNo and email */}
                                <h1 className="font-bold font-montserrat text-base mt-5 mb-2">
                                    Concerns
                                </h1>
                                <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-8">
                                    <div className="flex-1">
                                        <textarea
                                            name="concerns"
                                            id="concerns"
                                            className="input-field"
                                            placeholder="Concerns"
                                            rows="6" // Adjust as needed
                                            value={formData?.concerns}
                                            onChange={handleInputChange}
                                        ></textarea>
                                    </div>
                                </div>
                                <h1 className="font-bold font-montserrat text-base  mt-5 mb-2">
                                    CLF Age
                                </h1>
                                <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-8">
                                    <div className="flex-1">
                                        <input
                                            type="text"
                                            name="CLFAge"
                                            id="CLFAge"
                                            className="input-field"
                                            placeholder="Enter CLF Age"
                                            value={formData?.CLFAge}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                                {/* Navigation buttons */}
                                <div className="flex justify-between py-4 mt-3">
                                    <button
                                        type="button"
                                        className="bg-gray-300 hover:bg-gray-500 text-black font-medium rounded-lg text-sm px-8 py-2.5"
                                        onClick={handlePrevious}
                                    >
                                        Previous
                                    </button>
                                    <button
                                        type="submit"
                                        className="text-white bg-audi-purple hover:bg-purple-900 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-8 py-2.5"
                                    >
                                        Create CLF Record
                                    </button>
                                </div>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
}

AddNewCLFModal.propTypes = {
    visible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    patient: PropTypes.object.isRequired,
};
