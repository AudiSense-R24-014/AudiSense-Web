import React, { useState } from "react";
import GenerateTask from "./ComprehensionSubParts/GenerateTask";
import AllTasks from "./ComprehensionSubParts/AllTasks";
import ComprehensionTabs from "../../../components/tabs/ComprehensionTabs";

function ComprehensiveTasks() {
  const [taskTab, setTaskTab] = useState("generateTasks");
  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-nunito font-bold">Comprehension Tasks</h1>
        <ComprehensionTabs taskList={taskTab} toggleTaskStatus={setTaskTab} />
      </div>
      {taskTab === "allTasks" && <AllTasks />}
      {taskTab === "generateTasks" && <GenerateTask />}
    </>
  )
}

export default ComprehensiveTasks;