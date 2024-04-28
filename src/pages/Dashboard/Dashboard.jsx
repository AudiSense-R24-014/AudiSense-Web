import React from "react";
import SidebarCombined from "../../components/SidebarCombined";
import "../../App.css";
function Dashboard() {
  return (
    <div className="flex">
      <SidebarCombined props={{ status: "dashboard" }} className="fixed h-full"/>
      <div className="flex-1 p-4 px-10">
        <h1 className="text-4xl font-nunito font-bold ">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
          <div className="bg-white p-5 rounded-lg shadow-md">
            <h1 className="text-xl font-semibold">Total Patients</h1>
            <h1 className="text-4xl font-bold mt-5">100</h1>
          </div>
          <div className="bg-white p-5 rounded-lg shadow-md">
            <h1 className="text-xl font-semibold">Total Tasks</h1>
            <h1 className="text-4xl font-bold mt-5">100</h1>
          </div>
          <div className="bg-white p-5 rounded-lg shadow-md">
            <h1 className="text-xl font-semibold">Total Assign Patients</h1>
            <h1 className="text-4xl font-bold mt-5">100</h1>
            </div>
          </div>
      </div>
    </div>
  );
}

export default Dashboard;
