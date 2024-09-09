import { useState } from "react";
import IdentificationTabs from "../../../components/tabs/IdentificationTabs"
import PropTypes from "prop-types";

import {
  IdentificationTaskGenerate,
  IdentificationViewAll,
} from "./IdentificationSubParts";

function IdentificationTasks({ patients }) {
  const [taskTab, setTaskTab] = useState("generate");
  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-nunito font-bold">Identification Tasks</h1>
        <IdentificationTabs taskList={taskTab} toggleTaskStatus={setTaskTab} />
      </div>
      {taskTab === "generate" && <IdentificationTaskGenerate patients={patients} />}
      {taskTab === "all" && <IdentificationViewAll />}
    </>
  )
}

IdentificationTasks.propTypes = {
  patients: PropTypes.array.isRequired,
};

export default IdentificationTasks;
