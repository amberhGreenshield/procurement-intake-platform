import { useState } from "react";
import TeamSnapshot from "./pages/TeamSnapshot";
import TeamDashboard from "./pages/TeamDashboard";
import CaseDetails from "./pages/CaseDetails";
import { Case, INITIAL_CASES } from "./data/mockCases";

type View = "snapshot" | "dashboard" | "caseDetails";

export default function App() {
  const [view, setView] = useState<View>("snapshot");
  const [cases, setCases] = useState<Case[]>(INITIAL_CASES);
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);

  function handleOpenCase(c: Case) {
    setSelectedCase(c);
    setView("caseDetails");
  }

  return (
    <>
      {view === "snapshot" && (
        <TeamSnapshot
          userName="Name"
          teamName="InfoSec"
          cases={cases}
          onOpenDashboard={() => setView("dashboard")}
        />
      )}
      {view === "dashboard" && (
        <TeamDashboard
          teamName="InfoSec"
          cases={cases}
          setCases={setCases}
          onBack={() => setView("snapshot")}
          onOpenCase={handleOpenCase}
        />
      )}
      {view === "caseDetails" && selectedCase && (
        <CaseDetails
          case={selectedCase}
          onBack={() => setView("dashboard")}
        />
      )}
    </>
  );
}
