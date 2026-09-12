function ans(state, stageNumber, id) {
  const stage = state.stages[stageNumber - 1];
  if (!stage || !stage.answers) return "";
  const value = stage.answers[id];
  if (value === true) return "Yes";
  if (value === false || value == null || value === "") return "";
  return String(value);
}

function sharedFacts(state, stageNumber) {
  const rows = [];
  if (stageNumber >= 2) {
    rows.push(["Mobile line (Manager)", ans(state, 1, "mobileLine")]);
    rows.push(["Systems access (Manager)", ans(state, 1, "systemsRevoked")]);
    rows.push(["System name (Manager)", ans(state, 1, "systemName")]);
    rows.push(["Department assets (Manager)", ans(state, 1, "assetsReturned")]);
    rows.push(["Asset notes (Manager)", ans(state, 1, "assetNotes")]);
  }
  if (stageNumber >= 3) {
    rows.push(["Email / access (IT)", ans(state, 2, "emailStatus")]);
    rows.push(["Laptop (IT)", ans(state, 2, "laptopStatus")]);
    rows.push(["Missing items (IT)", ans(state, 2, "laptopMissing")]);
    rows.push(["Condition (IT)", ans(state, 2, "condition")]);
  }
  if (stageNumber === 4 || stageNumber === 7) {
    rows.push(["IT damage cost (JOD)", ans(state, 2, "damageCost")]);
    rows.push(["IT other equipment", ans(state, 2, "otherEquipment")]);
  }
  if (stageNumber === 6) {
    rows.push(["Mobile line decision (Manager) — use this for SIM / cancel", ans(state, 1, "mobileLine")]);
  }
  if (stageNumber === 7) {
    rows.push(["Medical claims JOD (HR Officer)", ans(state, 6, "medicalClaims")]);
    rows.push(["Other HR amount JOD", ans(state, 6, "otherAmount")]);
    rows.push(["Finance total JOD", String(financeTotal(state) || "")]);
  }
  return rows.filter((row) => row[1]);
}

function seedStage(state, stage) {
  if (!stage.answers) stage.answers = {};
  if (stage.number === 4 && !stage.answers.assetAmount1) {
    const cost = ans(state, 2, "damageCost");
    if (cost) {
      stage.answers.assetItem1 = "IT damaged / missing equipment";
      stage.answers.assetAmount1 = cost;
    }
  }
  if (stage.number === 6 && !stage.answers.mobileAction) {
    const line = ans(state, 1, "mobileLine");
    if (line.indexOf("Retained") >= 0) stage.answers.mobileAction = "Cancellation requested";
    if (line.indexOf("released") >= 0) stage.answers.mobileAction = "SIM card received";
  }
}

function financeTotal(state) {
  const ids = ["assetAmount1", "assetAmount2", "assetAmount3"];
  let sum = 0;
  ids.forEach((id) => {
    sum += Number(ans(state, 4, id) || 0);
  });
  sum += Number(ans(state, 2, "damageCost") || 0);
  sum += Number(ans(state, 6, "medicalClaims") || 0);
  sum += Number(ans(state, 6, "otherAmount") || 0);
  return sum;
}

function fillDemoStage(stage) {
  const def = STAGE_DEFS[stage.number - 1];
  def.fields.forEach((field) => {
    if (field.type === "select") stage.answers[field.id] = field.options[0];
    else if (field.type === "checkbox") stage.answers[field.id] = true;
    else if (field.type === "number") stage.answers[field.id] = field.id.indexOf("Amount") >= 0 || field.id.indexOf("Cost") >= 0 || field.id.indexOf("Claims") >= 0 ? "0" : "0";
    else if (field.required) stage.answers[field.id] = "Recorded";
  });
  if (stage.number === 1) {
    stage.answers.handoverStatus = "Completed";
    stage.answers.mobileLine = "Retained to company";
    stage.answers.assetsReturned = "Returned";
  }
  if (stage.number === 2) {
    stage.answers.condition = "Some damaged — cost of repair/replacement";
    stage.answers.damageCost = "25";
  }
}

function missingStageFields(stage) {
  const def = STAGE_DEFS[stage.number - 1];
  return def.fields.filter((field) => {
    if (!field.required) return false;
    const value = stage.answers[field.id];
    if (field.type === "checkbox") return !value;
    return value == null || String(value).trim() === "";
  }).map((field) => field.label);
}
