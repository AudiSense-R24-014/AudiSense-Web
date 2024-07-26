import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  Dashboard,
  Patients,
  Landing,
  AssignPatient,
  Tasks,
  Login,
  Register,
} from "../pages";
import OnboardingLayout from "../layouts/OnboardingLayout";
import SessionLayout from "../layouts/SessionLayout";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        {/* Onboarding Paths */}
        <Route path="/" element={<OnboardingLayout />}>
          <Route index={true} element={<Landing />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        {/* LoggedIn Paths */}
        <Route path="/" element={<SessionLayout />}>
          <Route index={true} path="dashboard" element={<Dashboard />} />
          <Route path="patients" element={<Patients />} />
          <Route path="assignPatient" element={<AssignPatient />} />
          <Route path="tasks" element={<Tasks />} />
        </Route>
      </Routes>
    </Router>
  );
}
