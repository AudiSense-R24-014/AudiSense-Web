import React, { useEffect, useState } from "react";
import { Pie, Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
} from "chart.js";
import OrganizationService from "../../services/Organization.service";
import AdminSVG from "../../assets/images/Dashboard-admin.svg";
import TherapistPNG from "../../assets/images/Dashboard-therapist.png";
import PatientPNG from "../../assets/images/Dashboard-patient.png";
import Loading from "../../components/Loading";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement
);

const Dashboard = () => {
    const orgId = JSON.parse(localStorage.getItem("audi-user"))?.organization;
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (orgId) {
            OrganizationService.getOrganizationDashboard(orgId)
                .then((response) => {
                    setData(response);
                })
                .catch((error) => {
                    console.error("Error fetching dashboard data:", error);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [orgId]);

    if (loading) {
        return <Loading />;
    }

    // Data for charts
    const ageDistributionData = {
        labels: Object.keys(data?.ageWiseCountOfPatients || {}),
        datasets: [
            {
                label: "Age Distribution",
                data: Object.values(data.ageWiseCountOfPatients || {}),
                backgroundColor: [
                    "#f87171",
                    "#fb923c",
                    "#fbbf24",
                    "#34d399",
                    "#60a5fa",
                    "#a78bfa",
                    "#f472b6",
                    "#facc15",
                ],
                borderColor: "#fff",
                borderWidth: 1,
            },
        ],
    };

    const implantedData = {
        labels: ["Implanted", "Not Implanted"],
        datasets: [
            {
                label: "Implant Status",
                data: [data.isImplanted?.Yes || 0, data.isImplanted?.No || 0],
                backgroundColor: ["#34d399", "#f87171"],
                borderColor: "#fff",
                borderWidth: 1,
            },
        ],
    };

    const genderData = {
        labels: ["Male", "Female"],
        datasets: [
            {
                label: "Gender Distribution",
                data: [
                    data.genderWiseCountOfPatients?.Male || 0,
                    data.genderWiseCountOfPatients?.Female || 0,
                ],
                backgroundColor: ["#60a5fa", "#f472b6"],
                borderColor: "#fff",
                borderWidth: 1,
            },
        ],
    };

    const navigateToPatients = () => {
        localStorage.setItem("audi-sidebar-status", "patients");
        window.location.href = "/patients";
    };

    const navigateToOrganization = () => {
        localStorage.setItem("audi-sidebar-status", "organization");
        window.location.href = "/organization/assigned";
    };

    return (
        <div className="p-4 px-10">
            <h1 className="text-4xl font-nunito font-bold">Dashboard</h1>

            {/* Organization Container */}
            <div className="mt-8 bg-white p-6 rounded-lg shadow-md grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Left column: Org image and name */}
                <div className="flex flex-col items-center sm:items-start">
                    <h2 className="text-4xl font-medium mb-4 font-montserrat">
                        {data.orgName || "N/A"}
                    </h2>
                    {data.orgImage && (
                        <img
                            src={data.orgImage}
                            alt="Organization Logo"
                            className="fluid max-h-56 max-w-56 mr-6"
                        />
                    )}
                </div>

                {/* Right column: Numerical details in a row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-nunito">
                    <div className="bg-gray-100 p-4 rounded-lg shadow-md flex flex-col items-center space-y-4">
                        {/* Gray background for image */}
                        <div className="bg-gray-200 w-full h-32 rounded-lg flex justify-center items-center">
                            <img
                                src={PatientPNG}
                                alt="Total Patients"
                                className="max-w-full max-h-full object-contain"
                            />
                        </div>
                        <div className="text-center">
                            <h3 className="text-xl font-semibold">
                                Total Patients
                            </h3>
                            <h1 className="text-4xl font-bold mt-2">
                                {data.patients || 0}
                            </h1>
                        </div>
                        <button
                            className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-900"
                            onClick={navigateToPatients}
                        >
                            View Patients
                        </button>
                    </div>

                    <div className="bg-gray-100 p-4 rounded-lg shadow-md flex flex-col items-center space-y-4">
                        <div className="bg-gray-200 w-full h-32 rounded-lg flex justify-center items-center">
                            <img
                                src={TherapistPNG}
                                alt="Total Therapists"
                                className="max-w-full max-h-full object-contain"
                            />
                        </div>
                        <div className="text-center">
                            <h3 className="text-xl font-semibold">
                                Total Therapists
                            </h3>
                            <h1 className="text-4xl font-bold mt-2">
                                {data.therapists || 0}
                            </h1>
                        </div>
                        <button
                            className="bg-audi-blue text-white px-4 py-2 rounded-md hover:bg-cyan-900"
                            onClick={navigateToOrganization}
                        >
                            View Organization
                        </button>
                    </div>

                    <div className="bg-gray-100 p-4 rounded-lg shadow-md flex flex-col items-center space-y-4">
                        <div className="bg-gray-200 w-full h-32 rounded-lg flex justify-center items-center">
                            <img
                                src={AdminSVG}
                                alt="Total Admins"
                                className="max-w-full max-h-full object-contain"
                            />
                        </div>
                        <div className="text-center">
                            <h3 className="text-xl font-semibold">
                                Total Admins
                            </h3>
                            <h1 className="text-4xl font-bold mt-2">
                                {data.admins || 0}
                            </h1>
                        </div>
                        <button
                            className="bg-audi-blue text-white px-4 py-2 rounded-md hover:bg-cyan-900"
                            onClick={navigateToOrganization}
                        >
                            View Organization
                        </button>
                    </div>
                </div>
            </div>

            {/* Patient Container */}
            <div className="mt-10 bg-white p-6 rounded-lg shadow-md font-nunito">
                <h2 className="text-3xl font-bold mb-6">Patient Details</h2>

                {/* Age Distribution Chart */}
                <div className="bg-white p-5 rounded-lg shadow-md w-full">
                    <h2 className="text-2xl font-bold mb-4">
                        Age Distribution
                    </h2>
                    <div className="h-64">
                        <Bar
                            data={ageDistributionData}
                            options={{
                                maintainAspectRatio: false,
                                plugins: {
                                    legend: { display: false }, // Hide the legend
                                },
                            }}
                        />
                    </div>
                </div>

                {/* Other Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
                    {/* Implant Status Chart */}
                    <div className="bg-white p-5 rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold mb-4">
                            Implant Status
                        </h2>
                        <div className="h-64">
                            <Pie
                                data={implantedData}
                                options={{ maintainAspectRatio: false }}
                            />
                        </div>
                    </div>

                    {/* Gender Distribution Chart */}
                    <div className="bg-white p-5 rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold mb-4">
                            Gender Distribution
                        </h2>
                        <div className="h-64">
                            <Pie
                                data={genderData}
                                options={{ maintainAspectRatio: false }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
