"use client";

import { usePathname, useRouter } from "next/navigation";
import AdminSidebar from "@/components/layout/sidebar/AdminSidebar";

function getActivePage(pathname: string): string {
  if (pathname === "/admin") return "home";
  if (pathname.startsWith("/admin/studentRecords")) return "records";
  if (pathname.startsWith("/admin/programSatisfactionResults")) return "satisfaction";
  if (pathname.startsWith("/admin/alumniTracerResults")) return "tracer";
  return "home";
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const activePage = getActivePage(pathname);

  const handleSetActivePage = (page: string) => {
    if (page === "home") router.push("/admin");
    if (page === "records") router.push("/admin/studentRecords");
    if (page === "satisfaction") router.push("/admin/programSatisfactionResults");
    if (page === "tracer") router.push("/admin/alumniTracerResults");
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <AdminSidebar activePage={activePage} setActivePage={handleSetActivePage} />
      <main style={{ flex: 1, backgroundColor: "#f4f5f7" }}>{children}</main>
    </div>
  );
}