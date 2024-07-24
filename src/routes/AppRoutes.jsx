import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import {
  Dashboard,
  Patients,
  Landing,
  AssignPatient,
  Tasks,
  Login,
} from "../pages";
import OnboardingLayout from "../layouts/OnboardingLayout";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        {/* Onboarding Paths */}
        <Route path="/" element={<OnboardingLayout />}>
          <Route path="/" element={<Landing />} />
          <Route path="login" element={<Login />} />
        </Route>

        {/* LoggedIn Paths */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/patients" element={<Patients />} />
        <Route path="/assignPatient" element={<AssignPatient />} />
        <Route path="/tasks" element={<Tasks />} />
      </Routes>
    </Router>
  );
}
