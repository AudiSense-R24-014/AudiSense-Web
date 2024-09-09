import { useEffect, useState } from 'react';
import IdentificationLevelOneService from '../../../../services/IdentificationService/Level1.service.jsx';
import IdentificationLevelTwoService from '../../../../services/IdentificationService/Level2.service.jsx';

const fetchAllTasks = async () => {
    try {
        const response = await IdentificationLevelOneService.getAllTaskLevel1();
        return response; 
    } catch (error) {
        console.error('Error fetching tasks:', error);
        return [];
    }
};

export default function IdentificationViewAll() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const loadTasks = async () => {
            const allTasks = await fetchAllTasks();
            setTasks(allTasks);
        };
        loadTasks();
    }, []);

    

    return (
        <div className="container mx-auto p-4 border border-black rounded-md">
            <h1 className="text-2xl font-bold mb-4">All Identification Tasks</h1>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-00">
                    <thead className="bg-purple-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">TaskID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Level</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Difficulty Level</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Response</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {tasks.map((task) => (
                            <tr key={task._id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{task.patientID}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{task._id}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{task.level}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{task.difficulty || "N/A"}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{task.response? 'Yes' : 'No'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

}
