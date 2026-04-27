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
      <p style={{ color: "#888", fontSize: "14px", marginBottom: "24px" }}>
        Illuminating Alumni Paths Through Data, One at a Time
      </p>
      <Link
        href="/alumni"
        style={linkStyle}
      >
        → Alumni Dashboard
      </Link>
      <Link
        href="/admin"
        style={linkStyle}
      >
        → Admin Dashboard
      </Link>
      <Link
        href="/login"
        style={linkStyle}
      >
        → Login
      </Link>
      <Link
        href="/signup"
        style={linkStyle}
      >
        → Sign Up
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