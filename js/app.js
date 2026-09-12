let state = loadState();

function paint() {
  const select = document.getElementById("roleSelect");
  if (!select.options.length) {
    ROLES.forEach((role) => {
      const opt = document.createElement("option");
      opt.value = role.id;
      opt.textContent = role.label;
      select.appendChild(opt);
    });
  }
  select.value = state.currentRole;
  renderTimeline(state);
  renderMain(state);
  renderAudit(state);
  saveState(state);
}

function fail(message) {
  state.lastError = message;
  paint();
}

function read(id) {
  const el = document.getElementById(id);
  if (!el) return "";
  if (el.type === "checkbox") return el.checked;
  return el.value.trim();
}

function bind() {
  document.getElementById("roleSelect").addEventListener("change", (e) => {
    state.currentRole = e.target.value;
    paint();
  });
  document.getElementById("resetBtn").addEventListener("click", () => {
    if (window.confirm("Clear this test case?")) {
      state = resetState();
      paint();
    }
  });
  document.addEventListener("click", onMainClick);
  document.getElementById("mainPanel").addEventListener("change", onMainChange);
}

function onMainClick(e) {
  const id = e.target.id;
  if (!id) return;
  state.lastError = "";
  if (id === "useDemoLetter") {
    state.letterName = "demo-resignation.pdf";
    logAction(state, "Demo letter attached", state.letterName);
    paint();
  }
  if (id === "submitResignation") submitResignation();
  if (id === "chooseRetain") {
    if (!roleCanAct(state, "managerReview")) return fail("Switch to Direct manager.");
    state.retentionDecision = "Retain";
    state.retentionNotes = read("retentionNotes");
    state.status = "RetentionFollowUp";
    logAction(state, "Manager chose retain", state.retentionNotes);
    paint();
  }
  if (id === "chooseProceed") {
    if (!roleCanAct(state, "managerReview")) return fail("Switch to Direct manager.");
    state.retentionDecision = "Proceed";
    state.retentionNotes = read("retentionNotes");
    state.status = "CollectingInformation";
    logAction(state, "Manager chose proceed", state.retentionNotes);
    paint();
  }
  if (id === "retainedYes") {
    state.status = "RetainedClosed";
    logAction(state, "Employee retained", read("retentionNotes"));
    paint();
  }
  if (id === "retainedNo") {
    state.status = "CollectingInformation";
    logAction(state, "Retention failed — continue", read("retentionNotes"));
    paint();
  }
  if (id === "demoDates") {
    const lawd = addWorkingDays(new Date(), 10);
    const lcd = addDays(lawd, 8);
    state.lastActualWorkingDate = formatDate(lawd);
    state.lastContractualDate = formatDate(lcd);
    state.handoverRequired = false;
    paint();
  }
  if (id === "confirmDates") confirmDateForm();
  if (id === "navEmails" || id === "openInterview" || id === "openInterviewForm") {
    state.page = "emails";
    paint();
  }
  if (id === "navReports") {
    state.page = "reports";
    paint();
  }
  if (id === "navCase") {
    state.page = "case";
    paint();
  }
  if (id === "resendInterview") {
    if (!state.lastActualWorkingDate) return fail("Confirm dates first.");
    mailInterviewRequest(state, true);
    paint();
  }
  if (id === "remindInterview") {
    if (!state.exitInterviewSent) return fail("The interview email goes out at T−5. Simulate T−5 first, or wait until that date.");
    if (state.exitInterviewDone) return fail("Interview already completed in appraisal.");
    mailInterviewReminder(state);
    paint();
  }
  if (id === "remindHrLawd") {
    if (!state.lastActualWorkingDate) return fail("Confirm dates first.");
    mailHrLawd(state);
    paint();
  }
  if (id === "importAppraisal") markAppraisalComplete();
  if (id === "launchEos") {
    if (!roleCanAct(state, "launchEos")) return fail("Switch to HR Officer.");
    runTMinus5(state, "Simulated T−5");
    state.page = "case";
    paint();
  }
  if (id === "sendT1") {
    state.tMinus1Sent = true;
    mailT1(state);
    paint();
  }
  if (id === "fillStage") {
    const stage = currentStage(state);
    if (stage) fillDemoStage(stage);
    paint();
  }
  if (id === "signStage") {
    collectStageAnswers();
    const msg = completeCurrentStage(state);
    if (msg) return fail(msg);
    paint();
  }
  if (id === "returnStage") handleReturn();
  if (id === "signSettlement") handleSettlement();
  if (id === "nextDocuments") {
    if (!(state.settlementHr && state.settlementFinance)) return fail("HR and Finance must both sign.");
    state.status = "DocumentsIssuing";
    logAction(state, "Settlement processed", "");
    paint();
  }
  if (id === "issueDocs") {
    if (!roleCanAct(state, "documents")) return fail("Switch to HR Officer.");
    state.documentsIssued = true;
    state.status = "SubscriptionCheck";
    logAction(state, "Experience letter issued", "");
    paint();
  }
  if (id === "subsPending") handleSubs(false);
  if (id === "subsOk") handleSubs(true);
}

function onMainChange(e) {
  if (e.target.id === "letter" && e.target.files[0]) {
    state.letterName = e.target.files[0].name;
  }
  if (e.target.dataset.reason) {
    state.interview.reasons[e.target.dataset.reason] = e.target.checked;
  }
  if (e.target.dataset.rating) {
    state.interview.ratings[e.target.dataset.rating] = e.target.value;
  }
  if (e.target.id && e.target.id.indexOf("f_") === 0) collectStageAnswers();
}

bind();
paint();
