import { X } from "lucide-react";
import React, { useMemo, useState } from "react";
import Select from "react-select";
import PropTypes from "prop-types";
import countryList from "react-select-country-list";
import { storage, ref, uploadBytes, getDownloadURL } from "../../../firebase"; // Adjust the import path as needed
import OrganizationService from "../../services/Organization.service";
import TherapistService from "../../services/Therapist.service";
import Swal from "sweetalert2";

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

export default function NewOrgModal({ visible, onClose }) {
  // States for form inputs
  const [organizationName, setOrganizationName] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [logoFile, setLogoFile] = useState(null); // For logo file
  const [uploadError, setUploadError] = useState(null); // For upload errors

  const countries = useMemo(() => countryList().getData(), []);

  if (!visible) {
    return null;
  }

  // Handle logo file selection
  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    setLogoFile(file); // Store the file in state
    const reader = new FileReader();
    reader.onload = () => {
      const preview = document.getElementById("logo-preview");
      preview.src = reader.result; // Display the image preview
    };
    reader.readAsDataURL(file);
  };

  // Function to handle file upload to Firebase Storage
  const uploadLogo = async (file) => {
    try {
      // Create a storage reference with a unique filename
      const storageRef = ref(storage, `organization-logos/${Date.now()+file.name}`);
      // Upload the file to Firebase Storage
      await uploadBytes(storageRef, file);
      // Get the download URL after upload
      const downloadURL = await getDownloadURL(storageRef);
      return downloadURL;
    } catch (error) {
      setUploadError("File upload failed. Please try again.");
      console.error("Error uploading file:", error);
      throw error;
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let logoUrl = null;

      if (logoFile) {
        // Upload the logo file and get the URL
        logoUrl = await uploadLogo(logoFile);
      }

      let therpistId = await TherapistService.validateToken();

      // Create the organization object
      const organization = {
        name: organizationName,
        country: country.label,
        city,
        address,
        companyLogo: logoUrl,
        therapists: [therpistId],
        admins: [therpistId],
      };

      // Call the API to create the organization
      OrganizationService.createOrganization(organization)
        .then((data) => {
          if (data?._id) {
            Swal.fire({
              icon: "success",
              title: "Organization Created!",
              text: "The organization has been created successfully.",
              preConfirm: () => {
                window.location.reload();
              },
            });
          } else if (data?.message?.toString().includes("E11000")) {
            // Handle duplicate organization name error
            Swal.fire({
              icon: "error",
              title: "Organization Name Already Exists!",
              text: "The organization already exists in the system.",
            });
          } else {
            // Log other errors
            console.error("Error creating organization:", data.message);
          }
        })
        .catch((error) => {
          // Catch API call errors
          console.error("Error creating organization:", error);
        });
    } catch (error) {
      // Catch submission errors
      console.error("Error submitting the form:", error);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-opacity-20 backdrop-blur-sm bg-black flex justify-center items-center py-2"
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
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-8">
              <div className="flex-1">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Organization Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={organizationName}
                  onChange={(e) => setOrganizationName(e.target.value)} // Update state
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
                  onChange={(value) => setCountry(value)} // Update state
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
                  value={city}
                  onChange={(e) => setCity(e.target.value)} // Update state
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
                  value={address}
                  onChange={(e) => setAddress(e.target.value)} // Update state
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
                  onChange={handleLogoChange} // Handle file selection
                />
                <div className="flex justify-center items-center">
                  {logoFile && (
                    <img
                      id="logo-preview"
                      src=""
                      alt="Logo Preview"
                      className="w-24 h-24 object-cover rounded-md mt-2"
                    />
                  )}
                </div>
                {uploadError && (
                  <p className="text-red-600 mt-2">{uploadError}</p>
                )}
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
