import React, { useEffect, useState } from "react";
import OrganizationService from "../../services/Organization.service";
import EditOrgModal from "../../components/modals/EditOrgModal";
import TherapistEditModal from "../../components/modals/TherapistEditModal";
import Swal from "sweetalert2";

const OrganizationManagement = () => {
  const [openEditTherapist, setOpenEditTherapist] = useState(false);
  const [openEditOrg, setOpenEditOrg] = useState(false);
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
    // Create a new copy of the therapist object to avoid direct mutation
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
            if (data?.message =='Therapist removed from organization successfully') {
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
        }});
  };

  return (
    <div className="p-4 px-10">
      <div className="flex items-center justify-between font-montserrat bg-white p-5 rounded-lg shadow-md mt-5">
        {/* Left Section: Organization Details */}
        <div>
          {/* Organization Name */}
          <div className="mb-2">
            <p className="text-3xl font-normal mt-2">{organization?.name}</p>
          </div>

          {/* Organization Address */}
          <div className="mb-6">
            <h2 className="text-lg font-montserrat font-normal ">
              {organization?.address}
            </h2>
          </div>

          {/*Edit button*/}
          {isAdmin && (
            <div className="text-sm">
              <button
                className="bg-purple-500 hover:bg-audi-purple text-white font-semibold py-2 px-6 rounded mr-2"
                onClick={() => setOpenEditOrg(true)}
              >
                Edit Organization Details
              </button>

              <button
                className="bg-red-500 hover:bg-red-800 text-white font-semibold py-2 px-6 rounded"
                onClick={leaveOrganization}
              >
                Leave Organization
              </button>
            </div>
          )}
        </div>

        {/* Right Section: Organization Logo */}
        <div className="ml-10">
          {/* Placeholder for logo */}
          <img
            src={organization?.companyLogo || "https://via.placeholder.com/150"}
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
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Contact Number</th>
                <th className="px-6 py-3">Register Number</th>
                {isAdmin && <th className="px-6 py-3">Actions</th>}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 text-sm">
              {/* Therapist Details */}
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
                      <button className="bg-red-900 hover:bg-red-800 text-white font-bold py-2 px-4 mr-2 rounded">
                        Remove
                      </button>
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
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
    </div>
  );
};

export default OrganizationManagement;
