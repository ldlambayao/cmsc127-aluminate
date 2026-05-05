import AdminDashboard from "@/components/dashboards/AdminDashboard";

export default function AdminPage() {
  // No morph wrapper — AdminDashboard handles its own
  // dash-sidebar-enter and dash-content-enter animations internally.
  return <AdminDashboard />;
}