"use client";

import { useState } from "react";
import AdminSidebar from "@/components/layout/sidebar/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activePage, setActivePage] = useState("home");

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Admin Sidebar */}
      <AdminSidebar activePage={activePage} setActivePage={setActivePage} />
      <main style={{ flex: 1, backgroundColor: "#f0f0f0" }}>{children}</main>
    </div>
  );
}
