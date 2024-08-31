import React, { useEffect, useState } from 'react';
import {
    LayoutList,
    Columns4,
    AudioWaveform
} from "lucide-react";
import moment from 'moment';
import Ling6SeparateService from '../../../../../services/AwarenessSerivce/Ling6Separate.service';

export default function Ling6Separate() {
    const [selected, setSelected] = useState('all');
    const [loading, setLoading] = useState(false);
    const [sounds, setSounds] = useState([]);

    async function generateTask() {
        alert('Generate Task');
    }

    async function getLing6Separate() {
        setLoading(true);
        try {
            const response = await Ling6SeparateService.getLing6Separates();
            setSounds(response);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getLing6Separate();
    }, []);

    const filteredSounds = sounds.filter(sound => {
        if (selected === 'not') {
            return !sound.patientID; // Only include tasks that are not assigned
        }
        return true; // Include all tasks for "all" selection
    });

    async function handleDelete(sound) {
        // Confirm the delete action
        if (window.confirm(`Are you sure you want to delete this task?`)) {
            try {
                // Call the service to delete the sound
                await Ling6SeparateService.deleteLing6Separate(sound._id);

                // Update the state to remove the deleted sound
                setSounds(prevSounds => prevSounds.filter(s => s._id !== sound._id));

                // Optionally show a success message
                alert('Sound deleted successfully!');
            } catch (error) {
                // Handle errors (e.g., show an error message)
                console.error('Error deleting sound:', error);
                alert('Failed to delete the sound. Please try again.');
            }
        }
    }

    function handleView(sound) {
        // Implement the view functionality
        alert(`Viewing sound with ID ${sound._id}`);
    }

    return (
        <div className="flex-1">
            <div className="border border-gray-300 rounded-md font-nunito p-4">
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h1 className="text-xl font-nunito font-bold">Ling 6 Separated Tasks</h1>
                    </div>
                    <div>
                        <button
                            className={`
                                relative flex items-center py-2 px-3 my-1
                                font-bold rounded-md cursor-pointer
                                transition-colors group hover:bg-indigo-50 text-gray-600 border border-gray-200
                            `}
                            onClick={() => generateTask()}
                        >
                            <AudioWaveform size={20} />
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
                            <p>Loading sounds...</p>
                        </div>
                    ) : (
                        <div className="min-w-full overflow-hidden overflow-x-scroll">
                            <div className="w-full">
                                <div className="overflow-y-auto h-96">
                                    <table className="w-full table-auto">
                                        <thead className="bg-purple-600 text-white font-nunito sticky top-0">
                                            <tr>
                                                <th className="px-4 py-2">Voice</th>
                                                <th className="px-4 py-2">Rate</th>
                                                <th className="px-4 py-2">Pitch</th>
                                                <th className="px-4 py-2">Created Date</th>
                                                <th className="px-4 py-2">Is Assigned</th>
                                                <th className="px-4 py-2">View</th>
                                                <th className="px-4 py-2">Delete</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredSounds.map((sound, index) => (
                                                <tr
                                                    key={sound._id}
                                                    className={
                                                        index % 2 === 0
                                                            ? "bg-purple-200 font-nunito"
                                                            : "bg-purple-300 font-nunito"
                                                    }
                                                >
                                                    <td className="border px-4 py-2">{sound.voice}</td>
                                                    <td className="border px-4 py-2">{sound.rate}</td>
                                                    <td className="border px-4 py-2">{sound.pitch}</td>
                                                    <td className="border px-4 py-2">
                                                        {sound.createdAt ? moment(sound.createdAt).format('YYYY-MM-DD') : "N/A"}
                                                    </td>
                                                    <td className="border px-4 py-2">
                                                        {sound.patientID ? (
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
                                                                onClick={() => handleView(sound)}
                                                            >
                                                                View
                                                            </button>
                                                        </div>
                                                    </td>
                                                    <td className="border px-4 py-2">
                                                        <div className="flex justify-center">
                                                            <button
                                                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                                                onClick={() => handleDelete(sound)}
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
        </div>
    );
}