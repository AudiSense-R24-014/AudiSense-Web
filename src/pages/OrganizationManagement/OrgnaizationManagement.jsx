import React, { useState } from "react";
import EmployeeEditModal from "../../components/modals/EmployeeEditModal";

const OrgnaizationManagement = () => {
  const [openAddNewPatientModal, setOpenAddNewPatientModal] = useState(false);

  return (
    <div className="p-4 px-10">
      <div className="flex items-center justify-between bg-white p-5 rounded-lg shadow-md mt-5">
        {/* Left Section: Organization Details */}
        <div>
          {/* Organization Name */}
          <div className="mb-5">
            <p className="text-2xl font-bold mt-2">Corn Hub</p>
          </div>

          {/* Organization Address */}
          <div className="mb-5">
            <h2 className="text-xl font-montserrat font-semibold">Organization Address</h2>
            <p className="text-2xl font-bold mt-2">
              123 Innovation Drive, Silicon Valley, CA 94043
            </p>
          </div>
        </div>

        {/* Right Section: Organization Logo */}
        <div className="ml-10">
          {/* Placeholder for logo */}
          <img
            src="https://via.placeholder.com/150"
            alt="Organization Logo"
            className="w-32 h-32 object-contain"
          />
        </div>
      </div>
      {/* Table Section */}
      <div className="border border-gray-300 rounded-md font-nunito mt-10">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr className="text-xs text-gray-700 text-left font-bold uppercase tracking-wider">
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Position</th>
                <th className="px-6 py-3">Role</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Contact Number</th>
                <th className="px-6 py-3">Register Number</th>
                <th className="px-6 py-3">Patients Conducting</th>
                <th className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">Angela White</td>
                <td className="px-6 py-4 whitespace-nowrap">CEO</td>
                <td className="px-6 py-4 whitespace-nowrap">Admin</td>
                <td className="px-6 py-4 whitespace-nowrap">john@cornhub.com</td>
                <td className="px-6 py-4 whitespace-nowrap">+1 234 567 890</td>
                <td className="px-6 py-4 whitespace-nowrap">+1 234 567 890</td>
                <td className="px-6 py-4 whitespace-nowrap">+1 234 567 890</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button className="bg-red-900 hover:bg-red-800 text-white font-bold py-2 px-4 mr-2 rounded">
                    Remove
                  </button>
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => setOpenAddNewPatientModal(true)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">Brandi Love</td>
                <td className="px-6 py-4 whitespace-nowrap">CEO</td>
                <td className="px-6 py-4 whitespace-nowrap">Therapist</td>
                <td className="px-6 py-4 whitespace-nowrap">john@cornhub.com</td>
                <td className="px-6 py-4 whitespace-nowrap">+1 234 567 890</td>
                <td className="px-6 py-4 whitespace-nowrap">+1 234 567 890</td>
                <td className="px-6 py-4 whitespace-nowrap">+1 234 567 890</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button className="bg-red-900 hover:bg-red-800 text-white font-bold py-2 px-4 mr-2 rounded">
                    Remove
                  </button>
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Edit
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <EmployeeEditModal
        visible={openAddNewPatientModal}
        onClose={() => setOpenAddNewPatientModal(false)}
        // getPatients={getAllPatients}
      />
    </div>
  );
};

export default OrgnaizationManagement;
