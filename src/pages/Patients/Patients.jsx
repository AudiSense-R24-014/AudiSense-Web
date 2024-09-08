import React, { useState, useEffect } from "react";
import { Edit, Trash } from "lucide-react";
import AddNewPatientModal from "../../components/modals/AddNewPatientModal";
import PatientService from "../../services/Patient.service";

function Patients() {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [openAddNewPatientModal, setOpenAddNewPatientModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const getAllPatients = async () => {
    setLoading(true);
    try {
      const response = await PatientService.getPatients();
      console.log(response);
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

  const handleEdit = (patient) => {
    // Implement your edit logic here
    console.log("Edit", patient);
  };

  const handleDelete = async (patient) => {
    // Implement your delete logic here
    await PatientService.deletePatient(patient._id)
      .then(() => {
        alert(patient.fName + " " + patient.lName + " has been deleted.");
        getAllPatients();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="p-4 px-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-nunito font-bold">Patients</h1>
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
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
        <div className="min-w-full overflow-hidden overflow-x-scroll">
          <div className="w-full">
            <div className="overflow-y-auto h-96">
              <table className="w-full table-auto">
                <thead className="bg-purple-600 text-white font-nunito sticky top-0">
                  <tr>
                    <th className="px-4 py-2">First Name</th>
                    <th className="px-4 py-2">Last Name</th>
                    <th className="px-4 py-2">Gender</th>
                    <th className="px-4 py-2">DOB</th>
                    <th className="px-4 py-2">Contact No</th>
                    <th className="px-4 py-2">Email</th>
                    <th className="px-4 py-2">AVT Level</th>
                    <th className="px-4 py-2">Is Implanted</th>
                    <th className="px-4 py-2">Surgery Date</th>
                    <th className="px-4 py-2">Switched on Date</th>
                    <th className="px-4 py-2">Edit</th>
                    <th className="px-4 py-2">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {patients.slice().reverse().map((patient, index) => (
                    <tr
                      key={index}
                      className={
                        index % 2 === 0
                          ? "bg-purple-200 font-nunito"
                          : "bg-purple-300 font-nunito"
                      }
                    >
                      <td className="border px-4 py-2">{patient.fName}</td>
                      <td className="border px-4 py-2">{patient.lName}</td>
                      <td className="border px-4 py-2">{patient.gender}</td>
                      <td className="border px-4 py-2">
                        {patient.dob ? patient.dob.slice(0, 10) : "N/A"}
                      </td>
                      <td className="border px-4 py-2">{patient.contactNo}</td>
                      <td className="border px-4 py-2">{patient.email}</td>
                      <td className="border px-4 py-2">{patient.AVTLevel}</td>
                      <td className="border px-4 py-2">
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
                      <td className="border px-4 py-2">
                        {patient.implant.surgeryDate
                          ? patient.implant.surgeryDate.slice(0, 10)
                          : "N/A"}
                      </td>
                      <td className="border px-4 py-2">
                        {patient.implant.switchOnDate
                          ? patient.implant.switchOnDate.slice(0, 10)
                          : "N/A"}
                      </td>
                      <td className="border px-4 py-2">
                        <div className="flex justify-center">
                          <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                            onClick={() => handleEdit(patient)}
                          >
                            <Edit size={20} />
                          </button>
                        </div>
                      </td>
                      <td className="border px-4 py-2">
                        <div className="flex justify-center">
                          <button
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                            onClick={() => {
                              handleDelete(patient);
                            }}
                          >
                            <Trash size={20} />
                          </button>
                        </div>
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
        getPatients={getAllPatients}
      />
    </div>
  );
}

export default Patients;