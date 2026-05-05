import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="page-morph-bg" style={containerStyle}>
      {/* Corner gradient blobs */}
      <div style={blobTopLeftStyle} />
      <div style={blobTopRightStyle} />
      <div style={blobBottomLeftStyle} />
      <div style={blobBottomRightStyle} />

      {/* Centered content — staggered children */}
      <div style={contentStyle}>
        <div className="page-enter-child-1">
          <Image
            src="/aluminate logo.png"
            alt="Aluminate logo"
            width={320}
            height={80}
            style={{ objectFit: "contain", marginBottom: "12px" }}
            priority
          />
        </div>

        <p className="page-enter-child-2" style={subtitleStyle}>
          A DMPCS Alumni Tracking and Analytics System
        </p>

        <div className="page-enter-child-3">
          <Link href="/login" style={buttonStyle}>
            Get Started &nbsp;→
          </Link>
        </div>
      </div>
    </div>
  );
}

const containerStyle: React.CSSProperties = {
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
  overflow: "hidden",
  backgroundColor: "#fce8e8",
};

const cornerBlobBase: React.CSSProperties = {
  position: "absolute",
  width: "480px",
  height: "480px",
  borderRadius: "50%",
  pointerEvents: "none",
};

const blobTopLeftStyle: React.CSSProperties = {
  ...cornerBlobBase,
  top: "-15%", left: "-10%",
  background: "radial-gradient(circle, rgba(255,200,200,0.7) 0%, rgba(252,210,210,0.3) 50%, transparent 70%)",
};
const blobTopRightStyle: React.CSSProperties = {
  ...cornerBlobBase,
  top: "-15%", right: "-10%",
  background: "radial-gradient(circle, rgba(255,200,200,0.7) 0%, rgba(252,210,210,0.3) 50%, transparent 70%)",
};
const blobBottomLeftStyle: React.CSSProperties = {
  ...cornerBlobBase,
  bottom: "-15%", left: "-10%",
  background: "radial-gradient(circle, rgba(255,200,200,0.7) 0%, rgba(252,210,210,0.3) 50%, transparent 70%)",
};
const blobBottomRightStyle: React.CSSProperties = {
  ...cornerBlobBase,
  bottom: "-15%", right: "-10%",
  background: "radial-gradient(circle, rgba(255,200,200,0.7) 0%, rgba(252,210,210,0.3) 50%, transparent 70%)",
};

const contentStyle: React.CSSProperties = {
  position: "relative",
  zIndex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "0px",
};

const subtitleStyle: React.CSSProperties = {
  color: "#9b1d2a",
  fontSize: "13px",
  fontWeight: 400,
  letterSpacing: "0.02em",
  marginBottom: "28px",
  marginTop: "4px",
};

const buttonStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  backgroundColor: "#9b1d2a",
  color: "#ffffff",
  fontSize: "14px",
  fontWeight: 600,
  padding: "10px 28px",
  borderRadius: "999px",
  textDecoration: "none",
  letterSpacing: "0.03em",
  transition: "background-color 0.2s ease, transform 0.15s ease",
};