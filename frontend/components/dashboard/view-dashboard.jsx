"use client";
import UserDashboard from "@/components/dashboard/user-dashboard";
import AdminDashboard from "@/components/dashboard/admin-dashboard";
import { Can } from "@/authorization/AbilityContext";
import { memo } from "react";

const ViewDashboard = memo(function Dashboard() {
  // Show the admin dashboard if the user has the "read" permission for the "AdminDashboard" resource
  // Otherwise, show the user dashboard
  return (
    <Can I="read" a="AdminDashboard" passThrough>
      {(allowed) => (allowed ? <AdminDashboard /> : <UserDashboard />)}
    </Can>
  );
});

export default ViewDashboard;
