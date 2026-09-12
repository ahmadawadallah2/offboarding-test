function submitResignation() {
  state.employeeName = read("employeeName") || state.employeeName;
  state.employeeId = read("employeeId") || state.employeeId;
  state.jobTitle = read("jobTitle") || state.jobTitle;
  state.division = read("division") || state.division;
  state.department = read("department") || state.department;
  state.joiningDate = read("joiningDate") || state.joiningDate;
  state.managerName = read("managerName") || state.managerName;
  state.managerTitle = read("managerTitle") || state.managerTitle;
  state.employeeEmail = read("employeeEmail") || state.employeeEmail;
  state.managerEmail = read("managerEmail") || state.managerEmail;
  state.hrEmail = read("hrEmail") || state.hrEmail;
  if (!state.letterName) return fail("Attach a resignation letter (or use the demo letter).");
  state.caseId = "OFF-" + Date.now();
  state.status = "PendingManagerReview";
  logAction(state, "Resignation submitted", state.letterName);
  sendMail(
    state,
    state.managerEmail,
    state.hrEmail,
    "Resignation received: " + state.employeeName,
    state.employeeName + " (" + state.employeeId + ") submitted a resignation letter (" + state.letterName +
      "). Please review in the offboarding case: retain or proceed."
  );
  paint();
}

function confirmDateForm() {
  if (!roleCanAct(state, "dates")) return fail("Switch to HR Officer.");
  state.noticePeriodDays = Number(read("noticePeriodDays"));
  state.workingDaysRemaining = Number(read("workingDaysRemaining"));
  state.approvedLeaveDays = Number(read("approvedLeaveDays"));
  state.lastActualWorkingDate = read("lastActualWorkingDate");
  state.lastContractualDate = read("lastContractualDate");
  state.handoverRequired = Boolean(document.getElementById("handoverRequired").checked);
  state.handoverRecipient = read("handoverRecipient");
  state.handoverTasks = read("handoverTasks");
  state.handoverDeadline = read("handoverDeadline");
  if (!state.lastActualWorkingDate || !state.lastContractualDate) return fail("LAWD and LCD are required.");
  if (state.handoverRequired && (!state.handoverRecipient || !state.handoverDeadline || !state.handoverTasks)) {
    return fail("Handover needs recipient, tasks, and deadline.");
  }
  confirmDates(state);
  paint();
}

function handleReturn() {
  const stage = currentStage(state);
  const reason = read("returnReason");
  if (!stage) return fail("No pending stage.");
  if (!reason) return fail("Return reason is required.");
  stage.status = "Returned";
  stage.returnedReason = reason;
  state.status = "ClearanceReturned";
  logAction(state, "Stage " + stage.number + " returned", reason);
  sendMail(state, hrMail(state), "", "EOS stage returned — " + state.employeeName,
    "Stage " + stage.number + " was returned. Reason: " + reason);
  paint();
}

function handleSettlement() {
  if (state.currentRole === "hrOfficer") state.settlementHr = true;
  else if (state.currentRole === "finance") state.settlementFinance = true;
  else return fail("Switch to HR Officer or Finance.");
  state.status = "SettlementInProgress";
  logAction(state, "Settlement signed", state.currentRole);
  paint();
}

function handleSubs(pass) {
  if (!roleCanAct(state, "subscriptions")) return fail("Switch to HR Officer or IT.");
  if (!pass) {
    state.subscriptionOk = false;
    const stage = state.stages[1];
    stage.status = "Returned";
    stage.returnedReason = read("subNotes") || "Subscription still open";
    state.status = "ClearanceReturned";
    logAction(state, "Subscription pending", stage.returnedReason);
    paint();
    return;
  }
  if (!(state.currentRole === "hrOfficer" || state.currentRole === "hrDirector")) {
    return fail("HR Officer or HR Director must close the case.");
  }
  state.subscriptionOk = true;
  state.status = "Closed";
  logAction(state, "Case archived and closed", "");
  sendMail(state, hrMail(state), mgrMail(state), "Offboarding closed: " + state.employeeName,
    "The offboarding case is archived. Interview in appraisal: " + (state.exitInterviewDone ? "completed" : "not received") + ".");
  paint();
}

function markAppraisalComplete() {
  fillDemoInterview(state.interview);
  state.exitInterviewDone = true;
  sendMail(state, hrMail(state), mgrMail(state), "Exit interview completed in Performance Appraisal",
    state.employeeName + " submitted the exit interview in the appraisal system. Answers were imported for HR reporting.");
  logAction(state, "Appraisal webhook", "Interview completed and imported");
  state.page = "reports";
  paint();
}

function collectStageAnswers() {
  const stage = currentStage(state);
  if (!stage) return;
  STAGE_DEFS[stage.number - 1].fields.forEach((f) => {
    const el = document.getElementById("f_" + f.id);
    if (!el) return;
    stage.answers[f.id] = el.type === "checkbox" ? el.checked : el.value.trim();
  });
  stage.comments = read("stageComments");
}

