function isWeekend(date) {
  const day = date.getDay();
  return day === 5 || day === 6;
}

function parseDate(value) {
  if (!value) return null;
  const parts = value.split("-").map(Number);
  return new Date(parts[0], parts[1] - 1, parts[2]);
}

function formatDate(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return y + "-" + m + "-" + d;
}

function addDays(date, count) {
  const next = new Date(date.getTime());
  next.setDate(next.getDate() + count);
  return next;
}

function workingDaysUntil(from, to) {
  let cursor = new Date(from.getFullYear(), from.getMonth(), from.getDate());
  const end = new Date(to.getFullYear(), to.getMonth(), to.getDate());
  let count = 0;
  while (cursor < end) {
    cursor = addDays(cursor, 1);
    if (!isWeekend(cursor)) count += 1;
  }
  return count;
}

function addWorkingDays(from, days) {
  let cursor = new Date(from.getTime());
  let left = days;
  while (left > 0) {
    cursor = addDays(cursor, 1);
    if (!isWeekend(cursor)) left -= 1;
  }
  return cursor;
}

function subtractWorkingDays(from, days) {
  let cursor = new Date(from.getTime());
  let left = days;
  while (left > 0) {
    cursor = addDays(cursor, -1);
    if (!isWeekend(cursor)) left -= 1;
  }
  return cursor;
}

function scheduledLaunchDate(state) {
  const lawd = parseDate(state.lastActualWorkingDate);
  if (!lawd) return null;
  return subtractWorkingDays(lawd, 5);
}

function daysUntilLawd(state) {
  const lawd = parseDate(state.lastActualWorkingDate);
  if (!lawd) return null;
  const today = new Date();
  return workingDaysUntil(today, lawd);
}

function roleCanAct(state, action) {
  const role = state.currentRole;
  if (action === "reports") return true;
  if (state.status === "Closed" || state.status === "RetainedClosed") return false;
  if (action === "submit") return role === "employee" || role === "hrOfficer";
  if (action === "managerReview") return role === "manager" || role === "hrOfficer";
  if (action === "dates") return role === "hrOfficer";
  if (action === "launchEos") return role === "hrOfficer";
  if (action === "stage") {
    const stage = currentStage(state);
    return Boolean(stage && role === stage.ownerRole);
  }
  if (action === "returnStage") {
    return ["hrOfficer", "manager", "it", "infosec", "finance", "hrAdmin", "hrDirector"].indexOf(role) >= 0;
  }
  if (action === "settlementHr") return role === "hrOfficer";
  if (action === "settlementFinance") return role === "finance";
  if (action === "documents") return role === "hrOfficer";
  if (action === "subscriptions") return role === "hrOfficer" || role === "it";
  if (action === "close") return role === "hrOfficer" || role === "hrDirector";
  if (action === "interview") return role === "employee";
  return false;
}

function launchEos(state, reason) {
  state.eosLaunched = true;
  state.stages[0].status = "Pending";
  seedStage(state, state.stages[0]);
  state.status = "ClearanceInProgress";
  logAction(state, "EOS launched", reason);
  mailHrLawd(state);
  mailStageOwner(state, state.stages[0]);
}

function runTMinus5(state, reason) {
  if (!state.exitInterviewSent) mailInterviewRequest(state);
  if (!state.eosLaunched) launchEos(state, reason);
}

function confirmDates(state) {
  const days = daysUntilLawd(state);
  state.status = "DatesConfirmed";
  logAction(state, "Dates confirmed", "LAWD " + state.lastActualWorkingDate + " — exit interview scheduled for T−5");
  if (days !== null && days <= 5) {
    state.lateStart = days < 5;
    runTMinus5(state, days < 5 ? "Late start: fewer than 5 working days to LAWD" : "T−5 reached on confirm");
  }
}

function completeCurrentStage(state) {
  const stage = currentStage(state);
  if (!stage) return "No pending stage.";
  const missing = missingStageFields(stage);
  if (missing.length) return "Required: " + missing[0];
  if (!roleCanAct(state, "stage")) return "Wrong role for this stage.";
  stage.status = "Complete";
  stage.signedOffBy = state.currentRole;
  stage.signedOffAt = new Date().toISOString();
  const next = state.stages.find((s) => s.number === stage.number + 1);
  if (next) {
    next.status = "Pending";
    seedStage(state, next);
    state.status = "ClearanceInProgress";
    logAction(state, "Stage " + stage.number + " signed off", next.name + " is now pending");
    mailStageOwner(state, next);
  } else {
    state.status = "ClearanceComplete";
    logAction(state, "Stage 7 signed off", "Clearance gate passed");
    sendMail(state, hrMail(state), mgrMail(state), "Clearance complete — settlement unlocked for " + state.employeeName,
      "All seven EOS stages are complete. HR and Finance may process final settlement.\nLinked deductions: " + financeTotal(state) + " JOD.");
  }
  return "";
}
