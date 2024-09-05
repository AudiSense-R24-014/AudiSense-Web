import React, { useState } from "react";
import AwarenessTabs from "../../../components/tabs/AwarenessTabs"

import {
  Ling6All,
  Ling6Separate,
  AwarenessBasicGenerate,
} from "./AwarenessSubParts";

function AwarenessTasks() {
  const [taskTab, setTaskTab] = useState("awarenessSounds");
  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-nunito font-bold">Awareness Tasks</h1>
        <AwarenessTabs taskList={taskTab} toggleTaskStatus={setTaskTab} />
      </div>
      {taskTab === "ling6All" && <Ling6All />}
      {taskTab === "ling6Separate" && <Ling6Separate />}
      {taskTab === "awarenessSounds" && <AwarenessBasicGenerate />}
    </>
  )
}

export default AwarenessTasks;
