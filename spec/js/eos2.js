window.SLIDES = window.SLIDES || [];
window.SLIDES.push(
  {
    nav: "10. Finance",
    kicker: "EOS stage 4 · Finance",
    title: "Finance Clearance",
    html: stageHtml({
      trigger: "Information Security submits.",
      readOnly: ["Missing assets, damaged assets, replacement/repair items, other financial flags from prior stages"],
      fields: [
        ["Financial items table", "Finance", "Repeatable", "Type Deduction or Entitlement, Category, Description, Amount JOD, attachment, comments"],
        ["Asset-related items", "Finance", "Repeatable", "Asset, Missing/Damaged, Asset value, Deduction required, confirmed amount, comments"],
        ["Any outstanding financial items?", "Finance", "Mandatory", "Details + Finance comments"]
      ],
      system: ["Confirmed deductions/entitlements carry to HR Officer and HR Director", "Assign HR Admin"],
      email: "Action Required to HR Admin",
      next: "HR Admin"
    })
  },
  {
    nav: "11. HR Admin",
    kicker: "EOS stage 5 · HR Admin",
    title: "HR Admin Clearance",
    html: stageHtml({
      trigger: "Finance submits.",
      readOnly: ["Employee information and open exceptions"],
      fields: [
        ["Parking card", "HR Admin", "Mandatory", "Applicable, Returned, Access deactivated — Yes/No/N/A"],
        ["Access card", "HR Admin", "Mandatory", "Applicable, Returned, Deactivated"],
        ["Fingerprint / door access", "HR Admin", "Mandatory", "Deactivated Yes/No/N/A + date"],
        ["Outstanding item?", "HR Admin", "Mandatory", "If Yes: details + comments"]
      ],
      system: ["Flag unresolved items", "Assign HR Officer"],
      email: "Action Required to HR Officer",
      next: "HR Officer"
    })
  },
  {
    nav: "12. HR Officer",
    kicker: "EOS stage 6 · HR Officer",
    title: "HR Officer Clearance",
    html: stageHtml({
      trigger: "HR Admin submits.",
      readOnly: ["Mobile line decision from DM", "Finance deductions, entitlements, asset deductions", "Outstanding issues from prior stages"],
      fields: [
        ["Badge / business cards", "HR Officer", "Mandatory", "Returned / applicable / destroyed Yes/No/N/A"],
        ["SIM / mobile line", "HR Officer", "Mandatory", "Applicable, SIM received, cancel/release requested, dates, completed"],
        ["Medical insurance", "HR Officer", "Mandatory", "Enrolled, cancel required, request/effective dates, completed, pending claims"],
        ["Life insurance", "HR Officer", "Mandatory", "Enrolled, cancel required, dates, completed"],
        ["Other items", "HR Officer", "Repeatable", "Benefits, Assets, Overtime, Unpaid Vacations, Training Commitment, Commissions, Incentives, Other — Applicable, Amount, Comments"]
      ],
      system: ["Carry HR and Finance information to HR Director", "Assign HR Director"],
      email: "Action Required to HR Director",
      next: "HR Director — final stage"
    })
  },
  {
    nav: "13. HR Director",
    kicker: "EOS stage 7 · FINAL STAGE",
    title: "HR Director completes the case",
    html: stageHtml({
      trigger: "HR Officer submits. This is the last workflow stage.",
      readOnly: ["Employee details including LAWD/LCD", "All seven clearance statuses + Exit Interview status", "Open exceptions with owner/details/status", "Confirmed deductions, entitlements, asset amounts", "Medical/life insurance, SIM, provident fund, bank commitment if already captured"],
      fields: [
        ["Final review completed? / Outstanding issue?", "HR Director", "Mandatory", "If outstanding: details, responsible person, required action, comments"],
        ["ZenHR account deactivated? / date", "HR Director", "Mandatory", "HR Director deactivates ZenHR here"],
        ["Payment", "HR Director", "Mandatory", "Pending / Proceeded or Submitted / Completed + amount, cheque/ref if applicable, date, comments"],
        ["Provident fund", "HR Director", "Mandatory", "Enrolled, exit/cancel, settlement calculated, amount"],
        ["Bank commitment", "HR Director", "Mandatory", "Applicable, details, status, outstanding action"],
        ["HR Director comments + Complete Offboarding", "HR Director", "Mandatory to close", "Button enabled only if all 7 EOS stages complete and no blocking exceptions"]
      ],
      system: ["On complete: Status = Completed / Closed, Completed By, Date, Time", "No further workflow stage"],
      email: "TBC whether a completion email is sent. Do not invent one.",
      next: "None. Case is closed."
    })
  }
);
