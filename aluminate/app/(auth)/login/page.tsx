"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { User } from "@supabase/supabase-js";
import { createSupabaseServerClient } from "@/../lib/supabase/server-client";
import { getSupabaseBrowserClient } from "@/../lib/supabase/browser-client";

type LoginProps = {
  user: User | null;
}

export default function LoginPage({ user }: LoginProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const supabase = getSupabaseBrowserClient();
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<User | null>(user);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("Verifying...");
    const email = `${username}@up.edu.ph`

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })
    if (error) {
      setStatus("Invalid username or password");
      console.error(error.message);
    } else {
      console.log("Successfully logged in:", data.user);
      setStatus("Welcome, " + data.user.email);
      router.push("/alumni")
    }
  }

  return (
    <div style={containerStyle}>
      {/* Corner gradient blobs */}
      <div style={blobTopLeftStyle} />
      <div style={blobTopRightStyle} />
      <div style={blobBottomLeftStyle} />
      <div style={blobBottomRightStyle} />

      {/* Two-column layout container */}
      <div style={mainSplitLayout}>
        {/* Left column: Brand lockup */}
        <div style={brandColumnStyle}>
          {/* Branded Logo using the full image from /public */}
          <div style={brandLockupStyle}>
            <Image
              src="/aluminate logo.png"
              alt="Aluminate logo"
              width={380}
              height={95}
              style={{ objectFit: "contain", marginLeft: "-10px" }}
              priority
            />
          </div>
          {/* Subtitle */}
          <p style={brandSubtitleStyle}>
            A DMPCS Alumni Tracking and Analytics System
          </p>
        </div>

        {/* Right column: Login card */}
        <div style={cardColumnStyle}>
          <div style={loginCardStyle}>
            {/* Welcome header */}
            <div style={headerWrapper}>
              <h2 style={welcomeTitleStyle}>Welcome</h2>
              <p style={welcomeSubtitleStyle}>Login to get started</p>
            </div>

            {/* Login form */}
            <form style={formStyle} onSubmit={handleSubmit}>
              {/* Email input field */}
              <div style={inputGroupStyle}>
                <label style={labelStyle}>Username</label>
                <input
                  type="username"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  placeholder="Enter your Username"
                  style={inputFieldStyle}
                  required
                />
              </div>

              {/* Password input field */}
              <div style={inputGroupStyle}>
                <label style={labelStyle}>Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter your password"
                  style={inputFieldStyle}
                  required
                />
              </div>

              {/* Login button */}
              <button type="submit" style={loginButtonStyle}>
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Styles ---

const containerStyle: React.CSSProperties = {
  position: "relative",
  display: "flex",
  width: "100%",
  height: "100vh",
  overflow: "hidden",
  backgroundColor: "#fce8e8",
  fontFamily: "'Segoe UI', sans-serif",
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
  top: "-15%",
  left: "-10%",
  background:
    "radial-gradient(circle, rgba(255,200,200,0.7) 0%, rgba(252,210,210,0.3) 50%, transparent 70%)",
};

const blobTopRightStyle: React.CSSProperties = {
  ...cornerBlobBase,
  top: "-15%",
  right: "-10%",
  background:
    "radial-gradient(circle, rgba(255,200,200,0.7) 0%, rgba(252,210,210,0.3) 50%, transparent 70%)",
};

const blobBottomLeftStyle: React.CSSProperties = {
  ...cornerBlobBase,
  bottom: "-15%",
  left: "-10%",
  background:
    "radial-gradient(circle, rgba(255,200,200,0.7) 0%, rgba(252,210,210,0.3) 50%, transparent 70%)",
};

const blobBottomRightStyle: React.CSSProperties = {
  ...cornerBlobBase,
  bottom: "-15%",
  right: "-10%",
  background:
    "radial-gradient(circle, rgba(255,200,200,0.7) 0%, rgba(252,210,210,0.3) 50%, transparent 70%)",
};

// UPDATED: Centered layout with a specific gap to control distance
const mainSplitLayout: React.CSSProperties = {
  display: "flex",
  width: "100%",
  height: "100%",
  alignItems: "center",
  justifyContent: "center",
  gap: "100px", // Adjust this value to bring them closer or further apart
  padding: "0 20px",
  zIndex: 1,
};

// UPDATED: Removed fixed flex widths so elements take natural space
const brandColumnStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "center",
  gap: "16px",
};

const brandLockupStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
};

const brandSubtitleStyle: React.CSSProperties = {
  color: "#9b1d2a",
  fontSize: "14px",
  fontWeight: 400,
  letterSpacing: "0.02em",
  marginLeft: "4px",
};

// UPDATED: Removed fixed flex widths and padding
const cardColumnStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const loginCardStyle: React.CSSProperties = {
  width: "100%",
  minWidth: "480px",
  maxWidth: "560px",
  backgroundColor: "#ffffff",
  borderRadius: "24px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
  padding: "50px",
  display: "flex",
  flexDirection: "column",
  gap: "28px",
};

const headerWrapper: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "4px",
};

const welcomeTitleStyle: React.CSSProperties = {
  fontSize: "24px",
  fontWeight: 700,
  color: "#2a2a2a",
};

const welcomeSubtitleStyle: React.CSSProperties = {
  fontSize: "13px",
  color: "#6c6c6c",
};

const formStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "18px",
};

const inputGroupStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "8px",
};

const labelStyle: React.CSSProperties = {
  fontSize: "13px",
  color: "#6c6c6c",
};

const inputFieldStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 16px",
  borderRadius: "8px",
  border: "1px solid #e0e0e0",
  fontSize: "14px",
  color: "#2a2a2a",
};

const loginButtonStyle: React.CSSProperties = {
  width: "100%",
  backgroundColor: "#9b1d2a",
  color: "#ffffff",
  fontSize: "14px",
  fontWeight: 600,
  padding: "14px",
  borderRadius: "999px",
  border: "none",
  cursor: "pointer",
  transition: "background-color 0.2s ease, transform 0.15s ease",
};
