import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Dashboard, Patients } from "../pages";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/patients" element={<Patients />} />
      </Routes>
    </Router>
  );
}