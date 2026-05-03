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
- Naming: name Firefly explicitly throughout the pitch prototype <!-- ANSWERED: 2026-05-03T19:24:00Z -->
- Primary demo audience: Firefly owners, producers, and studio decision-makers <!-- ANSWERED: 2026-05-03T19:26:00Z -->
- Mock pricing: $5.99 Browncoat tier plus $9.99 higher tier, name TBD but below Captain <!-- ANSWERED: 2026-05-03T19:28:00Z -->
- Next emphasis: direct-support revenue pitch to Firefly decision-makers <!-- ANSWERED: 2026-05-03T19:32:00Z -->

NEW TASKS:
- [ ] implement subscription/paywall integration #payments <!-- CREATED: 2026-05-03T19:18:52Z id:work-implement-subscription-paywall-integration-payments-1777835932 -->
- [ ] build mock subscription checkout flow #payments #demo
- [ ] rewrite homepage around Firefly fan-owned streaming pitch #copy #demo
ERROR: 2026-05-03T19:20:46Z git commit failed: not a git repository

---

PLANNER_NOTES: Firefly demo direction

Recommended homepage sections:
- Hero: position browncoats.tv as a subscription-only, fan-owned streaming home for Firefly-style sci-fi that keeps the signal alive beyond platform algorithms.
- Why not big platforms: contrast direct fan membership, programming control, host relationships, and community rituals against Amazon-style distribution.
- Programming preview: show a mix of VOD pilots/clips, scheduled live watch parties, host-led aftershows, and community dispatches.
- Membership model: present a mock subscriber pass with included access, community perks, and a clear "demo checkout" CTA.
- Host pitch: invite hosts to lead watch nights, episode discussions, creator interviews, and fan-culture programming.

Demo interactions/features to build next:
- Mock subscription checkout modal/page with plan selection, fake card fields, success state, and "subscriber unlocked" UI.
- Static paywall preview where locked VOD/live/community cards become available after demo checkout using localStorage.
- Live schedule/program guide with host names, event status, and "remind me" or "join lobby" prototype buttons.
- Watch-room teaser interaction with video placeholder, host notes, live chat mock feed, and community prompts.
- Host application/interest form that routes via mailto or static-friendly placeholder while capturing the pitch narrative.

QUESTION: Should the prototype name Firefly explicitly throughout, or should it use "Firefly-inspired / browncoat sci-fi" language to keep the demo safer and more pitch-flexible?
ANSWER: Name Firefly explicitly throughout. <!-- ANSWERED: 2026-05-03T19:24:00Z -->
QUESTION: Who is the primary decision-maker audience for the demo: potential hosts, rights/content partners, investors, or fan-community organizers?
ANSWER: Firefly owners/producers/studio decision-makers. <!-- ANSWERED: 2026-05-03T19:26:00Z -->
QUESTION: What mock subscription tiers or price points should the demo show, if any?
ANSWER: $5.99 Browncoat and $9.99 higher tier, name TBD but below Captain. <!-- ANSWERED: 2026-05-03T19:28:00Z -->
QUESTION: Should the homepage CTA prioritize "become a subscriber" or "apply to host a show" for the next iteration?

- [ ] rewrite homepage hero copy around fan-owned subscription streaming plus host-led community programming #homepage #positioning
- [ ] add a "Why not big platforms" comparison section emphasizing control, direct fan relationship, and appointment-viewing rituals #homepage #strategy
- [ ] add a static programming preview grid covering VOD, Live, and Community content types #content-model #homepage
- [ ] build mock subscription checkout flow with fake payment success and no live processor #payments #demo
- [ ] add a lightweight subscriber-unlocked state using localStorage for static paywall demo cards #payments #demo
- [ ] add a live schedule/watch-room teaser with host notes and mock chat/activity #live #community
- [ ] add a host recruitment section and static-friendly interest CTA/form #hosts #homepage

---

RESEARCH_NOTES: Dropout.tv and Beacon.tv inspiration

Observed patterns:
- Dropout leads with a strong entertainment identity, direct CTA, simple subscription pricing, independent/ad-free positioning, and highly browsable original shows.
- Dropout emphasizes a distinct voice rather than generic streaming copy; the lesson for browncoats.tv is to make the pitch feel like a movement, not a software demo.
- Beacon leads with membership benefits: same-day VOD/podcast access, exclusive series, live/fireside events, merch discounts, and a members-only Discord.
- Beacon's homepage quickly shows featured content cards and concrete subscriber perks, which makes the membership feel tangible before checkout.
- Both sites make the subscription feel like direct support for creators/talent, not just library access.

Ideas to adapt:
- [ ] add a "Why self-hosted wins" section comparing direct fan support, data/control, programming flexibility, and community ownership against Amazon-style distribution #strategy
- [ ] add a membership perks strip: ad-free Firefly access, host-led watch nights, private fan community, early drops, behind-the-scenes/fireside chats #membership
- [ ] add a featured content row with visible locked/unlocked states for VOD, live, and community content #content-model
- [ ] add a weekly programming schedule card inspired by Beacon's programming updates #schedule
- [ ] add a "Start here" guide for studios/hosts/fans explaining what the demo proves #onboarding
- [ ] add a direct-support metric/mock revenue panel showing how fan subscriptions can fund the series without a platform middleman #pitch
- [ ] add a members-only community perk, likely Discord for the prototype #community
