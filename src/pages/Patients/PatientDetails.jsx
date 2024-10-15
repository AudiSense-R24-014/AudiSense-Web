import React, { useEffect, useState } from "react";
import VerifyUserModal from "../../components/modals/VerifyUserModal";
import EditPatientModal from "../../components/modals/EditPatientModal";
import PatientService from "../../services/Patient.service";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import AddNewCLFModal from "../../components/modals/AddNewCLFModal";
import PatientProfileDetails from "../../components/PatientProfileDetails";
import {
    ArrowBigDown,
    ArrowBigDownDashIcon,
    ArrowBigUpDashIcon,
    PlusCircle,
} from "lucide-react";

const PatientDetails = () => {
    const { id } = useParams();
    const [openEditPatient, setOpenEditPatient] = useState(false);
    const [openVerifyUserToRemovePatient, setOpenVerifyUserToRemovePatient] =
        useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [patient, setPatient] = useState({});
    const [openAddNewCLF, setOpenAddNewCLF] = useState(false);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("audi-user"));
        if (user) {
            PatientService.getPatientById(id)
                .then((data) => {
                    setPatient(data);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, []);

    const verifyUserToRemovePatient = () => {
        setOpenVerifyUserToRemovePatient(true);
    };

    const removePatient = (patient) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Do you want to remove this patient?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, remove patient!",
        }).then((result) => {
            if (result.isConfirmed) {
                PatientService.deletePatient(patient._id)
                    .then(() => {
                        Swal.fire({
                            title: "Patient Removed!",
                            text: "The patient has been removed successfully",
                            icon: "success",
                        });
                        setOpenVerifyUserToRemovePatient(false);
                        window.location.href = "/patients";
                    })
                    .catch((error) => {
                        console.error(error);
                        Swal.fire({
                            title: "Error!",
                            text: "There was an error removing the patient",
                            icon: "error",
                        });
                        setOpenVerifyUserToRemovePatient(false);
                    });
            }
        });
    };

    return (
        <div className="p-4 px-10">
            <div className="flex flex-col font-montserrat bg-white p-5 rounded-lg shadow-md mt-5">
                {/* Upper Section: Patient Details */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                    <div className="flex-1 sm:mb-0 mb-4">
                        {/* Patient Name */}
                        <div className="mb-2">
                            <p className="text-3xl font-normal mt-2">
                                {patient?.firstName} {patient?.lastName}
                            </p>
                        </div>

                        {/* Patient Email Address */}
                        <div className="mb-2">
                            <h2 className="text-lg font-montserrat font-normal">
                                {patient?.email}
                            </h2>
                        </div>
                        <div className="mb-2">
                            <h2 className="text-lg font-montserrat font-normal">
                                {patient?.dob
                                    ? new Date(patient.dob).toLocaleDateString(
                                          "en-US",
                                          {
                                              year: "numeric",
                                              month: "long",
                                              day: "numeric",
                                          }
                                      )
                                    : "Date not available"}{" "}
                                ({patient?.gender})
                            </h2>
                        </div>
                        <div className="mb-2">
                            <h2 className="text-lg font-montserrat font-normal">
                                {patient?.contactNo}
                            </h2>
                        </div>
                        <div className="mt-4">
                            <button
                                className="bg-purple-500 mb-2 hover:bg-audi-purple text-white font-semibold py-2 px-6 rounded sm:mr-2"
                                onClick={() => setOpenEditPatient(true)}
                            >
                                Edit Patient Details
                            </button>
                            <button
                                className="bg-red-500 mb-2 hover:bg-red-800 text-white font-semibold py-2 px-9 rounded"
                                onClick={verifyUserToRemovePatient}
                            >
                                Remove Patient
                            </button>
                        </div>
                    </div>

                    {/* Surgery and Switched On Dates */}
                    <div className="text-left sm:text-right mt-6 sm:mt-32">
                        <div className="mb-2">
                            <h2 className="text-sm font-montserrat font-normal">
                                Surgery Date:{" "}
                                <strong>
                                    {patient?.implant?.surgeryDate
                                        ? new Date(
                                              patient?.implant?.surgeryDate
                                          ).toLocaleDateString("en-US", {
                                              year: "numeric",
                                              month: "long",
                                              day: "numeric",
                                          })
                                        : "Date not available"}{" "}
                                </strong>
                            </h2>
                        </div>
                        <div className="mb-2">
                            <h2 className="text-sm font-montserrat font-normal">
                                Switched On Date:{" "}
                                <strong>
                                    {patient?.implant?.switchOnDate
                                        ? new Date(
                                              patient?.implant?.switchOnDate
                                          ).toLocaleDateString("en-US", {
                                              year: "numeric",
                                              month: "long",
                                              day: "numeric",
                                          })
                                        : "Date not available"}{" "}
                                </strong>
                            </h2>
                        </div>

                        {/* Expand Button */}
                        <div className="mb-2 flex sm:justify-end sm:flex-row-reverse items-center sm:float-right">
                            {!isExpanded && (
                                <button
                                    onClick={() => setIsExpanded(true)}
                                    className="text-xs flex flex-row bg-purple-500 p-1 px-2 rounded-lg text-white hover:bg-purple-800"
                                >
                                    Expand
                                    <ArrowBigDownDashIcon size={16} />
                                </button>
                            )}
                            {isExpanded && (
                                <button
                                    onClick={() => setIsExpanded(false)}
                                    className="text-xs flex flex-row bg-purple-500 p-1 px-2 rounded-lg text-white hover:bg-purple-800"
                                >
                                    Show Less
                                    <ArrowBigUpDashIcon size={16} />
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {isExpanded && (
                    <hr className="w-full border-t-2 border-gray-300 my-4" />
                )}

                {isExpanded && (
                    <div>
                        <PatientProfileDetails patient={patient} />
                        <button
                            onClick={() => setIsExpanded(false)}
                            className="text-xs flex flex-row bg-purple-500 p-1 px-2 rounded-lg text-white hover:bg-purple-800 mt-3 float-right"
                        >
                            Show Less
                            <ArrowBigUpDashIcon size={16} />
                        </button>
                    </div>
                )}
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-between font-montserrat bg-white p-5 rounded-lg shadow-md mt-5">
                <div className="flex-1 sm:mb-0 mb-4">
                    <div className="mb-4">
                        <h2 className="text-lg font-semibold">CLF History</h2>
                    </div>
                    <div className="mt-4 flex justify-end">
                        <button
                            className="flex flex-row bg-purple-500 mb-2 hover:bg-audi-purple text-white font-semibold py-2 px-6 rounded sm:mr-2"
                            onClick={() => setOpenAddNewCLF(true)}
                        >
                            <PlusCircle size={22} className="mr-2" />
                            Add New CLF Record
                        </button>
                    </div>
                    <div className="overflow-y-auto h-96">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr className="text-xs text-gray-700 text-left font-bold uppercase tracking-wider">
                                    <th className="px-4 py-2">Date</th>
                                    <th className="px-4 py-2">Implant Age</th>
                                    <th className="px-4 py-2">CLF Age</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {patient?.clfs?.map((clf) => (
                                    <tr
                                        key={clf._id}
                                        className="text-sm text-gray-700"
                                    >
                                        <td className="px-4 py-2">
                                            {new Date(
                                                clf.date
                                            ).toLocaleDateString("en-US")}
                                        </td>
                                        <td className="px-4 py-2">
                                            {clf.implantAge || "N/A"}
                                        </td>
                                        <td className="px-4 py-2">
                                            {clf.clfAge || "N/A"}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Modals */}
            <EditPatientModal
                visible={openEditPatient}
                onClose={() => setOpenEditPatient(false)}
                patientId={id}
            />

            <VerifyUserModal
                visible={openVerifyUserToRemovePatient}
                onClose={() => setOpenVerifyUserToRemovePatient(false)}
                titleText="Do you really wish to remove the therapist?"
                optionalText="The therapist will no longer have access to the organization. Please verify your password to proceed."
                onConfirm={() => removePatient(patient)}
            />
            <AddNewCLFModal
                visible={openAddNewCLF}
                onClose={() => setOpenAddNewCLF(false)}
                patient={patient}
            />
        </div>
    );
};

export default PatientDetails;
