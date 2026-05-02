import AlumniDashboard from "@/components/dashboards/AlumniDashboard";
import supabase from "../config/supabaseClient"

export default function AlumniPage() {
  console.log(supabase)
  return <AlumniDashboard />;
}
