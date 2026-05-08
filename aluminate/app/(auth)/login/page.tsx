"use client";

export const dynamic = "force-dynamic";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { User } from "@supabase/supabase-js";
import { getSupabaseBrowserClient } from "@/../lib/supabase/browser-client";

type LoginProps = {
  user: User | null;
};

export default function LoginPage({ user }: LoginProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const supabase = getSupabaseBrowserClient();
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<User | null>(user);
  const [exiting, setExiting] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("Verifying...");
    const email = `${username}@up.edu.ph`;

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (error) {
      setStatus("Invalid username or password");
      console.error(error.message);
    } else {
      console.log(data);
      console.log("Successfully logged in:", data.user);
      setStatus("Welcome, " + data.user.email);

      // Play exit animation, then navigate
      setExiting(true);

      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      if (sessionError) throw sessionError;

      const sessionUser = sessionData.session?.user ?? null;
      if (!sessionUser) {
        router.push("/login");
        return;
      }

      const roleCheck: any = await supabase
        .from("users")
        .select("role")
        .eq("uuid", sessionUser.id)
        .single()

      if(roleCheck.data.role === 1) {
        setTimeout(() => router.push("/alumni"), 420);
      } else {
        setTimeout(() => router.push("/admin"), 420);
      }


      //setTimeout(() => router.push("/alumni"), 420);
    }
  }

  return (
    /* Background fades in */
    <div
      ref={containerRef}
      className={`page-morph-bg${exiting ? " exiting" : ""}`}
      style={containerStyle}
    >
      {/* Corner gradient blobs */}
      <div style={blobTopLeftStyle} />
      <div style={blobTopRightStyle} />
      <div style={blobBottomLeftStyle} />
      <div style={blobBottomRightStyle} />

      {/* Two-column layout */}
      <div style={mainSplitLayout}>

        {/* Left — brand fades up */}
        <div className="page-enter-child-1" style={brandColumnStyle}>
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
          <p style={brandSubtitleStyle}>
            A DMPCS Alumni Tracking and Analytics System
          </p>
        </div>

        {/* Right — card morphs in */}
        <div style={cardColumnStyle}>
          <div
            ref={cardRef}
            style={loginCardStyle}
          >
            <div style={headerWrapper}>
              <h2 style={welcomeTitleStyle}>Welcome</h2>
              <p style={welcomeSubtitleStyle}>Login to Aluminate to get started</p>
            </div>

            <form style={formStyle} onSubmit={handleSubmit}>
              <div style={inputGroupStyle}>
                <label style={labelStyle}>Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your Username"
                  style={inputFieldStyle}
                  required
                />
              </div>

              <div style={inputGroupStyle}>
                <label style={labelStyle}>Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  style={inputFieldStyle}
                  required
                />
              </div>

              {status && (
                <p style={{
                  fontSize: "13px",
                  color: status.startsWith("Invalid") ? "#c0392b" : "#555",
                  margin: 0,
                }}>
                  {status}
                </p>
              )}

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
  background: "radial-gradient(circle, rgba(255,200,200,0.7) 0%, rgba(252,210,210,0.3) 50%, transparent 70%)",
};

const blobTopRightStyle: React.CSSProperties = {
  ...cornerBlobBase,
  top: "-15%",
  right: "-10%",
  background: "radial-gradient(circle, rgba(255,200,200,0.7) 0%, rgba(252,210,210,0.3) 50%, transparent 70%)",
};

const blobBottomLeftStyle: React.CSSProperties = {
  ...cornerBlobBase,
  bottom: "-15%",
  left: "-10%",
  background: "radial-gradient(circle, rgba(255,200,200,0.7) 0%, rgba(252,210,210,0.3) 50%, transparent 70%)",
};

const blobBottomRightStyle: React.CSSProperties = {
  ...cornerBlobBase,
  bottom: "-15%",
  right: "-10%",
  background: "radial-gradient(circle, rgba(255,200,200,0.7) 0%, rgba(252,210,210,0.3) 50%, transparent 70%)",
};

const mainSplitLayout: React.CSSProperties = {
  display: "flex",
  width: "100%",
  height: "100%",
  alignItems: "center",
  justifyContent: "center",
  gap: "100px",
  padding: "0 20px",
  zIndex: 1,
};

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

const cardColumnStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const loginCardStyle: React.CSSProperties = {
  width: "100%",
  minWidth: "480px",
  maxWidth: "560px",
  minHeight: "580px",
  backgroundColor: "#ffffff",
  borderRadius: "24px",
  boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
  padding: "50px 50px 70px 50px",
  display: "flex",
  flexDirection: "column",
  gap: "0px",
  justifyContent: "flex-start",
};

const headerWrapper: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "6px",
  marginBottom: "32px",
};

const welcomeTitleStyle: React.CSSProperties = {
  fontSize: "28px",
  fontWeight: 700,
  color: "#2a2a2a",
  margin: 0,
};

const welcomeSubtitleStyle: React.CSSProperties = {
  fontSize: "13px",
  color: "#6c6c6c",
  margin: 0,
};

const formStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "20px",
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
  padding: "10px 12px",
  borderRadius: "6px",
  border: "1px solid #d0d0d0",
  fontSize: "14px",
  color: "#2a2a2a",
  outline: "none",
  boxSizing: "border-box",
  backgroundColor: "#fafafa",
};

const loginButtonStyle: React.CSSProperties = {
  width: "60%",
  alignSelf: "center",
  backgroundColor: "#9b1d2a",
  color: "#ffffff",
  fontSize: "14px",
  fontWeight: 600,
  padding: "12px",
  borderRadius: "999px",
  border: "none",
  cursor: "pointer",
  marginTop: "60px",
  transition: "background-color 0.2s ease, transform 0.15s ease",
};
