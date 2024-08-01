import React from "react";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import LandingTopbar from "../components/LandingTopbar";

const OnboardingLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <LandingTopbar />
      <main className="flex-grow container mx-auto py-6 px-4 md:px-6">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default OnboardingLayout;
