import React from "react";
import Sidebar from "../../components/Sidebar";
import SidebarCombined from "../../components/SidebarCombined";

function Home() {
  return (
    <div className="flex">
      <SidebarCombined status={"dashboard"} />
        <div className="flex-0 p-10">
            <h1 className="text-2xl font-semibold">Home</h1>
            <p className="mt-4 text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec
            sagittis elit. Nullam pellentesque, justo at volutpat luctus, ex eros
            bibendum metus, nec fermentum nunc turpis et lectus. Sed nec sagittis
            elit. Nullam pellentesque, justo at volutpat luctus, ex eros bibendum
            metus, nec fermentum nunc turpis et lectus.
            </p>
            </div>
    </div>
  );
}

export default Home;
