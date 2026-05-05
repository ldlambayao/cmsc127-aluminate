"use client";

import Image from "next/image";
import { getSupabaseBrowserClient } from "@/../lib/supabase/browser-client";
import { useRouter } from "next/navigation";

const HomeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
  </svg>
);

// Graduation cap icon for Graduate and Alumni Records
const RecordsIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z" />
  </svg>
);

// Checkmark/clipboard icon for Program Satisfaction Results
const SatisfactionIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <polyline points="9 11 12 14 22 4" />
  </svg>
);

// Globe/network icon for Alumni Tracer Results
const TracerResultsIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
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

export default function AdminSidebar({ activePage, setActivePage, className }: SidebarProps) {
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
          height={180}
          priority
        />
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
            ...(activePage === "records" ? styles.navItemActive : {}),
          }}
          onClick={() => setActivePage("records")}
        >
          <RecordsIcon />
          Graduate and Alumni Records
        </button>
        <button
          style={{
            ...styles.navItem,
            ...(activePage === "satisfaction" ? styles.navItemActive : {}),
          }}
          onClick={() => setActivePage("satisfaction")}
        >
          <SatisfactionIcon />
          Program Satisfaction Results
        </button>
        <button
          style={{
            ...styles.navItem,
            ...(activePage === "tracer" ? styles.navItemActive : {}),
          }}
          onClick={() => setActivePage("tracer")}
        >
          <TracerResultsIcon />
          Alumni Tracer Results
        </button>
      </nav>

      {/* Divider above logout */}
      <hr style={styles.divider} />

      {/* Logout */}
      <button
        style={styles.logoutBtn}
        onClick={handleSignOut}
      >
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
    justifyContent: "center",
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
    borderRadius: "999px",
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