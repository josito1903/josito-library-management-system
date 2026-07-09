import DashboardIcon from "@mui/icons-material/Dashboard";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import PeopleIcon from "@mui/icons-material/People";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";

import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { ReactRouterAppProvider } from "@toolpad/core/react-router";
import { Outlet } from "react-router-dom";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import AssessmentIcon from "@mui/icons-material/Assessment";

const NAVIGATION = [
  {
    kind: "header",
    title: "Administrator",
  },
  {
    segment: "admin",
    title: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    segment: "admin/books",
    title: "Books",
    icon: <MenuBookIcon />,
  },
  {
    segment: "admin/student",
    title: "Students",
    icon: <PeopleIcon />,
  },
  {
    segment: "admin/profile",
    title: "Profile",
    icon: <PersonIcon />,
  },
  {
    segment: "logout",
    title: "Logout",
    icon: <LogoutIcon />,
  },
  {
  segment: "admin/notifications",
  title: "Notifications",
  icon: <NotificationsActiveIcon />,
},

{
  segment: "admin/reports",
  title: "Reports",
  icon: <AssessmentIcon />,
},
];

export default function AdminLayout() {
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