import DashboardIcon from "@mui/icons-material/Dashboard";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import AssignmentReturnIcon from "@mui/icons-material/AssignmentReturn";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";

import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { ReactRouterAppProvider } from "@toolpad/core/react-router";
import { Outlet } from "react-router-dom";

const NAVIGATION = [
  {
    kind: "header",
    title: "Student Panel",
  },
  {
    segment: "dashboard",
    title: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    segment: "dashboard/books",
    title: "Books",
    icon: <MenuBookIcon />,
  },
  {
    segment: "dashboard/borrowing",
    title: "Borrowing",
    icon: <AssignmentReturnIcon />,
  },
  {
    segment: "dashboard/profile",
    title: "Profile",
    icon: <PersonIcon />,
  },
  {
    segment: "logout",
    title: "Logout",
    icon: <LogoutIcon />,
  },
];

export default function StudentLayout() {
  return (
    <ReactRouterAppProvider
      navigation={NAVIGATION}
      branding={{
        title: "Library Management System",
      }}
    >
      <DashboardLayout>
        <Outlet />
      </DashboardLayout>
    </ReactRouterAppProvider>
  );
}