const INTERVIEW_REASONS = [
  { id: "higherPay", label: "Higher compensation" },
  { id: "betterBenefits", label: "Better benefits" },
  { id: "newCareer", label: "New career / field / industry" },
  { id: "education", label: "Pursue education / relocation" },
  { id: "advancement", label: "Job advancement" },
  { id: "personal", label: "Personal / family reasons" },
  { id: "management", label: "Management dissatisfaction" },
  { id: "other", label: "Other" }
];

const INTERVIEW_RATINGS = [
  { id: "roleSpec", group: "Job role", label: "Role specifications / scope of work", options: ["Very clear", "Clear", "Vague", "Absent"] },
  { id: "workload", group: "Job role", label: "Workload", options: ["Overwhelming", "Adequate", "Fair", "Inadequate"] },
  { id: "challenge", group: "Job role", label: "Level of challenge", options: ["High", "Moderate", "Fair", "Low"] },
  { id: "routine", group: "Job role", label: "Routine and repetition", options: ["High", "Moderate", "Fair", "Low"] },
  { id: "innovation", group: "Job role", label: "Room for innovation and improvement", options: ["High", "Moderate", "Fair", "Low"] },
  { id: "learning", group: "Job role", label: "Learning and development", options: ["High", "Moderate", "Fair", "Low"] },
  { id: "resources", group: "Job role", label: "Required resources / tools", options: ["Fully available", "Partially available", "Unavailable"] },
  { id: "mgrKnowledge", group: "Direct management", label: "Functional knowledge and expertise", options: ["Strong", "Moderate", "Fair", "Weak"] },
  { id: "mgrDelegate", group: "Direct management", label: "Work delegation and task assignment", options: ["Competent", "Moderate", "Fair", "Incompetent"] },
  { id: "mgrGuidance", group: "Direct management", label: "Guidance, support and feedback", options: ["Competent", "Moderate", "Fair", "Incompetent"] },
  { id: "mgrCoach", group: "Direct management", label: "Coaching and mentoring", options: ["Competent", "Moderate", "Fair", "Incompetent"] },
  { id: "mgrDecide", group: "Direct management", label: "Problem solving and decision making", options: ["Competent", "Moderate", "Fair", "Incompetent"] },
  { id: "ownship", group: "Culture", label: "Ownership and dedication", options: ["Excellent", "Good", "Acceptable", "Poor"] },
  { id: "coop", group: "Culture", label: "Responsiveness and cooperation", options: ["Excellent", "Good", "Acceptable", "Poor"] },
  { id: "reward", group: "Culture", label: "Recognition and rewarding", options: ["Excellent", "Good", "Acceptable", "Poor"] },
  { id: "atmosphere", group: "Work environment", label: "Positive atmosphere", options: ["Excellent", "Good", "Acceptable", "Poor"] },
  { id: "respect", group: "Work environment", label: "Harmony and respect", options: ["Excellent", "Good", "Acceptable", "Poor"] },
  { id: "inclusion", group: "Work environment", label: "Inclusion and diversity", options: ["Excellent", "Good", "Acceptable", "Poor"] },
  { id: "fairness", group: "Work environment", label: "Fairness and equality", options: ["Excellent", "Good", "Acceptable", "Poor"] },
  { id: "safety", group: "Work environment", label: "Health and safety", options: ["Excellent", "Good", "Acceptable", "Poor"] },
  { id: "comfort", group: "Work environment", label: "Convenience and comfort", options: ["Excellent", "Good", "Acceptable", "Poor"] },
  { id: "balance", group: "Benefits", label: "Work / life balance benefits", options: ["Excellent", "Good", "Acceptable", "Poor"] },
  { id: "allowance", group: "Benefits", label: "Subsidy and allowance benefits", options: ["Excellent", "Good", "Acceptable", "Poor"] },
  { id: "medical", group: "Benefits", label: "Medical insurance coverage", options: ["Excellent", "Good", "Acceptable", "Poor"] }
];

function emptyInterview() {
  return {
    sepType: "Resignation",
    noticeServed: "Fully",
    reasons: {},
    reasonOther: "",
    growth: "",
    growthExplain: "",
    stay: "",
    stayNotes: "",
    ratings: {},
    ratingNotes: {},
    positive1: "",
    positive2: "",
    positive3: "",
    negative1: "",
    negative2: "",
    negative3: "",
    employeeAck: "",
    hrAck: "",
    hrNotes: ""
  };
}

function fillDemoInterview(iv) {
  iv.sepType = "Resignation";
  iv.noticeServed = "Fully";
  iv.reasons = { higherPay: true, advancement: true };
  iv.growth = "Yes, possibly";
  iv.growthExplain = "Limited senior roles in my track.";
  iv.stay = "No, because…";
  iv.stayNotes = "Offer already accepted.";
  INTERVIEW_RATINGS.forEach((row, i) => {
    iv.ratings[row.id] = row.options[i % 2 === 0 ? 1 : 0];
  });
  iv.positive1 = "Supportive teammates";
  iv.negative1 = "Slow promotion path";
  iv.employeeAck = "Sara Ahmad";
}
