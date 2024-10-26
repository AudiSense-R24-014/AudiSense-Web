import { X } from "lucide-react";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ComprehensionTaskService from "../../services/ComprehensionTask.service";
import DiscriminationTaskService from "../../services/DiscriminationTask.service";
import Swal from "sweetalert2";
import PatientService from "../../services/Patient.service";

export default function AssignDiscriminationTaskModal({
  discriminationTaskId,
  visible,
  onClose,
}) {
  const [organizationId, setOrganizationId] = useState("");
  const [patients, setPatients] = useState([]);
  const [selectedPatientId, setSelectedPatientId] = useState("");

  useEffect(() => {
    setOrganizationId(JSON.parse(localStorage.getItem("audi-user"))?.organization);
  }, [discriminationTaskId]);

  useEffect(() => {
    if (visible) {
      getPatients();
    }
  }, [visible]);

  const getPatients = () => {
    PatientService.getPatients()
      .then((response) => {
        setPatients(response);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSubmit = (e) => {
    console.log(selectedPatientId);
    e.preventDefault();
    if (selectedPatientId) {
        DiscriminationTaskService.createActivity({
        patient: selectedPatientId,
        organization: organizationId,
        discriminationTask: discriminationTaskId,
        status: "pending",
      })
        .then(() => {
          Swal.fire({
            title: "Success",
            text: "Task assigned successfully",
            icon: "success",
          });
        })
        .catch((error) => {
          console.error(error);
          Swal.fire({
            title: "Error",
            text: "Failed to assign task",
            icon: "error",
          });
        });
    } else {
      Swal.fire({
        title: "Error",
        text: "Please select a patient and a level",
        icon: "error",
      });
    }
    onClose(); // Close modal after submission
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0]; // Formats as YYYY-MM-DD
  };

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
          <div className="flex flex-row space-x-2 items-center">
            <h1 className="font-bold font-montserrat text-lg text-center">
              Assign Discrimination Task:
            </h1>
            <h2 className="font-regular font-montserrat text-sm">
              {discriminationTaskId}
            </h2>
          </div>
        </div>
        <div className="font-montserrat pt-4">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="flex flex-col space-y-4">
              <label htmlFor="patient" className="font-medium">
                Select Patient
              </label>
              <select
                id="patient"
                value={selectedPatientId || ""}
                onChange={(e) => setSelectedPatientId(e.target.value)}
                className="border border-gray-300 rounded-md p-2"
              >
                <option value="" disabled>
                  Select a patient
                </option>
                {patients
                  .slice()
                  .reverse()
                  .map((patient) => (
                    <option key={patient._id} value={patient._id}>
                      {`${patient.firstName} ${patient.lastName}, DOB: ${formatDate(
                        patient.dob
                      )}`}
                    </option>
                  ))}
              </select>
            </div>
            <div className="flex justify-center py-10">
              <button
                type="submit"
                className="text-white bg-audi-purple hover:bg-purple-900 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-12 py-2.5"
              >
                Assign Task
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

AssignDiscriminationTaskModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  discriminationTaskId: PropTypes.any,
};
