import { X } from "lucide-react";
import React, { useMemo, useState } from "react";
import Select from "react-select";
import PropTypes from "prop-types";
import countryList from "react-select-country-list";

const customCountrySelectStyles = {
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
    // Define background color based on state
    let backgroundColor;
    if (state.isSelected) {
      backgroundColor = "rgba(108, 38, 166, 0.8)";
    } else if (state.isFocused) {
      backgroundColor = "rgba(128, 90, 213, 0.2)";
    } else {
      backgroundColor = provided.backgroundColor;
    }

    // Define color based on state
    const color = state.isSelected ? "white" : provided.color;

    // Return the updated style object
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

export default function NewOrgModal({ visible, onClose }) {
  const [country, setCountry] = useState("");
  const countries = useMemo(() => countryList().getData(), []);

  console.log(countries);

  if (!visible) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 bg-opacity-20 backdrop-blur-sm bg-black flex justify-center items-center"
      aria-modal="true"
    >
      <div className="bg-white rounded-xl relative w-full max-w-3xl mx-4 sm:mx-8 lg:w-2/3 xl:w-1/2 overflow-auto max-h-full p-4 sm:p-6 lg:p-8">
        <div className="pb-2">
          <button
            onClick={onClose}
            className="absolute top-3 right-4 p-1 rounded-lg text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-600"
            aria-label="Close"
          >
            <X />
          </button>
          <h1 className="font-bold font-montserrat text-lg">
            Add New Organization
          </h1>
        </div>
        {/* Modal Content */}
        <div className="font-montserrat pt-4">
          <form className="space-y-6">
            <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-8">
              <div className="flex-1">
                <label
                  htmlFor="Name"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Organization Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="input-field"
                  placeholder="Organization Name"
                  required
                />
              </div>
            </div>
            <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-8">
              <div className="flex-1">
                <label
                  htmlFor="country"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Country
                </label>
                <Select
                  styles={customCountrySelectStyles}
                  options={countries}
                  value={country}
                  onChange={(value) => {
                    setCountry(value);
                  }}
                  className="pt-0.5"
                />
              </div>
              <div className="flex-1">
                <label
                  htmlFor="city"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  id="city"
                  className="input-field"
                  placeholder="Head Branch City"
                  required
                />
              </div>
            </div>
            <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-8">
              <div className="flex-1">
                <label
                  htmlFor="address"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Address
                </label>
                <textarea
                  name="address"
                  id="address"
                  className="input-field h-20 w-full resize-none"
                  placeholder="Head Branch Address"
                  required
                />
              </div>
            </div>
            <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-8">
              <div className="flex-1">
                <label
                  htmlFor="logo"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Organization Logo
                </label>
                <input
                  type="file"
                  name="logo"
                  id="logo"
                  className="input-field border border-gray-300 rounded-md py-2 px-3 w-full"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    const reader = new FileReader();
                    reader.onload = () => {
                      const preview = document.getElementById("logo-preview");
                      preview.src = reader.result;
                    };
                    reader.readAsDataURL(file);
                  }}
                />
                <div className="flex justify-center items-center">
                  <img
                    id="logo-preview"
                    src=""
                    alt="Logo Preview"
                    className="w-24 h-24 object-cover rounded-md mt-2"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-center py-10">
              <button
                type="submit"
                className="text-white bg-audi-purple hover:bg-purple-900 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-12 py-2.5"
              >
                Create Organization
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

NewOrgModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
