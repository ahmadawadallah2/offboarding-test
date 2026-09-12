const STAGE_DEFS = [
  {
    number: 1,
    name: "Department — Direct Manager",
    ownerRole: "manager",
    formOwner: "Direct Manager",
    fields: [
      { id: "handoverStatus", label: "Work tasks, activities and documents handover", type: "select", required: true, options: ["Completed", "Incomplete"] },
      { id: "handoverNotes", label: "If incomplete — notes or further actions", type: "textarea" },
      { id: "backupEmail", label: "Backup required: Email", type: "checkbox" },
      { id: "backupDesktop", label: "Backup required: Desktop", type: "checkbox" },
      { id: "backupOther", label: "Backup required: Other (describe in notes)", type: "checkbox" },
      { id: "mobileLine", label: "Employee mobile line", type: "select", required: true, options: ["Retained to company", "Can be released to employee"] },
      { id: "systemsRevoked", label: "Access to work systems (WhatsApp, Nestrom, NMS, etc.)", type: "select", required: true, options: ["Yes, deactivated from my end", "Requested deactivation by email"] },
      { id: "systemName", label: "System name (if email request)", type: "text" },
      { id: "systemAdmin", label: "Related administrator name", type: "text" },
      { id: "assetsReturned", label: "Division / department assets (tools, devices)", type: "select", required: true, options: ["Returned", "N/A", "Other"] },
      { id: "assetNotes", label: "Additional notes", type: "textarea" }
    ]
  },
  {
    number: 2,
    name: "Information Technology",
    ownerRole: "it",
    formOwner: "IT Officer",
    fields: [
      { id: "emailStatus", label: "Email / systems access", type: "select", required: true, options: ["Deactivated", "Shared with manager based on request"] },
      { id: "laptopStatus", label: "Desktop / laptop (including accessories)", type: "select", required: true, options: ["All returned", "Below item(s) missing"] },
      { id: "laptopMissing", label: "Missing item(s)", type: "textarea" },
      { id: "condition", label: "Equipment condition", type: "select", required: true, options: ["All in good condition", "Some damaged — cost of repair/replacement"] },
      { id: "damageCost", label: "Repair / replacement cost (JOD)", type: "number" },
      { id: "otherEquipment", label: "Other equipment and tools", type: "textarea" }
    ]
  },
  {
    number: 3,
    name: "Information Security",
    ownerRole: "infosec",
    formOwner: "Information Security Officer",
    fields: [
      { id: "accessRemoved", label: "Employee access to all work systems and information", type: "select", required: true, options: ["Yes — checked, employee no longer has access"] },
      { id: "sensitiveData", label: "Any sign they accessed or took sensitive/suspicious data in notice period?", type: "select", required: true, options: ["No", "Yes"] },
      { id: "sensitiveNotes", label: "If yes — details", type: "textarea" }
    ]
  },
  {
    number: 4,
    name: "Finance",
    ownerRole: "finance",
    formOwner: "Finance / Accounting",
    fields: [
      { id: "assetItem1", label: "Asset / deduction 1 — description", type: "text" },
      { id: "assetAmount1", label: "Amount 1 (JOD)", type: "number" },
      { id: "assetItem2", label: "Asset / deduction 2 — description", type: "text" },
      { id: "assetAmount2", label: "Amount 2 (JOD)", type: "number" },
      { id: "assetItem3", label: "Asset / deduction 3 — description", type: "text" },
      { id: "assetAmount3", label: "Amount 3 (JOD)", type: "number" },
      { id: "financeNotes", label: "Review notes (use prior department asset info above)", type: "textarea", required: true }
    ]
  },
  {
    number: 5,
    name: "HR Admin",
    ownerRole: "hrAdmin",
    formOwner: "HR Administrative Assistant",
    fields: [
      { id: "parkingCard", label: "Parking card", type: "select", required: true, options: ["Deactivated", "Not issued"] },
      { id: "fingerprint", label: "Fingerprint / access card", type: "select", required: true, options: ["Deactivated", "Not issued"] }
    ]
  },
  {
    number: 6,
    name: "HR Officer",
    ownerRole: "hrOfficer",
    formOwner: "HR and Corporate Affairs Officer",
    fields: [
      { id: "badge", label: "Badge / business cards", type: "select", required: true, options: ["Received", "Not issued"] },
      { id: "mobileAction", label: "Employee mobile line / SIM", type: "select", required: true, options: ["SIM card received", "Cancellation requested"] },
      { id: "insurance", label: "Medical / life insurance", type: "select", required: true, options: ["Cards received", "Subscription cancellation requested"] },
      { id: "medicalClaims", label: "Pending / due medical claims (JOD)", type: "number" },
      { id: "otherItem", label: "Other entitlement / deduction (benefits, overtime, training…)", type: "text" },
      { id: "otherAmount", label: "Other amount (JOD)", type: "number" }
    ]
  },
  {
    number: 7,
    name: "HR Director",
    ownerRole: "hrDirector",
    formOwner: "Director of HR & Corporate Planning",
    fields: [
      { id: "hrSystem", label: "HR system user", type: "select", required: true, options: ["Deactivated", "Not a user"] },
      { id: "providentFund", label: "Provident fund member?", type: "select", required: true, options: ["Not a member", "Membership cancelled, settlement calculated"] },
      { id: "bankCommitment", label: "Bank commitment?", type: "select", required: true, options: ["No", "Yes"] }
    ]
  }
];
