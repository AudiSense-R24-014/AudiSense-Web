import React, { useState } from 'react';
import DiscriminationBars from "../../../components/DiscriminationBars";

import {
  AutoGenerate,
  GenerateCorrectiveTask,
  GenerateManually,
} from "./DiscriminationSubParts/index";

function DiscriminationTasks() {
  const [taskTab, setTaskTab] = useState("autogenerate");
  return (
    <div className="flex flex-col items-start">
      <div className="mb-4"> {/* Margin bottom to adjust space from heading */}
        <h1 className="text-4xl font-nunito font-bold">Discrimination Tasks</h1>
      </div>
      <div className="flex flex-col gap-4"> {/* Flex column and gap for spacing between tabs */}
        <DiscriminationBars taskList={taskTab} toggleTaskStatus={setTaskTab} />
        {taskTab === "autogenerate" && <AutoGenerate />}
        {taskTab === "generateCorrective" && <GenerateCorrectiveTask />}
        {taskTab === "generateManual" && <GenerateManually />}
      </div>
    </div>
  )
}

export default DiscriminationTasks;
