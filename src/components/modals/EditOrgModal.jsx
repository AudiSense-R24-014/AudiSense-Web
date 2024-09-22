import { X } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import Select from "react-select";
import PropTypes from "prop-types";
import countryList from "react-select-country-list";
import { storage, ref, uploadBytes, getDownloadURL } from "../../../firebase"; // Adjust the import path as needed
import OrganizationService from "../../services/Organization.service";
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

export default function EditOrgModal({
  visible,
  onClose,
  organizationDetails,
}) {
  // States for form inputs
  const [organizationName, setOrganizationName] = useState("");
  const [country, setCountry] = useState({});
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [logoFile, setLogoFile] = useState(null); // Handle file uploads separately
  const [uploadError, setUploadError] = useState(null); // Handle errors

  const countries = useMemo(() => countryList().getData(), []);

  // Ensure this component doesn't render hooks conditionally
  useEffect(() => {
    // Reset states when organizationDetails change
    setOrganizationName(organizationDetails?.name || "");
    setCountry(
      {
        label: organizationDetails?.country,
        value: organizationDetails?.country,
      } || ""
    );
    setCity(organizationDetails?.city || "");
    setAddress(organizationDetails?.address || "");
  }, [organizationDetails]);

  if (!visible) {
    return null;
  }

  // Handle logo file selection
  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    setLogoFile(file);
    const reader = new FileReader();
    reader.onload = () => {
      const preview = document.getElementById("logo-preview");
      preview.src = reader.result;
    };
    reader.readAsDataURL(file);
  };

  // Function to handle file upload to Firebase Storage
  const uploadLogo = async (file) => {
    try {
      const storageRef = ref(
        storage,
        `organization-logos/${Date.now()}-${file.name}`
      );
      await uploadBytes(storageRef, file);
      return await getDownloadURL(storageRef);
    } catch (error) {
      setUploadError("File upload failed. Please try again.");
      console.error("Error uploading file:", error);
      throw error;
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    let logoUrl = organizationDetails?.companyLogo;
    try {
      if (logoFile) {
        logoUrl = await uploadLogo(logoFile);
      }
      const organization = {
        name: organizationName,
        country: country.label,
        city,
        address,
        companyLogo: logoUrl,
      };

      // Update Organization details
      await OrganizationService.updateOrganization(
        organizationDetails._id,
        organization
      )
        .then((data) => {
          if (data._id) {
            Swal.fire({
              title: "Success!",
              text: "Organization details updated successfully!",
              icon: "success",
              confirmButtonText: "OK",
            }).then(() => {
              onClose();
              window.location.reload();
            });
          } else {
            Swal.fire({
              title: "Error",
              text: "Failed to update organization",
              icon: "error",
            });
          }
        })
        .catch((error) => {
          console.error("Error updating organization:", error);
          Swal.fire({
            title: "Error",
            text: "Failed to update organization",
            icon: "error",
          });
        });
    } catch (error) {
      console.error("Error updating organization:", error);
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
                  onChange={(e) => setOrganizationName(e.target.value)}
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
                  onChange={(value) => setCountry(value)}
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
                  onChange={(e) => setCity(e.target.value)}
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
                <input
                  type="text"
                  name="address"
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="input-field"
                  placeholder="Address"
                  required
                />
              </div>
            </div>
            <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-8">
              <div className="flex-1">
                <label
                  htmlFor="companyLogo"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Company Logo
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoChange}
                  className="input-field"
                />
                {uploadError && (
                  <p className="text-red-500 text-sm mt-1">{uploadError}</p>
                )}
                <img
                  id="logo-preview"
                  className="mt-4 w-32 h-32 object-cover self-center"
                  alt="Logo Preview"
                  src={organizationDetails?.companyLogo}
                />
              </div>
            </div>
            <div className="flex justify-center py-10">
              <button
                type="submit"
                className="text-white bg-audi-purple hover:bg-purple-900 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-12 py-2.5"
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

EditOrgModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  organizationDetails: PropTypes.shape({
    name: PropTypes.string,
    country: PropTypes.string,
    city: PropTypes.string,
    address: PropTypes.string,
    companyLogo: PropTypes.string,
  }),
};
