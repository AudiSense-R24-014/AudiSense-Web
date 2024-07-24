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
  const [taskTab, setTaskTab] = useState("comprehension");

  return (
    <div className="flex h-screen">
        <SidebarCombined props={{ status: "tasks" }} />
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 px-10">
          <h1 className="text-4xl font-nunito font-bold mb-6">Tasks</h1>
          <TasksTopbar taskList={taskTab} toggleTaskStatus={setTaskTab} />
          {taskTab === "allTasks" && <AllTasks />}
          {taskTab === "awareness" && <AwarenessTasks />}
          {taskTab === "identification" && <IdentificationTasks />}
          {taskTab === "discrimination" && <DiscriminationTasks />}
          {taskTab === "comprehension" && <ComprehensiveTasks />}
        </div>
      </div>
    </div>
  );
}

export default Tasks;
