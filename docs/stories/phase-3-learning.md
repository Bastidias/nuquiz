# Phase 3 — Learning Tracking

## Summary

| ID | Title | Status | Test Coverage |
|----|-------|--------|---------------|
| S09 | See mastery at every hierarchy level | Planned | — |
| S10 | Get a daily review queue based on SM-2 spaced repetition | Planned | — |
| S11 | See weak areas to focus study | Planned | — |

---

## S09 — See mastery at every hierarchy level

**As** a student
**I want to** see my mastery percentage at the Concept, Topic, and Deck levels
**So that** I know how much of the material I have learned and where I stand overall

### Acceptance Criteria

- [ ] Each user-Triple pair has a Review Card that tracks SM-2 state (ease factor, interval, repetition count, next review date)
- [ ] Review Cards are created or updated automatically when quiz responses are recorded — the student never manually rates themselves
- [ ] Quality (SM-2 input, 0–5) is derived from correctness and response time, not from self-rating
- [ ] Only target Triples with a non-null `correct` value in `response_triples` trigger SM-2 updates (distractors do not affect Review Cards)
- [ ] Mastery for a Concept is the percentage of its Triples where the student's Review Card interval meets or exceeds a mastery threshold (e.g., 21 days)
- [ ] Mastery for a Topic is the percentage of mastered Triples across all Concepts within that Topic
- [ ] Mastery for a Deck is the percentage of mastered Triples across all Concepts within all Topics of that Deck
- [ ] Mastery is computed at query time, never stored — there is no mastery column in the database
- [ ] A student can request mastery for a specific Concept, Topic, or Deck by ID
- [ ] The mastery response includes: the hierarchy level, the entity ID, the mastery percentage, total Triple count, and mastered Triple count
- [ ] Triples the student has never answered have no Review Card and count as unmastered (0% contribution)
- [ ] Only the authenticated student can view their own mastery; another user's mastery is not accessible

### Test Mapping
- _To be filled after implementation_

---

## S10 — Get a daily review queue based on SM-2 spaced repetition

**As** a student
**I want to** get a daily review queue that tells me which Triples to study today
**So that** I review material at optimal intervals and make steady forward progress

### Acceptance Criteria

- [ ] The review queue combines two sources: due Review Cards (where the review interval has elapsed) and new Triples (never answered)
- [ ] Due cards are ordered by most overdue first (largest gap between now and scheduled review date)
- [ ] New cards are Triples within a specified scope (Concept, Topic, or Deck) that the student has never answered
- [ ] Due cards and new cards are interleaved at a controlled ratio (e.g., 3 review cards then 1 new card) to balance reinforcement with forward progress
- [ ] The student can request a review queue scoped to a Concept, Topic, or Deck by ID
- [ ] The queue returns a configurable maximum number of cards (e.g., default 20)
- [ ] Each card in the queue includes: the Triple ID, the Triple's subject, predicate, and object, the card type (review or new), and for review cards the current interval and how overdue it is
- [ ] The queue does not generate questions itself — it identifies which Triples to study; the client uses these to start a quiz session or display review material
- [ ] The user must be authenticated and can only retrieve their own review queue
- [ ] The user must be the catalog author or have an active subscription to the catalog containing the scoped content
- [ ] If the scope contains no due cards and no new cards, the queue returns empty with a message indicating the student is caught up

### Test Mapping
- _To be filled after implementation_

---

## S11 — See weak areas to focus study

**As** a student
**I want to** see which Concepts and Triples I am struggling with
**So that** I can focus my study time on the areas that need the most work

### Acceptance Criteria

- [ ] Weak areas are identified by finding Concepts where the student's mastery is below a threshold (e.g., below 50%)
- [ ] Within weak Concepts, the response highlights specific Triples that are struggling — defined as Triples with Review Cards that have low ease factors (e.g., below 2.0) or high failure counts
- [ ] The student can request weak areas scoped to a Topic or Deck by ID (not Concept — Concept is the unit being evaluated)
- [ ] The response groups weak Triples by Concept, so the student sees which comparison groups need attention
- [ ] Each weak area entry includes: the Concept ID and title, the Concept's mastery percentage, and a list of struggling Triples with their subject, predicate, object, current ease factor, and total incorrect response count
- [ ] Concepts where the student has answered no Triples are reported separately as "not started" rather than "weak"
- [ ] The weak areas list is ordered by mastery ascending (weakest Concepts first)
- [ ] The user must be authenticated and can only view their own weak areas
- [ ] The user must be the catalog author or have an active subscription to the catalog containing the scoped content
- [ ] If no Concepts are below the weakness threshold, the response indicates the student has no weak areas in the given scope

### Test Mapping
- _To be filled after implementation_

---

## Open Questions

| Question | Context | Recommendation |
|----------|---------|----------------|
| What interval threshold defines "mastered"? | S09 uses a threshold to classify Triples as mastered. | Recommend 21 days (3 weeks). A Triple whose Review Card interval is >= 21 days has been successfully recalled across multiple spaced intervals. Configurable per catalog in Phase 4. |
| What Quality derivation formula maps correctness + response time to SM-2 quality (0–5)? | S09/S10 need Quality scores without self-rating. | Recommend: correct = base quality 4, incorrect = base quality 1. Adjust +/-1 based on response time relative to a per-format median. Clamp to 0–5. Details left to implementation. |
| What interleave ratio for review vs new cards? | S10 mixes due and new cards. | Recommend 3:1 (3 review, 1 new). Configurable in a future phase. |
| What is the default queue size? | S10 returns a limited number of cards. | Recommend 20 cards per queue request. Configurable via query parameter. |
| What ease factor threshold defines "struggling"? | S11 identifies struggling Triples. | Recommend below 2.0 (SM-2 default starting ease is 2.5; below 2.0 indicates repeated difficulty). |
| What mastery threshold defines a "weak" Concept? | S11 identifies weak Concepts. | Recommend below 50%. A Concept where fewer than half the Triples are mastered needs focused attention. |
