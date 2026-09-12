function viewRetention(state) {
  return needRole(state, "managerReview", "Direct manager or HR Officer") +
    "<h2>Retention follow-up</h2><p>Did the employee stay?</p>" +
    field("retentionNotes", "Notes", "textarea", state.retentionNotes) +
    "<div class=\"actions\"><button class=\"btn\" id=\"retainedYes\">Yes — back to work</button>" +
    "<button class=\"btn btn-secondary\" id=\"retainedNo\">No — continue offboarding</button></div>";
}

function viewDates(state) {
  return needRole(state, "dates", "HR Officer") +
    "<h2>3. Information collection</h2>" +
    "<p class=\"muted\">Last Actual Working Date drives timing. The exit interview email and EOS launch both go out at T−5 (5 working days before LAWD). Working days are Sunday–Thursday.</p>" +
    "<div class=\"form-grid\">" +
    field("noticePeriodDays", "Notice period (days)", "number", state.noticePeriodDays) +
    field("workingDaysRemaining", "Working days remaining", "number", state.workingDaysRemaining) +
    field("approvedLeaveDays", "Approved leave days", "number", state.approvedLeaveDays) +
    field("lastActualWorkingDate", "Last Actual Working Date", "date", state.lastActualWorkingDate) +
    field("lastContractualDate", "Last Contractual Date", "date", state.lastContractualDate) +
    field("handoverRequired", "Handover required", "checkbox", state.handoverRequired) +
    field("handoverRecipient", "Handover recipient", "text", state.handoverRecipient) +
    field("handoverDeadline", "Handover deadline", "date", state.handoverDeadline) +
    field("handoverTasks", "Handover tasks / documents", "textarea", state.handoverTasks) +
    "</div><div class=\"actions\"><button class=\"btn btn-secondary\" id=\"demoDates\">Fill demo dates (10 working days)</button>" +
    "<button class=\"btn\" id=\"confirmDates\">Confirm dates</button></div>";
}

function viewWaiting(state) {
  const launch = scheduledLaunchDate(state);
  const days = daysUntilLawd(state);
  const iv = state.exitInterviewDone
    ? "Completed in Performance Appraisal"
    : state.exitInterviewSent
      ? "Email sent — employee fills it in Appraisal, not here"
      : "Scheduled for T−5 (" + (launch ? formatDate(launch) : "—") + ")";
  return "<h2>Dates locked — automation running</h2>" +
    "<div class=\"banner info\">The exit interview email is sent automatically 5 working days before LAWD, with a link to Performance Appraisal. It is not filled in this system.</div>" +
    "<div class=\"meta\"><p>LAWD: <strong>" + esc(state.lastActualWorkingDate) + "</strong> · LCD: <strong>" + esc(state.lastContractualDate) + "</strong></p>" +
    "<p>T−5 (interview email + EOS launch): <strong>" + (launch ? esc(formatDate(launch)) : "—") + "</strong> · Working days left: <strong>" +
    (days == null ? "—" : days) + "</strong></p>" +
    "<p>Exit interview: <strong>" + iv + "</strong></p>" +
    "<p>Emails in outbox: <strong>" + (state.emails || []).length + "</strong></p></div>" +
    "<div class=\"actions\">" +
    "<button class=\"btn\" id=\"navEmails\">Open email outbox</button>" +
    "<button class=\"btn btn-secondary\" id=\"remindInterview\">Remind employee (interview)</button>" +
    "<button class=\"btn btn-secondary\" id=\"remindHrLawd\">Remind HR — LAWD in 5 days</button>" +
    "<button class=\"btn\" id=\"importAppraisal\">Appraisal webhook: interview done</button>" +
    "<button class=\"btn\" id=\"launchEos\">Simulate T−5 — send interview email + launch EOS</button>" +
    "<button class=\"btn btn-secondary\" id=\"sendT1\">Simulate T−1 reminder emails</button></div>";
}

function viewStage(state) {
  const stage = currentStage(state);
  if (!stage) return "<p>No pending stage.</p>";
  const def = STAGE_DEFS[stage.number - 1];
  const facts = sharedFacts(state, stage.number);
  const share = facts.length ? "<div class=\"share\"><h3>From other departments</h3>" +
    facts.map((row) => "<p><strong>" + esc(row[0]) + ":</strong> " + esc(row[1]) + "</p>").join("") +
    "</div>" : "";
  const fields = def.fields.map((f) => {
    return field("f_" + f.id, f.label, f.type, stage.answers[f.id] || "", f.options);
  }).join("");
  return needRole(state, "stage", ROLES.find((r) => r.id === stage.ownerRole).label) +
    "<h2>Stage " + stage.number + " — " + esc(stage.name) + "</h2>" +
    "<p class=\"muted\">Paper form owner: " + esc(def.formOwner) + ". Later teams see these answers.</p>" +
    (state.lateStart ? "<div class=\"banner warn\">Late start: fewer than 5 working days remained. No stage was skipped.</div>" : "") +
    (stage.status === "Returned" ? "<div class=\"banner err\">Returned: " + esc(stage.returnedReason) + "</div>" : "") +
    share + "<div class=\"form-grid\">" + fields + "</div>" +
    field("stageComments", "Sign-off comments", "textarea", stage.comments) +
    "<div class=\"actions\"><button class=\"btn btn-secondary\" id=\"fillStage\">Fill demo answers</button>" +
    "<button class=\"btn\" id=\"signStage\">Sign off stage</button></div>" +
    "<h3>Return to owner</h3>" + field("returnReason", "Return reason", "textarea", "") +
    "<div class=\"actions\"><button class=\"btn btn-danger\" id=\"returnStage\">Return current stage</button></div>";
}

function viewSettlement(state) {
  const locked = !(state.settlementHr && state.settlementFinance);
  return "<h2>Clearance gate — final settlement</h2>" +
    "<div class=\"banner ok\">All seven stages are complete. Settlement is unlocked for HR + Finance.</div>" +
    "<p>HR Officer: " + (state.settlementHr ? "signed" : "pending") + " · Finance: " +
    (state.settlementFinance ? "signed" : "pending") +
    " · Linked deductions: <strong>" + financeTotal(state) + " JOD</strong></p>" +
    "<div class=\"actions\">" +
    "<button class=\"btn\" id=\"signSettlement\">Sign settlement as current role</button>" +
    "<button class=\"btn\" id=\"nextDocuments\"" + (locked ? " disabled" : "") + ">Continue to exit documents</button></div>";
}

function viewDocuments(state) {
  return needRole(state, "documents", "HR Officer") +
    "<h2>Exit documents</h2><p>Issue the experience letter and other EOS documents.</p>" +
    "<div class=\"actions\"><button class=\"btn\" id=\"issueDocs\">Issue experience letter</button></div>";
}

function viewSubs(state) {
  return needRole(state, "subscriptions", "HR Officer or IT") +
    "<h2>Final subscription check</h2>" +
    "<p>Confirm remaining access, insurance, telecom, and other subscriptions are closed.</p>" +
    field("subNotes", "Notes", "textarea", "") +
    "<div class=\"actions\"><button class=\"btn btn-danger\" id=\"subsPending\">Something still pending</button>" +
    "<button class=\"btn\" id=\"subsOk\">All closed — archive case</button></div>";
}

function viewClosed(state) {
  const title = state.status === "RetainedClosed" ? "Case closed — employee retained" : "Case archived and closed";
  return "<h2>" + title + "</h2><p class=\"muted\">Read-only. Emails and reports stay available.</p>" +
    "<div class=\"actions\"><button class=\"btn\" id=\"navEmails\">Emails</button>" +
    "<button class=\"btn btn-secondary\" id=\"navReports\">Reports</button></div>";
}
