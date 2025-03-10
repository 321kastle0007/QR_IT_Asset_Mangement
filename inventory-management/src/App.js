import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Dashboard from "./components/Dashboard";
import AssetsPage from "./components/AssetsPage";
import SparePartsPage from "./components/SparePartsPage";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";

// A higher-order component to protect routes
const ProtectedRoute = ({ element }) => {
  const isLoggedIn = localStorage.getItem("token"); // Check if token exists in localStorage
  console.log("ProtectedRoute - Is Logged In:", Boolean(isLoggedIn)); // Debugging
  return isLoggedIn ? element : <Navigate to="/" />;
};

function App() {
  const isLoggedIn = localStorage.getItem("token"); // Check if the user is logged in

  console.log("App - Is Logged In:", Boolean(isLoggedIn)); // Debugging

  return (
    <Router>
      <Routes>
        {/* Default Route */}
        <Route
          path="/"
          element={isLoggedIn ? <Navigate to="/dashboard" /> : <LoginPage />}
        />

        {/* Signup Route */}
        <Route path="/signup" element={<SignupPage />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={<ProtectedRoute element={<Dashboard />} />}
        />
        <Route
          path="/assets"
          element={<ProtectedRoute element={<AssetsPage />} />}
        />
        <Route
          path="/spare-parts"
          element={<ProtectedRoute element={<SparePartsPage />} />}
        />

        {/* Fallback for undefined routes */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
