import React, { useState } from 'react';
import DiscriminationTabs from "../../../components/tabs/DiscriminationTabs";

import DiscriminationViewTasks from "./DiscriminationViewTasks";
import DiscriminationLanding from "./DiscriminationLanding";

function DiscriminationTasks() {
  const [taskTab, setTaskTab] = useState("generateTasks");
  return (
    <div className="flex flex-col items-start">
      <div className="mb-4"> {/* Margin bottom to adjust space from heading */}
        <h1 className="text-4xl font-nunito font-bold">Discrimination Tasks</h1>
      </div>
      <div className="flex flex-col gap-4"> {/* Flex column and gap for spacing between tabs */}
        <DiscriminationTabs taskList={taskTab} toggleTaskStatus={setTaskTab} />
        {taskTab === "generateTasks" && <DiscriminationLanding />}
        {taskTab === "allTasks" && <DiscriminationViewTasks />}
        {/* {taskTab === "generateManual" && <GenerateManually />} */}
      </div>
    </div>
  )
}

export default DiscriminationTasks;
