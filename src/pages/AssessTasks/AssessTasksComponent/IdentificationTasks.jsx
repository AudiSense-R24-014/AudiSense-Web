import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import IdentificationLevelOneService from '../../../services/IdentificationService/Level1.service.jsx';
import IdentificationLevelTwoService from '../../../services/IdentificationService/Level2.service.jsx';

const fetchAllTasksLevel1 = async () => {
    try {
        const response = await IdentificationLevelOneService.getAllTaskLevel1();
        return response;
    } catch (error) {
        console.error('Error fetching Level 1 tasks:', error);
        return [];
    }
};

const fetchAllTasksLevel2 = async () => {
    try {
        const response = await IdentificationLevelTwoService.getAllTaskLevel2();
        return response;
    } catch (error) {
        console.error('Error fetching Level 2 tasks:', error);
        return [];
    }
};

export default function IdentificationViewAll() {
    const [tasks, setTasks] = useState([]);
    const [selectedTask, setSelectedTask] = useState(null);

    useEffect(() => {
        const loadTasks = async () => {
            const allTasksLevel1 = await fetchAllTasksLevel1();
            const allTasksLevel2 = await fetchAllTasksLevel2();
            const allTasks = [...allTasksLevel1, ...allTasksLevel2];
            const filteredTasks = allTasks.filter(task => task.response == true);
            setTasks(filteredTasks);

        };
        loadTasks();
    }, []);

    const handleViewTask = (task) => {
        setSelectedTask(task);
    };

    const handleCloseModal = () => {
        setSelectedTask(null);
    };

    return (
        <div className="container mx-auto p-4 border border-black rounded-md">
           
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-purple-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">TaskID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Level</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Difficulty Level</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Response</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">View Task</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {tasks.map((task) => (
                            <tr key={task._id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{task.patientID}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{task._id}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{task.level}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{task.difficulty || "N/A"}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{task.response ? 'Yes' : 'No'}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <button
                                        onClick={() => handleViewTask(task)}
                                        className="text-blue-500 hover:text-blue-700"
                                    >
                                        View Task
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal for viewing task details */}
            {selectedTask && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-md w-4/5 max-w-lg max-h-[80vh] overflow-y-auto">
                        <h2 className="text-xl font-bold mb-4">Task Details</h2>
                        <p><strong>Level:</strong> {selectedTask.level}</p>
                        <p><strong>Difficulty Level:</strong> {selectedTask.difficulty || "N/A"}</p>

                        <div className="my-4">
                            <strong>Audio:</strong>
                            {selectedTask.soundUrl ? (
                                <audio controls src={selectedTask.soundUrl} className="mt-2 w-full" />
                            ) : (
                                <p>No audio available</p>
                            )}
                        </div>

                        <div className="my-4">
                            <strong>Answer Choices:</strong>
                            <div className="grid grid-cols-2 gap-2 mt-2">
                                {selectedTask.answers && selectedTask.answers.length > 0 ? (
                                    selectedTask.answers.map((answer) => (
                                        <div key={answer._id} className="relative">
                                            <img src={answer.ImgUrl} alt="Task option" className="w-full h-auto object-cover rounded-md" />
                                            {answer.Correct && (
                                                <span className="absolute top-2 right-2 bg-green-500 text-white rounded-full px-2 py-1 text-xs">Correct</span>
                                            )}
                                        </div>
                                    ))
                                ) : (
                                    <p>No images available</p>
                                )}
                            </div>
                        </div>

                        <button onClick={handleCloseModal} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700">
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

IdentificationViewAll.propTypes = {
    patients: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
        })
    ).isRequired,
};
