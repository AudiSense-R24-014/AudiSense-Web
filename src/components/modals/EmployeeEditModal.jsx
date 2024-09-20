import React, { useState } from "react";
import { X } from "lucide-react";
import Select from "react-select";
import PropTypes from "prop-types";
import Swal from "sweetalert2";

import PatientService from "../../services/Patient.service";

export default function EmployeeEditModal({ visible, onClose, getPatients }) {
    const [formData, setFormData] = useState({
        fName: "",
        lName: "",
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
    });

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
            fName: formData.fName,
            lName: formData.lName,
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
        }

        // console.log(patient);

        PatientService.createPatient(patient)
            .then((response) => {
                alert("Patient added successfully");
                console.log(response);

                // Reset the form
                setFormData({
                    fName: "",
                    lName: "",
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

    const handleMakeAdmin = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "Do you want to make this employee an admin?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, make admin!",
        }).then((result) => {
            if (result.isConfirmed) {
                // Logic for making admin goes here
                Swal.fire("Success!", "The employee is now an admin.", "success");
            }
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
                    <h1 className="font-bold font-montserrat text-lg">
                        Edit Employee Details
                    </h1>
                </div>

                <div className="font-montserrat p-2 lg:p-4 lg:px-8">
                    <form className="space-y-6 px-4" onSubmit={addPatient}>
                        {/* First Name and Last Name */}
                        <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-8">
                            <div className="flex-1">
                                <label
                                    htmlFor="fName"
                                    className="block mb-2 text-sm font-medium text-gray-900"
                                >
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    name="fName"
                                    id="fName"
                                    className="input-field"
                                    placeholder="First Name"
                                    value={formData.fName}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="flex-1">
                                <label
                                    htmlFor="lName"
                                    className="block mb-2 text-sm font-medium text-gray-900"
                                >
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    name="lName"
                                    id="lName"
                                    className="input-field"
                                    placeholder="Last Name"
                                    value={formData.lName}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        </div>
                        {/* contactNo and email */}
                        <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-8">
                            <div className="flex-1">
                                <label
                                    htmlFor="position"
                                    className="block mb-2 text-sm font-medium text-gray-900"
                                >
                                    Position
                                </label>
                                <input
                                    type="text"
                                    name="position"
                                    id="position"
                                    className="input-field"
                                    placeholder="Position"
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="flex-1">
                                <label
                                    htmlFor="role"
                                    className="block mb-2 text-sm font-medium text-gray-900"
                                >
                                    Role
                                </label>
                                <input
                                    type="text"
                                    name="role"
                                    id="role"
                                    className="input-field"
                                    placeholder="Role"
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        </div>

                        {/* password and repeat password */}
                        <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-8">
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
                        </div>
                        <div className="flex justify-between pt-5 pb-3">
                            <button
                                type="button"
                                className="text-white bg-green-600 hover:bg-emerald-700 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-12 py-2.5"
                                onClick={handleMakeAdmin}
                            >
                                Make an Admin
                            </button>

                            <button
                                type="submit"
                                className="text-white bg-audi-purple hover:bg-purple-900 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-12 py-2.5 ml-auto"
                            >
                                Save
                            </button>
                        </div>


                    </form>
                </div>
            </div>
        </div>
    );
}

EmployeeEditModal.propTypes = {
    visible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    getPatients: PropTypes.func.isRequired,
};