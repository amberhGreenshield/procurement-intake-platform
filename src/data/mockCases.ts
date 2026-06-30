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
  formsPending?: string[];
  description?: string;
  completedForms?: Assessment[];
  ourAssessments?: Assessment[];
}

export const INITIAL_CASES: Case[] = [
  {
    id: "#1245",
    vendorName: "Figma",
    stage: "inProgress",
    formsPending: ["NDA", "Security Review"],
    description:
      "Here is an auto populated description of the vendor product that will come from the \"High Level Description\" box to be filled out in the first SharePoint intake form.",
    completedForms: [
      { id: "cf1", label: "PDF upload of the risk tier" },
      { id: "cf2", label: "PDF upload of the risk tier" },
      { id: "cf3", label: "PDF upload of the risk tier" },
      { id: "cf4", label: "PDF upload of the risk tier" },
      { id: "cf5", label: "PDF upload of the risk tier" },
    ],
    ourAssessments: [
      { id: "oa1", label: "PDF upload of the risk tier" },
      { id: "oa2", label: "PDF upload of the risk tier" },
      { id: "oa3", label: "PDF upload of the risk tier" },
      { id: "oa4", label: "PDF upload of the risk tier" },
    ],
  },
  {
    id: "#1246",
    vendorName: "Claude",
    stage: "new",
    formsPending: ["MSA", "Intake Form"],
    description: "Claude is an AI assistant by Anthropic.",
    completedForms: [],
    ourAssessments: [],
  },
  {
    id: "#1247",
    vendorName: "Notion",
    stage: "new",
    formsPending: ["NDA"],
    description: "Notion is a productivity and note-taking platform.",
    completedForms: [],
    ourAssessments: [],
  },
  {
    id: "#1248",
    vendorName: "Salesforce",
    stage: "completed",
    description: "Salesforce is a CRM platform.",
    completedForms: [],
    ourAssessments: [],
  },
  {
    id: "#1249",
    vendorName: "Stripe",
    stage: "inProgress",
    formsPending: ["Security Review"],
    description: "Stripe is a payments infrastructure company.",
    completedForms: [],
    ourAssessments: [],
  },
  {
    id: "#1250",
    vendorName: "Slack",
    stage: "completed",
    description: "Slack is a team messaging platform.",
    completedForms: [],
    ourAssessments: [],
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
