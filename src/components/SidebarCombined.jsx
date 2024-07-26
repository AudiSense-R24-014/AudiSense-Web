import {
  LayoutDashboard,
  Layers,
  Flag,
  LifeBuoy,
  Settings,
  Users2,
  UserPlus2,
} from "lucide-react";
import Sidebar, { SidebarItem } from "./Sidebar";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function SidebarCombined() {
  const [status, setStatus] = useState("dashboard");
  const [alertStatus] = useState({
    dashboard: false,
    patients: false,
    assignPatients: false,
    tasks: false,
    assignTasks: false,
    settings: false,
    help: false,
  });
  return (
    <Sidebar>
      <Link to="/dashboard" onClick={() => {setStatus("dashboard")}}>
        <SidebarItem
          icon={<LayoutDashboard size={20} />}
          text="Dashboard"
          alert={alertStatus.dashboard}
          active={status === "dashboard"}
        />
      </Link>
      <Link to="/patients" onClick={() => {setStatus("patients")}}>
        <SidebarItem
          icon={<Users2 size={20} />}
          text="Patients"
          alert={alertStatus.patients}
          active={status === "patients"}
        />
      </Link>
      <Link to="/assignPatient" onClick={() => {setStatus("assignPatients")}}>
        <SidebarItem
          icon={<UserPlus2 size={20} />}
          text="Assign Patients"
          alert={alertStatus.assignPatients}
          active={status === "assignPatients"}
        />
      </Link>
      <Link to="/tasks" onClick={() => {setStatus("tasks")}}>
        <SidebarItem
          icon={<Layers size={20} />}
          text="Tasks"
          alert={alertStatus.tasks}
          active={status === "tasks"}
        />
      </Link>
      <Link to="#">
        <SidebarItem
          icon={<Flag size={20} />}
          text="Assign Tasks"
          alert={alertStatus.assignPatients}
          active={status === "assignTasks"}
        />
      </Link>
      <hr className="my-3" />
      <Link to="#">
        <SidebarItem
          icon={<Settings size={20} />}
          text="Settings"
          alert={alertStatus.settings}
          active={status === "settings"}
        />
      </Link>
      <Link to="#">
        <SidebarItem
          icon={<LifeBuoy size={20} />}
          text="Help"
          alert={alertStatus.help}
          active={status === "help"}
        />
      </Link>
    </Sidebar>
  );
}
