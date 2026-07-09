import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, allowedRoles = [] }) {

  const token = localStorage.getItem("token");

  const user = JSON.parse(localStorage.getItem("user"));

  if (!token) {
    return <Navigate to="/signin" replace />;
  }

  if (!user) {
    localStorage.clear();
    return <Navigate to="/signin" replace />;
  }

  if (
    allowedRoles.length > 0 &&
    !allowedRoles.includes(user.role)
  ) {

    if (user.role === "admin") {
      return <Navigate to="/admin" replace />;
    }

    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

export default ProtectedRoute;