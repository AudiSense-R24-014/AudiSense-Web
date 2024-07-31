import React, { useState } from "react";
import orgLanding from "../../assets/images/org-landing.png";
import NewOrgModal from "../../components/NewOrgModal";

const OrganizationLanding = () => {
  const [openNewOrgModal, setOpenNewOrgModal] = useState(false);
  const [openJoinOrgModal, setOpenJoinOrgModal] = useState(false);
  return (
    <div>
      <div className="py-8 px-2 border-b-2 border-indigo-400/20 lg:px-4">
        <h1 className="text-slate-900 font-montserrat font-bold text-xl lg:text-3xl">
          Organization Management
        </h1>
      </div>
      <div className="flex justify-center mx-2 my-12">
        <img src={orgLanding} alt="org landing" className="opacity-80" />
      </div>
      <div className="flex justify-center font-montserrat">
        <div className="flex flex-col gap-y-2">
          <button
            onClick={() => {
              setOpenNewOrgModal(true);
            }}
            className="bg-audi-purple text-white text-sm font-semibold py-2 px-8 md:py-2.5 rounded-md hover:bg-purple-900"
          >
            Create New Organization
          </button>
          <button
            onClick={() => {
              window.location = "./login";
            }}
            className="bg-audi-purple text-white text-sm font-semibold py-2 px-8 md:py-2.5 rounded-md hover:bg-purple-900"
          >
            Join Existing Organization
          </button>
        </div>
      </div>
      <NewOrgModal visible={openNewOrgModal} onClose={()=>{setOpenNewOrgModal(false)}}/>
    </div>
  );
};

export default OrganizationLanding;
