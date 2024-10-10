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

export default function AddNewPatientModal({ visible, onClose }) {
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
          <h1 className="font-bold font-montserrat text-lg">Add New Patient</h1>
        </div>

        <div className="font-montserrat p-2 lg:p-4 lg:px-8">
          <form className="space-y-6 px-4" onSubmit={addPatient}>
            {/* First Name and Last Name */}
            <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-8">
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
                  value={formData.lastName}
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
                  value={formData.dob}
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
                  styles={customSelectStyles}
                  options={genders}
                  value={formData.gender}
                  onChange={handleGenderChange}
                  className="pt-0.5"
                />
              </div>
            </div>

            {/* contactNo and email */}
            <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-8">
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

            {/* password and repeat password */}
            <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-8">
              <div className="flex-1">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="input-field"
                  placeholder="Password"
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="flex-1">
                <label
                  htmlFor="repeatPassword"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Repeat Password
                </label>
                <input
                  type="password"
                  name="repeatPassword"
                  id="repeatPassword"
                  className="input-field"
                  placeholder="Repeat Password"
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            {/* hearingAge and AVT Level */}
            <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-8">
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
            </div>

            {/* isImplanted, surgeryDate & switchOnDate */}
            <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-8">
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

            {/* Submit Button */}
            <div className="flex justify-center py-10">
              <button
                type="submit"
                className="text-white bg-audi-purple hover:bg-purple-900 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-12 py-2.5"
              >
                Create Patient Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

AddNewPatientModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
