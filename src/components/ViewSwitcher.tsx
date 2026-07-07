export type AppViewMode = "team" | "businessOwner";

interface ViewSwitcherProps {
  mode: AppViewMode;
  onChange: (mode: AppViewMode) => void;
}

export default function ViewSwitcher({ mode, onChange }: ViewSwitcherProps) {
  const options: { key: AppViewMode; label: string }[] = [
    { key: "team", label: "Team View" },
    { key: "businessOwner", label: "Business Owner View" },
  ];

  return (
    <div
      style={{
        display: "flex",
        background: "rgba(255,255,255,0.12)",
        borderRadius: 8,
        padding: 3,
        gap: 2,
      }}
    >
      {options.map((opt) => {
        const active = mode === opt.key;
        return (
          <button
            key={opt.key}
            onClick={() => onChange(opt.key)}
            style={{
              padding: "6px 14px",
              borderRadius: 6,
              border: "none",
              fontWeight: 600,
              fontSize: 12,
              cursor: "pointer",
              transition: "all 0.15s",
              background: active ? "#fff" : "transparent",
              color: active ? "#0f4c3a" : "#fff",
              whiteSpace: "nowrap",
            }}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
