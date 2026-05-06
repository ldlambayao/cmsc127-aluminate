"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import AdminSidebar from "@/components/layout/sidebar/AdminSidebar";
import { ReactNode } from "react";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();

  const getActivePage = () => {
    if (pathname.includes("studentRecords")) return "records";
    if (pathname.includes("programSatisfactionResults")) return "satisfaction";
    if (pathname.includes("alumniTracerResults")) return "tracer";
    return "home";
  };

  const [activePage, setActivePage] = useState(getActivePage());

  const handleSetActivePage = (page: string) => {
    setActivePage(page);
    if (page === "home") router.push("/admin");
    if (page === "records") router.push("/admin/studentRecords");
    if (page === "satisfaction") router.push("/admin/programSatisfactionResults");
    if (page === "tracer") router.push("/admin/alumniTracerResults");
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#f4f5f7" }}>
      <AdminSidebar activePage={activePage} setActivePage={handleSetActivePage} />
      <div style={{ flex: 1, overflow: "hidden" }}>
        {children}
      </div>
    </div>
  );
}