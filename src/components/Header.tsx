interface HeaderProps {
  title?: string;
  subtitle?: string;
  onBack?: () => void;
  rightContent?: React.ReactNode;
}

export default function Header({ title, subtitle, onBack, rightContent }: HeaderProps) {
  return (
    <div
      style={{
        background: "#0f4c3a",
        color: "#fff",
        padding: "0 32px",
        height: 56,
        display: "flex",
        alignItems: "center",
        gap: 12,
      }}
    >
      {onBack && (
        <button
          onClick={onBack}
          style={{
            background: "rgba(255,255,255,0.15)",
            border: "none",
            borderRadius: 6,
            color: "#fff",
            fontSize: 13,
            padding: "4px 12px",
            cursor: "pointer",
            marginRight: 4,
          }}
        >
          ← Back
        </button>
      )}
      {title && (
        <span style={{ fontWeight: 700, fontSize: 16 }}>{title}</span>
      )}
      {subtitle && (
        <>
          <span style={{ opacity: 0.4, margin: "0 4px" }}>|</span>
          <span style={{ fontSize: 14, opacity: 0.85 }}>{subtitle}</span>
        </>
      )}
      {rightContent && (
        <div style={{ marginLeft: "auto" }}>{rightContent}</div>
      )}
    </div>
  );
}
