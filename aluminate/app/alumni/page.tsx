import AlumniDashboard from "@/components/dashboards/AlumniDashboard";

export default function AlumniPage() {
  return (
    // The page-morph-bg class gives a smooth fade-in on the shell.
    // The dashboard's sidebar + main content each handle their own layout.
    <div className="page-morph-bg">
      <AlumniDashboard />
    </div>
  );
}