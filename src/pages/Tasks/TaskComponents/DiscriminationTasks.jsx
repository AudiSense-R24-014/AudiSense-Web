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
    <div>
      <div className="flex">
        <h1 className="text-4xl font-nunito font-bold ">Discrimination Tasks</h1>
      </div>
      <div className="pt-5 flex gap-5 cursor-pointer mr-5">
        <DiscriminationBars taskList={taskTab} toggleTaskStatus={setTaskTab} />
        {taskTab === "autogenerate" && <AutoGenerate />}
        {taskTab === "generateCorrective" && <GenerateCorrectiveTask />}
        {taskTab === "generateManual" && <GenerateManually />}
      </div>
    </div>
  )
}

export default DiscriminationTasks;
