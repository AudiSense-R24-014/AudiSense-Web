import React, { useEffect, useState } from 'react'
import {
    LayoutList,
    Columns4,
    Waves
} from "lucide-react";

export default function Ling6All() {
    const [selected, setSelected] = useState('all');
    const [loading, setLoading] = useState(false);

    async function generateTask() {
        alert('Generate Task');
    }

    return (
        <>
            <div className="flex-1">
                <div className="border border-gray-300 rounded-md font-nunito p-4">
                    <div className="flex justify-between items-center mb-4">
                        <div>
                            <h1 className="text-xl font-nunito font-bold">Ling 6 Combined Tasks</h1>
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
                                <Waves size={20} />
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
                                <p>Loading patients...</p>
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
                                                    <th className="px-4 py-2">Break Time</th>
                                                    <th className="px-4 py-2">Created Date</th>
                                                    <th className="px-4 py-2">is Assigned</th>
                                                    <th className="px-4 py-2">View</th>
                                                    <th className="px-4 py-2">Delete</th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}
