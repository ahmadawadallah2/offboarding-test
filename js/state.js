const STORAGE_KEY = "fibertech-offboarding-test-v3";

function newStages() {
  return STAGE_DEFS.map((def) => ({
    number: def.number,
    name: def.name,
    ownerRole: def.ownerRole,
    status: "NotStarted",
    answers: {},
    comments: "",
    signedOffBy: "",
    signedOffAt: "",
    returnedReason: ""
  }));
}

function emptyCase() {
  return {
    caseId: "",
    employeeName: "Sara Ahmad",
    employeeId: "FT-1042",
    jobTitle: "HR Coordinator",
    division: "Corporate Affairs",
    department: "Human Resources",
    joiningDate: "2022-03-01",
    managerName: "Omar Khalil",
    managerTitle: "HR Manager",
    employeeEmail: "sara.ahmad@fibertech.com",
    managerEmail: "omar.khalil@fibertech.com",
    hrEmail: "hr@fibertech.com",
    letterName: "",
    status: "Draft",
    page: "case",
    retentionDecision: "",
    retentionNotes: "",
    noticePeriodDays: 30,
    workingDaysRemaining: 22,
    approvedLeaveDays: 0,
    handoverRequired: false,
    handoverRecipient: "",
    handoverTasks: "",
    handoverDeadline: "",
    lastActualWorkingDate: "",
    lastContractualDate: "",
    lateStart: false,
    eosLaunched: false,
    exitInterviewSent: false,
    exitInterviewDone: false,
    interview: emptyInterview(),
    emails: [],
    tMinus1Sent: false,
    stages: newStages(),
    settlementHr: false,
    settlementFinance: false,
    documentsIssued: false,
    subscriptionOk: null,
    audit: [],
    currentRole: "employee",
    lastError: ""
  };
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyCase();
    const merged = Object.assign(emptyCase(), JSON.parse(raw));
    if (!merged.interview) merged.interview = emptyInterview();
    if (!merged.emails) merged.emails = [];
    if (!merged.page) merged.page = "case";
    return merged;
  } catch (err) {
    return emptyCase();
  }
}

function saveState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function resetState() {
  const blank = emptyCase();
  saveState(blank);
  return blank;
}

function logAction(state, action, comments) {
  state.audit.unshift({
    at: new Date().toISOString(),
    actor: state.currentRole,
    action: action,
    status: state.status,
    comments: comments || ""
  });
}

function currentStage(state) {
  return state.stages.find((s) => s.status === "Pending" || s.status === "Returned") || null;
}

function allStagesComplete(state) {
  return state.stages.every((s) => s.status === "Complete");
}
