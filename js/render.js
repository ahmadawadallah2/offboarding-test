function esc(value) {
  return String(value == null ? "" : value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function needRole(state, action, label) {
  if (roleCanAct(state, action)) return "";
  return '<div class="banner warn">Switch role to ' + esc(label) + " to continue.</div>";
}

function renderTimeline(state) {
  const items = [
    ["Resignation", state.status !== "Draft"],
    ["Manager review", ["PendingManagerReview", "Draft"].indexOf(state.status) < 0],
    ["Dates / handover", Boolean(state.lastActualWorkingDate)],
    ["Exit interview (T−5 email)", state.exitInterviewSent],
    ["EOS launch", state.eosLaunched]
  ];
  const stageHtml = state.stages.map((s) => {
    const cls = s.status === "Complete" ? "done" : s.status === "Pending" || s.status === "Returned" ? "current" : "";
    return "<li class=\"" + cls + "\">" + s.number + ". " + esc(s.name) + " · " + esc(s.status) + "</li>";
  }).join("");
  const top = items.map((row) => {
    return "<li class=\"" + (row[1] ? "done" : "") + "\">" + esc(row[0]) + "</li>";
  }).join("");
  const gate = allStagesComplete(state) ? "done" : "";
  document.getElementById("timeline").innerHTML =
    "<h2>Timeline</h2><ol class=\"steps\">" + top + "</ol><h3>Clearance</h3><ol class=\"steps\">" +
    stageHtml + "</ol><h3>Close</h3><ol class=\"steps\">" +
    "<li class=\"" + (state.settlementHr && state.settlementFinance ? "done" : "") + "\">Settlement</li>" +
    "<li class=\"" + (state.documentsIssued ? "done" : "") + "\">Exit documents</li>" +
    "<li class=\"" + (state.subscriptionOk ? "done" : "") + "\">Subscriptions</li>" +
    "<li class=\"" + (state.status === "Closed" || state.status === "RetainedClosed" ? "done" : gate) + "\">Archive</li></ol>";
}

function caseProgress(state) {
  const bits = [
    state.status !== "Draft",
    ["PendingManagerReview", "Draft"].indexOf(state.status) < 0,
    Boolean(state.lastActualWorkingDate),
    state.exitInterviewSent,
    state.eosLaunched,
    state.stages.filter((s) => s.status === "Complete").length / 7,
    state.settlementHr && state.settlementFinance,
    state.documentsIssued,
    state.status === "Closed" || state.status === "RetainedClosed"
  ];
  const score = bits.reduce((sum, v) => sum + (v === true ? 1 : Number(v) || 0), 0);
  return Math.round((score / bits.length) * 100);
}

function renderAudit(state) {
  document.getElementById("auditPanel").innerHTML =
    "<h2>Emails</h2><p class=\"muted\">Latest outbound mail. Open Emails for full text.</p><ul class=\"log\">" +
    ((state.emails || []).slice(0, 8).map((m) => {
      return "<li><strong>" + esc(m.subject) + "</strong><br><span class=\"muted\">" +
        esc(m.to) + " · " + esc(m.at.replace("T", " ").slice(0, 16)) + "</span></li>";
    }).join("") || "<li class=\"muted\">No emails yet.</li>") +
    "</ul><p class=\"muted\">Audit events: " + state.audit.length + "</p>";
}

function field(id, label, type, value, extra) {
  const extraHtml = extra || "";
  if (type === "textarea") {
    return "<label class=\"field span-2\">" + esc(label) + extraHtml +
      "<textarea id=\"" + id + "\" rows=\"3\">" + esc(value) + "</textarea></label>";
  }
  if (type === "checkbox") {
    return "<label class=\"field span-2\"><input id=\"" + id + "\" type=\"checkbox\"" +
      (value ? " checked" : "") + "> " + esc(label) + "</label>";
  }
  if (type === "select") {
    const opts = (extra || []).map((opt) => {
      const sel = String(value) === String(opt) ? " selected" : "";
      return "<option value=\"" + esc(opt) + "\"" + sel + ">" + esc(opt) + "</option>";
    }).join("");
    return "<label class=\"field span-2\">" + esc(label) +
      "<select id=\"" + id + "\"><option value=\"\"></option>" + opts + "</select></label>";
  }
  return "<label class=\"field\">" + esc(label) + extraHtml +
    "<input id=\"" + id + "\" type=\"" + type + "\" value=\"" + esc(value) + "\"></label>";
}

function renderMain(state) {
  const box = document.getElementById("mainPanel");
  const err = state.lastError ? "<div class=\"banner err\">" + esc(state.lastError) + "</div>" : "";
  if (state.page === "reports") { box.innerHTML = err + viewReports(state); return; }
  if (state.page === "emails" || state.page === "interview") { box.innerHTML = err + viewEmails(state); return; }
  const pct = caseProgress(state);
  const status = err + "<div class=\"hero\"><p><span class=\"badge\">" + esc(STATUS_LABEL[state.status] || state.status) +
    "</span></p><p class=\"muted\">" + pct + "% complete</p></div><div class=\"progress\"><span style=\"width:" + pct + "%\"></span></div>";
  if (state.status === "Draft") { box.innerHTML = status + viewSubmit(state); return; }
  if (state.status === "PendingManagerReview") { box.innerHTML = status + viewManager(state); return; }
  if (state.status === "RetentionFollowUp") { box.innerHTML = status + viewRetention(state); return; }
  if (state.status === "CollectingInformation") { box.innerHTML = status + viewDates(state); return; }
  if (state.status === "DatesConfirmed") { box.innerHTML = status + viewWaiting(state); return; }
  if (state.status === "ClearanceInProgress" || state.status === "ClearanceReturned") {
    box.innerHTML = status + viewStage(state); return;
  }
  if (state.status === "ClearanceComplete" || state.status === "SettlementInProgress") {
    box.innerHTML = status + viewSettlement(state); return;
  }
  if (state.status === "DocumentsIssuing") { box.innerHTML = status + viewDocuments(state); return; }
  if (state.status === "SubscriptionCheck") { box.innerHTML = status + viewSubs(state); return; }
  box.innerHTML = status + viewClosed(state);
}

function viewSubmit(state) {
  return "<h2>1. Submit resignation</h2>" +
    "<div class=\"form-grid\">" +
    field("employeeName", "Employee name", "text", state.employeeName) +
    field("employeeId", "Employee code", "text", state.employeeId) +
    field("jobTitle", "Job title", "text", state.jobTitle) +
    field("division", "Division", "text", state.division) +
    field("department", "Department", "text", state.department) +
    field("joiningDate", "Joining date", "date", state.joiningDate) +
    field("managerName", "Direct manager", "text", state.managerName) +
    field("managerTitle", "Manager job title", "text", state.managerTitle) +
    field("employeeEmail", "Employee email", "email", state.employeeEmail) +
    field("managerEmail", "Manager email", "email", state.managerEmail) +
    field("hrEmail", "HR mailbox", "email", state.hrEmail) +
    "<label class=\"field span-2\">Resignation letter<input id=\"letter\" type=\"file\"></label></div>" +
    "<div class=\"actions\"><button class=\"btn\" id=\"useDemoLetter\">Use demo letter</button>" +
    "<button class=\"btn\" id=\"submitResignation\">Submit</button></div>";
}

function viewManager(state) {
  return needRole(state, "managerReview", "Direct manager") +
    "<h2>2. Manager review</h2><p>Acknowledge the resignation, then retain or proceed.</p>" +
    field("retentionNotes", "Notes", "textarea", state.retentionNotes) +
    "<div class=\"actions\"><button class=\"btn btn-secondary\" id=\"chooseRetain\">Retain</button>" +
    "<button class=\"btn\" id=\"chooseProceed\">Proceed to offboarding</button></div>";
}
