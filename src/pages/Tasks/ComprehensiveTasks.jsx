import React from 'react'
import SidebarCombined from '../../components/SidebarCombined';

function ComprehensiveTasks() {
  return (
    <div>
      <div className="flex">
      <SidebarCombined props={{ status: "tasks" }} className="fixed h-full" />
      <div className="flex-1 p-4">
        <h1 className="text-4xl font-nunito font-bold ">Tasks</h1>
      </div>
    </div>
    </div>
  )
}

export default ComprehensiveTasks;
