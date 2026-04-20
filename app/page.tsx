import Link from "next/link";

export default function Home() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        gap: "16px",
        fontFamily: "'Segoe UI', sans-serif",
        backgroundColor: "#f0f0f0",
      }}
    >
      <h1 style={{ color: "#1a1a2e", marginBottom: "8px" }}>
        Aluminate System
      </h1>
      <Link
        href="/user/dashboard"
        style={linkStyle}
      >
        → User Dashboard
      </Link>
      <Link
        href="/admin/dashboard"
        style={linkStyle}
      >
        → Admin Dashboard
      </Link>
      <Link
        href="/analytics/dashboard"
        style={linkStyle}
      >
        → Analytics Dashboard
      </Link>
    </div>
  );
}

const linkStyle = {
  color: "#9b1d2a",
  fontWeight: "600",
  fontSize: "15px",
  textDecoration: "none",
};