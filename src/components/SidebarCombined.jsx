import {
  LayoutDashboard,
  Layers,
  Flag,
  LifeBuoy,
  Settings,
  Users2,
  LogOut,
  LucideBuilding2,
} from "lucide-react";
import Sidebar, { SidebarItem } from "./Sidebar";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

export default function SidebarCombined() {
  const [status, setStatus] = useState();
  const [alertStatus] = useState({
    dashboard: false,
    patients: false,
    tasks: false,
    assessTasks: false,
    organization: false,
    settings: false,
    support: false,
  });

  useEffect(() => {
    setStatus(localStorage.getItem("audi-sidebar-status") || "dashboard");
  }, [status]);

  function logout() {
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to log out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, log out",
      cancelButtonText: "No, cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("audi-token");
        localStorage.removeItem("audi-user");
        localStorage.removeItem("audi-sidebar-status");
        window.location.href = "/";
      }
    });
  }

  return (
    <Sidebar>
      <div className="flex flex-col h-full justify-between">
        <div>
          <Link
            to="/dashboard"
            onClick={() => {
              localStorage.setItem("audi-sidebar-status", "dashboard");
              setStatus("dashboard");
            }}
          >
            <SidebarItem
              icon={<LayoutDashboard size={20} />}
              text="Dashboard"
              alert={alertStatus.dashboard}
              active={status == "dashboard"}
            />
          </Link>
          <Link
            to="/patients"
            onClick={() => {
              localStorage.setItem("audi-sidebar-status", "patients");
              setStatus("patients");
            }}
          >
            <SidebarItem
              icon={<Users2 size={20} />}
              text="Patients"
              alert={alertStatus.patients}
              active={status == "patients"}
            />
          </Link>
          <Link
            to="/tasks"
            onClick={() => {
              localStorage.setItem("audi-sidebar-status", "tasks");
              setStatus("tasks");
            }}
          >
            <SidebarItem
              icon={<Layers size={20} />}
              text="Tasks"
              alert={alertStatus.tasks}
              active={status == "tasks"}
            />
          </Link>
          <Link
            to="/assessTasks"
            onClick={() => {
              localStorage.setItem("audi-sidebar-status", "assessTasks");
              setStatus("assessTasks");
            }}
          >
            <SidebarItem
              icon={<Flag size={20} />}
              text="Assess Tasks"
              alert={alertStatus.assessTasks}
              active={status == "assessTasks"}
            />
          </Link>
          <Link
            to = {JSON.parse(localStorage.getItem("audi-user"))?.organization  ? "/organization/assigned" : "/organization"}
            onClick={() => {
              localStorage.setItem("audi-sidebar-status", "organization");
              setStatus("organization");
            }}
          >
            <SidebarItem
              icon={<LucideBuilding2 size={20} />}
              text="Organization"
              alert={alertStatus.organization}
              active={status == "organization"}
            />
          </Link>
        </div>
        <div className="mb-4">
          <hr className="my-2 border" />
          <Link to="#">
            <SidebarItem
              icon={<LifeBuoy size={20} />}
              text="Support"
              alert={alertStatus.support}
              active={status == "help"}
            />
          </Link>
          <Link to="#">
            <SidebarItem
              icon={<Settings size={20} />}
              text="Settings"
              alert={alertStatus.settings}
              active={status == "settings"}
            />
          </Link>
          <Link onClick={logout}>
            <SidebarItem
              icon={<LogOut size={20} />}
              text="Logout"
              logout={true}
            />
          </Link>
        </div>
      </div>
    </Sidebar>
  );
}
