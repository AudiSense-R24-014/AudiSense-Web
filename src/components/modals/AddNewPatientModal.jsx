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

  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    gender: undefined,
    contactNo: "",
    email: "",
    password: "",
    repeatPassword: "",
    hearingAge: "",
    isImplanted: undefined,
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

  const handleIsImplantedChange = (selectedOption) => {
    setFormData((prevState) => ({
      ...prevState,
      isImplanted: selectedOption,
    }));
  };

  const addPatient = (e) => {
    e.preventDefault();

    const newErrors = {}; // Object to hold new error messages
    let valid = true; // Variable to check if form is valid
    // First name validation
    if (!formData.firstName) {
      newErrors.firstName = "First name is required.";
    }
    // Last name validation
    if (!formData?.lastName) {
      newErrors.lastName = "Last name is required.";
    }
    // Date of Birth validation
    if (!formData?.dob) {
      newErrors.dob = "Date of Birth is required.";
    }
    //Gender validation
    if (!formData.gender) {
      newErrors.gender = "Gender Required";
    }
    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required.";
      valid = false;
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required.";
    }
    // Repeat Password validation
    if (!formData.repeatPassword) {
      newErrors.repeatPassword = "Please repeat your password.";
    } else if (formData.password !== formData.repeatPassword) {
      newErrors.repeatPassword = "Passwords do not match.";
    }
    // Hearing Age validation
    if (!formData.hearingAge) {
      newErrors.hearingAge = "Hearing Age is required.";
    }
    // Is Implanted validation
    if (!(formData?.isImplanted?.value==true ||  formData?.isImplanted?.value==false)) {
      newErrors.isImplanted = "Please select an option.";
    }
    // Contact number validation (optional)
    if (!formData?.contactNo || !/^[0-9]{10}$/.test(formData.contactNo)) {
      newErrors.contactNo = "Please enter a valid 10-digit contact number.";
    }

    
    if(formData.isImplanted?.value){
      if (!formData?.surgeryDate) {
        newErrors.surgeryDate = "Surgery Data is required.";
      }
      if (!formData?.switchOnDate) {
        newErrors.switchOnDate = "Switch On Date is required.";
      }
    }

    // Check if there are any errors
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Clear errors if validation passes
    setErrors({});

    //create custom object
    const patient = {
      firstName: formData?.firstName,
      lastName: formData?.lastName,
      dob: formData?.dob,
      gender: formData?.gender?.value,
      email: formData?.email,
      contactNo: formData?.contactNo,
      password: formData?.password,
      hearingAge: formData?.hearingAge,
      organization: therapistWithOrg?.organization,
      implant: {
        isImplanted: formData?.isImplanted?.value,
        surgeryDate: formData?.surgeryDate,
        switchOnDate: formData?.switchOnDate,
      },
    };



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
                  className={`input-field ${errors.firstName ? "border-red-500" : ""}`}
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleInputChange}

                />{errors.firstName && (
                  <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                )}
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
                  className={`input-field ${errors.lastName ? "border-red-500" : ""}`}
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleInputChange}

                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                )}
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
                  className={`input-field ${errors.dob ? "border-red-500" : ""
                    }`}
                  placeholder="Date of Birth"
                  value={formData.dob}
                  onChange={handleInputChange}

                />
                {errors.dob && (
                  <p className="text-red-500 text-sm mt-1">{errors.dob}</p>)}
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
                  className={`pt-0.5 ${errors.gender ? "border-red-500" : ""
                    }`}
                />
                {errors.gender && (
                  <p className="text-red-500 text-sm mt-1">{errors.gender}</p>
                )}
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
                  className={`input-field ${errors.contactNo ? "border-red-500" : ""
                    }`}
                  placeholder="Contact Number"
                  onChange={handleInputChange}

                />
                {errors.contactNo && (
                  <p className="text-red-500 text-sm mt-1">{errors.contactNo}</p>
                )}
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
                  className={`input-field ${errors.email ? "border-red-500" : ""
                    }`}
                  placeholder="Email"
                  onChange={handleInputChange}

                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
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
                  className={`input-field ${errors.password ? "border-red-500" : ""
                    } `}
                  placeholder="Password"
                  onChange={handleInputChange}

                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
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
                  className={`input-field ${errors.repeatPassword ? "border-red-500" : ""
                    }`}
                  placeholder="Repeat Password"
                  onChange={handleInputChange}

                />{errors.repeatPassword && (
                  <p className="text-red-500 text-sm mt-1">{errors.repeatPassword}</p>
                )}
              </div>
            </div>

            {/* hearingAge */}
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
                  className={`input-field ${errors.hearingAge ? "border-red-500" : ""
                    } `}
                  placeholder="Hearing Age"
                  onChange={handleInputChange}

                />
                {errors.hearingAge && (
                  <p className="text-red-500 text-sm mt-1">{errors.hearingAge}</p>
                )}
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
                  className={`pt-0.5 ${errors.isImplanted ? "border-red-500" : ""
                    }`}
                />
                {errors.isImplanted && (
                  <p className="text-red-500 text-sm mt-1">{errors.isImplanted}</p>
                )}
              </div>
            </div>
            {formData.isImplanted && formData.isImplanted.value === true && (
              //isImplanted, surgeryDate & switchOnDate
              <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-8">
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
                    className={`input-field ${errors.surgeryDate ? "border-red-500" : ""
                      }`}
                    placeholder="Surgery Date"
                    value={formData.surgeryDate}
                    onChange={handleInputChange}

                  />
                  {errors.surgeryDate && (
                    <p className="text-red-500 text-sm mt-1">{errors.surgeryDate}</p>
                  )}
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
                    className={`input-field ${errors.switchOnDate ? "border-red-500" : "" 
                      }`}
                    placeholder="Switch On Date"
                    value={formData.switchOnDate}
                    onChange={handleInputChange}

                  />
                  {errors.switchOnDate && (
                    <p className="text-red-500 text-sm mt-1">{errors.switchOnDate}</p>
                  )}
                </div>
              </div>
            )}

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
