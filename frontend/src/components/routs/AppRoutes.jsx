import { Routes, Route } from "react-router-dom";

import HomePage from "../pages/HomePage";
import Sign from "../pages/Sign";
import Signup from "../pages/Signup";
import About from "../pages/About";
import Contact from "../pages/Contactus";
import Logout from "../pages/Logout";

import Dashboard from "../pages/Dashboard";
import AdminDashboard from "../pages/AdminDashboard";
import Books from "../pages/BooksPage";
import Student from "../pages/Student";
import Borrowing from "../pages/Borrowing";
import Profile from "../pages/Profile";
import Notifications from "../pages/Notifications";
import Reports from "../pages/Reports";
import NotFound from "../pages/NotFound";

import StudentLayout from "../components/StudentLayout";
import AdminLayout from "../components/AdminLayout";
import ProtectedRoute from "../components/ProtectedRoute";

function AppRoutes() {
  return (
    <Routes>

      {/* Public Routes */}

      <Route path="/" element={<HomePage />} />

      <Route path="/signin" element={<Sign />} />

      <Route path="/signup" element={<Signup />} />

      <Route path="/about" element={<About />} />

      <Route path="/contact" element={<Contact />} />

      <Route path="/logout" element={<Logout />} />

      {/* Student Routes */}

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute allowedRoles={["student"]}>
            <StudentLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />

        <Route path="books" element={<Books />} />

        <Route path="borrowing" element={<Borrowing />} />

        <Route path="profile" element={<Profile />} />
      </Route>

      {/* Admin Routes */}

      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />

        <Route path="books" element={<Books />} />

        <Route path="students" element={<Student />} />

        <Route path="notifications" element={<Notifications />} />

        <Route path="reports" element={<Reports />} />

        <Route path="profile" element={<Profile />} />
      </Route>

      {/* 404 */}

      <Route path="*" element={<NotFound />} />

    </Routes>
  );
}

export default AppRoutes;