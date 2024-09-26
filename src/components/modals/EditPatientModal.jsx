import React, { useState } from "react";
import { X } from "lucide-react";
import Select from "react-select";
import PropTypes from "prop-types";

import PatientService from "../../services/Patient.service";

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

export default function AddNewPatientModal({ visible, onClose, getPatients }) {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        dob: "",
        gender: null,
        contactNo: "",
        email: "",
        password: "",
        repeatPassword: "",
        hearingAge: "",
        avtLevel: null,
        isImplanted: null,
        surgeryDate: "",
        switchOnDate: "",
        complaints: "",
        enrolledDate: "",
        ageWhenNoticed: "",
        ageWhenAttentionSought: "",
        earlyTreatment: "",
        previousPregnancies: "",
        prenatal: "",
        birthCry: "",
        birthweight: "",
        postnatal: "",
        headHeldUp: "",
        turnover: "",
        crawling: "",
        walkingIndependently: "",
        babbling: "",
        firstWord: "",
        twoWordPhrases: "",
        sentences: "",
        handedness: "",
        schoolType: "",
        mediumOfInstruction: "",
        difficulties: "",
    });

    const [step, setStep] = useState(1);  // Track the current step

    const genders = [
        { value: "Male", label: "Male" },
        { value: "Female", label: "Female" },
    ];

    const yesno = [
        { value: true, label: "Yes" },
        { value: false, label: "No" },
    ];

    const avtLevels = [
        { value: "Awareness", label: "Awareness" },
        { value: "Identification", label: "Identification" },
        { value: "Discrimination", label: "Discrimination" },
        { value: "Comprehension", label: "Comprehension" },
    ];

    if (!visible) {
        return null;
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
        console.log(formData);
    };

    const handleGenderChange = (selectedOption) => {
        setFormData((prevState) => ({
            ...prevState,
            gender: selectedOption.value,
        }));
    };

    const handleAvtLevelChange = (selectedOption) => {
        setFormData((prevState) => ({
            ...prevState,
            avtLevel: selectedOption,
        }));
    };

    const handleIsImplantedChange = (selectedOption) => {
        setFormData((prevState) => ({
            ...prevState,
            isImplanted: selectedOption,
        }));
    };

    const addPatient = (e) => {
        e.preventDefault();

        const patient = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            dob: formData.dob,
            gender: formData.gender.value,
            email: formData.email,
            contactNo: formData.contactNo,
            password: formData.password,
            hearingAge: formData.hearingAge,
            implant: {
                isImplanted: formData.isImplanted.value,
                surgeryDate: formData.surgeryDate,
                switchOnDate: formData.switchOnDate,
            },
            AVTLevel: formData.avtLevel.value,
        };

        PatientService.createPatient(patient)
            .then((response) => {
                alert("Patient added successfully");
                console.log(response);

                // Reset the form
                setFormData({
                    firstName: "",
                    lastName: "",
                    dob: "",
                    gender: null,
                    contactNo: "",
                    email: "",
                    password: "",
                    repeatPassword: "",
                    hearingAge: "",
                    avtLevel: null,
                    isImplanted: null,
                    surgeryDate: "",
                    switchOnDate: "",
                    complaints: "",
                    enrolledDate: "",
                    ageWhenNoticed: "",
                    ageWhenAttentionSought: "",
                    earlyTreatment: "",
                    previousPregnancies: "",
                    prenatal: "",
                    birthCry: "",
                    birthweight: "",
                    postnatal: "",
                    headHeldUp: "",
                    turnover: "",
                    crawling: "",
                    walkingIndependently: "",
                    babbling: "",
                    firstWord: "",
                    twoWordPhrases: "",
                    sentences: "",
                    handedness: "",
                    schoolType: "",
                    mediumOfInstruction: "",
                    difficulties: "",
                });

                handleAvtLevelChange(null);
                handleGenderChange(null);
                handleIsImplantedChange(null);
                getPatients();
                onClose();
            }).catch((error) => {
                alert("Error adding patient");
                console.log(error);
            });
    };

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
                    <form className="space-y-6 px-4" onSubmit={addPatient}>
                        {step === 1 && (
                            <div>
                                <div className="">
                                    {/* First Name and Last Name */}
                                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 my-2">
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
                                                value={formData.firstName}
                                                onChange={handleInputChange}
                                                required
                                            />
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
                                                    value={formData.dob}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                            </div>
                                        </div>


                                        <div className="flex-1">
                                            <label
                                                htmlFor="gender"
                                                className="block mb-2 text-sm font-medium text-gray-900"
                                            >
                                                Gender
                                            </label>
                                            <Select
                                                styles={customSelectStyles}
                                                options={genders}
                                                value={
                                                    { "value": formData.gender, "label": formData.gender }
                                                }
                                                onChange={handleGenderChange}
                                                className="pt-0.5"
                                            />
                                        </div>
                                    </div>

                                    {/* contactNo and email */}
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
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* hearingAge and AVT Level */}
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
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <label
                                                htmlFor="avtLevel"
                                                className="block mb-2 text-sm font-medium text-gray-900"
                                            >
                                                AVT Level
                                            </label>
                                            <Select
                                                styles={customSelectStyles}
                                                options={avtLevels}
                                                value={formData.avtLevel}
                                                onChange={handleAvtLevelChange}
                                                className="pt-0.5"
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
                                                styles={customSelectStyles}
                                                options={yesno}
                                                value={formData.isImplanted}
                                                onChange={handleIsImplantedChange}
                                                className="pt-0.5"
                                            />
                                        </div>
                                    </div>

                                    {/* enrolledDate, surgeryDate & switchOnDate */}

                                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 my-4">

                                        <div className="flex-1">
                                            <label
                                                htmlFor="surgeryDate"
                                                className="block mb-2 text-sm font-medium text-gray-900"
                                            >
                                                Enrolled Date
                                            </label>
                                            <input
                                                type="date"
                                                name="surgeryDate"
                                                id="surgeryDate"
                                                className="input-field"
                                                placeholder="Surgery Date"
                                                value={formData.enrolledDate}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>

                                        <div className="flex-1">
                                            <label
                                                htmlFor="surgeryDate"
                                                className="block mb-2 text-sm font-medium text-gray-900"
                                            >
                                                Surgery Date
                                            </label>
                                            <input
                                                type="date"
                                                name="surgeryDate"
                                                id="surgeryDate"
                                                className="input-field"
                                                placeholder="Surgery Date"
                                                value={formData.surgeryDate}
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
                                                name="switchOnDate"
                                                id="switchOnDate"
                                                className="input-field"
                                                placeholder="Switch On Date"
                                                value={formData.switchOnDate}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-8 my-2">
                                        {/* Complaints Text Area */}
                                        <div className="flex-1">
                                            <label
                                                htmlFor="complaints"
                                                className="block mb-2 text-sm font-medium text-gray-900"
                                            >
                                                Complaints
                                            </label>
                                            <textarea
                                                name="complaints"
                                                id="complaints"
                                                className="input-field"
                                                placeholder="Enter complaints"
                                                rows="6"  // Adjust as needed
                                                value={formData.complaints}
                                                onChange={handleInputChange}
                                                required
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

                        )} {step === 2 && (
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
                                            name="ageWhenNoticed"
                                            id="ageWhenNoticed"
                                            className="input-field"
                                            placeholder="Age When Noticed"
                                            value={formData.ageWhenNoticed}
                                            onChange={handleInputChange}
                                        />
                                    </div>

                                    <div className="flex-1">
                                        <label
                                            htmlFor="ageWhenAttentionSought"
                                            className="block mb-2 text-sm font-medium text-gray-900"
                                        >
                                            Age When Attention was First Sought
                                        </label>
                                        <input
                                            type="text"
                                            name="ageWhenAttentionSought"
                                            id="ageWhenAttentionSought"
                                            className="input-field"
                                            placeholder="Age When Attention was First Sought"
                                            value={formData.ageWhenAttentionSought}
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
                                            name="earlyTreatment"
                                            id="earlyTreatment"
                                            className="input-field"
                                            placeholder="Early Treatment"
                                            value={formData.earlyTreatment}
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
                                            htmlFor="ageWhenNoticed"
                                            className="block mb-2 text-sm font-medium text-gray-900"
                                        >
                                            Previous Pregnancies
                                        </label>
                                        <input
                                            type="text"
                                            name="ageWhenNoticed"
                                            id="ageWhenNoticed"
                                            className="input-field"
                                            placeholder="Age When Noticed"
                                            value={formData.previousPregnancies}
                                            onChange={handleInputChange}
                                        />
                                    </div>

                                    <div className="flex-1">
                                        <label
                                            htmlFor="ageWhenAttentionSought"
                                            className="block mb-2 text-sm font-medium text-gray-900"
                                        >
                                            Prenatal
                                        </label>
                                        <input
                                            type="text"
                                            name="ageWhenAttentionSought"
                                            id="ageWhenAttentionSought"
                                            className="input-field"
                                            placeholder="Age When Attention was First Sought"
                                            value={formData.prenatal}
                                            onChange={handleInputChange}
                                        />
                                    </div>

                                    <div className="flex-1">
                                        <label
                                            htmlFor="earlyTreatment"
                                            className="block mb-2 text-sm font-medium text-gray-900"
                                        >
                                            Perinatal: Birth Cry
                                        </label>
                                        <input
                                            type="text"
                                            name="earlyTreatment"
                                            id="earlyTreatment"
                                            className="input-field"
                                            placeholder="Early Treatment"
                                            value={formData.birthCry}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <label
                                            htmlFor="ageWhenAttentionSought"
                                            className="block mb-2 text-sm font-medium text-gray-900"
                                        >
                                            Birth Weight
                                        </label>
                                        <input
                                            type="text"
                                            name="ageWhenAttentionSought"
                                            id="ageWhenAttentionSought"
                                            className="input-field"
                                            placeholder="Age When Attention was First Sought"
                                            value={formData.birthWeight}
                                            onChange={handleInputChange}
                                        />
                                    </div>

                                    <div className="flex-1">
                                        <label
                                            htmlFor="earlyTreatment"
                                            className="block mb-2 text-sm font-medium text-gray-900"
                                        >
                                            Postnatal
                                        </label>
                                        <input
                                            type="text"
                                            name="earlyTreatment"
                                            id="earlyTreatment"
                                            className="input-field"
                                            placeholder="Early Treatment"
                                            value={formData.postNatal}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>


                                {/* "Previous" and "Submit" Buttons */}
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
                                    <div className="flex-1">
                                        <label
                                            htmlFor="headHeldUp"
                                            className="block mb-2 text-sm font-medium text-gray-900"
                                        >
                                            Head Held Up
                                        </label>
                                        <input
                                            type="text"
                                            name="headHeldUp"
                                            id="headHeldUp"
                                            className="input-field"
                                            placeholder="Head Held Up"
                                            value={formData.headHeldUp}
                                            onChange={handleInputChange}
                                        />
                                    </div>

                                    <div className="flex-1">
                                        <label
                                            htmlFor="turnOver"
                                            className="block mb-2 text-sm font-medium text-gray-900"
                                        >
                                            Turn Over
                                        </label>
                                        <input
                                            type="text"
                                            name="turnOver"
                                            id="turnOver"
                                            className="input-field"
                                            placeholder="Turn Over"
                                            value={formData.turnOver}
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
                                            name="crawling"
                                            id="crawling"
                                            className="input-field"
                                            placeholder="Crawling"
                                            value={formData.crawling}
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
                                            name="walkingIndependently"
                                            id="walkingIndependently"
                                            className="input-field"
                                            placeholder="Walking Independently"
                                            value={formData.walkingIndependently}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                                <h3 className="font-bold font-montserrat text-lg text-purple-900 mt-4">
                                    Speech and Language Milestone
                                </h3>
                                {/* Start of Speech and Language Milestone */}
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
                                            name="babbling"
                                            id="babbling"
                                            className="input-field"
                                            placeholder="Babbling"
                                            value={formData.babbling}
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
                                            name="firstWord"
                                            id="firstWord"
                                            className="input-field"
                                            placeholder="First Word"
                                            value={formData.firstWord}
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
                                            name="twoWordPhrases"
                                            id="twoWordPhrases"
                                            className="input-field"
                                            placeholder="Two-Word Phrases"
                                            value={formData.twoWordPhrases}
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
                                            name="sentences"
                                            id="sentences"
                                            className="input-field"
                                            placeholder="Sentences"
                                            value={formData.sentences}
                                            onChange={handleInputChange}
                                        />
                                    </div>

                                </div>
                                <div className="mt-4 ">
                                    {/* handedness */}
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
                                                    checked={formData.handedness === "Right Handed"}
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
                                                    checked={formData.handedness === "Left Handed"}
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
                                                    checked={formData.handedness === "Not Identified"}
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
                                            htmlFor="schoolType"
                                            className="block mb-2 text-sm font-medium text-gray-900"
                                        >
                                            Type of School
                                        </label>
                                        <input
                                            type="text"
                                            name="schoolType"
                                            id="schoolType"
                                            className="input-field"
                                            placeholder="Type of School"
                                            value={formData.schoolType}
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
                                            name="mediumOfInstruction"
                                            id="mediumOfInstruction"
                                            className="input-field"
                                            placeholder="Medium of Instruction"
                                            value={formData.mediumOfInstruction}
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
                                            name="difficulties"
                                            id="difficulties"
                                            className="input-field border-gray-300 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 text-sm rounded-lg bg-gray-50"
                                            placeholder="Enter any difficulties in subjects"
                                            rows="4" // Adjust as needed
                                            value={formData.difficulties}
                                            onChange={handleInputChange}
                                        ></textarea>
                                    </div>

                                </div>
                                <div className="flex justify-between py-10">
                                    <button type="button"
                                        className="text-white bg-audi-purple hover:bg-purple-900 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-12 py-2.5"
                                        onClick={() => setStep(2)}>
                                        Previous
                                    </button>
                                    <button type="submit"
                                        className="text-white bg-audi-purple hover:bg-purple-900 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-12 py-2.5"
                                    >Submit</button>
                                </div>
                            </div>)}
                    </form>
                </div>
            </div>
        </div>
    );
}

AddNewPatientModal.propTypes = {
    visible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    getPatients: PropTypes.func,
};
