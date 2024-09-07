import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import PropTypes from "prop-types";
import moment from "moment";
import AwarenessBasicService from "../../../services/AwarenessSerivce/AwarenessBasic.service";
import PatientService from '../../../services/Patient.service'

export default function AwarenessSoundView({ visible, onClose, getData, data, patients }) {
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [patientData, setPatientData] = useState(null);


    useEffect(() => {
        if (data?.patientID) {
            PatientService.getPatient(data.patientID)
                .then((response) => {
                    setPatientData(response);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
        else {
            setPatientData(null);
        }
    }, [data]);


    if (!visible) {
        return null;
    }

    const handlePatientAssign = () => {
        if (selectedPatient) {
            const updatedData = {
                patientID: selectedPatient,
            };

            AwarenessBasicService.updateAwarenessSound(data._id, updatedData)
                .then((response) => {
                    console.log(response);
                    alert("Patient assigned successfully.");
                })
                .catch((error) => {
                    console.error(error);
                    alert("Error assigning patient.");
                })
                .finally(() => {
                    setSelectedPatient(null);
                    getData();
                    onClose();
                });

        }
    };

    return (
        <div
            className="fixed inset-0 bg-opacity-20 backdrop-blur-sm bg-black flex justify-center items-center"
            aria-modal="true"
        >
            <div className="bg-white rounded-xl relative w-5/6 lg:w-1/2 shadow-lg">
                <div className="border-b-2 p-2 lg:p-4 lg:px-8 flex justify-between items-center">
                    <h1 className="font-bold font-montserrat text-lg">
                        Sound Set Details
                    </h1>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-600"
                        aria-label="Close"
                    >
                        <X />
                    </button>
                </div>

                {/* Modal Content */}
                <div className="font-montserrat p-4 lg:p-6 lg:px-10 bg-white rounded-lg space-y-6">
                    <h3 className="text-lg font-semibold text-gray-800">
                        Created on: {moment(data.createdAt).format("MMM Do YYYY")}
                    </h3>

                    {data.sounds.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {data.sounds.map((sound, index) => (
                                <div key={index} className="p-4 bg-gray-50 rounded-lg shadow-inner">
                                    <p className="text-md font-medium text-gray-700 mb-2">
                                        Sound {index + 1}: {sound.name.replace(/_/g, ' ') || "N/A"}
                                    </p>
                                    <audio controls className="w-full mb-2">
                                        <source src={sound.url} type="audio/mpeg" />
                                        Your browser does not support the audio element.
                                    </audio>
                                    <p className="text-sm text-gray-500 italic">{sound.description}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-sm text-gray-600">No sounds generated.</p>
                    )}

                    {/* Assign or View Patient */}
                    {patientData ? (
                        <div className="p-4 bg-green-50 rounded-lg shadow-inner">
                            <h3 className="text-lg font-semibold text-gray-800">Assigned Patient:</h3>
                            <p className="text-md text-gray-700">Name: {patientData.fName} {patientData.lName}</p>
                            <p className="text-sm text-gray-500">Email: {patientData.email}</p>
                        </div>
                    ) : (
                        <div className="p-4 bg-red-50 rounded-lg shadow-inner">
                            <h3 className="text-lg font-semibold text-gray-800">Assign Patient</h3>
                            <select
                                value={selectedPatient}
                                onChange={(e) => setSelectedPatient(e.target.value)}
                                className="block w-full px-3 py-2 mt-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            >
                                <option value="">Select a patient</option>
                                {patients.length > 0 &&
                                    patients.map((patient) => (
                                        <option key={patient._id} value={patient._id}>
                                            {patient.fName} {patient.lName}
                                        </option>
                                    ))}
                            </select>
                            <button
                                onClick={handlePatientAssign}
                                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                            >
                                Assign Patient
                            </button>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}

AwarenessSoundView.propTypes = {
    visible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    data: PropTypes.object,
    getDate: PropTypes.func,
    patients: PropTypes.array.isRequired,
};