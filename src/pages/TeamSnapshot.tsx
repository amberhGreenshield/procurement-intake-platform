import Header from "../components/Header";
import { Case } from "../data/mockCases";

interface TeamSnapshotProps {
  userName?: string;
  teamName?: string;
  cases: Case[];
  onOpenDashboard: () => void;
}

const recentlyCompleted = [
  { id: "#2468", note: "Closed today" },
  { id: "#2462", note: "Closed yesterday" },
];

const newCaseNotifications = [
  { id: "#2376", vendorName: "Vendor Name" },
];

export default function TeamSnapshot({
  userName = "Name",
  teamName = "InfoSec",
  cases,
  onOpenDashboard,
}: TeamSnapshotProps) {
  const openCases = cases.filter((c) => c.stage !== "completed").length;
  const newCases = cases.filter((c) => c.stage === "new").length;
  const closed = cases.filter((c) => c.stage === "completed").length;

  return (
    <div
      style={{
        fontFamily: "'Inter', 'Segoe UI', sans-serif",
        minHeight: "100vh",
        background: "#f1f5f9",
      }}
    >
      <Header
        title={`Welcome Back, ${userName} 👋`}
        rightContent={
          <span style={{ fontSize: 14, opacity: 0.85 }}>Team: {teamName}</span>
        }
      />

      {/* Top row */}
      <div
        style={{
          display: "flex",
          gap: 20,
          padding: "28px 32px 0",
          alignItems: "flex-start",
        }}
      >
        {/* Team Snapshot */}
        <div style={{ flex: 1 }}>
          <div
            style={{
              background: "#5f9ea0",
              color: "#fff",
              borderRadius: "8px 8px 0 0",
              padding: "8px 16px",
              fontSize: 13,
              fontWeight: 600,
            }}
          >
            📷 Team Snapshot
          </div>
          <div
            style={{
              background: "#e8ecee",
              borderRadius: "0 0 8px 8px",
              padding: "16px",
              fontSize: 13,
              color: "#334155",
              lineHeight: 1.8,
            }}
          >
            <div>Open Cases: {openCases}</div>
            <div>New Cases: {newCases}</div>
            <div>Closed: {closed}</div>
          </div>
        </div>

        {/* Recently Completed */}
        <div style={{ flex: 1 }}>
          <div
            style={{
              background: "#5f9ea0",
              color: "#fff",
              borderRadius: "8px 8px 0 0",
              padding: "8px 16px",
              fontSize: 13,
              fontWeight: 600,
              textAlign: "center",
            }}
          >
            Recently Completed
          </div>
          <div
            style={{
              background: "#e8ecee",
              borderRadius: "0 0 8px 8px",
              padding: "16px",
              fontSize: 13,
              color: "#334155",
              lineHeight: 1.9,
            }}
          >
            {recentlyCompleted.map((c) => (
              <div key={c.id}>• {c.id} – {c.note}</div>
            ))}
          </div>
        </div>

        {/* Team Dashboard button */}
        <div style={{ paddingTop: 4 }}>
          <button
            onClick={onOpenDashboard}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "10px 20px",
              border: "2px solid #0f4c3a",
              borderRadius: 8,
              background: "#fff",
              color: "#0f4c3a",
              fontWeight: 600,
              fontSize: 13,
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "#0f4c3a";
              (e.currentTarget as HTMLButtonElement).style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "#fff";
              (e.currentTarget as HTMLButtonElement).style.color = "#0f4c3a";
            }}
          >
            📊 Team Dashboard
          </button>
        </div>
      </div>

      {/* New Cases */}
      <div style={{ padding: "24px 32px" }}>
        <div
          style={{
            background: "#5f9ea0",
            color: "#fff",
            borderRadius: "8px 8px 0 0",
            padding: "8px 16px",
            fontSize: 13,
            fontWeight: 600,
            textAlign: "center",
          }}
        >
          New Cases
        </div>
        <div
          style={{
            background: "#e8ecee",
            borderRadius: "0 0 8px 8px",
            padding: "16px 20px",
          }}
        >
          {newCaseNotifications.map((c) => (
            <div
              key={c.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                fontSize: 13,
                color: "#334155",
                padding: "6px 0",
              }}
            >
              <span style={{ fontSize: 18, color: "#0f4c3a" }}>🔔</span>
              New Case {c.id} {c.vendorName} has been added to the dashboard
            </div>
          ))}
        </div>
      </div>

      {/* Help button */}
      <div style={{ position: "fixed", bottom: 24, right: 24 }}>
        <button
          style={{
            width: 52,
            height: 52,
            borderRadius: "50%",
            border: "2.5px solid #0f4c3a",
            background: "#fff",
            color: "#0f4c3a",
            fontSize: 22,
            fontWeight: 700,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          ?
        </button>
      </div>
    </div>
  );
}
