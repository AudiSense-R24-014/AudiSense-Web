import React, { useState, useEffect } from "react";
import AddNewPatientModal from "../../components/modals/AddNewPatientModal";
import PatientService from "../../services/Patient.service";
import { useNavigate } from "react-router-dom";
import { PlusCircle } from "lucide-react";

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

    // Pagination numbers logic to show maximum of 5 page numbers with current page in the middle
    const getPageNumbers = () => {
        const maxPageNumbers = 5;
        let startPage = Math.max(
            1,
            currentPage - Math.floor(maxPageNumbers / 2)
        );
        let endPage = Math.min(totalPages, startPage + maxPageNumbers - 1);

        // Adjust startPage if we are close to the end
        if (endPage - startPage < maxPageNumbers - 1) {
            startPage = Math.max(1, endPage - maxPageNumbers + 1);
        }

        const pageNumbers = [];
        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }
        return pageNumbers;
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleFirstPage = () => {
        setCurrentPage(1);
    };

    const handleLastPage = () => {
        setCurrentPage(totalPages);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
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
            <div className="relative mb-4">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M10 6a4 4 0 100 8 4 4 0 000-8zm8 14l-4-4"
                        />
                    </svg>
                </span>
                <input
                    type="text"
                    className="font-montserrat w-full text-sm px-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                    placeholder="Search by Name or Email"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            {(() => {
                if (loading) {
                    return (
                        <div className="flex justify-center items-center h-96">
                            <div className="loader"></div>
                            <p>Loading patients...</p>
                        </div>
                    );
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
                                                <th className="px-4 py-2">First Name</th>
                                                <th className="px-4 py-2">Last Name</th>
                                                <th className="px-4 py-2">Gender</th>
                                                <th className="px-4 py-2">DOB</th>
                                                <th className="px-4 py-2">Contact</th>
                                                <th className="px-4 py-2">Email</th>
                                                <th className="px-4 py-2 text-center">
                                                    Is Implanted
                                                </th>
                                                <th className="px-4 py-2">Surgery Date</th>
                                                <th className="px-4 py-2">
                                                    Switched on Date
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {currentPatients?.map((patient, index) => (
                                                <tr
                                                    key={index + "patient"}
                                                    className={`text-sm hover:bg-purple-200`}
                                                    onClick={() =>
                                                        handleRowClick(patient._id)
                                                    }
                                                    style={{ cursor: "pointer" }}
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
                                                            ? patient.dob.slice(0, 10)
                                                            : "N/A"}
                                                    </td>
                                                    <td className="border-b px-4 py-2">
                                                        {patient.contactNo}
                                                    </td>
                                                    <td className="border-b px-4 py-2">
                                                        {patient.email}
                                                    </td>
                                                    <td className="border-b px-4 py-2 text-center">
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
                                                    <td className="border-b px-4 py-2 whitespace-nowrap">
                                                        {patient.implant.surgeryDate
                                                            ? patient.implant.surgeryDate.slice(
                                                                0,
                                                                10
                                                            )
                                                            : "N/A"}
                                                    </td>
                                                    <td className="border-b px-4 py-2 whitespace-nowrap">
                                                        {patient.implant.switchOnDate
                                                            ? patient.implant.switchOnDate.slice(
                                                                0,
                                                                10
                                                            )
                                                            : "N/A"}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    );
                }
            })()}
            {/* Pagination Controls */}
            <div className="flex justify-center font-nunito items-center text-xs mt-4 space-x-2">
                <div>
                    <button
                        className="bg-purple-400 text-white px-2 py-2 rounded-md disabled:bg-gray-300"
                        onClick={handleFirstPage}
                        disabled={currentPage === 1}
                    >
                        First
                    </button>
                    <button
                        className="ml-2 text-purple-400 disabled:text-gray-300"
                        onClick={handlePreviousPage}
                        disabled={currentPage === 1}
                    >
                        {"<<"}
                    </button>
                </div>

                {getPageNumbers().map((number) => (
                    <button
                        key={number}
                        className={`px-2 py-1 rounded-md ${currentPage === number
                            ? "bg-purple-800 text-white"
                            : "bg-purple-400 text-white"
                            }`}
                        onClick={() => handlePageChange(number)}
                    >
                        {number}
                    </button>
                ))}

                <div>
                    <button
                        className="mr-2 text-purple-400 disabled:text-gray-300"
                        onClick={handleNextPage}
                        disabled={currentPage >= totalPages}
                    >
                        {">>"}
                    </button>
                    <button
                        className="bg-purple-400 text-white px-2 py-2 rounded-md disabled:bg-gray-300"
                        onClick={handleLastPage}
                        disabled={currentPage >= totalPages}
                    >
                        Last
                    </button>
                </div>
            </div>

            {/* Add New Patient Modal */}
            <AddNewPatientModal
                visible={openAddNewPatientModal}
                onClose={() => setOpenAddNewPatientModal(false)}
            />
        </div>
    );
}

export default Patients;
