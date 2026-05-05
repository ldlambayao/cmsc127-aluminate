import AlumniDashboard from "@/components/dashboards/AlumniDashboard";

export default function AlumniPage() {
  // No morph wrapper — AlumniDashboard handles its own
  // dash-sidebar-enter and dash-content-enter animations internally.
  return <AlumniDashboard />;
}