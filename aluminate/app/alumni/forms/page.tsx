export default function AlumniFormsPage() {
  return (
    <div
      style={{
        padding: "40px",
        fontFamily: "'Segoe UI', sans-serif",
      }}
    >
      <h1 style={{ color: "#1a1a2e", marginBottom: "24px" }}>Alumni Forms</h1>
      <div
        style={{
          backgroundColor: "#ffffff",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
        }}
      >
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            maxWidth: "500px",
          }}
        >
          <div>
            <label style={{ display: "block", marginBottom: "4px", fontWeight: "600" }}>
              Current Employment Status
            </label>
            <select style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ddd" }}>
              <option>Employed</option>
              <option>Self-Employed</option>
              <option>Unemployed</option>
              <option>Further Studies</option>
            </select>
          </div>
          <div>
            <label style={{ display: "block", marginBottom: "4px", fontWeight: "600" }}>
              Company/Organization
            </label>
            <input
              type="text"
              style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ddd", boxSizing: "border-box" }}
            />
          </div>
          <button
            type="submit"
            style={{
              padding: "10px 20px",
              backgroundColor: "#9b1d2a",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: "600",
              alignSelf: "flex-start",
            }}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
