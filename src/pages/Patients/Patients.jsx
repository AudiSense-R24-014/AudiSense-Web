import React, { useState, useEffect } from "react";
import AddNewPatientModal from "../../components/modals/AddNewPatientModal";
import PatientService from "../../services/Patient.service";
import { useNavigate } from "react-router-dom";

function Patients() {
  const therapistUser = JSON.parse(localStorage.getItem("audi-user"));
  const [patients, setPatients] = useState([]);
  const [openAddNewPatientModal, setOpenAddNewPatientModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const getAllPatients = async () => {
    setLoading(true);
    try {
      const response = await PatientService.getPatientsForOrganization(therapistUser?.organization);
      setPatients(response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllPatients();
  }, []);

  const handleRowClick = (patientId) => {
    // Redirect to the patient details page
    navigate(`/patients/${patientId}`);
  };

  return (
    <div className="p-4 px-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-nunito font-bold">Patients</h1>
        <button
          type="button"
          className="text-white font-montserrat bg-purple-400 hover:bg-purple-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none"
          onClick={() => setOpenAddNewPatientModal(true)}
        >
          Add New Patient
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-96">
          <div className="loader"></div>
          <p>Loading patients...</p>
        </div>
      ) : (
        <div className="min-w-full overflow-hidden overflow-x-scroll font-nunito">
          <div className="w-full">
            <div className="overflow-y-auto h-96">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr className="text-xs text-gray-700 text-left font-bold uppercase tracking-wider">
                    <th className="px-4 py-2">First Name</th>
                    <th className="px-4 py-2">Last Name</th>
                    <th className="px-4 py-2">Gender</th>
                    <th className="px-4 py-2">DOB</th>
                    <th className="px-4 py-2">Contact No</th>
                    <th className="px-4 py-2">Email</th>
                    <th className="px-4 py-2 text-center">Is Implanted</th>
                    <th className="px-4 py-2">Surgery Date</th>
                    <th className="px-4 py-2">Switched on Date</th>
                  </tr>
                </thead>
                <tbody>
                  {patients
                    .slice()
                    .reverse()
                    .map((patient, index) => (
                      <tr
                        key={index + "patient"}
                        className={`text-sm hover:bg-purple-200`}
                        onClick={() => handleRowClick(patient._id)}
                        style={{ cursor: "pointer" }}
                      >
                        <td className="border-b px-4 py-2">
                          {patient.firstName}
                        </td>
                        <td className="border-b px-4 py-2">{patient.lastName}</td>
                        <td className="border-b px-4 py-2">{patient.gender}</td>
                        <td className="border-b px-4 py-2">
                          {patient.dob ? patient.dob.slice(0, 10) : "N/A"}
                        </td>
                        <td className="border-b px-4 py-2">
                          {patient.contactNo}
                        </td>
                        <td className="border-b px-4 py-2">{patient.email}</td>
                        <td className="border-b px-4 py-2  text-center">
                          {patient.implant.isImplanted ? (
                            <span className="bg-green-500 text-white font-bold py-1 px-2 rounded-full">
                              Yes
                            </span>
                          ) : (
                            <span className="bg-red-500 text-white font-bold py-1 px-2 rounded-full">
                              No
                            </span>
                          )}
                        </td>
                        <td className="border-b px-4 py-2">
                          {patient.implant.surgeryDate
                            ? patient.implant.surgeryDate.slice(0, 10)
                            : "N/A"}
                        </td>
                        <td className="border-b px-4 py-2">
                          {patient.implant.switchOnDate
                            ? patient.implant.switchOnDate.slice(0, 10)
                            : "N/A"}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      <AddNewPatientModal
        visible={openAddNewPatientModal}
        onClose={() => setOpenAddNewPatientModal(false)}
      />
    </div>
  );
}

export default Patients;
