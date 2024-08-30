import React, { useState } from "react";
import AwarenessTabs from "../../../components/tabs/AwarenessTabs"

import {
  Ling6All,
  Ling6Separate,
  AwarenessBasicGenerate,
} from "./AwarenessSubParts";

function AwarenessTasks() {
  const [taskTab, setTaskTab] = useState("ling6All");
  return (
    <>
      <div className="p-4 px-10">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-nunito font-bold">Awareness Tasks</h1>
          <AwarenessTabs taskList={taskTab} toggleTaskStatus={setTaskTab} />
        </div>
        {taskTab === "ling6All" && <Ling6All />}
        {taskTab === "ling6Separate" && <Ling6Separate />}
        {taskTab === "awarenessSounds" && <AwarenessBasicGenerate />}
      </div>
    </>
  )
}

export default AwarenessTasks;
