window.SLIDES = window.SLIDES || [];
window.SLIDES.push(
  {
    nav: "5. EOS prep",
    kicker: "Does not unlock the stage",
    title: "EOS advance notification",
    html: `
      <p>Every EOS owner gets a heads-up <b>one day before they are expected to complete</b> their section: Direct Manager, IT, Information Security, Finance, HR Admin, HR Officer, HR Director.</p>
      <div class="grid">
        <div class="card"><h3>Prep email</h3><p>Subject: <b>Upcoming EOS Clearance – [Employee Name]</b></p><p>Tell them to prepare. Stage stays locked / read-only.</p></div>
        <div class="card"><h3>Action Required email</h3><p>Subject: <b>EOS Clearance Action Required – [Employee Name]</b></p><p>Sent when their section becomes active. They become Current Owner and can submit.</p></div>
      </div>
      <div class="note" style="margin-top:12px"><b>To Be Confirmed:</b> how “expected completion date” is set for owners after Direct Manager, because EOS is sequential. Do not invent a calendar for IT–HR Director. Escalation timing/recipients also TBC.</div>`
  },
  {
    nav: "6. EOS launch",
    kicker: "Automatic T−1",
    title: "EOS Clearance Launch",
    html: stageHtml({
      trigger: "Automatically one day before Last Actual Working Date. No HR manual launch.",
      readOnly: ["Employee Name, LAWD, Current Stage, Current Owner, Overall Status on dashboard"],
      fields: [["Seven-stage tracker", "System", "Created", "DM pending → IT → InfoSec → Finance → HR Admin → HR Officer → HR Director"]],
      system: ["Activate EOS", "Assign stage 1 to Direct Manager", "Status = EOS Clearance In Progress", "Current Owner = Direct Manager", "Send Action Required to Direct Manager"],
      email: "Action Required to Direct Manager. Prep emails must already have been handled per TBC expected dates.",
      next: "7. Direct Manager / Department Clearance"
    })
  },
  {
    nav: "7. Direct Manager",
    kicker: "EOS stage 1 · Direct Manager",
    title: "Direct Manager / Department Clearance",
    html: stageHtml({
      trigger: "EOS launched at T−1. Stage unlocked. Action Required email received.",
      readOnly: ["Employee Information", "Handover Required, Recipient, Tasks, Deadline, Comments from decision stage"],
      fields: [
        ["Handover Completed? / Outstanding items / Comments", "DM", "Mandatory", "Yes/No"],
        ["Email / Desktop / Other backup", "DM", "Mandatory", "Required/Completed + comments"],
        ["Company mobile line?", "DM", "Mandatory", "If Yes: number if available, Retained by Company or Released to Employee"],
        ["Department systems table", "DM", "Repeatable", "Name, Applicable, Removed Yes/No/N/A, Deactivated By DM/Admin/Other, Admin name, Request submitted, Request date, Comments"],
        ["Department assets table", "DM", "Repeatable", "Asset, Asset ID, Returned Yes/No/N/A, Condition Good/Damaged/Missing, Comments, Financial follow-up Yes/No"]
      ],
      system: ["Carry mobile, systems, assets, missing/damaged flags to IT, InfoSec, Finance, HR Officer", "Mark DM complete, assign IT, Action Required to IT"],
      email: "EOS Clearance Action Required – [Employee Name] to IT. Reminder only to current owner if overdue.",
      next: "IT Clearance"
    })
  },
  {
    nav: "8. IT",
    kicker: "EOS stage 2 · IT",
    title: "IT Clearance",
    html: stageHtml({
      trigger: "Direct Manager submits.",
      readOnly: ["Related Clearance Information from DM: mobile decision, department systems, access status, department assets, missing/damaged items"],
      fields: [
        ["IT / system access table", "IT", "Repeatable", "System/Account, Deactivated Yes/No/N/A, Date, Deactivated By, Comments"],
        ["Email account", "IT", "Mandatory", "Deactivated, date, shared with manager Yes/No/N/A, approved request, comments"],
        ["IT assets", "IT", "Mandatory", "Laptop/desktop, asset number, charger, bag, other equipment, condition, repair/replacement, estimated cost"]
      ],
      system: ["Missing/damaged IT assets flagged for Finance", "IT access carries to Information Security", "Assign InfoSec, Action Required email"],
      email: "Action Required to Information Security",
      next: "Information Security"
    })
  },
  {
    nav: "9. Information Security",
    kicker: "EOS stage 3 · Information Security",
    title: "Information Security Clearance",
    html: stageHtml({
      trigger: "IT submits.",
      readOnly: ["Combined DM + IT list: system name, access type, previous status, who deactivated, deactivation date"],
      fields: [
        ["Access verification per system", "InfoSec", "Repeatable", "Verified removed Yes/No/N/A + comments"],
        ["VPN / email / network / remote / other", "InfoSec", "Mandatory", "Applicable and verified Yes/No/N/A"],
        ["Any remaining access?", "InfoSec", "Mandatory", "If Yes: name, reason, action, owner, target date, status, comments"],
        ["Sensitive/suspicious data access?", "InfoSec", "Mandatory", "If Yes: details, further action, owner, comments"]
      ],
      system: ["Open InfoSec issues remain visible as exceptions", "If HR follow-up required, email Offboarding Exception Raised – [Employee Name] to HR", "Assign Finance"],
      email: "Action Required to Finance. Exception email to HR only if HR follow-up is required.",
      next: "Finance"
    })
  }
);
