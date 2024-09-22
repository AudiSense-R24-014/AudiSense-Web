import React, { useEffect, useState } from "react";
import OrganizationService from "../../services/Organization.service";
import EditOrgModal from "../../components/modals/EditOrgModal";
import TherapistEditModal from "../../components/modals/TherapistEditModal";
import Swal from "sweetalert2";
import VerifyUserModal from "../../components/modals/VerifyUserModal";

const OrganizationManagement = () => {
  const [openEditTherapist, setOpenEditTherapist] = useState(false);
  const [openEditOrg, setOpenEditOrg] = useState(false);
  const [openVerifyUser, setOpenVerifyUser] = useState(false);
  const [organization, setOrganization] = useState({});
  const [therapist, setTherapist] = useState({});
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("audi-user"));
    if (user) {
      setTherapist(user);
      const organizationId = user?.organization;
      if (organizationId) {
        OrganizationService.getOrganizationById(organizationId).then((data) => {
          setOrganization(data);
          data?.admins.forEach((admin) => {
            if (admin._id === user._id) {
              setIsAdmin(true);
            }
          });
        });
      }
    }
  }, []);

  const handleEditTherapist = (selectedTherapist) => {
    const therapistCopy = { ...selectedTherapist };
    setTherapist(therapistCopy);
    setOpenEditTherapist(true);
  };

  const leaveOrganization = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to leave the organization!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, leave",
      cancelButtonText: "No, cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        OrganizationService.removeTherapist(organization._id, therapist._id)
          .then((data) => {
            if (
              data?.message ===
              "Therapist removed from organization successfully"
            ) {
              Swal.fire({
                title: "Success",
                text: "You have left the organization",
                icon: "success",
                preConfirm: () => {
                  window.location.href = "./";
                },
              });
            } else {
              Swal.fire({
                title: "Error",
                text: "Error leaving organization",
                icon: "error",
              });
            }
          })
          .catch((error) => {
            console.error(error);
          });
      }
    });
  };

  const verifyUser = () => {
    setOpenVerifyUser(true);
  };

  return (
    <div className="p-4 px-10">
      <div className="flex flex-col sm:flex-row items-center justify-between font-montserrat bg-white p-5 rounded-lg shadow-md mt-5">
        {/* Left Section: Organization Details */}
        <div className="flex-1 sm:mb-0 mb-4">
          {/* Organization Name */}
          <div className="mb-2">
            <p className="text-3xl font-normal mt-2">{organization?.name}</p>
          </div>

          {/* Organization Address */}
          <div className="mb-2">
            <h2 className="text-lg font-montserrat font-normal">
              {organization?.address}
            </h2>
          </div>

          {/* Organization Join Code */}
          <div className="mb-6">
            <h2 className="text-base font-montserrat font-normal text-purple-500">
              Join Code: {organization?.joinCode}
            </h2>
          </div>

          {/* Organization Logo (Mobile: Move under Join Code) */}
          <div className="sm:hidden flex flex-col items-center mb-6">
            <img
              src={
                organization?.companyLogo || "https://via.placeholder.com/150"
              }
              alt="Organization Logo"
              className="w-40 h-40 object-contain"
            />
          </div>

          {/* Edit buttons (Centered on mobile view) */}
          {isAdmin && (
            <div className="text-sm flex flex-col sm:flex-row items-center sm:items-start">
              <button
                className="bg-purple-500 mb-2 hover:bg-audi-purple text-white font-semibold py-2 px-6 rounded sm:mr-2"
                onClick={() => setOpenEditOrg(true)}
              >
                Edit Organization Details
              </button>
              <button
                className="bg-red-500 mb-2 hover:bg-red-800 text-white font-semibold py-2 px-11 rounded"
                onClick={verifyUser}
              >
                Leave Organization
              </button>
            </div>
          )}
        </div>

        {/* Right Section: Organization Logo (Hidden on mobile, shown on larger screens) */}
        <div className="hidden sm:block ml-5">
          <img
            src={organization?.companyLogo || "https://via.placeholder.com/150"}
            alt="Organization Logo"
            className="w-44 h-44 object-contain"
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
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Contact Number</th>
                <th className="px-6 py-3">Register Number</th>
                {isAdmin && <th className="px-6 py-3">Actions</th>}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 text-sm">
              {organization?.therapists?.map((therapist) => (
                <tr key={therapist._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {therapist.firstName} {therapist.lastName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {therapist.position || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {therapist.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {therapist.contactNo || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {therapist.regNumber}
                  </td>
                  {isAdmin && (
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button className="bg-red-500 hover:bg-red-800 text-white font-bold py-2 px-4 mr-2 rounded">
                        Remove
                      </button>
                      <button
                        className="bg-amber-500 hover:bg-amber-800 text-white font-bold py-2 px-7 rounded"
                        onClick={() => handleEditTherapist(therapist)}
                      >
                        Edit
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      <TherapistEditModal
        visible={openEditTherapist}
        onClose={() => setOpenEditTherapist(false)}
        therapist={therapist}
      />
      <EditOrgModal
        visible={openEditOrg}
        onClose={() => setOpenEditOrg(false)}
        organizationDetails={organization}
      />

      {/* Verify User Modal */}
      <VerifyUserModal
        visible={openVerifyUser}
        onClose={() => setOpenVerifyUser(false)}
        titleText="Do you really wish to leave the organization?"
        optionalText="You will no longer have access to the organization. Please verify your password to proceed."
        onConfirm={leaveOrganization}
      />
    </div>
  );
};

export default OrganizationManagement;
