export type Stage = "new" | "inProgress" | "completed";

export type RiskTier = "Low" | "Medium" | "High";

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
<<<<<<< HEAD
  currentlyAssignedTo?: string[];
=======

  // New fields shown on the Team Dashboard table
  businessOwner?: string;
  businessSponsor?: string;
  supplier?: string;
  riskTier?: RiskTier;
  nextReview?: string; // date string
  onboardingDuration?: string;
  // Which team currently "owns" the case once it has moved past this
  // team's stage of the workflow (only relevant when stage === "completed").
  completedByTeam?: string;
  // Explicit "current state" for the Business Owner view, where a case's
  // location isn't relative to a single team — it's whichever team/queue
  // currently has the case (InfoSec, Legal, Finance, etc).
  currentState?: string;
>>>>>>> 4c20bbdb3c4aeddd96abbb5d6b09c5ef78e608c4
}

// Other teams a case can land with once it's finished with the current
// team's stage of the workflow.
export const OTHER_TEAMS = [
  "Legal",
  "Finance",
  "Procurement Ops",
  "IT Security",
  "Compliance",
];

// The signed-in business owner persona used for the Business Owner pages.
export const BUSINESS_OWNER_NAME = "Morgan Ellis";

// A business owner tracks their own vendor cases end-to-end, regardless of
// which internal team currently has them. This is separate mock data from
// the team-facing INITIAL_CASES above.
export const BUSINESS_OWNER_CASES: Case[] = [
  {
    id: "#3301",
    vendorName: "Miro",
    stage: "new",
    formsPending: ["Intake Form"],
    description: "Miro is an online collaborative whiteboard platform.",
    completedForms: [],
    ourAssessments: [],
    businessOwner: BUSINESS_OWNER_NAME,
    businessSponsor: "Harriet Osei",
    supplier: "Miro (RealtimeBoard, Inc.)",
    riskTier: "Low",
    nextReview: "2026-07-20",
    onboardingDuration: "1 day",
    currentState: "InfoSec",
  },
  {
    id: "#3298",
    vendorName: "Datadog",
    stage: "inProgress",
    formsPending: ["Security Review"],
    description: "Datadog is a monitoring and observability platform.",
    completedForms: [
      { id: "cf-3298-1", label: "Intake Form" },
    ],
    ourAssessments: [
      { id: "oa-3298-1", label: "Data and AI Impact Assessment" },
    ],
    businessOwner: BUSINESS_OWNER_NAME,
    businessSponsor: "Harriet Osei",
    supplier: "Datadog, Inc.",
    riskTier: "Medium",
    nextReview: "2026-07-15",
    onboardingDuration: "11 days",
    currentState: "InfoSec",
  },
  {
    id: "#3287",
    vendorName: "DocuSign",
    stage: "inProgress",
    formsPending: ["Legal Review"],
    description: "DocuSign is an e-signature and agreement platform.",
    completedForms: [
      { id: "cf-3287-1", label: "Intake Form" },
      { id: "cf-3287-2", label: "PIA" },
    ],
    ourAssessments: [
      { id: "oa-3287-1", label: "Data and AI Impact Assessment" },
    ],
    businessOwner: BUSINESS_OWNER_NAME,
    businessSponsor: "Callum Reyes",
    supplier: "DocuSign, Inc.",
    riskTier: "Medium",
    nextReview: "2026-07-12",
    onboardingDuration: "27 days",
    currentState: "Legal",
  },
  {
    id: "#3265",
    vendorName: "Zoom",
    stage: "completed",
    description: "Zoom is a video conferencing platform.",
    completedForms: [
      { id: "cf-3265-1", label: "Intake Form" },
      { id: "cf-3265-2", label: "PIA" },
    ],
    ourAssessments: [],
    businessOwner: BUSINESS_OWNER_NAME,
    businessSponsor: "Callum Reyes",
    supplier: "Zoom Video Communications",
    riskTier: "Low",
    nextReview: "2026-12-01",
    onboardingDuration: "15 days",
    currentState: "Finance",
  },
  {
    id: "#3241",
    vendorName: "Snowflake",
    stage: "completed",
    description: "Snowflake is a cloud data warehousing platform.",
    completedForms: [
      { id: "cf-3241-1", label: "Intake Form" },
      { id: "cf-3241-2", label: "PIA" },
    ],
    ourAssessments: [],
    businessOwner: BUSINESS_OWNER_NAME,
    businessSponsor: "Harriet Osei",
    supplier: "Snowflake Inc.",
    riskTier: "High",
    nextReview: "2026-09-18",
    onboardingDuration: "41 days",
    currentState: "Procurement Ops",
  },
  {
    id: "#3312",
    vendorName: "Grammarly",
    stage: "new",
    formsPending: ["Intake Form"],
    description: "Grammarly is an AI-assisted writing tool.",
    completedForms: [],
    ourAssessments: [],
    businessOwner: BUSINESS_OWNER_NAME,
    businessSponsor: "Callum Reyes",
    supplier: "Grammarly, Inc.",
    riskTier: "Medium",
    nextReview: "2026-07-25",
    onboardingDuration: "1 day",
    currentState: "IT Security",
  },
];

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
    businessOwner: "Sarah Chen",
    businessSponsor: "David Whitfield",
    supplier: "Figma, Inc.",
    riskTier: "Medium",
    nextReview: "2026-07-21",
    onboardingDuration: "18 days",
  },
  {
    id: "#1246",
    vendorName: "Claude",
    stage: "new",
<<<<<<< HEAD
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
=======
    formsPending: ["MSA", "Intake Form"],
    description: "Claude is an AI assistant by Anthropic.",
    completedForms: [],
    ourAssessments: [],
    businessOwner: "Priya Natarajan",
    businessSponsor: "Marcus Lee",
    supplier: "Anthropic PBC",
    riskTier: "High",
    nextReview: "2026-07-14",
    onboardingDuration: "2 days",
>>>>>>> 4c20bbdb3c4aeddd96abbb5d6b09c5ef78e608c4
  },
  {
    id: "#1247",
    vendorName: "Notion",
    stage: "new",
    riskTier: "Tier 2",
    description: "Here is an auto populated description of the vendor product that will come from the \"High Level Description\" box to be filled out in the first SharePoint intake form.",
    completedForms: [],
    ourAssessments: [],
    businessOwner: "Jordan Blake",
    businessSponsor: "Elena Vasquez",
    supplier: "Notion Labs, Inc.",
    riskTier: "Low",
    nextReview: "2026-07-16",
    onboardingDuration: "1 day",
  },
  {
    id: "#1248",
    vendorName: "Salesforce",
    stage: "completed",
<<<<<<< HEAD
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
=======
    description: "Salesforce is a CRM platform.",
    completedForms: [],
    ourAssessments: [],
    businessOwner: "Amelia Ross",
    businessSponsor: "Thomas Nguyen",
    supplier: "Salesforce, Inc.",
    riskTier: "Medium",
    nextReview: "2026-10-02",
    onboardingDuration: "34 days",
    completedByTeam: "Legal",
>>>>>>> 4c20bbdb3c4aeddd96abbb5d6b09c5ef78e608c4
  },
  {
    id: "#1249",
    vendorName: "Stripe",
    stage: "inProgress",
<<<<<<< HEAD
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
=======
    formsPending: ["Security Review"],
    description: "Stripe is a payments infrastructure company.",
    completedForms: [],
    ourAssessments: [],
    businessOwner: "Ben Carter",
    businessSponsor: "Nina Patel",
    supplier: "Stripe, Inc.",
    riskTier: "High",
    nextReview: "2026-07-10",
    onboardingDuration: "9 days",
>>>>>>> 4c20bbdb3c4aeddd96abbb5d6b09c5ef78e608c4
  },
  {
    id: "#1250",
    vendorName: "Slack",
    stage: "completed",
<<<<<<< HEAD
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
=======
    description: "Slack is a team messaging platform.",
    completedForms: [],
    ourAssessments: [],
    businessOwner: "Grace Kim",
    businessSponsor: "Owen Fitzgerald",
    supplier: "Salesforce (Slack Technologies)",
    riskTier: "Low",
    nextReview: "2026-11-15",
    onboardingDuration: "22 days",
    completedByTeam: "Finance",
>>>>>>> 4c20bbdb3c4aeddd96abbb5d6b09c5ef78e608c4
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
