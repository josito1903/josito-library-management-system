import { BrowserRouter, Routes, Route } from "react-router-dom";

/* ================= COMMON PAGES ================= */

import HomePage from "./pages/Common/HomePage";
import About from "./pages/Common/About";
import Contact from "./pages/Common/contactus";
import NotFound from "./pages/NotFound";

/* ================= AUTH ================= */

import Sign from "./pages/auth/Sign";
import Signup from "./pages/auth/Signup";
import Logout from "./pages/Logout";

/* ================= STUDENT ================= */

import Dashboard from "./pages/Student/Dashboard";
import Books from "./pages/Student/BooksPage";
import Borrowing from "./pages/Student/Borrowing";
import Profile from "./pages/Student/Profile";

/* ================= ADMIN ================= */

import AdminDashboard from "./pages/Admin/AdminDashboard";
import Student from "./pages/Admin/Student";
import Notifications from "./pages/Admin/Notifications";
import Reports from "./pages/Admin/Reports";

/* ================= LAYOUTS ================= */
import StudentLayout from "./components/Layouts/StudentLayout";
import AdminLayout from "./components/Layouts/AdminLayout";

/* ================= COMPONENTS ================= */

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
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
          <Route path="student" element={<Student />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="reports" element={<Reports />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        {/* 404 */}

        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;