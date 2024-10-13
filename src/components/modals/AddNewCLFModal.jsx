import React, { useState } from "react";
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

export default function AddNewCLFModal({ visible, onClose }) {
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
        organization: "",
        surgeryDate: "",
        switchOnDate: "",
    });

    const therapistWithOrg = JSON.parse(localStorage.getItem("audi-user"));

    const [step, setStep] = useState(1); // Step control state

    const handleNext = () => {
        setStep(step + 1); // Move to the next step
    };

    const handlePrevious = () => {
        setStep(step - 1); // Go back to the previous step
    };

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
    };

    const handleGenderChange = (selectedOption) => {
        setFormData((prevState) => ({
            ...prevState,
            gender: selectedOption,
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
        // console.log(formData);

        //create custom object
        const patient = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            dob: formData.dob,
            gender: formData.gender.value,
            email: formData.email,
            contactNo: formData.contactNo,
            password: formData.password,
            hearingAge: formData.hearingAge,
            organization: therapistWithOrg?.organization,
            implant: {
                isImplanted: formData.isImplanted.value,
                surgeryDate: formData.surgeryDate,
                switchOnDate: formData.switchOnDate,
            },
            AVTLevel: formData.avtLevel.value,
        };

        console.log(patient);

        PatientService.createPatient(patient)
            .then((response) => {
                if (response._id) {
                    Swal.fire({
                        icon: "success",
                        title: "Success",
                        text: "Patient added successfully",
                        showConfirmButton: false,
                        timer: 1500,
                    }).then(() => {
                        window.location.reload();
                    });
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: "Error adding patient",
                    });
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };



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
                    <h1 className="font-bold font-montserrat text-lg">Add New CLF Record</h1>
                </div>

                <div className="font-montserrat p-2 lg:p-4 lg:px-8">
                    <form className="space-y-6 px-4" onSubmit={addPatient}>
                        {/* Step 1 */}
                        {step === 1 && (
                            <>
                                {/* First Name and Last Name */}
                                <h1 className="font-bold font-montserrat text-base text-purple-700">Ling Sounds</h1>
                                <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-8">
                                    <div className="flex-1">
                                        <label
                                            htmlFor="firstName"
                                            className="block mb-2 text-sm font-medium text-gray-900"
                                        >
                                            Detect
                                        </label>
                                        <input
                                            type="text"
                                            name="detect"
                                            id="detect"
                                            className="input-field"
                                            placeholder="Detection"
                                            // value={formData.firstName}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <label
                                            htmlFor="lastName"
                                            className="block mb-2 text-sm font-medium text-gray-900"
                                        >
                                            Distance
                                        </label>
                                        <input
                                            type="text"
                                            name="distance"
                                            id="distance"
                                            className="input-field"
                                            placeholder="Detection Distance"
                                            // value={formData.lastName}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-8">
                                    <div className="flex-1">
                                        <label
                                            htmlFor="firstName"
                                            className="block mb-2 text-sm font-medium text-gray-900"
                                        >
                                            Imitate/Identify
                                        </label>
                                        <input
                                            type="text"
                                            name="imitate_identify"
                                            id="imitate_identify"
                                            className="input-field"
                                            placeholder="Imitation/Identification"
                                            // value={formData.firstName}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <label
                                            htmlFor="lastName"
                                            className="block mb-2 text-sm font-medium text-gray-900"
                                        >
                                            Distance
                                        </label>
                                        <input
                                            type="text"
                                            name="distance"
                                            id="distance"
                                            className="input-field"
                                            placeholder="Distance"
                                            // value={formData.lastName}
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
                                            Additional Conditions
                                        </label>
                                        <textarea
                                            name="complaints"
                                            id="complaints"
                                            className="input-field"
                                            placeholder="Enter Additional Conditions"
                                            rows="6"  // Adjust as needed
                                            value={formData.complaints}
                                            onChange={handleInputChange}
                                            required
                                        ></textarea>
                                    </div>
                                </div>
                                <h1 className="font-bold font-montserrat text-base text-purple-700">Hearing Loss</h1>
                                {/* Date of Birth and Gender */}
                                <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-8">
                                    <div className="flex-1">
                                        <label
                                            htmlFor="firstName"
                                            className="block mb-2 text-sm font-medium text-gray-900"
                                        >
                                            Degree
                                        </label>
                                        <input
                                            type="text"
                                            name="degree"
                                            id="degree"
                                            className="input-field"
                                            placeholder="Degree of Hearing Loss"
                                            // value={formData.firstName}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <label
                                            htmlFor="lastName"
                                            className="block mb-2 text-sm font-medium text-gray-900"
                                        >
                                            Etiology
                                        </label>
                                        <input
                                            type="text"
                                            name="etiology"
                                            id="etiology"
                                            className="input-field"
                                            placeholder="Etiology"
                                            // value={formData.lastName}
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
                                            Audition:
                                        </label>
                                        <textarea
                                            name="audition"
                                            id="audition"
                                            className="input-field"
                                            placeholder="Enter Comments for Auditions"
                                            rows="6"  // Adjust as needed
                                            value={formData.complaints}
                                            onChange={handleInputChange}
                                            required
                                        ></textarea>
                                    </div>
                                    <div className="flex-1">
                                        <label
                                            htmlFor="firstName"
                                            className="block mb-2 text-sm font-medium text-gray-900"
                                        >
                                            Audition Ability Score
                                        </label>
                                        <input
                                            type="text"
                                            name="audition_score"
                                            id="audition_score"
                                            className="input-field"
                                            placeholder="Enter Score"
                                            // value={formData.firstName}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                </div>
                                {/* Other inputs for step 1 */}
                                <div className="flex justify-end py-4">
                                    <button type="button" className="bg-audi-purple text-white px-4 py-2 rounded" onClick={handleNext}>
                                        Next
                                    </button>
                                </div>
                            </>
                        )}{step === 2 && (
                            <>
                                <div>
                                    {/* contactNo and email */}
                                    <h1 className="font-bold font-montserrat text-base text-purple-700">Language</h1>
                                    <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-8">
                                        <div className="flex-1">
                                            <label
                                                htmlFor="complaints"
                                                className="block mb-2 text-sm font-medium text-gray-900"
                                            >
                                                Receptive Vocabulary:
                                            </label>
                                            <textarea
                                                name="audition"
                                                id="audition"
                                                className="input-field"
                                                placeholder="Enter Comments for Receptive Vocabulary"
                                                rows="6"  // Adjust as needed
                                                value={formData.complaints}
                                                onChange={handleInputChange}
                                                required
                                            ></textarea>
                                        </div>
                                        <div className="flex-1">
                                            <label
                                                htmlFor="firstName"
                                                className="block mb-2 text-sm font-medium text-gray-900"
                                            >
                                                Receptive Ability Score
                                            </label>
                                            <input
                                                type="text"
                                                name="audition_score"
                                                id="audition_score"
                                                className="input-field"
                                                placeholder="Enter Score"
                                                // value={formData.firstName}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-8">
                                        <div className="flex-1">
                                            <label
                                                htmlFor="complaints"
                                                className="block mb-2 text-sm font-medium text-gray-900"
                                            >
                                                Expressive Vocabulary:
                                            </label>
                                            <textarea
                                                name="audition"
                                                id="audition"
                                                className="input-field"
                                                placeholder="Enter Comments for Expressive Vocabulary"
                                                rows="6"  // Adjust as needed
                                                value={formData.complaints}
                                                onChange={handleInputChange}
                                                required
                                            ></textarea>
                                        </div>
                                        <div className="flex-1">
                                            <label
                                                htmlFor="firstName"
                                                className="block mb-2 text-sm font-medium text-gray-900"
                                            >
                                                Expressive Ability Score
                                            </label>
                                            <input
                                                type="text"
                                                name="audition_score"
                                                id="audition_score"
                                                className="input-field"
                                                placeholder="Enter Score"
                                                // value={formData.firstName}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-8">
                                        <div className="flex-1">
                                            <label
                                                htmlFor="firstName"
                                                className="block mb-2 text-sm font-medium text-gray-900"
                                            >
                                                MLU
                                            </label>
                                            <input
                                                type="text"
                                                name="detect"
                                                id="detect"
                                                className="input-field"
                                                placeholder="Detection"
                                                // value={formData.firstName}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <label
                                                htmlFor="lastName"
                                                className="block mb-2 text-sm font-medium text-gray-900"
                                            >
                                                B&L phase or CASLLS Band:
                                            </label>
                                            <input
                                                type="text"
                                                name="distance"
                                                id="distance"
                                                className="input-field"
                                                placeholder="Detection Distance"
                                                // value={formData.lastName}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <h1 className="font-bold font-montserrat text-base text-purple-700 mt-5 mb-2">Speech Production</h1>
                                    <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-8">
                                        <div className="flex-1">
                                            <label
                                                htmlFor="firstName"
                                                className="block mb-2 text-sm font-medium text-gray-900"
                                            >
                                                Vowels/Diphthongs
                                            </label>
                                            <input
                                                type="text"
                                                name="detect"
                                                id="detect"
                                                className="input-field"
                                                placeholder="Detection"
                                                // value={formData.firstName}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <label
                                                htmlFor="lastName"
                                                className="block mb-2 text-sm font-medium text-gray-900"
                                            >
                                                Level:
                                            </label>
                                            <input
                                                type="text"
                                                name="distance"
                                                id="distance"
                                                className="input-field"
                                                placeholder="Detection Distance"
                                                // value={formData.lastName}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-8">
                                        <div className="flex-1">
                                            <label
                                                htmlFor="firstName"
                                                className="block mb-2 text-sm font-medium text-gray-900"
                                            >
                                                Consonants
                                            </label>
                                            <input
                                                type="text"
                                                name="detect"
                                                id="detect"
                                                className="input-field"
                                                placeholder="Detection"
                                                // value={formData.firstName}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <label
                                                htmlFor="lastName"
                                                className="block mb-2 text-sm font-medium text-gray-900"
                                            >
                                                Level:
                                            </label>
                                            <input
                                                type="text"
                                                name="distance"
                                                id="distance"
                                                className="input-field"
                                                placeholder="Detection Distance"
                                                // value={formData.lastName}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-8">
                                        <div className="flex-1">
                                            <label
                                                htmlFor="firstName"
                                                className="block mb-2 text-sm font-medium text-gray-900"
                                            >
                                                Intelligibility
                                            </label>
                                            <input
                                                type="text"
                                                name="detect"
                                                id="detect"
                                                className="input-field"
                                                placeholder="Detection"
                                                // value={formData.firstName}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <label
                                                htmlFor="lastName"
                                                className="block mb-2 text-sm font-medium text-gray-900"
                                            >
                                                Vocal Quality:
                                            </label>
                                            <input
                                                type="text"
                                                name="distance"
                                                id="distance"
                                                className="input-field"
                                                placeholder="Detection Distance"
                                                // value={formData.lastName}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                    {/* Navigation buttons */}
                                    <div className="flex justify-between py-4">
                                        <button type="button" className="bg-gray-300 text-black px-4 py-2 rounded" onClick={handlePrevious}>
                                            Previous
                                        </button>
                                        <button type="button" className="bg-audi-purple text-white px-4 py-2 rounded" onClick={handleNext}>
                                            Next
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}{step === 3 && (
                            <>
                                <div>
                                    <h1 className="font-bold font-montserrat text-base text-purple-700">General Development</h1>
                                    <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-8">
                                        <div className="flex-1">
                                            <label
                                                htmlFor="firstName"
                                                className="block mb-2 text-sm font-medium text-gray-900"
                                            >
                                                Fine Motor
                                            </label>
                                            <input
                                                type="text"
                                                name="detect"
                                                id="detect"
                                                className="input-field"
                                                placeholder="Detection"
                                                // value={formData.firstName}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <label
                                                htmlFor="lastName"
                                                className="block mb-2 text-sm font-medium text-gray-900"
                                            >
                                                Gross Motor:
                                            </label>
                                            <input
                                                type="text"
                                                name="distance"
                                                id="distance"
                                                className="input-field"
                                                placeholder="Detection Distance"
                                                // value={formData.lastName}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-8">
                                        <div className="flex-1">
                                            <label
                                                htmlFor="firstName"
                                                className="block mb-2 text-sm font-medium text-gray-900"
                                            >
                                                Non-Verbal Cognition
                                            </label>
                                            <input
                                                type="text"
                                                name="detect"
                                                id="detect"
                                                className="input-field"
                                                placeholder="Detection"
                                                // value={formData.firstName}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <label
                                                htmlFor="lastName"
                                                className="block mb-2 text-sm font-medium text-gray-900"
                                            >
                                                Language:
                                            </label>
                                            <input
                                                type="text"
                                                name="distance"
                                                id="distance"
                                                className="input-field"
                                                placeholder="Detection Distance"
                                                // value={formData.lastName}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-8">
                                        <div className="flex-1">
                                            <label
                                                htmlFor="firstName"
                                                className="block mb-2 text-sm font-medium text-gray-900"
                                            >
                                                Self Help
                                            </label>
                                            <input
                                                type="text"
                                                name="detect"
                                                id="detect"
                                                className="input-field"
                                                placeholder="Detection"
                                                // value={formData.firstName}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <label
                                                htmlFor="lastName"
                                                className="block mb-2 text-sm font-medium text-gray-900"
                                            >
                                                Social Emotional:
                                            </label>
                                            <input
                                                type="text"
                                                name="distance"
                                                id="distance"
                                                className="input-field"
                                                placeholder="Detection Distance"
                                                // value={formData.lastName}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                    {/* contactNo and email */}
                                    <h1 className="font-bold font-montserrat text-base text-purple-700 mt-5 mb-2">Concerns</h1>
                                    <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-8">
                                        <div className="flex-1">
                                            <label
                                                htmlFor="complaints"
                                                className="block mb-2 text-sm font-medium text-gray-900"
                                            >
                                            </label>
                                            <textarea
                                                name="audition"
                                                id="audition"
                                                className="input-field"
                                                placeholder="Concerns"
                                                rows="6"  // Adjust as needed
                                                value={formData.complaints}
                                                onChange={handleInputChange}
                                                required
                                            ></textarea>
                                        </div>
                                    </div>
                                    <h1 className="font-bold font-montserrat text-base text-purple-700 mt-5 mb-2">CLF Score</h1>
                                    <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-8">
                                        <div className="flex-1">
                                            <input
                                                type="text"
                                                name="detect"
                                                id="detect"
                                                className="input-field"
                                                placeholder="Enter CLF Score"
                                                // value={formData.firstName}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                    {/* Navigation buttons */}
                                    <div className="flex justify-between py-4 mt-3">
                                        <button type="button" className="bg-gray-300 text-black px-4 py-2 rounded" onClick={handlePrevious}>
                                            Previous
                                        </button>
                                        <button type="submit" className="bg-audi-purple text-white px-4 py-2 rounded">
                                            Create CLF Record
                                        </button>
                                    </div>
                                </div>
                            </>
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
};
