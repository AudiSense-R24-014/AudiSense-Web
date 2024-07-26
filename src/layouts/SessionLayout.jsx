import React from "react";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import SidebarCombined from "../components/SidebarCombined";
import SessionHeader from "../components/SessionHeader";

const SessionLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <div>
        <SidebarCombined />
      </div>
      <div className="flex flex-1 flex-col overflow-y-auto">
        <div className="flex-1">
          <SessionHeader />
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default SessionLayout;
