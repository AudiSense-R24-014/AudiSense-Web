import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import PropTypes from "prop-types";
import moment from "moment";
import Ling6SeparateService from "../../../services/AwarenessSerivce/Ling6Separate.service";
import PatientService from '../../../services/Patient.service'

export default function Ling6SeparateView({ visible, onClose, getData, data, patients }) {
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

            Ling6SeparateService.updateLing6Separate(data._id, updatedData)
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
            <div className="bg-white rounded-xl relative w-5/6 lg:w-1/2">
                <div className="border-b-2 p-2 lg:p-4 lg:px-8">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-1 rounded-lg text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-600"
                        aria-label="Close"
                    >
                        <X />
                    </button>

                    <h1 className="font-bold font-montserrat text-lg">
                        Ling6SeparateView
                    </h1>
                </div>
                {/* Modal Content */}
                <div className="font-montserrat p-4 lg:p-6 lg:px-10 bg-white rounded-lg space-y-6">
                    <h3 className="text-lg font-semibold text-gray-800">
                        Created on: {moment(data.createdAt).format("MMM Do YYYY")}
                    </h3>

                    <div className="p-4 border border-gray-300 rounded-lg shadow-lg bg-white">
                        <h3 className="text-md font-semibold text-gray-800 mb-2">
                            Voice: {data.voice}
                        </h3>
                        <h3 className="text-md font-semibold text-gray-800 mb-2">
                            Pitch: {data.pitch}
                        </h3>
                        <h3 className="text-md font-semibold text-gray-800 mb-2">
                            Rate: {data.rate}
                        </h3>
                        <h3 className="text-md font-semibold text-gray-800 mb-4">
                            Break Time: {data.breakTime}
                        </h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {data.sounds.map((sound) => (
                                <div key={sound._id} className="flex items-center space-x-4">
                                    <span className="text-sm font-medium text-gray-900">{sound.sound}</span>
                                    <audio controls>
                                        <source src={sound.soundUrl} type="audio/wav" />
                                        Your browser does not support the audio element.
                                    </audio>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Assign or View Patient */}
                    {patientData ? (
                        <div className="p-4 bg-green-50 rounded-lg shadow-inner">
                            <h3 className="text-lg font-semibold text-gray-800">Assigned Patient:</h3>
                            <p className="text-md text-gray-700">Name: {patientData.fName} {patientData.lName}</p>
                            <p className="text-sm text-gray-500">Email: {patientData.email}</p>

                            {data.isResponded ? (
                                <div>
                                    <p className="text-sm text-gray-500">Recorded on: {moment(data.updatedAt).format("MMM Do YYYY")}</p>
                                    <p className="text-md text-gray-700">Implant Status:
                                        {data.implantStatus ? (
                                            <span className="bg-green-500 text-white font-bold py-1 px-2 rounded-full">
                                                Yes
                                            </span>
                                        ) : (
                                            <span className="bg-red-500 text-white font-bold py-1 px-2 rounded-full">
                                                No
                                            </span>
                                        )}
                                    </p>
                                    <div className="grid grid-cols-2 gap-4">
                                        {data.responses.map((response, index) => (
                                            <div key={index} className="mt-4">
                                                <p className="text-md text-gray-700">
                                                    {response.name} - {response.response ? (
                                                        <span className="bg-green-500 text-white font-bold py-1 px-2 rounded-full">
                                                            Yes
                                                        </span>
                                                    ) : (
                                                        <span className="bg-red-500 text-white font-bold py-1 px-2 rounded-full">
                                                            No
                                                        </span>
                                                    )}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <p className="text-sm text-red-500">Patient has not responded.</p>
                            )}
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
    )
}

Ling6SeparateView.propTypes = {
    visible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    data: PropTypes.object,
    getDate: PropTypes.func,
    patients: PropTypes.array.isRequired,
};