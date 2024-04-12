import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Dashboard } from "../pages";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}
