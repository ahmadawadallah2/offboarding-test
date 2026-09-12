function empMail(state) {
  return state.employeeEmail || "sara.ahmad@fibertech.com";
}

function hrMail(state) {
  return state.hrEmail || "hr@fibertech.com";
}

function mgrMail(state) {
  return state.managerEmail || "omar.khalil@fibertech.com";
}

function sendMail(state, to, cc, subject, body) {
  if (!state.emails) state.emails = [];
  state.emails.unshift({
    at: new Date().toISOString(),
    to: to,
    cc: cc || "",
    subject: subject,
    body: body,
    actor: state.currentRole || "system"
  });
  logAction(state, "Email sent", subject + " → " + to);
}

function mailInterviewRequest(state, force) {
  if (state.exitInterviewSent && !force) return;
  const link = "https://appraisal.fibertech.local/exit-interview/" + (state.employeeId || "");
  sendMail(
    state,
    empMail(state),
    hrMail(state),
    "Please complete your FiberTech exit interview",
    "Dear " + state.employeeName + ",\n\nPlease fill the official Exit Interview Form in the Performance Appraisal system before your last actual working day (" +
      state.lastActualWorkingDate + ").\n\nOpen the form:\n" + link +
      "\n\nThis offboarding system does not host the form. HR is copied.\n\nHR & Corporate Affairs"
  );
  state.exitInterviewSent = true;
}

function mailInterviewReminder(state) {
  sendMail(
    state,
    empMail(state),
    hrMail(state),
    "Reminder: exit interview still outstanding",
    "Dear " + state.employeeName + ",\n\nWe have not yet received your exit interview in the Performance Appraisal system. Last actual working day: " +
      state.lastActualWorkingDate + ".\n\nPlease complete it as soon as you can.\n\nHR & Corporate Affairs"
  );
}

function mailHrLawd(state) {
  sendMail(
    state,
    hrMail(state),
    mgrMail(state),
    "T−5: " + state.employeeName + " last working day in 5 days",
    "HR team,\n\n" + state.employeeName + " (" + state.employeeId + ") last actual working day is " +
      state.lastActualWorkingDate + " (5 working days).\n\nEOS clearance should start now. Manager: " +
      state.managerName + ".\n\nOpen the offboarding case to assign Stage 1."
  );
}

function mailStageOwner(state, stage) {
  const def = STAGE_DEFS[stage.number - 1];
  sendMail(
    state,
    def.ownerRole + "@fibertech.com",
    hrMail(state),
    "EOS clearance — Stage " + stage.number + " pending (" + def.name + ")",
    "You are the owner of Stage " + stage.number + " — " + def.name +
      " for " + state.employeeName + ".\n\nPlease complete the FiberTech EOS Clearance Form section in the offboarding case.\nLAWD: " +
      state.lastActualWorkingDate + "."
  );
}

function mailT1(state) {
  sendMail(
    state,
    hrMail(state),
    mgrMail(state),
    "T−1 reminder: open offboarding tasks for " + state.employeeName,
    "Last actual working day is tomorrow (" + state.lastActualWorkingDate +
      "). Please close open EOS clearance, access, asset, and subscription tasks.\nInterview in appraisal: " +
      (state.exitInterviewDone ? "completed" : "still outstanding") + "."
  );
}

function viewEmails(state) {
  const list = (state.emails || []).map((m, i) => {
    return "<article class=\"mail" + (i === 0 ? " mail-new" : "") + "\">" +
      "<p class=\"mail-meta\">To " + esc(m.to) + (m.cc ? " · Cc " + esc(m.cc) : "") +
      "<br>" + esc(m.at.replace("T", " ").slice(0, 19)) + "</p>" +
      "<h3>" + esc(m.subject) + "</h3>" +
      "<pre class=\"mail-body\">" + esc(m.body) + "</pre></article>";
  }).join("");
  return "<h2>Email outbox</h2>" +
    "<p class=\"muted\">This test env logs mail the live system will send via your mail server. Exit interview stays in Performance Appraisal — this app only notifies.</p>" +
    "<div class=\"meta\"><p>Employee: " + esc(empMail(state)) + "</p><p>HR: " + esc(hrMail(state)) + "</p>" +
    "<p>Interview: <strong>" + (state.exitInterviewDone ? "completed in appraisal" : state.exitInterviewSent ? "email sent at T−5 — waiting on appraisal" : "scheduled for T−5 (not sent yet)") +
    "</strong></p></div>" +
    "<div class=\"actions\">" +
    "<button class=\"btn\" id=\"resendInterview\">Resend interview email</button>" +
    "<button class=\"btn btn-secondary\" id=\"remindInterview\">Remind employee</button>" +
    "<button class=\"btn btn-secondary\" id=\"remindHrLawd\">Remind HR (LAWD in 5 days)</button>" +
    "<button class=\"btn\" id=\"importAppraisal\">Simulate appraisal completed (webhook)</button>" +
    "</div>" + (list || "<p class=\"muted\">No emails yet. Submit a resignation or wait for T−5.</p>");
}
