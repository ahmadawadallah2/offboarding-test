window.SLIDES = window.SLIDES || [];
window.SLIDES.push(
  {
    nav: "Cover",
    kicker: "Fibertech HR · IT implementation brief",
    title: "Employee Offboarding Automation",
    html: `
      <p>Functional requirements for developers. Prototype is a click-through reference only.</p>
      <div class="grid">
        <div class="card"><h3>Follow this brief</h3><p>Written requirements win when they conflict with the prototype.</p></div>
        <div class="card"><h3>Live prototype</h3><p><a href="https://ahmadawadallah2.github.io/offboarding-test/">ahmadawadallah2.github.io/offboarding-test</a></p></div>
        <div class="card"><h3>Paper forms</h3><p>EOS Clearance Form 2025 and Exit Interview Form supply field wording and options.</p></div>
        <div class="card"><h3>Workflow end</h3><p>The automated workflow ends at <b>HR Director</b>. No settlement, exit-documents, or closure stages after that.</p></div>
      </div>
      <p class="kicker" style="margin-top:18px">Master sequence</p>
      <div class="flow">
        <span>HR Initiation</span><i>→</i><span>Manager decision</span><i>→</i><span>HR dates</span><i>→</i>
        <span>T−5 interview</span><i>→</i><span>T−1 EOS</span><i>→</i>
        <span>DM</span><i>→</i><span>IT</span><i>→</i><span>InfoSec</span><i>→</i>
        <span>Finance</span><i>→</i><span>HR Admin</span><i>→</i><span>HR Officer</span><i>→</i>
        <span>HR Director</span>
      </div>`
  },
  {
    nav: "Rules",
    kicker: "Do not invent extra stages",
    title: "Hard business rules",
    html: `
      <table><thead><tr><th>#</th><th>Rule</th></tr></thead><tbody>
        <tr><td>1</td><td>Resignation is handwritten and signed. Employee does not submit digitally. HR initiates.</td></tr>
        <tr><td>2</td><td>Manager chooses only <b>Retain</b> or <b>Proceed to Offboarding</b>. No approve/reject.</td></tr>
        <tr><td>3</td><td>Last Actual Working Date is T. T−5 = Exit Interview. T−1 = EOS launch.</td></tr>
        <tr><td>4</td><td>Exit Interview does not block EOS.</td></tr>
        <tr><td>5</td><td>EOS order is fixed: DM → IT → InfoSec → Finance → HR Admin → HR Officer → HR Director.</td></tr>
        <tr><td>6</td><td>Prior-stage answers show as read-only <b>Related Clearance Information</b>.</td></tr>
        <tr><td>7</td><td>Prep email one day before expected action. Separate Action Required email when the stage unlocks.</td></tr>
        <tr><td>8</td><td>HR Director is final: payment, ZenHR deactivate, Complete Offboarding. No later workflow stages.</td></tr>
      </tbody></table>
      <div class="note"><b>To Be Confirmed:</b> whether T−5 / T−1 / prep “one day” use working days or calendar days. Prototype used working days Sunday–Thursday. Do not assume that until IT/HR confirm.</div>`
  },
  {
    nav: "Prototype vs spec",
    kicker: "Do not copy these prototype behaviours",
    title: "Where the prototype is wrong",
    html: `
      <table><thead><tr><th>Prototype</th><th>Build this instead</th></tr></thead><tbody>
        <tr><td>Employee submits resignation in the app</td><td>HR Officer creates the case after receiving the signed letter</td></tr>
        <tr><td>Interview is only an external appraisal email</td><td>System creates Exit Interview at T−5 with a secure employee link</td></tr>
        <tr><td>Stages after HR Director: settlement, documents, subscriptions, archive</td><td>Stop at HR Director Complete Offboarding</td></tr>
        <tr><td>HR can simulate T−5 / launch EOS</td><td>T−5 and T−1 fire automatically. No HR manual launch</td></tr>
        <tr><td>No EOS prep email</td><td>Upcoming EOS Clearance email one day before expected action, stage stays locked</td></tr>
      </tbody></table>`
  },
  {
    nav: "Case header",
    kicker: "Visible on every screen",
    title: "Case-level fields",
    html: `
      <table><thead><tr><th>Field</th><th>Source</th></tr></thead><tbody>
        <tr><td>Offboarding Case ID</td><td>System</td></tr>
        <tr><td>Employee ID, Name, Job Title, Department, Direct Manager</td><td>Profile / case</td></tr>
        <tr><td>Last Actual Working Date</td><td>HR confirmed</td></tr>
        <tr><td>Current Stage, Current Owner, Overall Status, Days Remaining</td><td>System</td></tr>
        <tr><td>Created By/Date, Last Updated By/Date</td><td>System</td></tr>
        <tr><td>Open Exception Count, Attachments, Activity Log, Notification History, Audit Trail</td><td>System</td></tr>
      </tbody></table>`
  }
);
