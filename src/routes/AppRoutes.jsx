import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  Dashboard,
  Patients,
  Landing,
  AssignPatient,
  AllTasks,
  ComprehensiveTasks
} from "../pages";
export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/patients" element={<Patients />} />
        <Route path="/assignPatient" element={<AssignPatient />} />
        <Route path="/tasks" element={<AllTasks />} />
        <Route path="/tasks/comprehensive" element={<ComprehensiveTasks />} />
      </Routes>
    </Router>
  );
}
