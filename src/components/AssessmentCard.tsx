interface AssessmentCardProps {
  label: string;
  fileUrl?: string;
  /** If true, renders with a dashed "pending upload" style */
  pending?: boolean;
}

export default function AssessmentCard({ label, fileUrl, pending }: AssessmentCardProps) {
  return (
    <div
      onClick={() => fileUrl && window.open(fileUrl, "_blank")}
      style={{
        border: pending ? "1.5px dashed #94a3b8" : "1.5px solid #cbd5e1",
        borderRadius: 8,
        padding: "14px 12px",
        fontSize: 12,
        color: pending ? "#94a3b8" : "#475569",
        textAlign: "center",
        background: pending ? "#f8fafc" : "#fff",
        cursor: fileUrl ? "pointer" : "default",
        minHeight: 72,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "box-shadow 0.15s",
        lineHeight: 1.4,
      }}
      onMouseEnter={(e) => {
        if (fileUrl)
          (e.currentTarget as HTMLDivElement).style.boxShadow =
            "0 2px 8px rgba(15,76,58,0.18)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
      }}
    >
      {label}
    </div>
  );
}
