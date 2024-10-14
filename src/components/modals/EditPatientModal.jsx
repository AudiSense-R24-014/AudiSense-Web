import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import Select from "react-select";
import PropTypes from "prop-types";

import PatientService from "../../services/Patient.service";
import Swal from "sweetalert2";

const customSelectStyles = {
    control: (provided, state) => ({
        ...provided,
        borderColor: state.isFocused ? "transparent" : provided.borderColor,
        boxShadow: state.isFocused
            ? "0 0 0 4px rgba(192, 132, 252, 1)"
            : provided.boxShadow,
        "&:hover": {
            borderColor: state.isFocused
                ? "transparent"
                : provided["&:hover"].borderColor,
        },
    }),
    option: (provided, state) => {
        let backgroundColor;
        if (state.isSelected) {
            backgroundColor = "rgba(108, 38, 166, 0.8)";
        } else if (state.isFocused) {
            backgroundColor = "rgba(128, 90, 213, 0.2)";
        } else {
            backgroundColor = provided.backgroundColor;
        }

        const color = state.isSelected ? "white" : provided.color;

        return {
            ...provided,
            backgroundColor,
            color,
        };
    },
    singleValue: (provided, state) => ({
        ...provided,
        color: state.isSelected ? "rgba(108, 38, 166, 0.8)" : provided.color,
    }),
};

export default function EditPatientModal({ visible, onClose, patientId }) {
    if (!visible) {
        return null;
    }

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        dob: "",
        gender: undefined,
        email: "",
        contactNo: "",
        hearingAge: 0,
        implant: {
            isImplanted: undefined,
            surgeryDate: "",
            switchOnDate: "",
        },
        child: {
            complaint: "",
            handedness: "",
            onSet: {
                ageWhenNoticed: "",
                ageWhenFirstSight: "",
                treatmentHistory: "",
            },
            natalHistory: {
                previousPregnancies: "",
                preNatal: "",
                preNatalBirthCry: "",
                postNatal: "",
                birthWeight: "",
            },
            motorMilestones: {
                headHeldUp: "",
                turnedOver: "",
                crawling: "",
                walkingIndependently: "",
            },
            speechNLangMilestones: {
                babbling: "",
                firstWord: "",
                twoWordPhrases: "",
                sentences: "",
            },
            educationalHistory: {
                typeOfSchool: "",
                mediumOfInstruction: "",
                difficulties: "",
            },
            sensoryDevelopment: {
                responseToEnvSounds: "",
                responseToNameCall: "",
            },
            limitations: {
                motor: "",
                speech: "",
            },
            socialSkills: {
                socialSmile: "",
                initiatesInteractions: "",
                playsWithPeerGroup: "",
            },
            unsualBehaviours: "",
            communicationSkills: {
                audition: "",
                language: "",
                speech: "",
            },
            vegetativeSkillsOPEM: "",
            testResults: "",
            impression: "",
            recommendation: "",
        },
    });

    const [step, setStep] = useState(1); // Track the current step

    const genders = [
        { value: "Male", label: "Male" },
        { value: "Female", label: "Female" },
    ];

    const yesno = [
        { value: true, label: "Yes" },
        { value: false, label: "No" },
    ];

    const setupFormData = async () => {
        if (patientId) {
            await PatientService.getPatientById(patientId)
                .then((res) => {
                    setFormData(res);
                })
                .catch((err) => {
                    console.error(err);
                });
        }
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

    const handleGenderChange = (selectedOption) => {
        setFormData((prevState) => ({
            ...prevState,
            gender: selectedOption.value,
        }));
    };

    const handleIsImplantedChange = (selectedOption) => {
        setFormData((prevState) => ({
            ...prevState,
            implant: {
                ...prevState.implant,
                isImplanted: selectedOption.value,
            },
        }));
    };

    const updatePatient = (e) => {
        e.preventDefault();
        Swal.fire({
            title: "Are you sure?",
            text: "You are about to update patient details!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, update",
            cancelButtonText: "No, cancel",
        }).then((result) => {
            if (result.isConfirmed) {
                PatientService.updatePatient(patientId, formData)
                    .then(() => {
                        Swal.fire({
                            title: "Success!",
                            text: "Patient details updated successfully!",
                            icon: "success",
                        }).then(() => {
                            window.location.reload();
                        });
                    })
                    .catch((err) => {
                        Swal.fire({
                            title: "Error!",
                            text: "An error occurred while updating patient details!",
                            icon: "error",
                        });
                        console.error(err);
                    });
            }
        });
    };

    useEffect(() => {
        setupFormData();
    }, [patientId, visible]);

    return (
        <div
            className="fixed inset-0 bg-opacity-20 backdrop-blur-sm bg-black flex justify-center items-center py-2"
            aria-modal="true"
        >
            <div className="bg-white rounded-xl relative w-full  mx-4 sm:mx-8 lg:w-2/3 xl:w-5/6 overflow-auto max-h-full p-4 sm:p-6 lg:p-8">
                <div className="border-b-2 p-2 lg:p-4 lg:px-8">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-1 rounded-lg text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-600"
                        aria-label="Close"
                    >
                        <X />
                    </button>
                    <h1 className="font-bold font-montserrat text-lg">
                        Update Patient Details
                    </h1>
                </div>

                <div className="font-montserrat p-2 lg:p-4 lg:px-8">
                    <form className="space-y-6 px-4" onSubmit={updatePatient}>
                        {step === 1 && (
                            <div>
                                <div>
                                    {/* First Name and Last Name */}
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 my-2">
                                        <div className="flex-1">
                                            <label
                                                htmlFor="firstName"
                                                className="block mb-2 text-sm font-medium text-gray-900"
                                            >
                                                First Name
                                            </label>
                                            <input
                                                type="text"
                                                name="firstName"
                                                id="firstName"
                                                className="input-field"
                                                placeholder="First Name"
                                                value={formData?.firstName}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <label
                                                htmlFor="lastName"
                                                className="block mb-2 text-sm font-medium text-gray-900"
                                            >
                                                Last Name
                                            </label>
                                            <input
                                                type="text"
                                                name="lastName"
                                                id="lastName"
                                                className="input-field"
                                                placeholder="Last Name"
                                                value={formData?.lastName}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Date of Birth and Gender */}
                                    <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-8">
                                        <div className="flex-1">
                                            <label
                                                htmlFor="dob"
                                                className="block mb-2 text-sm font-medium text-gray-900"
                                            >
                                                Date of Birth
                                            </label>
                                            <input
                                                type="date"
                                                name="dob"
                                                id="dob"
                                                className="input-field"
                                                placeholder="Date of Birth"
                                                value={
                                                    formData?.dob.split("T")[0]
                                                }
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>

                                        <div className="flex-1">
                                            <label
                                                htmlFor="gender"
                                                className="block mb-2 text-sm font-medium text-gray-900"
                                            >
                                                Gender
                                            </label>
                                            <Select
                                                id="gender"
                                                styles={customSelectStyles}
                                                options={genders}
                                                value={{
                                                    value: formData?.gender,
                                                    label: formData?.gender,
                                                }}
                                                onChange={handleGenderChange}
                                                className="pt-0.5"
                                            />
                                        </div>
                                    </div>

                                    {/* Contact Number and Email */}
                                    <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-8 my-4">
                                        <div className="flex-1">
                                            <label
                                                htmlFor="contactNo"
                                                className="block mb-2 text-sm font-medium text-gray-900"
                                            >
                                                Contact Number
                                            </label>
                                            <input
                                                type="text"
                                                name="contactNo"
                                                id="contactNo"
                                                className="input-field"
                                                placeholder="Contact Number"
                                                value={formData?.contactNo}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <label
                                                htmlFor="email"
                                                className="block mb-2 text-sm font-medium text-gray-900"
                                            >
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                id="email"
                                                className="input-field"
                                                placeholder="Email"
                                                value={formData?.email}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Hearing Age and Is Implanted */}
                                    <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-8 my-4">
                                        <div className="flex-1">
                                            <label
                                                htmlFor="hearingAge"
                                                className="block mb-2 text-sm font-medium text-gray-900"
                                            >
                                                Hearing Age
                                            </label>
                                            <input
                                                type="text"
                                                name="hearingAge"
                                                id="hearingAge"
                                                className="input-field"
                                                placeholder="Hearing Age"
                                                value={formData?.hearingAge}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <label
                                                htmlFor="isImplanted"
                                                className="block mb-2 text-sm font-medium text-gray-900"
                                            >
                                                Is Implanted?
                                            </label>
                                            <Select
                                                id="isImplanted"
                                                styles={customSelectStyles}
                                                options={yesno}
                                                value={{
                                                    value: formData?.implant
                                                        ?.isImplanted,
                                                    label: yesno.find(
                                                        (item) =>
                                                            item.value ===
                                                            formData?.implant
                                                                ?.isImplanted
                                                    )?.label,
                                                }}
                                                onChange={
                                                    handleIsImplantedChange
                                                }
                                                className="pt-0.5"
                                            />
                                        </div>
                                    </div>

                                    {/* Enrolled Date, Surgery Date & Switch On Date */}
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 my-4">
                                        <div className="flex-1">
                                            <label
                                                htmlFor="surgeryDate"
                                                className="block mb-2 text-sm font-medium text-gray-900"
                                            >
                                                Surgery Date
                                            </label>
                                            <input
                                                type="date"
                                                name="implant.surgeryDate"
                                                id="surgeryDate"
                                                className="input-field"
                                                placeholder="Surgery Date"
                                                value={
                                                    formData?.implant?.surgeryDate.split(
                                                        "T"
                                                    )[0]
                                                }
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <label
                                                htmlFor="switchOnDate"
                                                className="block mb-2 text-sm font-medium text-gray-900"
                                            >
                                                Switch On Date
                                            </label>
                                            <input
                                                type="date"
                                                name="implant.switchOnDate"
                                                id="switchOnDate"
                                                className="input-field"
                                                placeholder="Switch On Date"
                                                value={
                                                    formData?.implant?.switchOnDate.split(
                                                        "T"
                                                    )[0]
                                                }
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Complaints Text Area */}
                                    <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-8 my-2">
                                        <div className="flex-1">
                                            <label
                                                htmlFor="complaints"
                                                className="block mb-2 text-sm font-medium text-gray-900"
                                            >
                                                Complaints
                                            </label>
                                            <textarea
                                                name="child.complaint"
                                                id="complaints"
                                                className="input-field"
                                                placeholder="Enter complaints"
                                                rows="6" // Adjust as needed
                                                value={
                                                    formData?.child?.complaint
                                                }
                                                onChange={handleInputChange}
                                            ></textarea>
                                        </div>
                                    </div>
                                </div>

                                {/* End of First set */}
                                {/* "Next" Button */}
                                <div className="flex justify-end py-10">
                                    <button
                                        type="button"
                                        className="text-white bg-audi-purple hover:bg-purple-900 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-12 py-2.5"
                                        onClick={() => setStep(2)} // Move to second step
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        )}{" "}
                        {step === 2 && (
                            <div>
                                {/* Second Set */}
                                <h2 className="font-bold font-montserrat text-lg">
                                    Onset
                                </h2>
                                <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-8 py-4">
                                    <div className="flex-1">
                                        <label
                                            htmlFor="ageWhenNoticed"
                                            className="block mb-2 text-sm font-medium text-gray-900"
                                        >
                                            Age When Noticed
                                        </label>
                                        <input
                                            type="text"
                                            name="child.onSet.ageWhenNoticed"
                                            id="ageWhenNoticed"
                                            className="input-field"
                                            placeholder="Age When Noticed"
                                            value={
                                                formData.child?.onSet
                                                    ?.ageWhenNoticed
                                            }
                                            onChange={handleInputChange}
                                        />
                                    </div>

                                    <div className="flex-1">
                                        <label
                                            htmlFor="ageWhenFirstSight"
                                            className="block mb-2 text-sm font-medium text-gray-900"
                                        >
                                            Age When Attention was First Sought
                                        </label>
                                        <input
                                            type="text"
                                            name="child.onSet.ageWhenFirstSight"
                                            id="ageWhenFirstSight"
                                            className="input-field"
                                            placeholder="Age When Attention was First Sought"
                                            value={
                                                formData?.child?.onSet
                                                    ?.ageWhenFirstSight
                                            }
                                            onChange={handleInputChange}
                                        />
                                    </div>

                                    <div className="flex-1">
                                        <label
                                            htmlFor="earlyTreatment"
                                            className="block mb-2 text-sm font-medium text-gray-900"
                                        >
                                            Early Treatment
                                        </label>
                                        <input
                                            type="text"
                                            name="child.onSet.treatmentHistory"
                                            id="earlyTreatment"
                                            className="input-field"
                                            placeholder="Early Treatment"
                                            value={
                                                formData?.child?.onSet
                                                    ?.treatmentHistory
                                            }
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>

                                {/* Natal History */}
                                <h2 className="font-bold font-montserrat text-lg pt-4">
                                    Natal History
                                </h2>
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 py-4">
                                    <div className="flex-1">
                                        <label
                                            htmlFor="previousPregnancies"
                                            className="block mb-2 text-sm font-medium text-gray-900"
                                        >
                                            Previous Pregnancies
                                        </label>
                                        <input
                                            type="text"
                                            name="child.natalHistory.previousPregnancies"
                                            id="previousPregnancies"
                                            className="input-field"
                                            placeholder="Previous Pregnancies"
                                            value={
                                                formData?.child?.natalHistory
                                                    ?.previousPregnancies
                                            }
                                            onChange={handleInputChange}
                                        />
                                    </div>

                                    <div className="flex-1">
                                        <label
                                            htmlFor="preNatal"
                                            className="block mb-2 text-sm font-medium text-gray-900"
                                        >
                                            Prenatal
                                        </label>
                                        <input
                                            type="text"
                                            name="child.natalHistory.preNatal"
                                            id="preNatal"
                                            className="input-field"
                                            placeholder="Prenatal"
                                            value={
                                                formData?.child?.natalHistory
                                                    ?.preNatal
                                            }
                                            onChange={handleInputChange}
                                        />
                                    </div>

                                    <div className="flex-1">
                                        <label
                                            htmlFor="preNatalBirthCry"
                                            className="block mb-2 text-sm font-medium text-gray-900"
                                        >
                                            Perinatal: Birth Cry
                                        </label>
                                        <input
                                            type="text"
                                            name="child.natalHistory.preNatalBirthCry"
                                            id="birthCry"
                                            className="input-field"
                                            placeholder="Birth Cry"
                                            value={
                                                formData?.child?.natalHistory
                                                    ?.preNatalBirthCry
                                            }
                                            onChange={handleInputChange}
                                        />
                                    </div>

                                    <div className="flex-1">
                                        <label
                                            htmlFor="birthWeight"
                                            className="block mb-2 text-sm font-medium text-gray-900"
                                        >
                                            Birth Weight
                                        </label>
                                        <input
                                            type="text"
                                            name="child.natalHistory.birthWeight"
                                            id="birthWeight"
                                            className="input-field"
                                            placeholder="Birth Weight"
                                            value={
                                                formData?.child?.natalHistory
                                                    ?.birthWeight
                                            }
                                            onChange={handleInputChange}
                                        />
                                    </div>

                                    <div className="flex-1">
                                        <label
                                            htmlFor="postNatal"
                                            className="block mb-2 text-sm font-medium text-gray-900"
                                        >
                                            Post Natal
                                        </label>
                                        <input
                                            type="text"
                                            name="child.natalHistory.postNatal"
                                            id="postNatal"
                                            className="input-field"
                                            placeholder="Postnatal"
                                            value={
                                                formData?.child?.natalHistory
                                                    ?.postNatal
                                            }
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>

                                {/* "Previous" and "Next" Buttons */}
                                <div className="flex justify-between py-10">
                                    <button
                                        type="button"
                                        className="text-white bg-audi-purple hover:bg-purple-900 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-12 py-2.5"
                                        onClick={() => setStep(1)} // Go back to first step
                                    >
                                        Previous
                                    </button>

                                    <button
                                        type="button"
                                        className="text-white bg-audi-purple hover:bg-purple-900 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-12 py-2.5"
                                        onClick={() => setStep(3)}
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        )}
                        {step === 3 && (
                            <div>
                                <h2 className="font-bold font-montserrat text-lg my-2">
                                    Development History
                                </h2>
                                <h3 className="font-bold font-montserrat text-lg text-purple-900 mt-8">
                                    Motor Milestones
                                </h3>
                                <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-8 py-4">
                                    {/* Head Held Up */}
                                    <div className="flex-1">
                                        <label
                                            htmlFor="headHeldUp"
                                            className="block mb-2 text-sm font-medium text-gray-900"
                                        >
                                            Head Held Up
                                        </label>
                                        <input
                                            type="text"
                                            name="child.motorMilestones.headHeldUp"
                                            id="headHeldUp"
                                            className="input-field"
                                            placeholder="Head Held Up"
                                            value={
                                                formData?.child?.motorMilestones
                                                    ?.headHeldUp
                                            }
                                            onChange={handleInputChange}
                                        />
                                    </div>

                                    {/* Turn Over */}
                                    <div className="flex-1">
                                        <label
                                            htmlFor="turnedOver"
                                            className="block mb-2 text-sm font-medium text-gray-900"
                                        >
                                            Turn Over
                                        </label>
                                        <input
                                            type="text"
                                            name="child.motorMilestones.turnedOver"
                                            id="turnedOver"
                                            className="input-field"
                                            placeholder="Turn Over"
                                            value={
                                                formData?.child?.motorMilestones
                                                    ?.turnedOver
                                            }
                                            onChange={handleInputChange}
                                        />
                                    </div>

                                    {/* Crawling */}
                                    <div className="flex-1">
                                        <label
                                            htmlFor="crawling"
                                            className="block mb-2 text-sm font-medium text-gray-900"
                                        >
                                            Crawling
                                        </label>
                                        <input
                                            type="text"
                                            name="child.motorMilestones.crawling"
                                            id="crawling"
                                            className="input-field"
                                            placeholder="Crawling"
                                            value={
                                                formData?.child?.motorMilestones
                                                    ?.crawling
                                            }
                                            onChange={handleInputChange}
                                        />
                                    </div>

                                    {/* Walking Independently */}
                                    <div className="flex-1">
                                        <label
                                            htmlFor="walkingIndependently"
                                            className="block mb-2 text-sm font-medium text-gray-900"
                                        >
                                            Walking Independently
                                        </label>
                                        <input
                                            type="text"
                                            name="child.motorMilestones.walkingIndependently"
                                            id="walkingIndependently"
                                            className="input-field"
                                            placeholder="Walking Independently"
                                            value={
                                                formData?.child?.motorMilestones
                                                    ?.walkingIndependently
                                            }
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>

                                {/* Speech and Language Milestones */}
                                <h3 className="font-bold font-montserrat text-lg text-purple-900 mt-4">
                                    Speech and Language Milestones
                                </h3>
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 py-4">
                                    {/* Babbling */}
                                    <div className="flex-1">
                                        <label
                                            htmlFor="babbling"
                                            className="block mb-2 text-sm font-medium text-gray-900"
                                        >
                                            Babbling
                                        </label>
                                        <input
                                            type="text"
                                            name="child.speechNLangMilestones.babbling"
                                            id="babbling"
                                            className="input-field"
                                            placeholder="Babbling"
                                            value={
                                                formData?.child
                                                    ?.speechNLangMilestones
                                                    ?.babbling
                                            }
                                            onChange={handleInputChange}
                                        />
                                    </div>

                                    {/* First Word */}
                                    <div className="flex-1">
                                        <label
                                            htmlFor="firstWord"
                                            className="block mb-2 text-sm font-medium text-gray-900"
                                        >
                                            First Word
                                        </label>
                                        <input
                                            type="text"
                                            name="child.speechNLangMilestones.firstWord"
                                            id="firstWord"
                                            className="input-field"
                                            placeholder="First Word"
                                            value={
                                                formData?.child
                                                    ?.speechNLangMilestones
                                                    ?.firstWord
                                            }
                                            onChange={handleInputChange}
                                        />
                                    </div>

                                    {/* Two-Word Phrases */}
                                    <div className="flex-1">
                                        <label
                                            htmlFor="twoWordPhrases"
                                            className="block mb-2 text-sm font-medium text-gray-900"
                                        >
                                            Two-Word Phrases
                                        </label>
                                        <input
                                            type="text"
                                            name="child.speechNLangMilestones.twoWordPhrases"
                                            id="twoWordPhrases"
                                            className="input-field"
                                            placeholder="Two-Word Phrases"
                                            value={
                                                formData?.child
                                                    ?.speechNLangMilestones
                                                    ?.twoWordPhrases
                                            }
                                            onChange={handleInputChange}
                                        />
                                    </div>

                                    {/* Sentences */}
                                    <div className="flex-1">
                                        <label
                                            htmlFor="sentences"
                                            className="block mb-2 text-sm font-medium text-gray-900"
                                        >
                                            Sentences
                                        </label>
                                        <input
                                            type="text"
                                            name="child.speechNLangMilestones.sentences"
                                            id="sentences"
                                            className="input-field"
                                            placeholder="Sentences"
                                            value={
                                                formData?.child
                                                    ?.speechNLangMilestones
                                                    ?.sentences
                                            }
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>

                                {/* Navigation Buttons */}
                                <div className="flex justify-between py-10">
                                    <button
                                        type="button"
                                        className="text-white bg-audi-purple hover:bg-purple-900 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-12 py-2.5"
                                        onClick={() => setStep(2)}
                                    >
                                        Previous
                                    </button>
                                    <button
                                        type="button"
                                        className="text-white bg-audi-purple hover:bg-purple-900 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-12 py-2.5"
                                        onClick={() => setStep(4)}
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        )}
                        {step === 4 && (
                            <div>
                                <div className="mt-4">
                                    {/* Handedness */}
                                    <div className="flex-1 mb-4">
                                        <label
                                            htmlFor="handedness"
                                            className="font-bold font-montserrat text-lg"
                                        >
                                            Handedness
                                        </label>
                                        <div className="flex space-x-6 mt-2">
                                            <div className="flex items-center">
                                                <input
                                                    type="radio"
                                                    id="rightHanded"
                                                    name="handedness"
                                                    value="Right Handed"
                                                    checked={
                                                        formData?.child
                                                            ?.handedness ===
                                                        "Right Handed"
                                                    }
                                                    onChange={handleInputChange}
                                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                                                />
                                                <label
                                                    htmlFor="rightHanded"
                                                    className="ml-2 text-sm font-medium text-gray-900"
                                                >
                                                    Right Handed
                                                </label>
                                            </div>

                                            <div className="flex items-center">
                                                <input
                                                    type="radio"
                                                    id="leftHanded"
                                                    name="handedness"
                                                    value="Left Handed"
                                                    checked={
                                                        formData?.child
                                                            ?.handedness ===
                                                        "Left Handed"
                                                    }
                                                    onChange={handleInputChange}
                                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                                                />
                                                <label
                                                    htmlFor="leftHanded"
                                                    className="ml-2 text-sm font-medium text-gray-900"
                                                >
                                                    Left Handed
                                                </label>
                                            </div>

                                            <div className="flex items-center">
                                                <input
                                                    type="radio"
                                                    id="notIdentified"
                                                    name="handedness"
                                                    value="Not Identified"
                                                    checked={
                                                        formData?.child
                                                            ?.handedness ===
                                                        "Not Identified"
                                                    }
                                                    onChange={handleInputChange}
                                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                                                />
                                                <label
                                                    htmlFor="notIdentified"
                                                    className="ml-2 text-sm font-medium text-gray-900"
                                                >
                                                    Not Identified
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Educational History */}
                                <h2 className="font-bold font-montserrat text-lg mt-5">
                                    Educational History
                                </h2>
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-3">
                                    {/* Type of School */}
                                    <div className="flex-1">
                                        <label
                                            htmlFor="typeOfSchool"
                                            className="block mb-2 text-sm font-medium text-gray-900"
                                        >
                                            Type of School
                                        </label>
                                        <input
                                            type="text"
                                            name="educationalHistory.typeOfSchool"
                                            id="typeOfSchool"
                                            className="input-field"
                                            placeholder="Type of School"
                                            value={
                                                formData?.child
                                                    ?.educationalHistory
                                                    ?.typeOfSchool
                                            }
                                            onChange={handleInputChange}
                                        />
                                    </div>

                                    {/* Medium of Instructions */}
                                    <div className="flex-1">
                                        <label
                                            htmlFor="mediumOfInstruction"
                                            className="block mb-2 text-sm font-medium text-gray-900"
                                        >
                                            Medium of Instruction
                                        </label>
                                        <input
                                            type="text"
                                            name="educationalHistory.mediumOfInstruction"
                                            id="mediumOfInstruction"
                                            className="input-field"
                                            placeholder="Medium of Instruction"
                                            value={
                                                formData?.child
                                                    ?.educationalHistory
                                                    ?.mediumOfInstruction
                                            }
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                                <div>
                                    {/* Any Difficulties in Subjects */}
                                    <div className="flex-1 mt-4">
                                        <label
                                            htmlFor="difficulties"
                                            className="block mb-2 text-sm font-medium text-gray-900"
                                        >
                                            Any Difficulties in Subjects
                                        </label>
                                        <textarea
                                            name="child.educationalHistory.difficulties"
                                            id="difficulties"
                                            className="input-field border-gray-300 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 text-sm rounded-lg bg-gray-50"
                                            placeholder="Enter any difficulties in subjects"
                                            rows="4" // Adjust as needed
                                            value={
                                                formData?.child
                                                    ?.educationalHistory
                                                    ?.difficulties
                                            }
                                            onChange={handleInputChange}
                                        ></textarea>
                                    </div>
                                </div>
                                <div className="flex justify-between py-10">
                                    <button
                                        type="button"
                                        className="text-white bg-audi-purple hover:bg-purple-900 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-12 py-2.5"
                                        onClick={() => setStep(3)}
                                    >
                                        Previous
                                    </button>
                                    <button
                                        type="button"
                                        className="text-white bg-audi-purple hover:bg-purple-900 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-12 py-2.5"
                                        onClick={() => setStep(5)}
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        )}
                        {step === 5 && (
                            <div>
                                {/* Sensory Development */}
                                <h2 className="font-bold font-montserrat text-lg mt-5">
                                    Sensory Development
                                </h2>
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-3">
                                    {/* Response to Environmental Sounds */}
                                    <div className="flex-1">
                                        <label
                                            htmlFor="responseToEnvSounds"
                                            className="block mb-2 text-sm font-medium text-gray-900"
                                        >
                                            Response to environmental sounds
                                        </label>
                                        <input
                                            type="text"
                                            name="child.sensoryDevelopment.responseToEnvSounds"
                                            id="responseToEnvSounds"
                                            className="input-field"
                                            placeholder="Responses Observed"
                                            value={
                                                formData?.child
                                                    ?.sensoryDevelopment
                                                    ?.responseToEnvSounds
                                            }
                                            onChange={handleInputChange}
                                        />
                                    </div>

                                    {/* Response to Name Call */}
                                    <div className="flex-1">
                                        <label
                                            htmlFor="responseToNameCall"
                                            className="block mb-2 text-sm font-medium text-gray-900"
                                        >
                                            Response to name call
                                        </label>
                                        <input
                                            type="text"
                                            name="child.sensoryDevelopment.responseToNameCall"
                                            id="responseToNameCall"
                                            className="input-field"
                                            placeholder="Responses Observed"
                                            value={
                                                formData?.child
                                                    ?.sensoryDevelopment
                                                    ?.responseToNameCall
                                            }
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>

                                {/* Imitation */}
                                <h2 className="font-bold font-montserrat text-lg mt-5">
                                    Imitation
                                </h2>
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-3">
                                    {/* Motor */}
                                    <div className="flex-1">
                                        <label
                                            htmlFor="motorLimitations"
                                            className="block mb-2 text-sm font-medium text-gray-900"
                                        >
                                            Motor
                                        </label>
                                        <input
                                            type="text"
                                            name="child.limitations.motor"
                                            id="motorLimitations"
                                            className="input-field"
                                            placeholder="Responses Observed"
                                            value={
                                                formData?.child?.limitations
                                                    ?.motor
                                            }
                                            onChange={handleInputChange}
                                        />
                                    </div>

                                    {/* Speech */}
                                    <div className="flex-1">
                                        <label
                                            htmlFor="speechLimitations"
                                            className="block mb-2 text-sm font-medium text-gray-900"
                                        >
                                            Speech
                                        </label>
                                        <input
                                            type="text"
                                            name="child.limitations.speech"
                                            id="speechLimitations"
                                            className="input-field"
                                            placeholder="Responses Observed"
                                            value={
                                                formData?.child?.limitations
                                                    ?.speech
                                            }
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>

                                {/* Social Skills */}
                                <h2 className="font-bold font-montserrat text-lg mt-5">
                                    Social Skills
                                </h2>
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-3">
                                    {/* Social Smile */}
                                    <div className="flex-1">
                                        <label
                                            htmlFor="socialSmile"
                                            className="block mb-2 text-sm font-medium text-gray-900"
                                        >
                                            Social Smile
                                        </label>
                                        <input
                                            type="text"
                                            name="child.socialSkills.socialSmile"
                                            id="socialSmile"
                                            className="input-field"
                                            placeholder="Responses Observed"
                                            value={
                                                formData?.child?.socialSkills
                                                    ?.socialSmile
                                            }
                                            onChange={handleInputChange}
                                        />
                                    </div>

                                    {/* Initiates Interaction */}
                                    <div className="flex-1">
                                        <label
                                            htmlFor="initiatesInteractions"
                                            className="block mb-2 text-sm font-medium text-gray-900"
                                        >
                                            Initiates Interaction
                                        </label>
                                        <input
                                            type="text"
                                            name="child.socialSkills.initiatesInteractions"
                                            id="initiatesInteractions"
                                            className="input-field"
                                            placeholder="Responses Observed"
                                            value={
                                                formData?.child?.socialSkills
                                                    ?.initiatesInteractions
                                            }
                                            onChange={handleInputChange}
                                        />
                                    </div>

                                    {/* Plays with Peer Group */}
                                    <div className="flex-1">
                                        <label
                                            htmlFor="playsWithPeerGroup"
                                            className="block mb-2 text-sm font-medium text-gray-900"
                                        >
                                            Plays with Peer Group
                                        </label>
                                        <input
                                            type="text"
                                            name="child.socialSkills.playsWithPeerGroup"
                                            id="playsWithPeerGroup"
                                            className="input-field"
                                            placeholder="Responses Observed"
                                            value={
                                                formData?.child?.socialSkills
                                                    ?.playsWithPeerGroup
                                            }
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>

                                {/* Unusual Behaviors */}
                                <div>
                                    <h2 className="font-bold font-montserrat text-lg mt-5">
                                        Unusual Behaviors, if any
                                    </h2>
                                    <div className="flex-1 mt-4">
                                        <textarea
                                            name="child.unsualBehaviours"
                                            id="unusualBehaviors"
                                            className="input-field border-gray-300 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 text-sm rounded-lg bg-gray-50"
                                            placeholder="Enter any Unusual Behaviors Observed"
                                            rows="4" // Adjust as needed
                                            value={
                                                formData?.child
                                                    ?.unsualBehaviours
                                            }
                                            onChange={handleInputChange}
                                        ></textarea>
                                    </div>
                                </div>

                                <div className="flex justify-between py-10">
                                    <button
                                        type="button"
                                        className="text-white bg-audi-purple hover:bg-purple-900 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-12 py-2.5"
                                        onClick={() => setStep(4)}
                                    >
                                        Previous
                                    </button>
                                    <button
                                        type="button"
                                        className="text-white bg-audi-purple hover:bg-purple-900 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-12 py-2.5"
                                        onClick={() => setStep(6)}
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        )}
                        {step === 6 && (
                            <div>
                                {/* Communication Skills */}
                                <h2 className="font-bold font-montserrat text-lg mt-5">
                                    Communication Skills
                                </h2>

                                {/* Audition Text Area */}
                                <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-8 my-2">
                                    <div className="flex-1">
                                        <label
                                            htmlFor="audition"
                                            className="block mb-2 text-sm font-medium text-gray-900"
                                        >
                                            Audition
                                        </label>
                                        <textarea
                                            name="child.communicationSkills.audition" // Updated name
                                            id="audition"
                                            className="input-field"
                                            placeholder="Audition Skills"
                                            rows="6"
                                            value={
                                                formData?.child
                                                    ?.communicationSkills
                                                    ?.audition
                                            }
                                            onChange={handleInputChange}
                                        ></textarea>
                                    </div>
                                </div>

                                {/* Language Text Area */}
                                <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-8 my-2">
                                    <div className="flex-1">
                                        <label
                                            htmlFor="language"
                                            className="block mb-2 text-sm font-medium text-gray-900"
                                        >
                                            Language
                                        </label>
                                        <textarea
                                            name="child.communicationSkills.language" // Updated name
                                            id="language"
                                            className="input-field"
                                            placeholder="Language Skills"
                                            rows="6"
                                            value={
                                                formData?.child
                                                    ?.communicationSkills
                                                    ?.language
                                            }
                                            onChange={handleInputChange}
                                        ></textarea>
                                    </div>
                                </div>

                                {/* Speech Text Area */}
                                <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-8 my-2">
                                    <div className="flex-1">
                                        <label
                                            htmlFor="speech"
                                            className="block mb-2 text-sm font-medium text-gray-900"
                                        >
                                            Speech
                                        </label>
                                        <textarea
                                            name="child.communicationSkills.speech" // Updated name
                                            id="speech"
                                            className="input-field"
                                            placeholder="Speaking Skills"
                                            rows="6"
                                            value={
                                                formData?.child
                                                    ?.communicationSkills
                                                    ?.speech
                                            }
                                            onChange={handleInputChange}
                                        ></textarea>
                                    </div>
                                </div>

                                {/* Vegetative Skills & OPME */}
                                <h2 className="font-bold font-montserrat text-lg mt-5">
                                    Vegetative Skills & OPME
                                </h2>
                                <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-8 my-2">
                                    <div className="flex-1">
                                        <textarea
                                            name="child.vegetativeSkillsOPEM" // Updated name
                                            id="vegetativeSkillsOPEM"
                                            className="input-field"
                                            placeholder="Vegetative Skills & OPME"
                                            rows="6"
                                            value={
                                                formData?.child
                                                    ?.vegetativeSkillsOPEM
                                            }
                                            onChange={handleInputChange}
                                        ></textarea>
                                    </div>
                                </div>
                                <div className="flex justify-between py-10">
                                    <button
                                        type="button"
                                        className="text-white bg-audi-purple hover:bg-purple-900 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-12 py-2.5"
                                        onClick={() => setStep(5)}
                                    >
                                        Previous
                                    </button>
                                    <button
                                        type="button"
                                        className="text-white bg-audi-purple hover:bg-purple-900 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-12 py-2.5"
                                        onClick={() => setStep(7)}
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        )}
                        {step === 7 && (
                            <div>
                                {/* Educational History */}
                                <h2 className="font-bold font-montserrat text-lg mt-5">
                                    Test Results
                                </h2>
                                <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-8 my-2">
                                    {/* Complaints Text Area */}
                                    <div className="flex-1">
                                        <textarea
                                            name="child.testResults"
                                            id="testResults"
                                            className="input-field"
                                            placeholder="Enter Test Results"
                                            rows="6" // Adjust as needed
                                            value={formData?.child?.testResults}
                                            onChange={handleInputChange}
                                        ></textarea>
                                    </div>
                                </div>
                                <h2 className="font-bold font-montserrat text-lg mt-5">
                                    Impression
                                </h2>
                                <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-8 my-2">
                                    {/* Complaints Text Area */}
                                    <div className="flex-1">
                                        <textarea
                                            name="child.impression"
                                            id="impression"
                                            className="input-field"
                                            placeholder="Enter Impressions"
                                            rows="6" // Adjust as needed
                                            value={formData?.child?.impression}
                                            onChange={handleInputChange}
                                        ></textarea>
                                    </div>
                                </div>
                                <h2 className="font-bold font-montserrat text-lg mt-5">
                                    Recommendations
                                </h2>
                                <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-8 my-2">
                                    {/* Complaints Text Area */}
                                    <div className="flex-1">
                                        <textarea
                                            name="child.recommendation"
                                            id="recommendation"
                                            className="input-field"
                                            placeholder="Any Recommendations"
                                            rows="6" // Adjust as needed
                                            value={
                                                formData?.child?.recommendation
                                            }
                                            onChange={handleInputChange}
                                        ></textarea>
                                    </div>
                                </div>
                                <div className="flex justify-between py-10">
                                    <button
                                        type="button"
                                        className="text-white bg-audi-purple hover:bg-purple-900 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-12 py-2.5"
                                        onClick={() => setStep(6)}
                                    >
                                        Previous
                                    </button>
                                    <button
                                        type="submit"
                                        className="text-white bg-audi-purple hover:bg-purple-900 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-12 py-2.5"
                                    >
                                        Submit
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

EditPatientModal.propTypes = {
    visible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    patientId: PropTypes.string,
};
