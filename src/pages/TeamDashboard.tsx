import { useState } from "react";
import Header from "../components/Header";
import ViewSwitcher, { AppViewMode } from "../components/ViewSwitcher";
import { Case, NEXT_STAGE, NEXT_LABEL, Stage } from "../data/mockCases";

type TabKey = Stage;

const TABS: { key: TabKey; label: string }[] = [
  { key: "new", label: "New Cases" },
  { key: "inProgress", label: "In Progress" },
  { key: "completed", label: "Completed" },
];

const RISK_COLORS: Record<string, { bg: string; color: string }> = {
  Low: { bg: "#dcfce7", color: "#166534" },
  Medium: { bg: "#fef3c7", color: "#92400e" },
  High: { bg: "#fee2e2", color: "#991b1b" },
};

interface TeamDashboardProps {
  teamName?: string;
  onBack?: () => void;
  onOpenCase?: (c: Case) => void;
  cases: Case[];
  setCases: React.Dispatch<React.SetStateAction<Case[]>>;
  viewMode: AppViewMode;
  onChangeViewMode: (mode: AppViewMode) => void;
}

export default function TeamDashboard({
  teamName = "InfoSec",
  onBack,
  onOpenCase,
  cases,
  setCases,
  viewMode,
  onChangeViewMode,
}: TeamDashboardProps) {
  const [activeTab, setActiveTab] = useState<TabKey>("new");
  const [recentlyMoved, setRecentlyMoved] = useState<string | null>(null);

  const filteredCases = cases.filter((c) => c.stage === activeTab);

  const counts: Record<Stage, number> = {
    new: cases.filter((c) => c.stage === "new").length,
    inProgress: cases.filter((c) => c.stage === "inProgress").length,
    completed: cases.filter((c) => c.stage === "completed").length,
  };

  function advanceCase(id: string) {
    setCases((prev) =>
      prev.map((c) => {
        if (c.id !== id) return c;
        const next = NEXT_STAGE[c.stage];
        return next ? { ...c, stage: next } : c;
      })
    );
    setRecentlyMoved(id);
    setTimeout(() => setRecentlyMoved(null), 1200);
  }

  // Current State: while the case is with this team (new / in progress) the
  // current state is this team's name. Once it's completed here, it has
  // moved on to whichever other team now owns it.
  function currentStateFor(c: Case): string {
    if (c.stage === "completed") {
      return c.completedByTeam ?? "Procurement Ops";
    }
    return teamName;
  }

  return (
    <div
      style={{
        fontFamily: "'Inter', 'Segoe UI', sans-serif",
        minHeight: "100vh",
        background: "#f1f5f9",
      }}
    >
      <Header
        title="Team Dashboard"
        subtitle={`Team: ${teamName}`}
        onBack={onBack}
        rightContent={<ViewSwitcher mode={viewMode} onChange={onChangeViewMode} />}
      />

      {/* Summary pills */}
      <div style={{ display: "flex", gap: 16, padding: "20px 32px 0" }}>
        {(["new", "inProgress", "completed"] as Stage[]).map((s) => (
          <div
            key={s}
            style={{
              background: "#fff",
              borderRadius: 10,
              padding: "10px 20px",
              boxShadow: "0 1px 4px rgba(0,0,0,0.07)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              minWidth: 90,
            }}
          >
            <span style={{ fontSize: 24, fontWeight: 700, color: "#334155" }}>
              {counts[s]}
            </span>
            <span style={{ fontSize: 11, color: "#94a3b8", marginTop: 2 }}>
              {s === "new" ? "New" : s === "inProgress" ? "In Progress" : "Completed"}
            </span>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 8, padding: "20px 32px 0" }}>
        {TABS.map((tab) => {
          const active = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{
                padding: "10px 28px",
                borderRadius: 10,
                border: "none",
                fontWeight: 600,
                fontSize: 14,
                cursor: "pointer",
                transition: "all 0.15s",
                background: active ? "#0f4c3a" : "#e2e8f0",
                color: active ? "#fff" : "#64748b",
                boxShadow: active ? "0 2px 8px rgba(15,76,58,0.18)" : "none",
              }}
            >
              {tab.label}
              <span
                style={{
                  marginLeft: 8,
                  background: active ? "rgba(255,255,255,0.22)" : "#cbd5e1",
                  color: active ? "#fff" : "#475569",
                  borderRadius: 12,
                  padding: "1px 8px",
                  fontSize: 12,
                }}
              >
                {counts[tab.key]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Case table */}
      <div style={{ padding: "16px 32px 32px" }}>
        <div
          style={{
            background: "#fff",
            borderRadius: 14,
            boxShadow: "0 1px 6px rgba(0,0,0,0.07)",
            overflow: "auto",
          }}
        >
          {filteredCases.length === 0 ? (
            <div
              style={{
                padding: "48px 0",
                textAlign: "center",
                color: "#94a3b8",
                fontSize: 15,
              }}
            >
              No cases in this stage.
            </div>
          ) : (
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: 13,
                minWidth: 980,
              }}
            >
              <thead>
                <tr style={{ background: "#0f4c3a" }}>
                  {[
                    "Case Num",
                    "Vendor",
                    "Business Owner",
                    "Business Sponsor",
                    "Supplier",
                    "Risk Tier",
                    "Current State",
                    "Next Review",
                    "Onboarding Duration",
                    "",
                  ].map((h) => (
                    <th
                      key={h}
                      style={{
                        textAlign: "left",
                        color: "#fff",
                        fontWeight: 600,
                        fontSize: 12,
                        padding: "14px 16px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredCases.map((c, i) => {
                  const nextStage = NEXT_STAGE[c.stage];
                  const isMoving = recentlyMoved === c.id;
                  const risk = c.riskTier ? RISK_COLORS[c.riskTier] : null;

                  return (
                    <tr
                      key={c.id}
                      style={{
                        borderBottom:
                          i < filteredCases.length - 1 ? "1px solid #f1f5f9" : "none",
                        background: isMoving ? "#f0fdf4" : "transparent",
                        transition: "background 0.4s",
                      }}
                    >
                      <td
                        onClick={() => onOpenCase?.(c)}
                        style={{
                          padding: "16px",
                          fontWeight: 700,
                          color: "#0f4c3a",
                          cursor: onOpenCase ? "pointer" : "default",
                          textDecoration: onOpenCase ? "underline" : "none",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {c.id}
                      </td>
                      <td
                        onClick={() => onOpenCase?.(c)}
                        style={{
                          padding: "16px",
                          fontWeight: 600,
                          color: "#1e293b",
                          cursor: onOpenCase ? "pointer" : "default",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {c.vendorName}
                      </td>
                      <td style={{ padding: "16px", color: "#334155", whiteSpace: "nowrap" }}>
                        {c.businessOwner ?? "—"}
                      </td>
                      <td style={{ padding: "16px", color: "#334155", whiteSpace: "nowrap" }}>
                        {c.businessSponsor ?? "—"}
                      </td>
                      <td style={{ padding: "16px", color: "#334155", whiteSpace: "nowrap" }}>
                        {c.supplier ?? "—"}
                      </td>
                      <td style={{ padding: "16px", whiteSpace: "nowrap" }}>
                        {risk ? (
                          <span
                            style={{
                              background: risk.bg,
                              color: risk.color,
                              borderRadius: 6,
                              padding: "3px 10px",
                              fontWeight: 600,
                              fontSize: 12,
                            }}
                          >
                            {c.riskTier}
                          </span>
                        ) : (
                          "—"
                        )}
                      </td>
                      <td style={{ padding: "16px", color: "#334155", whiteSpace: "nowrap" }}>
                        {currentStateFor(c)}
                      </td>
                      <td style={{ padding: "16px", color: "#334155", whiteSpace: "nowrap" }}>
                        {c.nextReview ?? "—"}
                      </td>
                      <td style={{ padding: "16px", color: "#334155", whiteSpace: "nowrap" }}>
                        {c.onboardingDuration ?? "—"}
                      </td>
                      <td style={{ padding: "16px", textAlign: "right", whiteSpace: "nowrap" }}>                        {nextStage ? (
                          <button
                            onClick={() => advanceCase(c.id)}
                            style={{
                              padding: "8px 22px",
                              borderRadius: 8,
                              border: "1.5px solid #cbd5e1",
                              background: "#f8fafc",
                              color: "#334155",
                              fontWeight: 600,
                              fontSize: 13,
                              cursor: "pointer",
                              transition: "all 0.15s",
                            }}
                            onMouseEnter={(e) => {
                              (e.currentTarget as HTMLButtonElement).style.background = "#0f4c3a";
                              (e.currentTarget as HTMLButtonElement).style.color = "#fff";
                              (e.currentTarget as HTMLButtonElement).style.borderColor = "#0f4c3a";
                            }}
                            onMouseLeave={(e) => {
                              (e.currentTarget as HTMLButtonElement).style.background = "#f8fafc";
                              (e.currentTarget as HTMLButtonElement).style.color = "#334155";
                              (e.currentTarget as HTMLButtonElement).style.borderColor = "#cbd5e1";
                            }}
                          >
                            {NEXT_LABEL[c.stage]}
                          </button>
                        ) : (
                          <span style={{ fontSize: 13, color: "#22c55e", fontWeight: 600 }}>
                            ✓ Done
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
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
