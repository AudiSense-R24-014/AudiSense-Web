import React, { useState } from "react";
import SidebarCombined from "../../components/SidebarCombined";
import TasksTopbar from "../../components/TasksTopbar";

import {
  AllTasks,
  AwarenessTasks,
  IdentificationTasks,
  DiscriminationTasks,
  ComprehensiveTasks,
} from "./TaskComponents";


function Tasks() {
  const [taskTab, setTaskTab] = useState("allTasks");


  return (
    <div className="flex">
      <SidebarCombined props={{ status: "tasks" }} className="fixed h-full" />
      <div className="flex-1 p-4 px-10">
        <h1 className="text-4xl font-nunito font-bold ">Tasks</h1>
        <TasksTopbar taskList={taskTab} toggleTaskStatus={setTaskTab} />
        {taskTab === "allTasks" && <AllTasks />}
        {taskTab === "awareness" && <AwarenessTasks />}
        {taskTab === "identification" && <IdentificationTasks />}
        {taskTab === "discrimination" && <DiscriminationTasks />}
        {taskTab === "comprehension" && <ComprehensiveTasks />}

      </div>
    </div>
  );
}

export default Tasks;