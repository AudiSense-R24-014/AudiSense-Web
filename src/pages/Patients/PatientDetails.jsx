import React, { useEffect, useState } from "react";
import VerifyUserModal from "../../components/modals/VerifyUserModal";
import EditPatientModal from "../../components/modals/EditPatientModal";
import PatientService from "../../services/Patient.service";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

const PatientDetails = () => {
  const { id } = useParams();
  const [openEditPatient, setOpenEditPatient] = useState(false);
  const [openVerifyUserToRemovePatient, setOpenVerifyUserToRemovePatient] =
    useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [patient, setPatient] = useState({});

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("audi-user"));
    if (user) {
      PatientService.getPatient(id)
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
      <div className="flex flex-col sm:flex-row items-center justify-between font-montserrat bg-white p-5 rounded-lg shadow-md mt-5">
        {/* Left Section: Patient Details */}
        <div className="flex-1 sm:mb-0 mb-4">
          {/* Patient Name */}
          <div className="mb-2">
            <p className="text-3xl font-normal mt-2">
              {patient?.firstName} {patient?.lastName}
            </p>
          </div>

          {/* Patient email Address */}
          <div className="mb-2">
            <h2 className="text-lg font-montserrat font-normal">
              {patient?.email}
            </h2>
          </div>
          <div className="mb-2">
            <h2 className="text-lg font-montserrat font-normal">
              {patient?.dob
                ? new Date(patient.dob).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
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
        <div className="sm:text-right text-left mt-36">
          <div className="mb-2">
            <h2 className="text-sm font-montserrat font-normal">
              Surgery Date:{" "}
              <strong>
                {patient?.implant?.surgeryDate
                  ? new Date(patient?.implant?.surgeryDate).toLocaleDateString(
                      "en-US",
                      { year: "numeric", month: "long", day: "numeric" }
                    )
                  : "Date not available"}{" "}
              </strong>
            </h2>
          </div>
          <div className="mb-2">
            <h2 className="text-sm font-montserrat font-normal">
              Switched On Date:{" "}
              <strong>
                {patient?.implant?.switchOnDate
                  ? new Date(patient?.implant?.switchOnDate).toLocaleDateString(
                      "en-US",
                      { year: "numeric", month: "long", day: "numeric" }
                    )
                  : "Date not available"}{" "}
              </strong>
            </h2>
          </div>
        </div>
      </div>
      <div className="flex flex-col font-montserrat bg-white p-5 rounded-lg shadow-md mt-5 space-y-6">
        {/* General Details Section */}
        <div className="flex-1 sm:mb-0 mb-4">
          {/* General Details Heading */}
          <div className="mb-4">
            <h2 className="text-lg font-semibold">General Details</h2>
          </div>
          {/* Fields in one row */}
          <div className="flex flex-row flex-wrap space-x-6">
            {/* Hearing Age */}
            <div className="flex items-center">
              <h3 className="text-base font-normal">Hearing Age:</h3>
              <span className="ml-2 font-semibold text-base ">
                {patient?.hearingAge || "Not available"}
              </span>
            </div>

            {/* AVT Level */}
            <div className="flex items-center">
              <h3 className="text-base font-normal">AVT Level:</h3>
              <span className="ml-2 font-semibold">
                {patient?.avtLevel || "Not available"}
              </span>
            </div>

            {/* Is Implanted */}
            <div className="flex items-center">
              <h3 className="text-base font-normal">Is Implanted:</h3>
              <span className="ml-2 font-semibold">
                {patient?.isImplanted ? "Yes" : "No"}
              </span>
            </div>
          </div>

          {/* Complaints */}
          <div className="flex items-center">
            <h3 className="text-base font-normal">Complaints:</h3>
            <span className="ml-2 font-semibold">
              {patient?.complaints || "None"}
            </span>
          </div>
        </div>

        {/*  Second */}
        <div className="flex-1 sm:mb-0 mb-4">
          {/* Onset */}
          <div className="mb-4">
            <h2 className="text-lg font-semibold">Onset</h2>
          </div>
          <div className="flex flex-row flex-wrap space-x-6">
            {/* Hearing Age */}
            <div className="flex items-center">
              <h3 className="text-base font-normal">Age When Noticed:</h3>
              <span className="ml-2 font-semibold text-base ">
                {patient?.hearingAge || "Not available"}
              </span>
            </div>

            {/* AVT Level */}
            <div className="flex items-center">
              <h3 className="text-base font-normal">
                Attention First Sought at:
              </h3>
              <span className="ml-2 font-semibold">
                {patient?.avtLevel || "Not available"}
              </span>
            </div>

            {/* Is Implanted */}
            <div className="flex items-center">
              <h3 className="text-base font-normal">Early Treatment:</h3>
              <span className="ml-2 font-semibold">
                {patient?.isImplanted ? "Yes" : "No"}
              </span>
            </div>
          </div>
        </div>
        {/*  Third */}
        <div className="flex-1 sm:mb-0 mb-4">
          {/* Natal History */}
          <div className="mb-4">
            <h2 className="text-lg font-semibold">Natal History</h2>
          </div>
          <div className="flex flex-row flex-wrap space-x-6">
            {/* Hearing Age */}
            <div className="flex items-center">
              <h3 className="text-base font-normal">Previous Pregnancies:</h3>
              <span className="ml-2 font-semibold text-base ">
                {patient?.hearingAge || "Not available"}
              </span>
            </div>

            {/* AVT Level */}
            <div className="flex items-center">
              <h3 className="text-base font-normal">Prenatal:</h3>
              <span className="ml-2 font-semibold">
                {patient?.avtLevel || "Not available"}
              </span>
            </div>

            {/* Is Implanted */}
            <div className="flex items-center">
              <h3 className="text-base font-normal">Perinatal: Birth Cry:</h3>
              <span className="ml-2 font-semibold">
                {patient?.isImplanted ? "Yes" : "No"}
              </span>
            </div>
            {/* Birth Weight */}
            <div className="flex items-center">
              <h3 className="text-base font-normal">Birth Weight:</h3>
              <span className="ml-2 font-semibold">
                {patient?.isImplanted ? "Yes" : "No"}
              </span>
            </div>
            {/* Postnatal */}
            <div className="flex items-center">
              <h3 className="text-base font-normal">Postnatal:</h3>
              <span className="ml-2 font-semibold">
                {patient?.isImplanted ? "Yes" : "No"}
              </span>
            </div>
          </div>
        </div>
        {/* Expand/Collapse Button */}
        <div className="flex flex-col items-end">
          <button
            className=" bg-purple-500 hover:bg-purple-600 text-white font-semibold px-6 rounded flex items-center justify-between "
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {/* Conditional Arrow Icon */}
            <span className="mr-2">{isExpanded ? "▲" : "▼"}</span>
            {/* {isExpanded ? 'Collapse' : 'Expand'} */}
          </button>
        </div>
        {/*  Fourth */}
        {isExpanded && (
          <div>
            <div className="flex-1 sm:mb-0 mb-4">
              {/* Natal History */}
              <div className="mb-4">
                <h2 className="text-lg font-semibold">Development History</h2>
              </div>
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-purple-700">
                  Motor Milestones
                </h2>
              </div>
              <div className="flex flex-row flex-wrap space-x-6">
                {/* Hearing Age */}
                <div className="flex items-center">
                  <h3 className="text-base font-normal">Head Held Up:</h3>
                  <span className="ml-2 font-semibold text-base ">
                    {patient?.hearingAge || "Not available"}
                  </span>
                </div>

                {/* AVT Level */}
                <div className="flex items-center">
                  <h3 className="text-base font-normal">Turn Over:</h3>
                  <span className="ml-2 font-semibold">
                    {patient?.avtLevel || "Not available"}
                  </span>
                </div>

                {/* Is Implanted */}
                <div className="flex items-center">
                  <h3 className="text-base font-normal">Crawling:</h3>
                  <span className="ml-2 font-semibold">
                    {patient?.isImplanted ? "Yes" : "No"}
                  </span>
                </div>
                {/* Birth Weight */}
                <div className="flex items-center">
                  <h3 className="text-base font-normal">
                    Walking Independently:
                  </h3>
                  <span className="ml-2 font-semibold">
                    {patient?.isImplanted ? "Yes" : "No"}
                  </span>
                </div>
              </div>
            </div>
            {/*  Fifth */}
            <div className="flex-1 sm:mb-0 mb-4">
              {/* Natal History */}
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-purple-700">
                  Speech and Language Milestone
                </h2>
              </div>
              <div className="flex flex-row flex-wrap space-x-6">
                {/* Hearing Age */}
                <div className="flex items-center">
                  <h3 className="text-base font-normal">Babbling:</h3>
                  <span className="ml-2 font-semibold text-base ">
                    {patient?.hearingAge || "Not available"}
                  </span>
                </div>

                {/* AVT Level */}
                <div className="flex items-center">
                  <h3 className="text-base font-normal">First Word:</h3>
                  <span className="ml-2 font-semibold">
                    {patient?.avtLevel || "Not available"}
                  </span>
                </div>

                {/* Is Implanted */}
                <div className="flex items-center">
                  <h3 className="text-base font-normal">Two-Word Phrase:</h3>
                  <span className="ml-2 font-semibold">
                    {patient?.isImplanted ? "Yes" : "No"}
                  </span>
                </div>
                {/* Birth Weight */}
                <div className="flex items-center">
                  <h3 className="text-base font-normal">Sentences:</h3>
                  <span className="ml-2 font-semibold">
                    {patient?.isImplanted ? "Yes" : "No"}
                  </span>
                </div>
              </div>
            </div>
            {/*  Sixth */}
            <div className="flex-1 sm:mb-0 mb-4">
              {/* Natal History */}
              <div className="flex items-center">
                <h2 className="text-lg font-semibold text-purple-700">
                  Handedness:{" "}
                </h2>
                <span className="ml-2 font-semibold text-base ">
                  {patient?.hearingAge || "Not available"}
                </span>
              </div>
            </div>
            {/*  Seventh */}
            <div className="flex-1 sm:mb-0 mb-4">
              {/* Natal History */}
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-purple-700">
                  Educational History
                </h2>
              </div>
              <div className="flex flex-row flex-wrap space-x-6">
                {/* Hearing Age */}
                <div className="flex items-center">
                  <h3 className="text-base font-normal">Type of School:</h3>
                  <span className="ml-2 font-semibold text-base ">
                    {patient?.hearingAge || "Not available"}
                  </span>
                </div>

                {/* AVT Level */}
                <div className="flex items-center">
                  <h3 className="text-base font-normal">
                    Medium of Instruction:
                  </h3>
                  <span className="ml-2 font-semibold">
                    {patient?.avtLevel || "Not available"}
                  </span>
                </div>
              </div>
              {/* Is Implanted */}
              <div className="flex items-center">
                <h3 className="text-base font-normal">
                  Any Difficulties in Subjects:
                </h3>
                <span className="ml-2 font-semibold">
                  {patient?.isImplanted ? "Yes" : "No"}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Modals */}
      <EditPatientModal
        visible={openEditPatient}
        onClose={() => setOpenEditPatient(false)}
        patient={patient}
      />

      <VerifyUserModal
        visible={openVerifyUserToRemovePatient}
        onClose={() => setOpenVerifyUserToRemovePatient(false)}
        titleText="Do you really wish to remove the therapist?"
        optionalText="The therapist will no longer have access to the organization. Please verify your password to proceed."
        onConfirm={() => removePatient(patient)}
      />
    </div>
  );
};

export default PatientDetails;
