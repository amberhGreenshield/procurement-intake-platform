import Header from "../components/Header";
import DescriptionCard from "../components/DescriptionCard";
import AssessmentSection from "../components/AssessmentSection";
import { Case } from "../data/mockCases";

interface BusinessOwnerCaseDetailsProps {
  case: Case;
  onBack: () => void;
}

export default function BusinessOwnerCaseDetails({ case: c, onBack }: BusinessOwnerCaseDetailsProps) {
  // For the Business Owner view, "Completed Forms/Assessments" is always the
  // intake paperwork the business owner themself is responsible for.
  const completedForms = [
    { id: "bo-intake", label: "Intake Form" },
    { id: "bo-pia", label: "PIA" },
  ];

  // "Assessments To Be Completed" only has outstanding items while the case
  // is actively being worked (in progress). Once it's done, there's nothing
  // left outstanding; if it hasn't started yet, nothing has been queued up.
  const assessmentsToComplete =
    c.stage === "inProgress"
      ? [{ id: "bo-aia", label: "Data and AI Impact Assessment" }]
      : [];

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
          items={completedForms}
          columns={2}
        />

        {/* Column 3: Assessments To Be Completed */}
        <AssessmentSection
          title="Assessments To Be Completed"
          items={assessmentsToComplete}
          columns={2}
        />
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
