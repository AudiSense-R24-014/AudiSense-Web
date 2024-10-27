import React, { useEffect, useState } from "react";
import DiscriminationTaskService from "../../../../services/DiscriminationTask.service";
import AssignDiscriminationTaskModal from "../../../../components/modals/AssignDiscriminationTaskModal";
import SearchBar from "../../../../components/pagination/SearchBar.jsx";

export default function DiscriminationViewTasks() {
    const [allDiscriminationTask, setAllDiscriminationTask] = useState([]);
    const [filteredDiscriminationTask, setFilteredDiscriminationTask] =
        useState([]);
    const [discriminationTaskId, setDiscriminationTaskId] = useState(null);
    const [openSaveModal, setOpenSaveModal] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        DiscriminationTaskService.getDiscriminationTasks()
            .then((response) => {
                setAllDiscriminationTask(response);
                setFilteredDiscriminationTask(response); // Initialize filtered list
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    useEffect(() => {
        filterDiscriminationTask();
    }, [searchQuery, allDiscriminationTask]);

    const filterDiscriminationTask = () => {
        const filtered = allDiscriminationTask
            .slice()
            .reverse()
            .filter((discriminationTask) => {
                const matchesWord1 = discriminationTask?.word1
                    ?.toLowerCase()
                    .includes(searchQuery.toLowerCase());
                const matchesWord2 = discriminationTask?.word2
                    ?.toLowerCase()
                    .includes(searchQuery.toLowerCase());
                return matchesWord1 || matchesWord2;
            });
        setFilteredDiscriminationTask(filtered);
    };

    const handleView = (discriminationTask) => {
        setDiscriminationTaskId(discriminationTask._id);
        setOpenSaveModal(true);
    };

    return (
        <div className="flex-1">
            <SearchBar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                placeholder="Search by Word"
            />
            <div className="border border-gray-300 rounded-md font-nunito">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 ">
                        <thead className="bg-gray-50">
                            <tr className="text-xs text-gray-700 text-left font-bold uppercase tracking-wider">
                                <th className="px-6 py-3">Word1</th>
                                <th className="px-6 py-3">Word2</th>
                                <th className="px-6 py-3">Level</th>
                                <th className="px-6 py-3">Action</th>
                            </tr>
                        </thead>
                        <tbody
                            className="bg-white divide-y divide-gray-200"
                            style={{ maxHeight: "400px", overflowY: "auto" }}
                        >
                            {filteredDiscriminationTask.length > 0 ? (
                                filteredDiscriminationTask.map(
                                    (discriminationTask, index) => (
                                        <tr key={index}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {discriminationTask.word1}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {discriminationTask.word2}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {discriminationTask.level}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <button
                                                    onClick={() =>
                                                        handleView(
                                                            discriminationTask
                                                        )
                                                    }
                                                    className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded mr-2"
                                                >
                                                    Assign
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                )
                            ) : (
                                <tr>
                                    <td
                                        colSpan="5"
                                        className="px-6 py-4 text-center"
                                    >
                                        Data Loading...
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            <AssignDiscriminationTaskModal
                visible={openSaveModal}
                discriminationTaskId={discriminationTaskId}
                onClose={() => setOpenSaveModal(false)}
            />
        </div>
    );
}
