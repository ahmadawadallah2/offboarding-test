function viewReports(state) {
  const iv = state.interview || emptyInterview();
  const reasonList = INTERVIEW_REASONS.filter((r) => iv.reasons[r.id]).map((r) => r.label);
  const ratingRows = INTERVIEW_RATINGS.map((row) => {
    return "<tr><td>" + esc(row.group) + "</td><td>" + esc(row.label) + "</td><td>" +
      esc(iv.ratings[row.id] || "—") + "</td></tr>";
  }).join("");
  const counts = {};
  INTERVIEW_RATINGS.forEach((row) => {
    const v = iv.ratings[row.id];
    if (v) counts[v] = (counts[v] || 0) + 1;
  });
  const countHtml = Object.keys(counts).map((k) => "<li>" + esc(k) + ": " + counts[k] + "</li>").join("") || "<li>No ratings yet</li>";
  const eos = state.stages.map((s) => {
    const def = STAGE_DEFS[s.number - 1];
    const cells = def.fields.map((f) => {
      const v = s.answers[f.id];
      const shown = v === true ? "Yes" : v === false || v == null || v === "" ? "—" : v;
      return "<tr><td>" + esc(def.name) + "</td><td>" + esc(f.label) + "</td><td>" + esc(shown) + "</td></tr>";
    }).join("");
    return cells;
  }).join("");
  const ivStatus = state.exitInterviewDone
    ? "Imported from Performance Appraisal"
    : state.exitInterviewSent
      ? "Waiting — T−5 email sent, employee fills Appraisal"
      : "Not sent";
  const imported = state.exitInterviewDone
    ? "<p>Reasons: " + esc(reasonList.join(", ") || "—") + "</p>" +
      "<p>Grow at Fibertech: <strong>" + esc(iv.growth || "—") + "</strong> · Stay: <strong>" + esc(iv.stay || "—") + "</strong></p>" +
      "<h3>Rating summary</h3><ul>" + countHtml + "</ul>" +
      "<table class=\"grid\"><thead><tr><th>Area</th><th>Question</th><th>Answer</th></tr></thead><tbody>" + ratingRows + "</tbody></table>" +
      "<p>Positive: " + esc([iv.positive1, iv.positive2, iv.positive3].filter(Boolean).join("; ") || "—") +
      "</p><p>Negative: " + esc([iv.negative1, iv.negative2, iv.negative3].filter(Boolean).join("; ") || "—") + "</p>"
    : "<p class=\"muted\">No answers here until Appraisal posts completion.</p>";
  return "<h2>Reports</h2>" +
    "<p class=\"muted\">" + esc(state.employeeName) + " · " + esc(state.employeeId) + " · " + esc(STATUS_LABEL[state.status]) + "</p>" +
    "<div class=\"banner info\">The interview is filled in Performance Appraisal. This screen only shows status and imported answers.</div>" +
    "<h3>Exit interview</h3><p>Status: <strong>" + ivStatus + "</strong></p>" + imported +
    "<h3>EOS clearance answers</h3>" +
    "<p>Linked department total: <strong>" + financeTotal(state) + " JOD</strong></p>" +
    "<table class=\"grid\"><thead><tr><th>Department</th><th>Field</th><th>Answer</th></tr></thead><tbody>" + eos + "</tbody></table>" +
    "<div class=\"actions\"><button class=\"btn btn-secondary\" id=\"navCase\">Back to case</button>" +
    "<button class=\"btn\" id=\"navEmails\">Emails</button></div>";
}
