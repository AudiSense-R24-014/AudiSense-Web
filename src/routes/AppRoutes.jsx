import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  Dashboard,
  Patients,
  Landing,
  AssignPatient,
  Tasks,
  Login,
  Register,
  OrganizationLanding,
  ExistingOrganizations,
} from "../pages";
import OnboardingLayout from "../layouts/OnboardingLayout";
import SessionLayout from "../layouts/SessionLayout";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        {/* Onboarding Paths */}
        <Route path="/" element={<OnboardingLayout />}>
          <Route index element={<Landing />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        {/* LoggedIn Paths */}
        <Route path="/*" element={<SessionLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="patients" element={<Patients />} />
          <Route path="assignPatient" element={<AssignPatient />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="organization">
            <Route index element={<OrganizationLanding />} />
            <Route path="existing" element={<ExistingOrganizations />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}
