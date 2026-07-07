import { useState } from "react";
import Header from "../components/Header";
import { Case, INITIAL_CASES, NEXT_STAGE, NEXT_LABEL, Stage,  } from "../data/mockCases";

type TabKey = Stage;

const TABS: { key: TabKey; label: string }[] = [
  { key: "new", label: "New Cases" },
  { key: "inProgress", label: "In Progress" },
  { key: "completed", label: "Completed" },
];

interface TeamDashboardProps {
  teamName?: string;
  onBack?: () => void;
  onOpenCase?: (c: Case) => void;
  cases: Case[];
  setCases: React.Dispatch<React.SetStateAction<Case[]>>;
}

export default function TeamDashboard({
  teamName = "InfoSec",
  onBack,
  onOpenCase,
  cases,
  setCases,
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

      {/* Case list */}
      <div style={{ padding: "16px 32px 32px" }}>
        <div
          style={{
            background: "#fff",
            borderRadius: 14,
            boxShadow: "0 1px 6px rgba(0,0,0,0.07)",
            overflow: "hidden",
          }}
        >
          {filteredCases.length === 0 && (
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
          )}

          {filteredCases.map((c, i) => {
            const nextStage = NEXT_STAGE[c.stage];
            const isMoving = recentlyMoved === c.id;

            return (
              <div
                key={c.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "18px 24px",
                  borderBottom:
                    i < filteredCases.length - 1 ? "1px solid #f1f5f9" : "none",
                  background: isMoving ? "#f0fdf4" : "transparent",
                  transition: "background 0.4s",
                  gap: 16,
                }}
              >
                <span
                  onClick={() => onOpenCase?.(c)}
                  style={{
                    fontWeight: 700,
                    fontSize: 14,
                    color: "#0f4c3a",
                    minWidth: 60,
                    cursor: onOpenCase ? "pointer" : "default",
                    textDecoration: onOpenCase ? "underline" : "none",
                  }}
                >
                  {c.id}
                </span>
                <span
                  onClick={() => onOpenCase?.(c)}
                  style={{
                    flex: 1,
                    fontSize: 15,
                    color: "#1e293b",
                    fontWeight: 500,
                    cursor: onOpenCase ? "pointer" : "default",
                  }}
                >
                  {c.vendorName}
                </span>
                {c.riskTier && c.riskTier.length > 0 && (
                  <div style={{ display: "flex", gap: 6 }}>
                    {c.riskTier.split(",").map((f) => (
                      <span
                        key={f}
                        style={{
                          fontSize: 11,
                          background: "#fef3c7",
                          color: "#92400e",
                          borderRadius: 6,
                          padding: "2px 8px",
                          fontWeight: 500,
                        }}
                      >
                        {f.trim()}
                      </span>
                    ))}
                  </div>
                )}
                <div style={{ minWidth: 110, textAlign: "right" }}>
                  {nextStage ? (
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
                </div>
              </div>
            );
          })}
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
