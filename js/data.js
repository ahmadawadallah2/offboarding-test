const ROLES = [
  { id: "employee", label: "Employee" },
  { id: "manager", label: "Direct manager" },
  { id: "hrOfficer", label: "HR Officer" },
  { id: "hrAdmin", label: "HR Admin" },
  { id: "hrDirector", label: "HR Director" },
  { id: "it", label: "IT" },
  { id: "infosec", label: "Information Security" },
  { id: "finance", label: "Finance" }
];

const STATUS_LABEL = {
  Draft: "Draft",
  PendingManagerReview: "Pending manager review",
  RetentionFollowUp: "Retention follow-up",
  RetainedClosed: "Closed — retained",
  CollectingInformation: "Collecting dates",
  DatesConfirmed: "Dates confirmed",
  ClearanceInProgress: "EOS clearance in progress",
  ClearanceReturned: "Clearance returned",
  ClearanceComplete: "Clearance complete",
  SettlementInProgress: "Settlement in progress",
  DocumentsIssuing: "Exit documents",
  SubscriptionCheck: "Final subscription check",
  Closed: "Closed",
  Cancelled: "Cancelled"
};
