import React from "react";
import SidebarCombined from "../../components/SidebarCombined";
import TasksTopbar from "../../components/TasksTopbar";

function AllTasks() {
  return (
    <div className="flex">
      <SidebarCombined props={{ status: "tasks" }} className="fixed h-full" />
      <div className="flex-1 p-4 px-10">
        <h1 className="text-4xl font-nunito font-bold ">Tasks</h1>
        <TasksTopbar taskStatus={"allTasks"}/>
      </div>
    </div>
  );
}

export default AllTasks;
