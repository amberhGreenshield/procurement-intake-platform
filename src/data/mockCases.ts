export type Stage = "new" | "inProgress" | "completed";

export interface Assessment {
  id: string;
  label: string;
  fileUrl?: string;
}

export interface Case {
  id: string;
  vendorName: string;
  stage: Stage;
  riskTier?: string;
  description?: string;
  completedForms?: Assessment[];
  ourAssessments?: Assessment[];
  currentlyAssignedTo?: string[];
}

export const INITIAL_CASES: Case[] = [
  {
    id: "#1245",
    vendorName: "Figma",
    stage: "inProgress",
    riskTier: "Tier 1",
    description:
      "Here is an auto populated description of the vendor product that will come from the \"High Level Description\" box to be filled out in the first SharePoint intake form.",
    completedForms: [
      { id: "cf1", label: "word doc (vendor intake form)" },
      { id: "cf2", label: "word doc (PIA)" },
      { id: "cf3", label: "word doc (initial TPRM->risk tier)" },
      { id: "cf4", label: "word doc (Data & AI Impact Assessment)" },
    ],
    ourAssessments: [
      { id: "oa1", label: "copy of upguard Security Governance questionnaire" },
 
    ],
  },
  {
    id: "#1246",
    vendorName: "Claude",
    stage: "new",
    riskTier: "Tier 1",
    description: "Here is an auto populated description of the vendor product that will come from the \"High Level Description\" box to be filled out in the first SharePoint intake form.",
    completedForms: [
      { id: "cf1", label: "word doc (vendor intake form)" },
      { id: "cf2", label: "word doc (PIA)" },
      { id: "cf3", label: "word doc (initial TPRM->risk tier)" },
      { id: "cf4", label: "word doc (Data & AI Impact Assessment)" },
    ],
    ourAssessments: [
      { id: "oa1", label: "copy of upguard Security Governance questionnaire" },
    ],
  },
  {
    id: "#1247",
    vendorName: "Notion",
    stage: "new",
    riskTier: "Tier 2",
    description: "Here is an auto populated description of the vendor product that will come from the \"High Level Description\" box to be filled out in the first SharePoint intake form.",
    completedForms: [],
    ourAssessments: [],
  },
  {
    id: "#1248",
    vendorName: "Salesforce",
    stage: "completed",
    riskTier: "Tier 2",
    description: "Here is an auto populated description of the vendor product that will come from the \"High Level Description\" box to be filled out in the first SharePoint intake form.",
    completedForms: [
      { id: "cf1", label: "word doc (vendor intake form)" },
      { id: "cf2", label: "word doc (PIA)" },
      { id: "cf3", label: "word doc (initial TPRM->risk tier)" },
      { id: "cf4", label: "word doc (Data & AI Impact Assessment)" },
    ],
    ourAssessments: [
      { id: "oa1", label: "copy of upguard Security Governance questionnaire" },
    ],
    currentlyAssignedTo: ["PVM-agreement review/negotiations"],
  },
  {
    id: "#1249",
    vendorName: "Stripe",
    stage: "inProgress",
    riskTier: "Tier 1",
    description: "Here is an auto populated description of the vendor product that will come from the \"High Level Description\" box to be filled out in the first SharePoint intake form.",
   completedForms: [
      { id: "cf1", label: "word doc (vendor intake form)" },
      { id: "cf2", label: "word doc (PIA)" },
      { id: "cf3", label: "word doc (initial TPRM->risk tier)" },
      { id: "cf4", label: "word doc (Data & AI Impact Assessment)" },
    ],
    ourAssessments: [
      { id: "oa1", label: "copy of upguard Security Governance questionnaire" },
    ],
  },
  {
    id: "#1250",
    vendorName: "Slack",
    stage: "completed",
    description: "Here is an auto populated description of the vendor product that will come from the \"High Level Description\" box to be filled out in the first SharePoint intake form.",
    completedForms: [
      { id: "cf1", label: "word doc (vendor intake form)" },
      { id: "cf2", label: "word doc (PIA)" },
      { id: "cf3", label: "word doc (initial TPRM->risk tier)" },
      { id: "cf4", label: "word doc (Data & AI Impact Assessment)" },
    ],
    ourAssessments: [
      { id: "oa1", label: "copy of upguard Security Governance questionnaire" },
    ],
    currentlyAssignedTo: ["Security Architecture"],
  },
];

export const NEXT_STAGE: Record<Stage, Stage | null> = {
  new: "inProgress",
  inProgress: "completed",
  completed: null,
};

export const NEXT_LABEL: Record<Stage, string> = {
  new: "Start",
  inProgress: "Complete",
  completed: "",
};
