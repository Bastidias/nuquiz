# Manual Test Plan: Phase 4 & 5 - Quiz Engine & Sessions

**Feature**: Quiz Generation, Quiz Taking, Answer Tracking, and Results
**Date Created**: 2025-10-24
**Status**: Ready for Testing
**Prerequisites**: Dev server running, database populated with knowledge hierarchy

---

## Test Environment Setup

### 1. Start Development Environment

```bash
# Ensure database is running
docker-compose up -d

# Seed database with test users and sample knowledge data
npm run db:seed

# Start development server
npm run dev
```

### 2. Test Users

| Email | Password | Role | Purpose |
|-------|----------|------|---------|
| student@test.com | password123 | student | Primary quiz taker |
| admin@test.com | password123 | admin | Create content packs |

### 3. Prerequisites

- At least 1 content pack with complete knowledge hierarchy
- Knowledge hierarchy includes:
  - Topics
  - Categories (multiple, for distractors)
  - Attributes (multiple)
  - Facts (at least 5+ per attribute for variety)

### 4. Sample Knowledge Structure

Expected structure for testing (created via `npm run db:seed`):

```
Congestive Heart Failure (topic)
├── Left-sided CHF (category)
│   ├── Symptoms (attribute)
│   │   ├── Pulmonary edema (fact)
│   │   ├── Dyspnea (fact)
│   │   └── Orthopnea (fact)
│   └── Causes (attribute)
│       └── Hypertension (fact)
└── Right-sided CHF (category)
    └── Symptoms (attribute)
        ├── Peripheral edema (fact)
        └── Jugular venous distension (fact)
```

---

## Phase 4: Quiz Engine Tests

### TC-01: Question Generation - Downward Direction

**Objective**: Verify downward questions generate correctly

**Test Setup**:
```sql
-- Check knowledge hierarchy exists
SELECT * FROM knowledge WHERE node_type = 'category' LIMIT 5;
SELECT * FROM knowledge WHERE node_type = 'attribute' LIMIT 5;
SELECT * FROM knowledge WHERE node_type = 'fact' LIMIT 10;
```

| Step | Action | Expected Result | Pass/Fail | Notes |
|------|--------|----------------|-----------|-------|
| 1 | Login as student | Logged in | | |
| 2 | Subscribe to content pack with knowledge | Subscribed | | |
| 3 | Start a quiz (10 questions) | Quiz session created | | |
| 4 | Check first question format | `select all \| {category} \| {attribute}` | | |
| 5 | Verify question text | Contains category and attribute labels | | |
| 6 | Count answer options | At least 3 options | | |
| 7 | Check option format | Each shows comma-separated facts | | |

**Example Expected Question**:
```
Question: select all | Left-sided CHF | Symptoms
Options:
- Pulmonary edema, Dyspnea, Orthopnea (correct - all facts)
- Pulmonary edema, Dyspnea (correct - some facts)
- Pulmonary edema, Peripheral edema (incorrect - mixed with distractor)
- Peripheral edema, Jugular venous distension (incorrect - all distractors)
```

---

### TC-02: Question Generation - Upward Direction

**Objective**: Verify upward questions generate correctly

**Note**: Upward questions may not be in MVP. Check implementation.

| Step | Action | Expected Result | Pass/Fail | Notes |
|------|--------|----------------|-----------|-------|
| 1 | Start quiz session | Quiz created | | |
| 2 | Look for upward questions | Format: `select all \| {attribute} \| {fact}` | | |
| 3 | Verify answers are categories | Options show category names | | |
| 4 | Check correctness | Correct categories contain the specified fact | | |

**Example Expected Question**:
```
Question: select all | Symptoms | Pulmonary edema
Options:
- Left-sided CHF (correct - has pulmonary edema as symptom)
- Right-sided CHF (incorrect - different symptoms)
```

---

### TC-03: Deterministic Question Generation

**Objective**: Verify same seed produces same questions

**Prerequisites**: Ability to set seed (may require developer mode or API access)

| Step | Action | Expected Result | Pass/Fail | Notes |
|------|--------|----------------|-----------|-------|
| 1 | Create quiz with seed = 12345 | Session 1 created | | |
| 2 | Record questions and options | Save for comparison | | |
| 3 | Create another quiz with seed = 12345 | Session 2 created | | |
| 4 | Compare questions | Identical question texts | | |
| 5 | Compare answer options | Identical options in same order | | |
| 6 | Verify ordering | Question order matches | | |

**Database Verification**:
```sql
-- Compare two sessions with same seed
SELECT
  q1.question_order,
  q1.question_text,
  q2.question_text
FROM questions q1
JOIN questions q2 ON q1.question_order = q2.question_order
WHERE q1.quiz_session_id = 1 AND q2.quiz_session_id = 2;

-- Should show identical question_text values
```

---

### TC-04: Distractor Selection

**Objective**: Verify distractors are relevant but incorrect

| Step | Action | Expected Result | Pass/Fail | Notes |
|------|--------|----------------|-----------|-------|
| 1 | Create quiz session | Questions generated | | |
| 2 | Examine first question | Note the category/attribute | | |
| 3 | Check incorrect options | Contain facts from sibling categories | | |
| 4 | Verify distractor relevance | Same attribute, different category | | |
| 5 | Check for random facts | No unrelated facts | | |

**Example**:
```
Question: select all | Left-sided CHF | Symptoms

Distractors should come from:
- Right-sided CHF | Symptoms (sibling category, same attribute) ✓
- Left-sided CHF | Causes (same category, different attribute) ✓

Should NOT come from:
- Unrelated topics ✗
- Random facts from other domains ✗
```

---

### TC-05: Answer Option Components Tracking

**Objective**: Verify answer_option_components table correctly maps facts to options

| Step | Action | Expected Result | Pass/Fail | Notes |
|------|--------|----------------|-----------|-------|
| 1 | Create quiz session | Questions saved | | |
| 2 | Query database for answer options | Options exist | | |
| 3 | Check answer_option_components | Each option has component entries | | |
| 4 | Verify component mapping | Components match facts in option text | | |
| 5 | Count components per option | Matches number of facts in option | | |

**Database Verification**:
```sql
SELECT
  ao.id as option_id,
  ao.display_text,
  ao.is_correct,
  COUNT(aoc.id) as component_count,
  ARRAY_AGG(k.label) as component_labels
FROM answer_options ao
JOIN answer_option_components aoc ON ao.id = aoc.answer_option_id
JOIN knowledge k ON aoc.knowledge_id = k.id
WHERE ao.question_id = 1
GROUP BY ao.id, ao.display_text, ao.is_correct;

-- Verify component_count matches number of facts in display_text
-- Verify component_labels match the facts shown in display_text
```

---

### TC-06: Multiple Correct Options

**Objective**: Verify questions can have multiple correct options (select all that apply)

| Step | Action | Expected Result | Pass/Fail | Notes |
|------|--------|----------------|-----------|-------|
| 1 | Create quiz session | Questions generated | | |
| 2 | Check question type | Should be "select_all" | | |
| 3 | Query answer options | Check is_correct flag | | |
| 4 | Count correct options | More than 1 correct option exists | | |
| 5 | Verify UI allows multiple selections | Checkboxes, not radio buttons | | |

**Database Check**:
```sql
SELECT
  q.question_text,
  COUNT(CASE WHEN ao.is_correct THEN 1 END) as correct_count,
  COUNT(*) as total_options
FROM questions q
JOIN answer_options ao ON q.id = ao.question_id
WHERE q.id = 1
GROUP BY q.id, q.question_text;

-- correct_count should be >= 2 for most questions
```

---

### TC-07: Minimum Question Requirements

**Objective**: Verify system requires sufficient knowledge data

| Step | Action | Expected Result | Pass/Fail | Notes |
|------|--------|----------------|-----------|-------|
| 1 | Login as admin | Logged in | | |
| 2 | Create new content pack | Created | | |
| 3 | Add minimal knowledge (1 category, 1 attribute, 2 facts) | Added | | |
| 4 | Login as student and subscribe | Subscribed | | |
| 5 | Try to create quiz (10 questions) | Error or reduced count | | |
| 6 | Check error message | "Insufficient knowledge data" or similar | | |
| 7 | Or check actual questions | May generate fewer than requested | | |

---

## Phase 5: Quiz Session Tests

### TC-08: Create Quiz Session

**Objective**: Verify users can start a quiz

| Step | Action | Expected Result | Pass/Fail | Notes |
|------|--------|----------------|-----------|-------|
| 1 | Login as student | Logged in | | |
| 2 | Navigate to content pack details | Pack details page loads | | |
| 3 | Find "Start Quiz" button | Button present | | |
| 4 | Click "Start Quiz" | Quiz creation dialog appears | | |
| 5 | Select question count: 10 | Option available | | |
| 6 | Confirm quiz creation | Loading state shown | | |
| 7 | Check redirect | Navigates to `/quiz/[sessionId]` | | |
| 8 | Verify quiz loaded | First question displayed | | |

**API Test**:
```bash
curl -X POST http://localhost:3000/api/quiz-sessions/create \
  -H "Content-Type: application/json" \
  -H "Cookie: next-auth.session-token=..." \
  -d '{"content_pack_id":1,"question_count":10}' | jq

# Expected: 201 Created with session_id
```

---

### TC-09: Cannot Create Quiz Without Subscription

**Objective**: Verify access control on quiz creation

| Step | Action | Expected Result | Pass/Fail | Notes |
|------|--------|----------------|-----------|-------|
| 1 | Login as student | Logged in | | |
| 2 | Find a pack you're NOT subscribed to | Pack identified | | |
| 3 | Note the pack ID | e.g., ID = 3 | | |
| 4 | Try to create quiz via API | Use unsubscribed pack ID | | |
| 5 | Check response | Returns 403 Forbidden | | |
| 6 | Verify error message | "No access to this content pack" | | |

**API Test**:
```bash
curl -X POST http://localhost:3000/api/quiz-sessions/create \
  -H "Content-Type: application/json" \
  -H "Cookie: next-auth.session-token=..." \
  -d '{"content_pack_id":999,"question_count":10}'

# Should return 403
```

---

### TC-10: Quiz Taking UI - Display Questions

**Objective**: Verify quiz UI displays correctly

| Step | Action | Expected Result | Pass/Fail | Notes |
|------|--------|----------------|-----------|-------|
| 1 | Start a quiz | Quiz page loads | | |
| 2 | Verify page URL | `/quiz/[sessionId]` | | |
| 3 | Check question display | Shows question text | | |
| 4 | Check question format | Displays as "select all \| category \| attribute" | | |
| 5 | Count answer options | Shows 3-6 options | | |
| 6 | Verify option format | Checkboxes (multi-select) | | |
| 7 | Check submit button | "Submit Quiz" button present | | |
| 8 | Verify question counter | Shows "Question 1 of 10" | | |

---

### TC-11: Select Multiple Answers

**Objective**: Verify users can select multiple options

| Step | Action | Expected Result | Pass/Fail | Notes |
|------|--------|----------------|-----------|-------|
| 1 | On quiz page | Question displayed | | |
| 2 | Click first checkbox | Checkbox checked | | |
| 3 | Click second checkbox | Also checked (multi-select works) | | |
| 4 | Click first checkbox again | First unchecked (toggle works) | | |
| 5 | Verify selection state | UI reflects selected options | | |
| 6 | Check visual feedback | Selected options highlighted | | |

---

### TC-12: Submit Quiz Validation

**Objective**: Verify quiz submission requirements

| Step | Action | Expected Result | Pass/Fail | Notes |
|------|--------|----------------|-----------|-------|
| 1 | Start quiz | Quiz loaded | | |
| 2 | Do NOT select any options | No checkboxes checked | | |
| 3 | Click "Submit Quiz" | Validation error shown | | |
| 4 | Check error message | "Please select at least one answer" | | |
| 5 | Select one option | Option checked | | |
| 6 | Click "Submit Quiz" | Confirmation dialog appears | | |
| 7 | Confirm submission | Quiz submits successfully | | |

---

### TC-13: Submit Quiz Confirmation

**Objective**: Verify submission requires confirmation

| Step | Action | Expected Result | Pass/Fail | Notes |
|------|--------|----------------|-----------|-------|
| 1 | Start quiz | Quiz loaded | | |
| 2 | Select answer options | At least one selected | | |
| 3 | Click "Submit Quiz" | Confirmation dialog appears | | |
| 4 | Verify dialog message | "You cannot change answers after submission" | | |
| 5 | Click "Cancel" | Dialog closes, quiz not submitted | | |
| 6 | Selections still active | Can continue editing | | |
| 7 | Click "Submit" again, then "OK" | Quiz submits | | |

---

### TC-14: Quiz Submission - Save Answers

**Objective**: Verify selected answers are saved correctly

| Step | Action | Expected Result | Pass/Fail | Notes |
|------|--------|----------------|-----------|-------|
| 1 | Start quiz | Quiz loaded | | |
| 2 | Note question 1 option IDs | e.g., options 2 and 5 | | |
| 3 | Select those options | Checked | | |
| 4 | Submit quiz | Confirmed | | |
| 5 | Check database | Verify user_responses created | | |
| 6 | Verify correct option IDs saved | Matches selected options | | |

**Database Verification**:
```sql
SELECT
  ur.id,
  ur.question_id,
  ur.answer_option_id,
  ao.display_text,
  ao.is_correct
FROM user_responses ur
JOIN answer_options ao ON ur.answer_option_id = ao.id
WHERE ur.quiz_session_id = [session_id]
ORDER BY ur.question_id, ao.option_order;

-- Verify answer_option_id values match what user selected
```

---

### TC-15: Calculate Quiz Score

**Objective**: Verify score calculation is correct

| Step | Action | Expected Result | Pass/Fail | Notes |
|------|--------|----------------|-----------|-------|
| 1 | Start quiz with known correct answers | Questions visible | | |
| 2 | Select all correct options for Q1 | Checked | | |
| 3 | Select incorrect options for Q2 | Checked | | |
| 4 | Select mix for Q3 | Some correct, some wrong | | |
| 5 | Submit quiz | Submitted | | |
| 6 | Check results page | Score displayed | | |
| 7 | Verify score | Shows X/10 correct | | |
| 8 | Check percentage | Shows score as percentage | | |

**Scoring Logic**:
- Question is correct ONLY if ALL selected options are correct
- Partial credit NOT given for partially correct selections
- Mixed selection (correct + incorrect) = incorrect

---

### TC-16: Quiz Results Page

**Objective**: Verify results page displays correctly

| Step | Action | Expected Result | Pass/Fail | Notes |
|------|--------|----------------|-----------|-------|
| 1 | Complete and submit quiz | Quiz submitted | | |
| 2 | Check redirect | Goes to `/quiz/[sessionId]/results` | | |
| 3 | Verify page title | Shows "Quiz Results" | | |
| 4 | Check score display | Shows "X out of 10 correct" | | |
| 5 | Check percentage | Shows "X%" | | |
| 6 | Verify completion time | Shows timestamp | | |
| 7 | Check navigation | Has "Back to Dashboard" link | | |
| 8 | Verify detailed results | Shows correct/incorrect for each question | | |

---

### TC-17: Cannot Retake Completed Quiz

**Objective**: Verify completed quizzes cannot be modified

| Step | Action | Expected Result | Pass/Fail | Notes |
|------|--------|----------------|-----------|-------|
| 1 | Complete a quiz | Quiz submitted | | |
| 2 | Note the session ID | e.g., sessionId = 5 | | |
| 3 | Try to navigate back to `/quiz/5` | Automatic redirect | | |
| 4 | Verify redirect destination | Goes to `/quiz/5/results` | | |
| 5 | Check results page | Shows completed quiz results | | |
| 6 | Try to re-submit via API | Use same session ID | | |
| 7 | Check response | Returns error "Already completed" | | |

**API Test**:
```bash
curl -X POST http://localhost:3000/api/quiz-sessions/5/submit \
  -H "Content-Type: application/json" \
  -H "Cookie: next-auth.session-token=..." \
  -d '{"selected_option_ids":[1,2,3]}'

# Should return error: "Quiz session already completed"
```

---

### TC-18: View Quiz History

**Objective**: Verify users can see past quiz attempts

| Step | Action | Expected Result | Pass/Fail | Notes |
|------|--------|----------------|-----------|-------|
| 1 | Complete multiple quizzes (3+) | All submitted | | |
| 2 | Navigate to dashboard | Dashboard loads | | |
| 3 | Find "My Quiz History" section | Section present | | |
| 4 | Verify quiz list | Shows past sessions | | |
| 5 | Check displayed info | Shows pack name, score, date | | |
| 6 | Click a past quiz | Navigates to results page | | |
| 7 | Verify historical data | Shows correct score/answers | | |

**Database Query**:
```sql
SELECT
  qs.id,
  cp.name as pack_name,
  qs.total_questions,
  qs.score,
  qs.started_at,
  qs.completed_at
FROM quiz_sessions qs
JOIN content_packs cp ON qs.content_pack_id = cp.id
WHERE qs.user_id = [user_id]
ORDER BY qs.completed_at DESC;
```

---

### TC-19: Cannot Access Other User's Quiz

**Objective**: Verify quiz session ownership checks

| Step | Action | Expected Result | Pass/Fail | Notes |
|------|--------|----------------|-----------|-------|
| 1 | Login as student1 | Logged in | | |
| 2 | Create and complete a quiz | Session ID = X | | |
| 3 | Logout and login as student2 | Different user | | |
| 4 | Try to access `/quiz/X` | Access denied | | |
| 5 | Check error or redirect | Returns 403 or error message | | |
| 6 | Try `/quiz/X/results` | Also denied | | |

**API Test**:
```bash
# As student2, try to access student1's session
curl -X GET http://localhost:3000/api/quiz-sessions/[student1_session_id] \
  -H "Cookie: next-auth.session-token=<student2_token>"

# Should return 403 Forbidden
```

---

### TC-20: Progress Tracking - User Knowledge Progress

**Objective**: Verify progress is tracked at fact level

**Prerequisites**: Complete at least one quiz

| Step | Action | Expected Result | Pass/Fail | Notes |
|------|--------|----------------|-----------|-------|
| 1 | Complete quiz | Submitted | | |
| 2 | Check user_knowledge_progress table | Entries created | | |
| 3 | Verify fact-level tracking | One row per fact tested | | |
| 4 | Check mastery calculation | Shows correct/total ratio | | |
| 5 | Verify timestamps | created_at and updated_at set | | |

**Database Verification**:
```sql
SELECT
  k.label as fact_label,
  ukp.times_tested,
  ukp.times_correct,
  ROUND(ukp.times_correct::numeric / ukp.times_tested * 100, 2) as mastery_pct
FROM user_knowledge_progress ukp
JOIN knowledge k ON ukp.knowledge_id = k.id
WHERE ukp.user_id = [user_id]
ORDER BY mastery_pct DESC;

-- Should show progress for each fact encountered in quiz
```

---

### TC-21: Progress Tracking - Updates on Retake

**Objective**: Verify progress updates with multiple attempts

| Step | Action | Expected Result | Pass/Fail | Notes |
|------|--------|----------------|-----------|-------|
| 1 | Complete first quiz | Progress recorded | | |
| 2 | Query progress for fact ID 10 | times_tested = 1 | | |
| 3 | Take another quiz with same facts | Second quiz completed | | |
| 4 | Query progress for fact ID 10 again | times_tested = 2 | | |
| 5 | Verify times_correct | Increments if answered correctly | | |
| 6 | Check mastery percentage | Updates correctly | | |

**Database Check**:
```sql
-- Before second quiz
SELECT times_tested, times_correct FROM user_knowledge_progress
WHERE user_id = 1 AND knowledge_id = 10;
-- e.g., times_tested = 1, times_correct = 1

-- After second quiz (same fact tested again)
SELECT times_tested, times_correct FROM user_knowledge_progress
WHERE user_id = 1 AND knowledge_id = 10;
-- Should show times_tested = 2, times_correct = 1 or 2 (depending on if correct)
```

---

### TC-22: Analytics Events Logging

**Objective**: Verify quiz events are logged for future analytics

| Step | Action | Expected Result | Pass/Fail | Notes |
|------|--------|----------------|-----------|-------|
| 1 | Create quiz session | Session created | | |
| 2 | Check analytics_events table | Event logged | | |
| 3 | Verify event_type | "quiz_started" or similar | | |
| 4 | Complete quiz | Quiz submitted | | |
| 5 | Check for completion event | "quiz_completed" logged | | |
| 6 | Verify event_data | Contains score, timing, etc. | | |

**Database Query**:
```sql
SELECT
  event_type,
  event_data,
  created_at
FROM analytics_events
WHERE user_id = [user_id]
  AND event_type IN ('quiz_started', 'quiz_completed', 'question_answered')
ORDER BY created_at DESC
LIMIT 10;

-- Verify events are being logged with proper JSONB data
```

---

### TC-23: Concurrent Quiz Sessions

**Objective**: Verify users can have multiple active sessions

| Step | Action | Expected Result | Pass/Fail | Notes |
|------|--------|----------------|-----------|-------|
| 1 | Start quiz 1 | Session 1 created | | |
| 2 | Leave it incomplete | Don't submit | | |
| 3 | Start quiz 2 (different pack) | Session 2 created | | |
| 4 | Complete quiz 2 | Submitted | | |
| 5 | Navigate back to quiz 1 | Still accessible | | |
| 6 | Complete quiz 1 | Can still submit | | |
| 7 | Verify both sessions | Both recorded in history | | |

---

### TC-24: Quiz Session Timeout/Abandonment

**Objective**: Verify abandoned quizzes are handled

| Step | Action | Expected Result | Pass/Fail | Notes |
|------|--------|----------------|-----------|-------|
| 1 | Start a quiz | Session created | | |
| 2 | Answer 2 questions | Partial progress | | |
| 3 | Close browser tab | Session abandoned | | |
| 4 | Open new tab, login again | Logged in | | |
| 5 | Check quiz history | Abandoned quiz shows as incomplete | | |
| 6 | Try to access abandoned quiz | Can resume or shows "incomplete" | | |
| 7 | Verify database | completed_at is NULL | | |

**Database Check**:
```sql
SELECT
  id,
  user_id,
  started_at,
  completed_at,
  score
FROM quiz_sessions
WHERE completed_at IS NULL
ORDER BY started_at DESC;

-- Should show abandoned/incomplete sessions
```

---

## Integration Tests

### TC-25: End-to-End Quiz Flow

**Objective**: Complete quiz workflow from creation to progress tracking

| Step | Action | Expected Result | Pass/Fail | Notes |
|------|--------|----------------|-----------|-------|
| 1 | Login as student | Logged in | | |
| 2 | Subscribe to content pack | Subscribed | | |
| 3 | Start quiz (10 questions) | Session created | | |
| 4 | Answer all questions | All selections made | | |
| 5 | Submit quiz | Quiz submitted | | |
| 6 | View results page | Score displayed | | |
| 7 | Check progress tracking | user_knowledge_progress updated | | |
| 8 | Check analytics events | Events logged | | |
| 9 | Navigate to dashboard | Shows quiz in history | | |
| 10 | Start new quiz on same pack | Different questions generated | | |

---

### TC-26: Multiple Users, Multiple Quizzes

**Objective**: Verify isolation between users

| Step | Action | Expected Result | Pass/Fail | Notes |
|------|--------|----------------|-----------|-------|
| 1 | Login as student1 | Logged in | | |
| 2 | Create quiz, note questions | Questions A | | |
| 3 | Logout, login as student2 | Different user | | |
| 4 | Create quiz (same pack, same count) | Questions B | | |
| 5 | Verify questions differ | Different question set (if different seed) | | |
| 6 | Both complete quizzes | Both submitted | | |
| 7 | Verify progress isolation | Each user has separate progress | | |

**Database Check**:
```sql
-- Verify user1 cannot see user2's data
SELECT COUNT(*) FROM quiz_sessions WHERE user_id = 1; -- Student1's count
SELECT COUNT(*) FROM quiz_sessions WHERE user_id = 2; -- Student2's count
SELECT COUNT(*) FROM user_knowledge_progress WHERE user_id = 1; -- Separate progress
SELECT COUNT(*) FROM user_knowledge_progress WHERE user_id = 2; -- Separate progress
```

---

## Performance Tests

### TC-27: Quiz Generation Performance

**Objective**: Verify acceptable generation time

| Step | Action | Expected Result | Pass/Fail | Notes |
|------|--------|----------------|-----------|-------|
| 1 | Measure time to create quiz | Use DevTools Network tab | | |
| 2 | POST to /api/quiz-sessions/create | Request sent | | |
| 3 | Measure response time | Should be < 2 seconds | | |
| 4 | Verify with 50 questions | Maximum allowed | | |
| 5 | Check response time | Should be < 5 seconds even for 50 | | |

**Target**: Quiz generation < 2s for 10 questions, < 5s for 50 questions

---

### TC-28: Quiz Loading Performance

**Objective**: Verify quiz page loads quickly

| Page | Target Load Time | Actual | Pass/Fail | Notes |
|------|-----------------|--------|-----------|-------|
| `/quiz/[id]` | < 1s | | | First question loads |
| `/quiz/[id]/results` | < 1s | | | Results display |
| API: GET /api/quiz-sessions/[id] | < 500ms | | | Session data |
| API: POST /api/quiz-sessions/[id]/submit | < 1s | | | Score calculation |

---

## Cross-Browser Testing

Test quiz functionality in multiple browsers:

| Browser | TC-08 | TC-10 | TC-11 | TC-14 | TC-16 | Notes |
|---------|-------|-------|-------|-------|-------|-------|
| Chrome | | | | | | |
| Firefox | | | | | | |
| Safari | | | | | | macOS only |
| Edge | | | | | | |

---

## Accessibility Tests

### TC-29: Keyboard Navigation - Quiz Taking

**Objective**: Verify quiz is keyboard accessible

| Step | Action | Expected Result | Pass/Fail | Notes |
|------|--------|----------------|-----------|-------|
| 1 | Navigate to quiz page | Quiz loads | | |
| 2 | Use Tab to navigate | Focus moves through checkboxes | | |
| 3 | Use Space to select | Checkbox toggles | | |
| 4 | Tab to Submit button | Button receives focus | | |
| 5 | Press Enter to submit | Quiz submits | | |

---

### TC-30: Screen Reader Compatibility

**Objective**: Verify quiz works with screen readers

| Step | Action | Expected Result | Pass/Fail | Notes |
|------|--------|----------------|-----------|-------|
| 1 | Enable screen reader | NVDA, JAWS, or VoiceOver | | |
| 2 | Navigate to quiz | Question is read aloud | | |
| 3 | Navigate to options | Each option is announced | | |
| 4 | Check ARIA labels | Proper labels on form elements | | |
| 5 | Verify checkbox state | "checked" or "unchecked" announced | | |

---

## Database Verification Queries

After completing all tests:

```sql
-- Check quiz sessions created
SELECT
  qs.id,
  u.email,
  cp.name as pack_name,
  qs.total_questions,
  qs.score,
  qs.started_at,
  qs.completed_at
FROM quiz_sessions qs
JOIN users u ON qs.user_id = u.id
JOIN content_packs cp ON qs.content_pack_id = cp.id
ORDER BY qs.started_at DESC
LIMIT 20;

-- Check questions generated per session
SELECT
  quiz_session_id,
  COUNT(*) as question_count
FROM questions
GROUP BY quiz_session_id;

-- Check answer options per question
SELECT
  q.id as question_id,
  q.question_text,
  COUNT(ao.id) as option_count,
  COUNT(CASE WHEN ao.is_correct THEN 1 END) as correct_count
FROM questions q
JOIN answer_options ao ON q.id = ao.question_id
GROUP BY q.id, q.question_text
LIMIT 10;

-- Check answer_option_components integrity
SELECT
  ao.id as option_id,
  ao.display_text,
  COUNT(aoc.id) as component_count
FROM answer_options ao
LEFT JOIN answer_option_components aoc ON ao.id = aoc.answer_option_id
GROUP BY ao.id, ao.display_text
HAVING COUNT(aoc.id) = 0;
-- Should return 0 rows (all options have components)

-- Check user responses
SELECT
  ur.quiz_session_id,
  COUNT(DISTINCT ur.question_id) as questions_answered
FROM user_responses ur
GROUP BY ur.quiz_session_id;

-- Check knowledge progress tracking
SELECT
  u.email,
  COUNT(DISTINCT ukp.knowledge_id) as facts_tracked,
  AVG(ukp.times_tested) as avg_tests_per_fact,
  AVG(ukp.times_correct::numeric / NULLIF(ukp.times_tested, 0) * 100) as avg_mastery
FROM user_knowledge_progress ukp
JOIN users u ON ukp.user_id = u.id
GROUP BY u.id, u.email;

-- Check analytics events logging
SELECT
  event_type,
  COUNT(*) as event_count
FROM analytics_events
WHERE user_id IS NOT NULL
GROUP BY event_type
ORDER BY event_count DESC;
```

---

## Security Tests

### TC-31: Quiz Session Authorization

**Objective**: Verify users can only access their own sessions

| Step | Action | Expected Result | Pass/Fail | Notes |
|------|--------|----------------|-----------|-------|
| 1 | Create quiz as user1 | Session ID = X | | |
| 2 | Get user1's session token | From cookies | | |
| 3 | Login as user2 | Different user | | |
| 4 | Try to GET /api/quiz-sessions/X | Use user2's token | | |
| 5 | Check response | Returns 403 Forbidden | | |
| 6 | Try to POST submit to session X | With user2's token | | |
| 7 | Verify rejected | Returns 403 | | |

---

### TC-32: Answer Tampering Prevention

**Objective**: Verify submitted answers are validated

| Step | Action | Expected Result | Pass/Fail | Notes |
|------|--------|----------------|-----------|-------|
| 1 | Create quiz session | Session created | | |
| 2 | Note valid option IDs | e.g., [1, 2, 3, 4] | | |
| 3 | Submit with invalid option ID | e.g., option_id = 999 | | |
| 4 | Check response | Returns error "Invalid option" | | |
| 5 | Submit with option from different question | Cross-question tampering | | |
| 6 | Verify rejected | Returns error | | |

**API Test**:
```bash
curl -X POST http://localhost:3000/api/quiz-sessions/5/submit \
  -H "Content-Type: application/json" \
  -H "Cookie: next-auth.session-token=..." \
  -d '{"selected_option_ids":[999,1000,1001]}'

# Should return error: "Invalid answer options"
```

---

## Test Summary

**Total Test Cases**: 32
**Critical**: 12 (TC-01, TC-05, TC-08, TC-09, TC-14, TC-15, TC-17, TC-19, TC-25, TC-31, TC-32)
**High**: 14 (TC-02, TC-03, TC-04, TC-10, TC-11, TC-12, TC-13, TC-16, TC-20, TC-21, TC-22, TC-26, TC-27, TC-28)
**Medium**: 6 (TC-06, TC-07, TC-18, TC-23, TC-24, TC-29, TC-30)

### Pass Criteria

- All critical tests must pass
- At least 90% of high priority tests must pass
- No P0 or P1 security bugs
- Quiz generation is deterministic
- Answer tracking is accurate
- Progress updates correctly
- Performance targets met

### Test Sign-Off

| Role | Name | Date | Signature | Notes |
|------|------|------|-----------|-------|
| Developer | | | | |
| QA | | | | |
| Product Owner | | | | |

---

## Known Issues

_(Document any known issues or limitations here)_

| ID | Description | Severity | Workaround | Target Fix |
|----|-------------|----------|------------|------------|
| | | | | |

---

## Notes & Observations

_(Add any observations, edge cases discovered, or improvement suggestions here)_

---

**Last Updated**: 2025-10-24
**Next Review**: After analytics/reporting features added
