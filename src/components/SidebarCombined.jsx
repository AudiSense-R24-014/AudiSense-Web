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
import PropTypes from 'prop-types';

SidebarCombined.propTypes = {
  props: PropTypes.object,
  status: PropTypes.string
}

function SidebarCombined({ props }) {


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
        <Link to="/dashboard">
          <SidebarItem
            icon={<LayoutDashboard size={20} />}
            text="Dashboard"
            alert={alertStatus.dashboard}
            active={props.status === "dashboard"}
          />
        </Link>
        <Link to="/patients">
          <SidebarItem
            icon={<Users2 size={20} />}
            text="Patients"
            alert={alertStatus.patients}
            active={props.status === "patients"}
          />
        </Link>
        <Link to="/assignPatient">
          <SidebarItem
            icon={<UserPlus2 size={20} />}
            text="Assign Patients"
            alert={alertStatus.assignPatients}
            active={props.status === "assignPatients"}
          />
        </Link>
        <Link to="/tasks">
          <SidebarItem
            icon={<Layers size={20} />}
            text="Tasks"
            alert={alertStatus.tasks}
            active={props.status === "tasks"}
          />
        </Link>
        <Link to="#">
          <SidebarItem
            icon={<Flag size={20} />}
            text="Assign Tasks"
            alert={alertStatus.assignPatients}
            active={props.status === "assignTasks"}
          />
        </Link>
        <hr className="my-3" />
        <Link to="#">
          <SidebarItem
            icon={<Settings size={20} />}
            text="Settings"
            alert={alertStatus.settings}
            active={props.status === "settings"}
          />
        </Link>
        <Link to="#">
          <SidebarItem
            icon={<LifeBuoy size={20} />}
            text="Help"
            alert={alertStatus.help}
            active={props.status === "help"}
          />
        </Link>
      </Sidebar>
  );
}

export default SidebarCombined;
