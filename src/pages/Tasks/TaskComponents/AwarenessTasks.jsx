import React, { useState } from "react";
import AwarenessTabs from "../../../components/tabs/AwarenessTabs"
import PropTypes from "prop-types";

import {
  Ling6All,
  Ling6Separate,
  AwarenessBasicGenerate,
} from "./AwarenessSubParts";

function AwarenessTasks({ patients }) {
  const [taskTab, setTaskTab] = useState("awarenessSounds");
  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-nunito font-bold">Awareness Tasks</h1>
        <AwarenessTabs taskList={taskTab} toggleTaskStatus={setTaskTab} />
      </div>
      {taskTab === "ling6All" && <Ling6All patients={patients} />}
      {taskTab === "ling6Separate" && <Ling6Separate patients={patients} />}
      {taskTab === "awarenessSounds" && <AwarenessBasicGenerate patients={patients} />}
    </>
  )
}

AwarenessTasks.propTypes = {
  patients: PropTypes.array.isRequired,
};

export default AwarenessTasks;
