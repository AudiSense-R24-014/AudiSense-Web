import React, { useEffect, useState } from "react";
import OrganizationService from "../../services/Organization.service";
import EditOrgModal from "../../components/modals/EditOrgModal";
import TherapistEditModal from "../../components/modals/TherapistEditModal";
import Swal from "sweetalert2";
import OrgRequestService from "../../services/OrgRequest.service";
import VerifyUserModal from "../../components/modals/VerifyUserModal";

const OrganizationManagement = () => {
  const [openEditTherapist, setOpenEditTherapist] = useState(false);
  const [openEditOrg, setOpenEditOrg] = useState(false);
  const [openVerifyUser, setOpenVerifyUser] = useState(false);
  const [openVerifyUserToRemoveTherapist, setOpenVerifyUserToRemoveTherapist] =
    useState(false);
  const [organization, setOrganization] = useState({});
  const [therapist, setTherapist] = useState({});
  const [isAdmin, setIsAdmin] = useState(false);
  const [pendingOrgRequests, setPendingOrgRequests] = useState([]);
  const [removingTherapist, setRemovingTherapist] = useState({});

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

        OrgRequestService.getOrgRequestsByOrgId(organizationId)
          .then((data) => {
            let pendingReqs = data.filter((req) => req.status === "Pending");
            setPendingOrgRequests(pendingReqs);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }
  }, []);

  const handleEditTherapist = (selectedTherapist) => {
    const therapistCopy = { ...selectedTherapist };
    setTherapist(therapistCopy);
    setOpenEditTherapist(true);
  };

  const removingTherapistFromOrg = (therapist) => {
    setRemovingTherapist(therapist);
    setOpenVerifyUserToRemoveTherapist(true);
  };

  const removeTherapist = (therapist) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You are about to remove ${therapist.firstName} ${therapist.lastName} from the organization`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, remove",
      cancelButtonText: "No, cancel",
    })
      .then((result) => {
        if (result.isConfirmed) {
          OrganizationService.removeTherapist(organization._id, therapist._id)
            .then((data) => {
              if (
                data?.message ===
                "Therapist removed from organization successfully"
              ) {
                Swal.fire({
                  title: "Success",
                  text: "Therapist removed from organization successfully",
                  icon: "success",
                  preConfirm: () => {
                    window.location.reload();
                  },
                });
              } else {
                Swal.fire({
                  title: "Error",
                  text: "Error removing therapist from organization",
                  icon: "error",
                });
              }
            })
            .catch((error) => {
              console.error(error);
            });
        }
      })
      .catch((error) => {
        console.error(error);
      });
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

  const acceptTherapistToOrg = (orgRequest) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You are about to accept ${orgRequest.therapist.firstName} ${orgRequest.therapist.lastName}'s request to join the organization`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, accept",
      cancelButtonText: "No, cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        OrgRequestService.addTherapistToOrg(
          orgRequest._id,
          organization._id,
          orgRequest.therapist._id
        )
          .then((data) => {
            if (
              data?.message === "Therapist added to organization successfully"
            ) {
              Swal.fire({
                title: "Success",
                text: "Therapist added to organization successfully",
                icon: "success",
                preConfirm: () => {
                  window.location.reload();
                },
              });
            } else {
              Swal.fire({
                title: "Error",
                text: "Error adding therapist to organization",
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

  const acceptAdminRequest = (orgRequest) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You are about to make ${orgRequest.therapist.firstName} ${orgRequest.therapist.lastName} an admin`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, make admin",
      cancelButtonText: "No, cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        OrganizationService.makeTherapistAdmin(
          orgRequest.therapist.organization,
          orgRequest.therapist._id
        )
          .then((data) => {
            if (data?.message === "Therapist made admin successfully") {
              Swal.fire({
                title: "Success",
                text: "Therapist made admin successfully",
                icon: "success",
                preConfirm: () => {
                  window.location.reload();
                },
              });
            } else {
              Swal.fire({
                title: "Error",
                text: "Error making therapist an admin",
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

  const acceptOrgRequest = (orgRequest) => {
    if (orgRequest?.requestType === "Join") {
      acceptTherapistToOrg(orgRequest);
    } else if (orgRequest?.requestType === "Admin") {
      acceptAdminRequest(orgRequest);
    }
  };

  const requestToBecomeAdmin = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to request to become an admin of the organization",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, request",
      cancelButtonText: "No, cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        const orgRequest = {
          therapist: therapist._id,
          organization: organization._id,
          requestType: "Admin",
        };
        OrgRequestService.createOrgRequest(orgRequest)
          .then((data) => {
            if (data?._id) {
              Swal.fire({
                title: "Success",
                text: "Request sent successfully",
                icon: "success",
                preConfirm: () => {
                  window.location.reload();
                },
              });
            } else {
              Swal.fire({
                title: "Error",
                text: "You have already sent a request",
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

  const declineOrgRequest = (orgRequest) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You are about to decline ${orgRequest.therapist.firstName} ${orgRequest.therapist.lastName}'s request`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, decline",
      cancelButtonText: "No, cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        OrgRequestService.updateOrgRequest(orgRequest._id, {
          ...orgRequest,
          status: "Rejected",
        })
          .then((data) => {
            if (data?._id) {
              Swal.fire({
                title: "Success",
                text: "Request declined successfully",
                icon: "success",
                preConfirm: () => {
                  window.location.reload();
                },
              });
            } else {
              Swal.fire({
                title: "Error",
                text: "Error declining request",
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

          <div className="text-sm flex flex-col sm:flex-row items-center sm:items-start">
            {isAdmin ? (
              <button
                className="bg-purple-500 mb-2 hover:bg-audi-purple text-white font-semibold py-2 px-6 rounded sm:mr-2"
                onClick={() => setOpenEditOrg(true)}
              >
                Edit Organization Details
              </button>
            ) : (
              <button
                className="bg-purple-500 mb-2 hover:bg-audi-purple text-white font-semibold py-2 px-6 rounded sm:mr-2"
                onClick={() => requestToBecomeAdmin()}
              >
                Request to Become Admin
              </button>
            )}
            <button
              className="bg-red-500 mb-2 hover:bg-red-800 text-white font-semibold py-2 px-11 rounded"
              onClick={verifyUser}
            >
              Leave Organization
            </button>
          </div>
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
      <div className="flex flex-col justify-between font-montserrat bg-white p-5 rounded-lg shadow-md mt-5">
        <div className="mt-5">
          <h3>Therapists</h3>
        </div>
        <div className="border border-gray-300 rounded-md font-nunito mt-5">
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
                        <button
                          className="bg-red-500 hover:bg-red-800 text-white font-bold py-2 px-4 mr-2 rounded"
                          onClick={() => removingTherapistFromOrg(therapist)}
                        >
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
      </div>

      {/* Beginning of table 2 */}
      {isAdmin && (
        <div className="flex flex-col justify-between font-montserrat bg-white p-5 rounded-lg shadow-md mt-5">
          <div className="mt-5">
            <h3>
              Requests
              <span className="ml-3 text-pink-600">
                ({pendingOrgRequests?.length})
              </span>
            </h3>
          </div>
          <div className="border border-gray-300 rounded-md font-nunito mt-5">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr className="text-xs text-gray-700 text-left font-bold uppercase tracking-wider">
                    <th className="px-6 py-3">Name</th>
                    <th className="px-6 py-3">Email</th>
                    <th className="px-6 py-3">Contact Number</th>
                    <th className="px-6 py-3">Register Number</th>
                    <th className="px-6 py-3">Rquest Type</th>
                    {isAdmin && <th className="px-6 py-3">Actions</th>}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 text-sm">
                  {/* Therapist Details */}
                  {pendingOrgRequests?.map((orgRequest) => (
                    <tr key={orgRequest._id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {orgRequest?.therapist?.firstName}{" "}
                        {orgRequest?.therapist?.lastName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {orgRequest?.therapist?.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {orgRequest?.therapist?.contactNo || "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {orgRequest?.therapist?.regNumber}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {orgRequest?.requestType}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          className="bg-green-500 hover:bg-emerald-500 text-white font-bold py-2 px-4 mr-2 rounded"
                          onClick={() => acceptOrgRequest(orgRequest)}
                        >
                          Accept
                        </button>
                        <button
                          className="bg-red-500 hover:bg-red-800 text-white font-bold py-2 px-4 rounded"
                          onClick={() => declineOrgRequest(orgRequest)}
                        >
                          Decline
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

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

      <VerifyUserModal
        visible={openVerifyUserToRemoveTherapist}
        onClose={() => setOpenVerifyUserToRemoveTherapist(false)}
        titleText="Do you really wish to remove the therapist?"
        optionalText="The therapist will no longer have access to the organization. Please verify your password to proceed."
        onConfirm={() => removeTherapist(removingTherapist)}
      />
    </div>
  );
};

export default OrganizationManagement;
