import React, { useEffect, useState } from 'react';
import {
    LayoutList,
    Columns4,
    FileMusic
} from "lucide-react";
import moment from 'moment';
import PropTypes from "prop-types";
import AwarenessBasicService from '../../../../../services/AwarenessSerivce/AwarenessBasic.service';
import {
    AwarenessSoundGenerate,
    AwarenessSoundView,
} from '../../../../../components/modals/AwarenessModals';

export default function AwarenessBasicGenerate({ patients }) {
    const [selected, setSelected] = useState('all');
    const [loading, setLoading] = useState(true);
    const [awarenessSounds, setAwarenessSounds] = useState([]);
    const [filteredSounds, setFilteredSounds] = useState([]);
    const [selectedSound, setSelectedSound] = useState(null);


    const [openGenerateModal, setOpenGenerateModal] = useState(false);
    const [openViewModal, setOpenViewModal] = useState(false);

    async function getAwarenessSounds() {
        AwarenessBasicService.getAwarenessSounds().then((response) => {
            setAwarenessSounds(response);
            setFilteredSounds(response); // Initialize filtered sounds with all sounds
            setLoading(false);
        });
    }

    useEffect(() => {
        getAwarenessSounds();
    }, []);

    useEffect(() => {
        filterTasks();
    }, [selected, awarenessSounds]);

    function filterTasks() {
        if (selected === 'all') {
            setFilteredSounds(awarenessSounds);
        } else if (selected === 'not') {
            setFilteredSounds(awarenessSounds.filter(sound => !sound.patientID));
        }
    }

    async function handleDelete(sound) {
        if (window.confirm("Are you sure you want to delete this task?")) {
            setLoading(true);
            try {
                await AwarenessBasicService.deleteAwarenessSound(sound._id);
                setAwarenessSounds(prevSounds => prevSounds.filter(s => s._id !== sound._id));
                setFilteredSounds(prevFiltered => prevFiltered.filter(s => s._id !== sound._id));
            } catch (error) {
                console.error("Error deleting task:", error);
            } finally {
                setLoading(false);
            }
        }
    }

    function handleView(sound) {
        setSelectedSound(sound);
        setOpenViewModal(true);
    }

    return (
        <div className="flex-1">
            <div className="border border-gray-300 rounded-md font-nunito p-4">
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h1 className="text-xl font-nunito font-bold">Awareness Sounds</h1>
                    </div>
                    <div>
                        <button
                            className={`
                                relative flex items-center py-2 px-3 my-1
                                font-bold rounded-md cursor-pointer
                                transition-colors group hover:bg-indigo-50 text-gray-600 border border-gray-200
                            `}
                            onClick={() => setOpenGenerateModal(true)}
                        >
                            <FileMusic size={20} />
                            <span>&nbsp;Generate Task</span>
                        </button>
                    </div>
                    <div>
                        <div className="flex items-center space-x-1">
                            <button
                                className={`
                                    relative flex items-center py-2 px-3 my-1
                                    font-bold rounded-md cursor-pointer
                                    transition-colors group 
                                    ${selected === 'all'
                                        ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
                                        : "hover:bg-indigo-50 text-gray-600 border border-gray-200"
                                    }
                                `}
                                onClick={() => setSelected('all')}
                            >
                                <Columns4 size={20} />
                                <span>&nbsp;All Tasks</span>
                            </button>
                            <button
                                className={`
                                    relative flex items-center py-2 px-3 my-1
                                    font-bold rounded-md cursor-pointer
                                    transition-colors group 
                                    ${selected === 'not'
                                        ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
                                        : "hover:bg-indigo-50 text-gray-600 border border-gray-200"
                                    }
                                `}
                                onClick={() => setSelected('not')}
                            >
                                <LayoutList size={20} />
                                <span>&nbsp;Not Assigned</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div>
                    {loading ? (
                        <div className="flex justify-center items-center h-96">
                            <div className="loader"></div>
                            <p>Loading Tasks...</p>
                        </div>
                    ) : (
                        <div className="min-w-full overflow-hidden overflow-x-scroll">
                            <div className="w-full">
                                <div className="overflow-y-auto h-96">
                                    <table className="w-full table-auto">
                                        <thead className="bg-purple-600 text-white font-nunito sticky top-0">
                                            <tr>
                                                <th className="px-4 py-2">1st Sound</th>
                                                <th className="px-4 py-2">2nd Sound</th>
                                                <th className="px-4 py-2">3rd Sound</th>
                                                <th className="px-4 py-2">Created Date</th>
                                                <th className="px-4 py-2">Assigned</th>
                                                <th className="px-4 py-2">Responded</th>
                                                <th className="px-4 py-2">Analyzed</th>
                                                <th className="px-4 py-2">View</th>
                                                <th className="px-4 py-2">Delete</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredSounds.map((data, index) => (
                                                <tr
                                                    key={data._id}
                                                    className={
                                                        index % 2 === 0
                                                            ? "bg-purple-200 font-nunito"
                                                            : "bg-purple-300 font-nunito"
                                                    }
                                                >
                                                    <td className="border px-4 py-2">
                                                        {data.sounds[0]?.name.replace(/_/g, ' ') || "N/A"}
                                                    </td>
                                                    <td className="border px-4 py-2">
                                                        {data.sounds[1]?.name.replace(/_/g, ' ') || "N/A"}
                                                    </td>
                                                    <td className="border px-4 py-2">
                                                        {data.sounds[2]?.name.replace(/_/g, ' ') || "N/A"}
                                                    </td>
                                                    <td className="border px-4 py-2">
                                                        {data.createdAt ? moment(data.createdAt).format('YYYY-MM-DD') : "N/A"}
                                                    </td>
                                                    <td className="border px-4 py-2">
                                                        {data.patientID ? (
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
                                                        {data.isResponded ? (
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
                                                        {data.isAnalyzed ? (
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
                                                        <div className="flex justify-center">
                                                            <button
                                                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                                                                onClick={() => handleView(data)}
                                                            >
                                                                View
                                                            </button>
                                                        </div>
                                                    </td>
                                                    <td className="border px-4 py-2">
                                                        <div className="flex justify-center">
                                                            <button
                                                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                                                onClick={() => handleDelete(data)}
                                                            >
                                                                Delete
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
                </div>
            </div>

            <AwarenessSoundGenerate
                visible={openGenerateModal}
                onClose={() => setOpenGenerateModal(false)}
                getData={getAwarenessSounds}
            />
            <AwarenessSoundView
                visible={openViewModal}
                onClose={() => setOpenViewModal(false)}
                getData={getAwarenessSounds}
                data={selectedSound}
                patients={patients}
            />

        </div>
    )
}

AwarenessBasicGenerate.propTypes = {
    patients: PropTypes.array.isRequired,
};