window.SLIDES = window.SLIDES || [];
window.SLIDES.push(
  {
    nav: "Carry-forward",
    kicker: "Label: Related Clearance Information",
    title: "Data must not be re-entered",
    html: `
      <table><thead><tr><th>Entered by</th><th>Shown read-only to</th></tr></thead><tbody>
        <tr><td>DM: mobile line decision</td><td>IT, HR Officer, HR Director</td></tr>
        <tr><td>DM: department systems / who deactivated</td><td>IT, Information Security</td></tr>
        <tr><td>DM: missing/damaged department assets</td><td>IT, Finance</td></tr>
        <tr><td>IT: access + deactivation dates</td><td>Information Security</td></tr>
        <tr><td>IT: damaged/missing IT assets + cost</td><td>Finance</td></tr>
        <tr><td>InfoSec: remaining access / security concern</td><td>HR / HR Director as exceptions</td></tr>
        <tr><td>Finance: deductions, entitlements, asset money</td><td>HR Officer, HR Director</td></tr>
        <tr><td>HR Officer: SIM, insurance, HR money items</td><td>HR Director summary</td></tr>
      </tbody></table>`
  },
  {
    nav: "Emails",
    kicker: "Exact subjects from the brief",
    title: "Email trigger matrix",
    html: `
      <table><thead><tr><th>When</th><th>To</th><th>Subject</th></tr></thead><tbody>
        <tr><td>HR initiates</td><td>Direct Manager</td><td>Offboarding Action Required – [Employee Name]</td></tr>
        <tr><td>Manager Retain</td><td>HR</td><td>Retention Follow-up Required – [Employee Name]</td></tr>
        <tr><td>Manager Proceed</td><td>HR</td><td>Offboarding Ready for Date Confirmation – [Employee Name]</td></tr>
        <tr><td>HR confirms dates</td><td>Direct Manager</td><td>Offboarding Dates Confirmed – [Employee Name]</td></tr>
        <tr><td>T−5</td><td>Employee</td><td>Exit Interview – [Employee Name]</td></tr>
        <tr><td>Interview pending</td><td>Employee</td><td>Reminder: Exit Interview Still Outstanding</td></tr>
        <tr><td>Interview completed</td><td>HR</td><td>Exit Interview Completed – [Employee Name]</td></tr>
        <tr><td>1 day before expected EOS action</td><td>That owner</td><td>Upcoming EOS Clearance – [Employee Name]</td></tr>
        <tr><td>EOS stage becomes active</td><td>Current owner</td><td>EOS Clearance Action Required – [Employee Name]</td></tr>
        <tr><td>Stage overdue</td><td>Current owner only</td><td>Reminder: EOS Clearance Action Outstanding – [Employee Name]</td></tr>
        <tr><td>InfoSec needs HR follow-up</td><td>HR</td><td>Offboarding Exception Raised – [Employee Name]</td></tr>
      </tbody></table>`
  },
  {
    nav: "Permissions",
    kicker: "Edit only assigned fields",
    title: "Permissions, audit, statuses",
    html: `
      <div class="grid">
        <div class="card"><h3>Permissions</h3><ul>
          <li>HR: end-to-end visibility</li>
          <li>Others: see own stage + relevant prior data as read-only</li>
          <li>Cannot edit another department’s submitted section</li>
          <li>HR Director sees the complete case</li>
        </ul></div>
        <div class="card"><h3>Audit every</h3><ul>
          <li>User, role, action, date, time</li>
          <li>Status change, comments, attachments</li>
          <li>Notifications sent, stage completion</li>
        </ul></div>
      </div>
      <div class="card" style="margin-top:12px"><h3>Suggested statuses</h3>
      <p>Awaiting Direct Manager Decision · Retention in Progress · Awaiting HR Date Confirmation · Scheduled · Exit Interview Pending / Completed · EOS Clearance In Progress · Pending with [current owner] · Completed / Closed</p>
      <p>Prefer Current Stage + Current Owner instead of extra statuses.</p></div>`
  },
  {
    nav: "TBC",
    kicker: "Do not invent business rules",
    title: "Open technical decisions",
    html: `
      <table><thead><tr><th>Item</th><th>Why it is open</th></tr></thead><tbody>
        <tr><td>Working days vs calendar days</td><td>Brief says T−5 / T−1 / one day. Prototype used Sun–Thu working days.</td></tr>
        <tr><td>Expected EOS date per owner</td><td>Prep email needs “tomorrow”, but stages after DM are sequential.</td></tr>
        <tr><td>Escalation</td><td>Brief says timing and recipients TBC with IT/HR.</td></tr>
        <tr><td>If fewer than 5 days remain at date confirm</td><td>Not defined. Prototype sent interview immediately. Label TBC.</td></tr>
        <tr><td>Secure interview link / identity</td><td>Not defined.</td></tr>
        <tr><td>ZenHR / payment / cheque integration</td><td>HR Director records them. API vs manual TBC.</td></tr>
        <tr><td>Case ID format, attachment store, EN/AR UI</td><td>Not defined. Paper forms are bilingual.</td></tr>
        <tr><td>Completion email after HR Director</td><td>Not defined. Do not add one unless confirmed.</td></tr>
        <tr><td>What makes an exception blocking</td><td>Complete Offboarding needs “no blocking exceptions”. Criteria TBC.</td></tr>
      </tbody></table>`
  }
);
