import { useState } from "react";
import TeamSnapshot from "./pages/TeamSnapshot";
import TeamDashboard from "./pages/TeamDashboard";
import CaseDetails from "./pages/CaseDetails";
import BusinessOwnerSnapshot from "./pages/BusinessOwnerSnapshot";
import BusinessOwnerDashboard from "./pages/BusinessOwnerDashboard";
import BusinessOwnerCaseDetails from "./pages/BusinessOwnerCaseDetails";
import { AppViewMode } from "./components/ViewSwitcher";
import { Case, INITIAL_CASES, BUSINESS_OWNER_CASES, BUSINESS_OWNER_NAME } from "./data/mockCases";

type TeamPage = "snapshot" | "dashboard" | "caseDetails";
type BusinessOwnerPage = "snapshot" | "dashboard" | "caseDetails";

export default function App() {
  const [viewMode, setViewMode] = useState<AppViewMode>("team");

  // Team view state
  const [teamPage, setTeamPage] = useState<TeamPage>("snapshot");
  const [cases, setCases] = useState<Case[]>(INITIAL_CASES);
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);

  // Business Owner view state
  const [boPage, setBoPage] = useState<BusinessOwnerPage>("snapshot");
  const [boCases] = useState<Case[]>(BUSINESS_OWNER_CASES);
  const [boSelectedCase, setBoSelectedCase] = useState<Case | null>(null);

  function handleOpenCase(c: Case) {
    setSelectedCase(c);
    setTeamPage("caseDetails");
  }

  function handleOpenBoCase(c: Case) {
    setBoSelectedCase(c);
    setBoPage("caseDetails");
  }

  if (viewMode === "businessOwner") {
    return (
      <>
        {boPage === "snapshot" && (
          <BusinessOwnerSnapshot
            userName={BUSINESS_OWNER_NAME}
            cases={boCases}
            onOpenDashboard={() => setBoPage("dashboard")}
            viewMode={viewMode}
            onChangeViewMode={setViewMode}
          />
        )}
        {boPage === "dashboard" && (
          <BusinessOwnerDashboard
            cases={boCases}
            onBack={() => setBoPage("snapshot")}
            onOpenCase={handleOpenBoCase}
            viewMode={viewMode}
            onChangeViewMode={setViewMode}
          />
        )}
        {boPage === "caseDetails" && boSelectedCase && (
          <BusinessOwnerCaseDetails
            case={boSelectedCase}
            onBack={() => setBoPage("dashboard")}
          />
        )}
      </>
    );
  }

  return (
    <>
      {teamPage === "snapshot" && (
        <TeamSnapshot
          userName="Name"
          teamName="InfoSec"
          cases={cases}
          onOpenDashboard={() => setTeamPage("dashboard")}
          viewMode={viewMode}
          onChangeViewMode={setViewMode}
        />
      )}
      {teamPage === "dashboard" && (
        <TeamDashboard
          teamName="InfoSec"
          cases={cases}
          setCases={setCases}
          onBack={() => setTeamPage("snapshot")}
          onOpenCase={handleOpenCase}
          viewMode={viewMode}
          onChangeViewMode={setViewMode}
        />
      )}
      {teamPage === "caseDetails" && selectedCase && (
        <CaseDetails
          case={selectedCase}
          onBack={() => setTeamPage("dashboard")}
        />
      )}
    </>
  );
}
