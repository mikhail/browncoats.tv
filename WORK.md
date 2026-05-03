# WORK.md

This file is monitored by the background worker named `work-updater`.

Format conventions (machine-friendly):
- Tasks use Markdown checkboxes: `- [ ] Task description #tag` for TODOs and `- [x] Task description` for completed items.
- Questions are introduced on a single line starting with `QUESTION:` followed by the question text.
- When the worker modifies a line it SHOULD append a timestamp comment like `<!-- CREATED: 2026-05-03T12:00:00Z -->` or `<!-- COMPLETED: 2026-05-03T12:05:00Z -->`.

Worker responsibilities (summary):
- Poll this file every 60 seconds.
- For each unchecked `- [ ]` task not yet present in the session `todos` table, insert a todo with a generated id (prefix `work-` + slug + unix timestamp) and set status `pending`.
- When a line becomes `- [x]`, update the corresponding todo to `done` and append a `<!-- COMPLETED: ... -->` comment if missing.
- For lines starting with `QUESTION:`, add the question as a pending question block in the file (or a `PENDING_QUESTION:` marker) and notify the main assistant by appending `<!-- ASKED_TO_USER: false -->` (the main assistant will surface the question to the user using ask_user).
- Commit the file to git (commit message: `work-updater: update WORK.md`) whenever the worker writes changes.

Initial starter tasks:

- [ ] setup hosting and connect domain #hosting <!-- CREATED: 2026-05-03T19:18:52Z id:work-setup-hosting-and-connect-domain-hosting-1777835932 -->
- [ ] choose content model #content-model <!-- CREATED: 2026-05-03T19:18:52Z id:work-choose-content-model-content-model-1777835932 -->
- [ ] prepare privacy and payment policy #legal <!-- CREATED: 2026-05-03T19:18:52Z id:work-prepare-privacy-and-payment-policy-legal-1777835932 -->

Notes:
- This file is authoritative for the worker. Do not remove the worker comments unless you intend to stop the agent.
- The worker should be conservative when editing: only append timestamp comments and `ASKED_TO_USER` markers, do not rewrite user prose.

---

DECISIONS:
- Audience model: subscription-only <!-- ANSWERED: 2026-05-03T19:17:41Z -->
- Demo payments: mock payments for prototype, no live processor yet <!-- ANSWERED: 2026-05-03T19:19:33Z -->
- Core Firefly pitch: combine a direct fan-owned streaming home with host-led watch/community programming <!-- ANSWERED: 2026-05-03T19:20:00Z -->

NEW TASKS:
- [ ] implement subscription/paywall integration #payments <!-- CREATED: 2026-05-03T19:18:52Z id:work-implement-subscription-paywall-integration-payments-1777835932 -->
- [ ] build mock subscription checkout flow #payments #demo
- [ ] rewrite homepage around Firefly fan-owned streaming pitch #copy #demo
ERROR: 2026-05-03T19:20:46Z git commit failed: not a git repository
