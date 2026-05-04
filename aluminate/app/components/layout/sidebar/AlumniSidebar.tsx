"use client";

import Image from "next/image";
import { getSupabaseBrowserClient } from "@/../lib/supabase/browser-client";
import { useRouter } from "next/navigation";

const HomeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
  </svg>
);

const SurveyIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M8 7h8M8 12h8M8 17h4" />
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
}

export default function AlumniSidebar({ activePage, setActivePage }: SidebarProps) {
  const router = useRouter();
  const supabase = getSupabaseBrowserClient();
  return (
    <aside style={styles.sidebar}>
      {/* Logo */}
      <div style={styles.logo}>
        <Image
        src="/aluminate logo.png"
        alt="Aluminate Logo"
        width={180}
        height={180} />
      </div>

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
          <SurveyIcon />
          Program Satisfaction Form
        </button>
        <button
          style={{
            ...styles.navItem,
            ...(activePage === "tracer" ? styles.navItemActive : {}),
          }}
          onClick={() => setActivePage("tracer")}
        >
          <SurveyIcon />
          Alumni Tracer Form
        </button>
      </nav>

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
    zIndex: 10,          // Ensures sidebar renders above main content so shadow isn't clipped
    backgroundColor: "#ffffff",
    display: "flex",
    flexDirection: "column",
    padding: "24px 0",
    boxShadow: "4px 0 8px rgba(0,0,0,0.10), 8px 0 24px rgba(0,0,0,0.07), 1px 0 0 rgba(0,0,0,0.04)",
    overflowY: "auto",
  },
  logo: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "0 20px 28px 20px",
  },
  nav: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    padding: "0 12px",
    flex: 1,
  },
  navItem: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "10px 14px",
    borderRadius: "8px",
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
    padding: "10px 26px",
    border: "none",
    background: "transparent",
    color: "#9b1d2a",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
    marginTop: "auto",
  },
};