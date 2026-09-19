window.SLIDES = window.SLIDES || [];
window.SLIDES.push(
  {
    nav: "1. HR Initiation",
    kicker: "Owner · HR Officer",
    title: "1. Offboarding Initiation",
    html: stageHtml({
      trigger: "HR receives the handwritten signed resignation letter. Employee does not submit digitally.",
      readOnly: ["Employee Name, ID, Job Title, Division, Department, Direct Manager, Joining Date from profile", "Employment Type and Work Location if available"],
      fields: [
        ["Resignation Date", "HR", "Mandatory", ""],
        ["Separation Type", "HR", "Mandatory", "Resignation / Termination / Retirement / End of Contract / Other"],
        ["Separation Reason", "HR", "Conditional", "If applicable"],
        ["Signed Resignation Letter", "HR", "Mandatory", "Attachment"],
        ["HR Comments", "HR", "Optional", ""],
        ["Offboarding Case ID, Initiated By, Date, Time, Status", "System", "Generated", ""]
      ],
      system: ["Create unique case and audit trail", "Status = Awaiting Direct Manager Decision", "Assign Direct Manager"],
      email: "To Direct Manager · Offboarding Action Required – [Employee Name] · name, resignation date, case link, letter is in the case",
      next: "Direct Manager Decision"
    })
  },
  {
    nav: "2. Manager decision",
    kicker: "Owner · Direct Manager",
    title: "2. Direct Manager Decision",
    html: stageHtml({
      trigger: "HR submits the offboarding case.",
      readOnly: ["Employee details", "Resignation Date", "Separation Type", "Signed Resignation Letter"],
      fields: [
        ["Decision", "Manager", "Mandatory", "Retain or Proceed to Offboarding only"],
        ["Retention Comments / Follow-up Required / Outcome", "Manager", "If Retain", "Outcome: Employee Retained or Proceed with Offboarding"],
        ["Handover Required?", "Manager", "If Proceed", "Yes / No"],
        ["Handover Recipient, Tasks, Deadline", "Manager", "If handover Yes", "All mandatory"],
        ["Handover Comments", "Manager", "Optional", ""]
      ],
      system: ["Retain → status Retention in Progress, pause offboarding, notify HR", "Retention success → close as Retained", "Retention fail → same case continues to HR Date Confirmation", "Proceed → record name/date/time, assign HR Officer, status Awaiting HR Date Confirmation"],
      email: "Retain: Retention Follow-up Required – [Employee Name] to HR · Proceed: Offboarding Ready for Date Confirmation – [Employee Name] to HR",
      next: "HR Date Confirmation, or closed Retained"
    })
  },
  {
    nav: "3. Date confirmation",
    kicker: "Owner · HR Officer",
    title: "3. Information Collection and Date Confirmation",
    html: stageHtml({
      trigger: "Manager Proceed, or retention attempt fails.",
      readOnly: ["Employee information, Joining Date, Resignation Date", "Manager Decision and handover fields"],
      fields: [
        ["Notice Period / Start / Approved Leave / Working Days", "HR", "If required", ""],
        ["Last Actual Working Date", "HR", "Mandatory", "This is T"],
        ["Last Contractual Date", "HR", "Mandatory", ""],
        ["Special Arrangement? / Details", "HR", "Conditional", "Details if Yes"],
        ["HR Comments", "HR", "Optional", ""]
      ],
      system: ["Save dates", "Schedule T−5 Exit Interview and T−1 EOS launch", "If LAWD changes before a trigger fires, recalculate pending actions and notifications", "Status = Scheduled / Offboarding in Progress"],
      email: "To Direct Manager · Offboarding Dates Confirmed – [Employee Name] · include LAWD and handover deadline if any",
      next: "Automatic T−5 then T−1. No HR manual launch."
    })
  },
  {
    nav: "4. Exit interview",
    kicker: "Owner · Employee · automatic T−5",
    title: "4. Exit Interview",
    html: stageHtml({
      trigger: "Automatically 5 days before Last Actual Working Date. No HR manual launch.",
      readOnly: ["Name, Code, Job Title, Department, Division, Direct Manager", "Joining Date, Length of Service, Resignation Date, LAWD, LCD, Separation Type"],
      fields: [
        ["Main Reason for Leaving", "Employee", "Mandatory", "Higher Compensation, Better Benefits, New Career/Field/Industry, Education, Relocation, Career Advancement, Personal/Family, Management Dissatisfaction, Other"],
        ["Other Reason / Additional Comments", "Employee", "Conditional", "If Other"],
        ["Growth at Fibertech", "Employee", "Mandatory", "Yes definitely / Yes possibly / No + explanation"],
        ["Job and Role ratings + comments", "Employee", "Mandatory", "Scope, Workload, Challenge, Routine, Innovation, Learning, Resources — use paper-form option sets"],
        ["Direct Management ratings + comments", "Employee", "Mandatory", "Expertise, Delegation, Guidance, Coaching, Problem Solving"],
        ["Culture / Environment / Benefits ratings", "Employee", "Mandatory", "See paper form for Excellent–Poor and similar scales"],
        ["Stay at Fibertech?", "Employee", "Mandatory", "Yes / Subject to conditions / No + conditions or reason"],
        ["Top Positive / Negative points", "Employee", "Mandatory", "1 to 3 each"],
        ["Employee Acknowledgement", "Employee", "Mandatory", ""],
        ["Submission Date", "System", "Generated", ""]
      ],
      system: ["Create interview, send secure link, status Sent/Pending", "Remind if pending, notify HR when completed, store for analytics", "Does not block EOS. If still incomplete at T−1, EOS still starts"],
      email: "T−5 to employee: Exit Interview – [Employee Name] · reminder: Reminder: Exit Interview Still Outstanding · on complete to HR: Exit Interview Completed – [Employee Name]",
      next: "T−1 EOS Clearance Launch, even if interview is still pending"
    })
  }
);
function stageHtml(s) {
  return `
    <div class="grid">
      <div class="card"><h3>Trigger</h3><p>${s.trigger}</p></div>
      <div class="card"><h3>Next</h3><p>${s.next}</p></div>
    </div>
    <div class="card" style="margin-top:12px"><h3>Read-only</h3><ul>${s.readOnly.map((x) => `<li>${x}</li>`).join("")}</ul></div>
    <table><thead><tr><th>Field</th><th>Who</th><th>Rule</th><th>Notes</th></tr></thead><tbody>
      ${s.fields.map((r) => `<tr><td>${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td><td>${r[3]}</td></tr>`).join("")}
    </tbody></table>
    <div class="card"><h3>System action</h3><ul>${s.system.map((x) => `<li>${x}</li>`).join("")}</ul></div>
    <div class="card" style="margin-top:12px"><h3>Email / notification</h3><p>${s.email}</p></div>`;
}
window.stageHtml = stageHtml;
