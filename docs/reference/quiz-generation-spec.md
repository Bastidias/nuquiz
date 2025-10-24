# Quiz Generation Vocabulary & Data Model

This document defines the terminology and data structures for quiz generation in Nuquiz.

## Question Direction

Questions can traverse the knowledge hierarchy in two directions:

### Downward Questions
**Format:** `select all | {category} | {attribute}`

**Behavior:** User selects facts (leaf nodes) that match the category + attribute path.

**Example:**
```
select all | left-sided CHF | symptoms
```
Answers: Pulmonary edema, Dyspnea (facts)

---

### Upward Questions
**Format:** `select all | {attribute} | {fact}`

**Behavior:** User selects categories (parent nodes) that contain the given fact under the specified attribute.

**Example:**
```
select all | symptoms | pulmonary edema
```
Answers: Left-sided CHF (category that has pulmonary edema as a symptom)

---

## Quiz Selection Strategies

Strategies determine which knowledge paths to test based on user performance:

| Strategy | Description | Use Case |
|----------|-------------|----------|
| `untested` | Content user hasn't been tested on yet | Introduce new material |
| `review` | Content user has mastered (>80% accuracy) | Reinforce learning, spaced repetition |
| `struggling` | Content user has low accuracy (<60%) | Focused remediation |
| `targeted` | Specific knowledge paths (topic/category/attribute) | User-driven practice |
| `adaptive` | Smart distractor selection based on user confusion patterns | Advanced difficulty adjustment |

**Adaptive Strategy Example:**
If user always correctly identifies "pulmonary edema," the system adds it to distractors in OTHER questions to increase difficulty.

---

## Quiz Generation Configuration

```typescript
type QuizGenerationConfig = {
  question_count: number;                    // e.g., 10
  direction_mix: {
    downward: number;                        // e.g., 0.7 (70%)
    upward: number;                          // e.g., 0.3 (30%)
  };
  distractor_count: number;                  // e.g., 4 options per question
  selection_strategy: Strategy;              // 'untested' | 'review' | 'struggling' | 'targeted' | 'adaptive'
  content_pack_id: number;
  scope?: {                                  // Optional narrowing
    topic_ids?: number[];
    category_ids?: number[];
    attribute_ids?: number[];
  };
}
```

---

## Data Model

### Core Tables

#### `quiz_sessions`
Represents a single quiz attempt.

```sql
id                  serial PRIMARY KEY
user_id             integer REFERENCES users(id)
content_pack_id     integer REFERENCES content_packs(id)
started_at          timestamp NOT NULL
completed_at        timestamp NULL
score               integer NULL
```

---

#### `questions`
Individual questions in a quiz session.

```sql
id                  serial PRIMARY KEY
quiz_session_id     integer REFERENCES quiz_sessions(id)
question_text       text NOT NULL                    -- Generated display text (e.g., "select all | left-sided CHF | symptoms")
question_type       text NOT NULL                    -- 'select_all'
direction           text NOT NULL                    -- 'downward' | 'upward'
category_id         integer REFERENCES knowledge(id) NULL  -- NULL for upward questions
attribute_id        integer REFERENCES knowledge(id) NOT NULL
fact_id             integer REFERENCES knowledge(id) NULL  -- Only populated for upward questions
created_at          timestamp NOT NULL
```

**Question Text Generation:**
- Downward: `"select all | {category.name} | {attribute.name}"`
- Upward: `"select all | {attribute.name} | {fact.name}"`

Join to `knowledge` table to get labels at display time.

---

#### `answer_options`
Multiple choice options presented to the user.

```sql
id                  serial PRIMARY KEY
question_id         integer REFERENCES questions(id)
option_text         text NOT NULL                    -- e.g., "Pulmonary edema, Dyspnea"
is_correct          boolean NOT NULL                 -- Overall correctness of this option
display_order       integer NOT NULL
```

---

#### `answer_option_components`
Maps answer options to the knowledge facts they contain.

```sql
answer_option_id    integer REFERENCES answer_options(id)
knowledge_id        integer REFERENCES knowledge(id)  -- Fact ID
PRIMARY KEY (answer_option_id, knowledge_id)
```

**Purpose:** Enables component-level analysis. An option like "Pulmonary edema, Peripheral edema" contains two facts - one correct, one incorrect.

---

#### `user_answers`
User's selected answer options (can select multiple for "select all" questions).

```sql
id                  serial PRIMARY KEY
quiz_session_id     integer REFERENCES quiz_sessions(id)
question_id         integer REFERENCES questions(id)
answer_option_id    integer REFERENCES answer_options(id)
is_correct          boolean NOT NULL                 -- Is this option marked as correct?
created_at          timestamp NOT NULL
```

---

#### `user_answer_components`
Detailed breakdown of user's fact-level performance.

```sql
id                  serial PRIMARY KEY
user_answer_id      integer REFERENCES user_answers(id)
knowledge_id        integer REFERENCES knowledge(id)  -- Fact ID
should_be_included  boolean NOT NULL                 -- Should this fact be in the correct answer?
user_included_it    boolean NOT NULL                 -- Did user select an option containing this fact?
is_correct          boolean NOT NULL                 -- Match between should_be and user_included
```

**Three Interaction Types:**

1. **Correct Inclusion** - `should_be: true, user_included: true, is_correct: true`
   - User correctly identified this fact

2. **False Inclusion (Confusion)** - `should_be: false, user_included: true, is_correct: false`
   - User wrongly included this fact
   - **Key signal for confusion patterns**

3. **Missed Fact (Knowledge Gap)** - `should_be: true, user_included: false, is_correct: false`
   - User failed to include a required fact
   - **Key signal for knowledge gaps**

---

## Example Data Flow

### Question: "select all | left-sided CHF | symptoms"

**Knowledge Hierarchy:**
```
Congestive Heart Failure (topic: 1)
├── Left sided (category: 10)
│   └── Symptoms (attribute: 100)
│       ├── Pulmonary edema (fact: 1001) ✓
│       └── Dyspnea (fact: 1002) ✓
└── Right sided (category: 11)
    └── Symptoms (attribute: 101)
        └── Peripheral edema (fact: 1003) ✗
```

**Question Record:**
```sql
questions (id: 5001)
  question_text: "select all | left-sided CHF | symptoms"
  direction: "downward"
  category_id: 10
  attribute_id: 100
  fact_id: NULL
```

**Answer Options:**
```sql
answer_options (id: 50001) -- ALL CORRECT
  option_text: "Pulmonary edema, Dyspnea"
  is_correct: true

answer_options (id: 50002) -- MIXED
  option_text: "Pulmonary edema, Peripheral edema"
  is_correct: false

answer_options (id: 50003) -- ALL WRONG
  option_text: "Peripheral edema"
  is_correct: false
```

**Components:**
```sql
answer_option_components
  (50001, 1001) -- Pulmonary edema
  (50001, 1002) -- Dyspnea
  (50002, 1001) -- Pulmonary edema
  (50002, 1003) -- Peripheral edema
  (50003, 1003) -- Peripheral edema
```

**User selects options 50002 and 50004:**
```sql
user_answers
  (60001, 5001, 50002, false) -- Selected mixed option
  (60002, 5001, 50004, true)  -- Selected "Dyspnea" only
```

**Component Analysis:**
```sql
user_answer_components
  (60001, 1001, should: true,  included: true,  correct: true)   -- ✓ Recognized pulmonary edema
  (60001, 1003, should: false, included: true,  correct: false)  -- ✗ CONFUSED peripheral edema
  (60001, 1002, should: true,  included: false, correct: false)  -- ✗ MISSED dyspnea from this option
  (60002, 1002, should: true,  included: true,  correct: true)   -- ✓ Recognized dyspnea
```

---

## Mastery Tracking

### Question-Level (Boolean)
- Affects overall mastery percentage in `user_knowledge_progress`
- Binary: Did user get the question right or wrong?

### Component-Level (Detailed Feedback)
- Guides studying and adaptive quiz generation
- Tracks confusion patterns (false inclusions)
- Identifies knowledge gaps (missed facts)
- Enables UI highlighting: "You correctly identified X but incorrectly included Y"

---

## Pure Function Architecture

Quiz generation follows a functional pipeline:

```
Performance Analysis
  ↓
Strategy Selection
  ↓
Knowledge Fetching (I/O)
  ↓
Question Generation (PURE FUNCTION)
  ↓
Quiz Creation (I/O - save to DB)
```

**Key Principle:** The question generator is a pure function - same inputs always produce the same questions (using a seed for deterministic randomness).

```typescript
type QuestionData = {
  category: KnowledgeNode;
  attribute: KnowledgeNode;
  correctFacts: KnowledgeNode[];
  distractorPool: KnowledgeNode[];
  confusingFacts?: KnowledgeNode[];  // For adaptive strategy
  numDistractors: number;
};

function generateQuestion(data: QuestionData, seed: number): Question {
  // Deterministic - same data + seed = same question
}
```

---

## Future Enhancements

- **Spaced Repetition:** Use component-level data to schedule reviews of weak facts
- **Prerequisite Detection:** Identify fact dependencies based on performance patterns
- **Confusion Matrices:** Visualize which facts users commonly confuse
- **Adaptive Difficulty:** Real-time adjustment based on session performance
