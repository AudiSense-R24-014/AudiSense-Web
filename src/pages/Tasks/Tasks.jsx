import React, { useState, useEffect } from "react";
import TasksTopbar from "../../components/TasksTopbar";

import {
  AllTasks,
  AwarenessTasks,
  IdentificationTasks,
  DiscriminationTasks,
  ComprehensiveTasks,
} from "./TaskComponents";

import PatientService from "../../services/Patient.service";

function Tasks() {
  const [taskTab, setTaskTab] = useState("awareness");
  const [patients, setPatients] = useState([]);

  const audiUser = JSON.parse(localStorage.getItem("audi-user"));

  useEffect(() => {
    PatientService.getPatientsForOrganization(audiUser.organization).then((response) => {
      setPatients(response);
    });
  }, []);

  return (
    <div className="p-4 px-10">
      <h1 className="text-4xl font-nunito font-bold mb-6">Tasks</h1>
      <TasksTopbar taskList={taskTab} toggleTaskStatus={setTaskTab} />
      {/* {taskTab === "allTasks" && <AllTasks />} */}
      {taskTab === "awareness" && <AwarenessTasks patients={patients} />}
      {taskTab === "identification" && <IdentificationTasks patients={patients} />}
      {taskTab === "discrimination" && <DiscriminationTasks />}
      {taskTab === "comprehension" && <ComprehensiveTasks />}
    </div>
  );
}

export default Tasks;
