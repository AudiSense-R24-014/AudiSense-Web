import React, { useEffect, useState } from 'react';
import DiscriminationTaskService from '../../../../services/DiscriminationTask.service';
import AssignDiscriminationTaskModal from '../../../../components/modals/AssignDiscriminationTaskModal';

export default function DiscriminationViewTasks() {

  const [allDiscriminationTask, setAllDiscriminationTask] = useState([]);
  const [discriminationTaskId, setDiscriminationTaskId] = useState(null);
  const [openSaveModal, setOpenSaveModal] = useState(false);

  useEffect(() => {
    DiscriminationTaskService.getDiscriminationTasks()
      .then((response) => {
        setAllDiscriminationTask(response); // Ensure response is in the correct format
        console.log("response");
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleView = (discriminationTask) => {
    setDiscriminationTaskId(discriminationTask._id);
    setOpenSaveModal(true);
  };


  return (
    <div className="flex-1">
      <div className="border border-gray-300 rounded-md font-nunito">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr className="text-xs text-gray-700 text-left font-bold uppercase tracking-wider">
                <th className="px-6 py-3">Word1</th>
                <th className="px-6 py-3">Word2</th>
                <th className="px-6 py-3">Level</th>
                {/* <th className="px-6 py-3">Status</th> */}
                <th className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody
              className="bg-white divide-y divide-gray-200"
              style={{ maxHeight: "400px", overflowY: "auto" }} // Setting max-height and making it scrollable
            >
              {allDiscriminationTask.length > 0 ? (
                allDiscriminationTask.map((discriminationTask, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">{discriminationTask.word1}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{discriminationTask.word2}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{discriminationTask.level}</td>
                    {/* <td className="px-6 py-4 whitespace-nowrap">{discriminationTask.status}</td> */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button onClick={() =>
                        handleView(discriminationTask)
                      } className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">Assign</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center">Data Loading...</td>
                </tr>
              )}


            </tbody>
          </table>
        </div>
      </div>
      <AssignDiscriminationTaskModal
        visible={openSaveModal}
        discriminationTaskId={discriminationTaskId}
        onClose={() => {
          setOpenSaveModal(false);
        }}
      />
    </div>
  )
}
