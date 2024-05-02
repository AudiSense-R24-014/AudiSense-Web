import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  Dashboard,
  Patients,
  Landing,
  AssignPatient,
  Tasks,
} from "../pages";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/patients" element={<Patients />} />
        <Route path="/assignPatient" element={<AssignPatient />} />
        <Route path="/tasks" element={<Tasks />} />
      </Routes>
    </Router>
  );
}
