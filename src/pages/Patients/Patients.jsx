import React, { useState, useEffect } from "react";
import AddNewPatientModal from "../../components/modals/AddNewPatientModal";
import PatientService from "../../services/Patient.service";
import { useNavigate } from "react-router-dom";
import { PlusCircle } from "lucide-react";
import Loading from "../../components/Loading";
import SearchBar from "../../components/pagination/searchBar";
import PaginationButtons from "../../components/pagination/paginationButtons";

function Patients() {
    const therapistUser = JSON.parse(localStorage.getItem("audi-user"));
    const [patients, setPatients] = useState([]);
    const [filteredPatients, setFilteredPatients] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [openAddNewPatientModal, setOpenAddNewPatientModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const patientsPerPage = 8;
    const navigate = useNavigate();

    const getAllPatients = async () => {
        setLoading(true);
        try {
            const response = await PatientService.getPatientsForOrganization(
                therapistUser?.organization
            );
            setPatients(response);
            setFilteredPatients(response);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getAllPatients();
    }, []);

    useEffect(() => {
        const lowercasedQuery = searchQuery.toLowerCase();
        setFilteredPatients(
            patients
                ?.slice()
                .reverse()
                .filter(
                    (patient) =>
                        patient?.firstName
                            .toLowerCase()
                            .includes(lowercasedQuery) ||
                        patient?.lastName
                            .toLowerCase()
                            .includes(lowercasedQuery) ||
                        patient?.email.toLowerCase().includes(lowercasedQuery)
                )
        );
        setCurrentPage(1); // Reset to page 1 when search query changes
    }, [searchQuery, patients]);

    const handleRowClick = (patientId) => {
        navigate(`/patients/${patientId}`);
    };

    // Pagination logic
    const indexOfLastPatient = currentPage * patientsPerPage;
    const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
    const currentPatients = filteredPatients?.slice(
        indexOfFirstPatient,
        indexOfLastPatient
    );

    const totalPages = Math.ceil(filteredPatients.length / patientsPerPage);

    const handlePageChange = (page) => {
        if (page === "first") {
            setCurrentPage(1);
        } else if (page === "last") {
            setCurrentPage(totalPages);
        } else if (typeof page === "number") {
            setCurrentPage(page);
        } else if (page === "next" && currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        } else if (page === "previous" && currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className="p-4 px-10">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-4xl font-nunito font-bold">Patients</h1>
                <button
                    type="button"
                    className="text-white font-montserrat mt-4 bg-purple-500 hover:bg-purple-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none"
                    onClick={() => setOpenAddNewPatientModal(true)}
                >
                    <PlusCircle size={20} className="inline-block me-2" />
                    Add New Patient
                </button>
            </div>

            {/* Search Bar */}
            <SearchBar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                placeholder="Search Patients by Name or Email"
            />
            {(() => {
                if (loading) {
                    return <Loading />;
                } else if (currentPatients?.length === 0) {
                    return (
                        <div className="flex items-center justify-center font-montserrat">
                            No Patients Found!
                        </div>
                    );
                } else {
                    return (
                        <div className="min-w-full font-nunito">
                            <div className="w-full">
                                <div className="overflow-y-auto h-96">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr className="text-xs text-gray-700 text-left font-bold uppercase tracking-wider">
                                                <th className="px-4 py-2">
                                                    First Name
                                                </th>
                                                <th className="px-4 py-2">
                                                    Last Name
                                                </th>
                                                <th className="px-4 py-2">
                                                    Gender
                                                </th>
                                                <th className="px-4 py-2">
                                                    DOB
                                                </th>
                                                <th className="px-4 py-2">
                                                    Contact
                                                </th>
                                                <th className="px-4 py-2">
                                                    Email
                                                </th>
                                                <th className="px-4 py-2 text-center">
                                                    Is Implanted
                                                </th>
                                                <th className="px-4 py-2">
                                                    Surgery Date
                                                </th>
                                                <th className="px-4 py-2">
                                                    Switched on Date
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {currentPatients?.map(
                                                (patient, index) => (
                                                    <tr
                                                        key={index + "patient"}
                                                        className={`text-sm hover:bg-purple-200`}
                                                        onClick={() =>
                                                            handleRowClick(
                                                                patient._id
                                                            )
                                                        }
                                                        style={{
                                                            cursor: "pointer",
                                                        }}
                                                    >
                                                        <td className="border-b px-4 py-2">
                                                            {patient.firstName}
                                                        </td>
                                                        <td className="border-b px-4 py-2">
                                                            {patient.lastName}
                                                        </td>
                                                        <td className="border-b px-4 py-2">
                                                            {patient.gender}
                                                        </td>
                                                        <td className="border-b px-4 py-2 whitespace-nowrap">
                                                            {patient.dob
                                                                ? patient.dob.slice(
                                                                      0,
                                                                      10
                                                                  )
                                                                : "N/A"}
                                                        </td>
                                                        <td className="border-b px-4 py-2">
                                                            {patient.contactNo}
                                                        </td>
                                                        <td className="border-b px-4 py-2">
                                                            {patient.email}
                                                        </td>
                                                        <td className="border-b px-4 py-2 text-center">
                                                            {patient.implant
                                                                .isImplanted ? (
                                                                <span className="bg-green-500 text-white font-bold py-1 px-2 rounded-full">
                                                                    Yes
                                                                </span>
                                                            ) : (
                                                                <span className="bg-red-500 text-white font-bold py-1 px-2 rounded-full">
                                                                    No
                                                                </span>
                                                            )}
                                                        </td>
                                                        <td className="border-b px-4 py-2 whitespace-nowrap">
                                                            {patient.implant
                                                                .surgeryDate
                                                                ? patient.implant.surgeryDate.slice(
                                                                      0,
                                                                      10
                                                                  )
                                                                : "N/A"}
                                                        </td>
                                                        <td className="border-b px-4 py-2 whitespace-nowrap">
                                                            {patient.implant
                                                                .switchOnDate
                                                                ? patient.implant.switchOnDate.slice(
                                                                      0,
                                                                      10
                                                                  )
                                                                : "N/A"}
                                                        </td>
                                                    </tr>
                                                )
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    );
                }
            })()}
            {/* Pagination Controls */}
            <PaginationButtons
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />

            {/* Add New Patient Modal */}
            <AddNewPatientModal
                visible={openAddNewPatientModal}
                onClose={() => setOpenAddNewPatientModal(false)}
            />
        </div>
    );
}

export default Patients;
