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

function SidebarCombined({ status }) {
    const [alertStatus, setAlertStatus] = useState({
        dashboard: false,
        patients: true,
        assignPatients: false,
        tasks: false,
        assignTasks: false,
        settings: false,
        help: true,
      });
  return (
    <div className="flex">
      <Sidebar>
        <SidebarItem
          icon={<LayoutDashboard size={20} />}
          text="Dashboard"
          alert={alertStatus.dashboard}
          active={status === "dashboard"}
        />
        <SidebarItem
          icon={<Users2 size={20} />}
          text="Patients"
          alert={alertStatus.patients}
          active={status === "patients"}
        />
        <SidebarItem
          icon={<UserPlus2 size={20} />}
          text="Assign Patients"
          alert={alertStatus.assignPatients}
          active={status === "assignPatients"}
        />
        <SidebarItem
          icon={<Layers size={20} />}
          text="Tasks"
          alert={alertStatus.tasks}
          active={status === "tasks"}
        />
        <SidebarItem
          icon={<Flag size={20} />}
          text="Assign Tasks"
          alert={alertStatus.assignPatients}
          active={status === "assignPatients"}
        />
        <hr className="my-3" />
        <SidebarItem
          icon={<Settings size={20} />}
          text="Settings"
          alert={alertStatus.settings}
          active={status === "settings"}
        />
        <SidebarItem
          icon={<LifeBuoy size={20} />}
          text="Help"
          alert={alertStatus.help}
          active={status === "help"}
        />
      </Sidebar>
    </div>
  );
}

export default SidebarCombined;
