import { X } from "lucide-react";
import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import OrganizationService from "../../services/Organization.service";
import Swal from "sweetalert2";


export default function JoinOrganizationModal({ visible, onClose }) {
    // States for form inputs
    const [joinCode, setJoinCode] = useState("");
    const [organization, setOrganization] = useState({});

    if (!visible) {
        return null;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        OrganizationService.getOrganizationByJoinCode("TA6KM8").then((data) => {
            setOrganization(data);
            console.log(data);
        }).catch((err) => {
            console.error("Error getting organization by join code: ", err);
        });
    };
    const handleJoinOrganization = () => {
        // SweetAlert confirmation
        Swal.fire({
            title: "Are you sure?",
            text: "Do you want to join this organization?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, join it!"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    "Joined!",
                    "You have successfully joined the organization.",
                    "success"
                );
                // You can trigger additional actions like closing the modal or sending data
                onClose(); // Close the modal after confirmation
            }
        });
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
                        Join an Existing Organization
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
                                    Join Code
                                </label>
                                <input
                                    type="text"
                                    name="joinCode"
                                    id="joinCode"
                                    value={joinCode}
                                    onChange={(e) => setJoinCode(e.target.value)} // Update state
                                    className="input-field"
                                    placeholder="Enter the Code given by the Registered Organization"
                                    required
                                />
                            </div>
                        </div>
                        <div className="flex justify-center py-10">
                            <button
                                type="submit"
                                className="text-white bg-audi-purple hover:bg-purple-900 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-12 py-2.5"
                            >
                                View Organization
                            </button>
                        </div>
                    </form>
                </div>
                {/* Display the organization data when available */}
                {organization && (
                    <div>
                        <div className="mt-8 p-4 border border-gray-300 rounded-lg">
                            <h2 className="text-xl font-semibold">Organization Details</h2>
                            <p><strong>Name:</strong> {organization.name}</p>
                            <p><strong>Address:</strong> {organization.address}</p>
                            <p><strong>Country:</strong> {organization.country}</p>
                            <p><strong>City:</strong> {organization.city}</p>
                            {/* Add more fields as needed based on the organization's structure */}
                            <div className="flex justify-center mt-4">
                                <button
                                    type="submit"
                                    onClick={handleJoinOrganization}
                                    className="text-white bg-audi-purple hover:bg-purple-900 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-12 py-2.5 mt-5"
                                >
                                    Request to Join
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

JoinOrganizationModal.propTypes = {
    visible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};
