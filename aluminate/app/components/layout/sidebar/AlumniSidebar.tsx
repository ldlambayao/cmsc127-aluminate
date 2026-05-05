"use client";

import Image from "next/image";
import { getSupabaseBrowserClient } from "@/../lib/supabase/browser-client";
import { useRouter } from "next/navigation";

const HomeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
  </svg>
);

// Book icon for Program Satisfaction Form
const ProgramIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    <line x1="9" y1="7" x2="15" y2="7" />
    <line x1="9" y1="11" x2="15" y2="11" />
  </svg>
);

// Briefcase icon for Alumni Tracer Form
const TracerIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" />
    <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
    <path d="M2 12h20" />
  </svg>
);

const LogOutIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

interface SidebarProps {
  activePage: string;
  setActivePage: (page: string) => void;
  className?: string;
}

export default function AlumniSidebar({ activePage, setActivePage, className }: SidebarProps) {
  const router = useRouter();
  const supabase = getSupabaseBrowserClient();
  return (
    <aside style={styles.sidebar} className={className}>
      {/* Logo — centered */}
      <div style={styles.logo}>
        <Image
          src="/aluminate logo.png"
          alt="Aluminate Logo"
          width={180}
          height={180} />
      </div>

      {/* Divider under logo */}
      <hr style={styles.divider} />

      {/* Nav */}
      <nav style={styles.nav}>
        <button
          style={{
            ...styles.navItem,
            ...(activePage === "home" ? styles.navItemActive : {}),
          }}
          onClick={() => setActivePage("home")}
        >
          <HomeIcon />
          Home
        </button>
        <button
          style={{
            ...styles.navItem,
            ...(activePage === "exit" ? styles.navItemActive : {}),
          }}
          onClick={() => setActivePage("exit")}
        >
          <ProgramIcon />
          Program Satisfaction Form
        </button>
        <button
          style={{
            ...styles.navItem,
            ...(activePage === "tracer" ? styles.navItemActive : {}),
          }}
          onClick={() => setActivePage("tracer")}
        >
          <TracerIcon />
          Alumni Tracer Form
        </button>
      </nav>

      {/* Divider above logout */}
      <hr style={styles.divider} />

      {/* Logout */}
      <button
        style={styles.logoutBtn}
        onClick={handleSignOut}>
        <LogOutIcon />
        Log Out
      </button>
    </aside>
  );
}

const handleSignOut = async () => {
  const supabase = getSupabaseBrowserClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Error signing out:", error.message);
  } else {
    window.location.href = "/login";
  }
};

const styles: { [key: string]: React.CSSProperties } = {
  sidebar: {
    width: "300px",
    height: "100vh",
    position: "sticky",
    top: 0,
    zIndex: 10,
    backgroundColor: "#ffffff",
    display: "flex",
    flexDirection: "column",
    padding: "24px 0",
    boxShadow: "4px 0 8px rgba(0,0,0,0.10), 8px 0 24px rgba(0,0,0,0.07), 1px 0 0 rgba(0,0,0,0.04)",
    overflowY: "auto",
  },
  logo: {
    display: "flex",
    justifyContent: "center",  // Centers logo horizontally
    alignItems: "center",
    padding: "0 20px 12px 20px",
  },
  divider: {
    border: "none",
    borderTop: "1px solid #ececec",
    margin: "0",
  },
  nav: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    padding: "28px 12px",
    flex: 1,
  },
  navItem: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "10px 14px",
    borderRadius: "999px",     // Fully pill-shaped / more rounded
    border: "none",
    background: "transparent",
    color: "#555",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
    textAlign: "left",
  },
  navItemActive: {
    backgroundColor: "#E8C4C4",
    color: "#9b1d2a",
  },
  logoutBtn: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "16px 26px 4px 26px",
    border: "none",
    background: "transparent",
    color: "#9b1d2a",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
  },
};