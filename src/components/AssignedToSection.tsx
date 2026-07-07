import AssessmentCard from "./AssessmentCard";
import { Assessment } from "../data/mockCases";
import "../data/mockCases";


interface AssignedToSectionProps {
  assignedTo: string;
}

export default function AssignedToSection({ assignedTo }: AssignedToSectionProps) {
  return (
    <div style={{ flex: 1 }}>
      <div
        style={{
          background: "#0f4c3a",
          color: "#fff",
          borderRadius: "8px 8px 0 0",
          padding: "10px 16px",
          fontSize: 13,
          fontWeight: 600,
          textAlign: "center",
        }}
      >
        Assigned To
      </div>
      <div
        style={{
          background: "#f1f5f9",
          borderRadius: "0 0 8px 8px",
          padding: 16,
          minHeight: 200,
        }}
      >
        <p style={{ margin: 0, color: "#334155", fontSize: 13 }}>
          {assignedTo}
        </p>
      </div>
    </div>
  );
}