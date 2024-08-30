import React, { useEffect, useState } from 'react'
import {
    LayoutList,
    Columns4,
} from "lucide-react";

export default function Ling6Separate() {
    const [selected, setSelected] = useState('all');

    return (
        <>
            <div className="flex-1">
                <div className="border border-gray-300 rounded-md font-nunito p-4">
                    <div className="flex justify-between items-center mb-4">
                        <div>
                            <h1 className="text-xl font-nunito font-bold">Awareness Sounds</h1>
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
                        {selected}
                    </div>
                </div>
            </div>
        </>
    )
}
