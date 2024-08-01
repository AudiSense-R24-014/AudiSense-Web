import React, { useState } from "react";
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
        <div className="p-4 px-10">
          <h1 className="text-4xl font-nunito font-bold mb-6">Tasks</h1>
          <TasksTopbar taskList={taskTab} toggleTaskStatus={setTaskTab} />
          {taskTab === "allTasks" && <AllTasks />}
          {taskTab === "awareness" && <AwarenessTasks />}
          {taskTab === "identification" && <IdentificationTasks />}
          {taskTab === "discrimination" && <DiscriminationTasks />}
          {taskTab === "comprehension" && <ComprehensiveTasks />}
        </div>
  );
}

export default Tasks;
