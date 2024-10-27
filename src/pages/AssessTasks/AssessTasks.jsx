import React, { useState } from "react";
import TasksTopbar from "../../components/TasksTopbar.jsx";
import { ComprehensiveTasks } from "./AssessTasksComponent/index.jsx";
import { DiscriminationTasks } from "./AssessTasksComponent/index.jsx";
import { IdentificationTasks } from "./AssessTasksComponent/index.jsx";

function AssessTasks() {
  const [taskTab, setTaskTab] = useState("comprehension");

  return (
    <div className="p-4 px-10">
      <h1 className="text-4xl font-nunito font-bold mb-6">Assess Tasks</h1>
      <TasksTopbar taskList={taskTab} toggleTaskStatus={setTaskTab} />
      {taskTab === "comprehension" && <ComprehensiveTasks />}
      {taskTab === "discrimination" && <DiscriminationTasks />}
      {taskTab === "identification" && <IdentificationTasks />}
    </div>
  );
}

export default AssessTasks;
