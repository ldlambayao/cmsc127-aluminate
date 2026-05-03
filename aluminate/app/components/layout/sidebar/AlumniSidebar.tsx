"use client";

import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";

const HomeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
  </svg>
);

const ProgramFormIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    <path d="M12 11h4M12 16h4M8 11h.01M8 16h.01" />
  </svg>
);

const TracerFormIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
);

const LogOutIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

const navItems = [
  { label: "Home",                     icon: <HomeIcon />,        href: "/alumni" },
  { label: "Program Satisfaction Form", icon: <ProgramFormIcon />, href: "/alumni/programsatisfactionform" },
  { label: "Alumni Tracer Form",        icon: <TracerFormIcon />,  href: "/alumni/surveyform" },
];

export default function AlumniSidebar() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <aside style={styles.sidebar}>
      {/* Logo */}
      <div style={styles.logo}>
        <Image
          src="/aluminate logo.png"
          alt="Aluminate Logo"
          width={120}
          height={120}
        />
      </div>

      {/* Nav */}
      <nav style={styles.nav}>
        {navItems.map(({ label, icon, href }) => {
          const isActive = pathname === href;
          return (
            <button
              key={href}
              style={{
                ...styles.navItem,
                ...(isActive ? styles.navItemActive : {}),
              }}
              onClick={() => router.push(href)}
            >
              {icon}
              {label}
            </button>
          );
        })}
      </nav>

      {/* Logout */}
      <button style={styles.logoutBtn} onClick={() => router.push("/login")}>
        <LogOutIcon />
        Log Out
      </button>
    </aside>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  sidebar: {
    width: "300px",
    minHeight: "100vh",
    backgroundColor: "#ffffff",
    display: "flex",
    flexDirection: "column",
    padding: "24px 0",
    boxShadow: "1px 0 4px rgba(0,0,0,0.06)",
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
    backgroundColor: "#fce8ea",
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