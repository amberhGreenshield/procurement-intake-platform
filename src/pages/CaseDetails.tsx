import Header from "../components/Header";
import DescriptionCard from "../components/DescriptionCard";
import AssessmentSection from "../components/AssessmentSection";
import { Case } from "../data/mockCases";

interface CaseDetailsProps {
  case: Case;
  onBack: () => void;
}

export default function CaseDetails({ case: c, onBack }: CaseDetailsProps) {
  return (
    <div
      style={{
        fontFamily: "'Inter', 'Segoe UI', sans-serif",
        minHeight: "100vh",
        background: "#f1f5f9",
      }}
    >
      <Header
        onBack={onBack}
        title={`Case: ${c.id}`}
        subtitle={`Vendor: ${c.vendorName}`}
      />

      {/* Three-column layout */}
      <div
        style={{
          display: "flex",
          gap: 24,
          padding: "28px 32px",
          alignItems: "flex-start",
        }}
      >
        {/* Column 1: Description */}
        <DescriptionCard text={c.description} />

        {/* Column 2: Completed Forms / Assessments */}
        <AssessmentSection
          title="Completed Forms/Assessments"
          items={c.completedForms ?? []}
          columns={2}
        />

        {/* Column 3: Our Assessments */}
        <AssessmentSection
          title="Our Assessments"
          items={c.ourAssessments ?? []}
          columns={2}
        />
      </div>

      {/*Assigned to section */}
      <AssignedToSection assignedTo={c.assignedTo} />
    </div>
  );
}

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
