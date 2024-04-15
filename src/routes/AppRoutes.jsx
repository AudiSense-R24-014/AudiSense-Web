import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Dashboard, Patients } from "../pages";
import AssignPatient from "../pages/AssignPatient/AssignPatient";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/patients" element={<Patients />} />
        <Route path="/assign-Patient" element={<AssignPatient/>} />
      </Routes>
    </Router>
  );
}
