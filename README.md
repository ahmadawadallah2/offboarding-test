# Offboarding test app

Local click-through of the Fibertech employee offboarding flow.

## Run

Open a terminal in this folder and run:

```
python3 -m http.server 8765
```

Then open http://localhost:8765

## Emails

Confirm dates to schedule the interview email. It is sent automatically at T−5 (5 working days before LAWD), with a Performance Appraisal link — not a form inside this app.
If fewer than 5 working days remain, it is sent immediately.
Use **Emails** to see outbox, resend, remind employee, remind HR at T−5, and simulate the appraisal webhook.
T−5 emails HR + Stage 1 owner. T−1 emails HR about open tasks.

## What to try

1. Attach the demo letter and submit as Employee (manager is emailed).
2. Switch to Direct manager → Proceed.
3. Switch to HR Officer → Fill demo dates → Confirm dates.
4. Open **Emails** — interview mail should be there. Remind HR / employee if you want.
5. Simulate T−5, complete EOS stages, then Reports.

1. Attach the demo letter and submit as Employee.
2. Switch to Direct manager → Proceed (or try Retain).
3. Switch to HR Officer → set Last Actual Working Date → Confirm dates.
4. Simulate T−5 to launch EOS clearance.
5. Complete each EOS stage using the real clearance form. Later departments see earlier answers (mobile line, assets, IT costs).
6. Open **Reports** to view interview answers and EOS field answers.

Wrong role, empty required fields, and skipping stages should be blocked.
Working days are Sunday–Thursday.
